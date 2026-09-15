(function () {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* State                                                             */
  /* ---------------------------------------------------------------- */
  const state = {
    mode: null,          // 'study' | 'exam'
    queue: [],           // array of question objects for this session
    index: 0,
    answers: [],         // per question: { qid, given, correct, skipped }
    timerId: null,
    secondsLeft: 50 * 60,
    examEndAt: null,      // absolute timestamp (ms) at which the current exam's timer hits zero
    locked: false,       // true once the current question's answer has been confirmed
    pendingMc: null,      // index of the tentatively selected (not yet confirmed) MC option
    examArea: null,       // area selected for the current/last exam session
    examMicro: false      // true if the current/last exam is the half-length "micro esame"
  };

  const STORAGE_KEY = "webquiz_semestrefiltro_stats_v1";
  const PROGRESS_KEY = "webquiz_semestrefiltro_inprogress_v1";

  /* ---------------------------------------------------------------- */
  /* Date del calendario normale, usate per la cronologia giornaliera   */
  /* nei progressi e per il codice di sincronizzazione tra dispositivi. */
  /* ---------------------------------------------------------------- */
  const MONTH_NAMES_IT = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const WEEKDAY_NAMES_IT = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

  function dateKeyFromDate(d) {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function todayKey() { return dateKeyFromDate(new Date()); }
  function dayKeyToBase36(key) {
    const [y, m, d] = key.split("-").map(Number);
    return Math.floor(Date.UTC(y, m - 1, d) / 86400000).toString(36);
  }
  function base36ToDayKey(b36) {
    const days = parseInt(b36, 36) || 0;
    const dt = new Date(days * 86400000);
    return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
  }

  /* ---------------------------------------------------------------- */
  /* DOM refs                                                          */
  /* ---------------------------------------------------------------- */
  const el = (id) => document.getElementById(id);
  const screens = {
    home: el("screen-home"),
    quiz: el("screen-quiz"),
    results: el("screen-results")
  };

  /* ---------------------------------------------------------------- */
  /* Utils                                                              */
  /* ---------------------------------------------------------------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalizeAnswer(s) {
    return (s || "")
      .toUpperCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "") // strip accents
      .replace(/[^A-Z0-9,.\- ]/g, "")
      .trim()
      .replace(/\s+/g, " ");
  }

  function checkFillAnswer(question, given) {
    const candidates = [question.answer].concat(question.answerAlt || []);
    const norm = normalizeAnswer(given);
    if (!norm) return false;
    return candidates.some((c) => normalizeAnswer(c) === norm);
  }

  function showScreen(name) {
    Object.values(screens).forEach((s) => (s.hidden = true));
    screens[name].hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function letterFor(i) { return "ABCDE"[i]; }

  function renderMath(container) {
    if (window.renderMathInElement) {
      renderMathInElement(container, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Stats (localStorage)                                              */
  /* ---------------------------------------------------------------- */
  function loadStats() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultStats();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultStats(), parsed);
    } catch (e) {
      return defaultStats();
    }
  }
  function defaultStats() {
    return { studyCorrect: 0, studyTotal: 0, examHistory: [], byTopic: {}, dailyLog: {}, wrongQuestions: {} };
  }
  function saveStats(stats) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); } catch (e) { /* ignore */ }
  }

  /* ---------------------------------------------------------------- */
  /* Domande sbagliate (per la Modalità Ripasso): mappa id domanda ->   */
  /* argomento, per ogni domanda attualmente "da ripassare". Una        */
  /* domanda sbagliata (in Studio, Esame o Ripasso stesso) vi entra;    */
  /* rispondendola correttamente (in qualunque modalità) la rimuove.    */
  /* ---------------------------------------------------------------- */
  function updateWrongTracking(q, isCorrect) {
    const stats = loadStats();
    if (!stats.wrongQuestions) stats.wrongQuestions = {};
    if (isCorrect) delete stats.wrongQuestions[q.id];
    else stats.wrongQuestions[q.id] = q.topic;
    saveStats(stats);
  }

  // Scarta le domande sbagliate salvate che non esistono più nel banco
  // corrente (es. dopo un aggiornamento del question bank).
  function pruneWrongQuestions(stats) {
    const validIds = new Set(QUESTIONS.map((q) => q.id));
    let changed = false;
    Object.keys(stats.wrongQuestions || {}).forEach((qid) => {
      if (!validIds.has(qid)) { delete stats.wrongQuestions[qid]; changed = true; }
    });
    if (changed) saveStats(stats);
    return stats;
  }

  function wrongCountByTopic(stats) {
    const counts = {};
    Object.values(stats.wrongQuestions || {}).forEach((topicKey) => {
      if (!TOPICS[topicKey]) return;
      counts[topicKey] = (counts[topicKey] || 0) + 1;
    });
    return counts;
  }
  function recordStudyAnswer(topic, correct) {
    const stats = loadStats();
    stats.studyTotal++;
    if (correct) stats.studyCorrect++;
    if (!stats.byTopic[topic]) stats.byTopic[topic] = { correct: 0, total: 0 };
    stats.byTopic[topic].total++;
    if (correct) stats.byTopic[topic].correct++;

    const dayKey = todayKey();
    if (!stats.dailyLog[dayKey]) stats.dailyLog[dayKey] = {};
    if (!stats.dailyLog[dayKey][topic]) stats.dailyLog[dayKey][topic] = { correct: 0, total: 0 };
    stats.dailyLog[dayKey][topic].total++;
    if (correct) stats.dailyLog[dayKey][topic].correct++;

    saveStats(stats);
  }
  function recordExamResult(score, max, passed, area, micro) {
    const stats = loadStats();
    stats.examHistory.push({ score, max, passed, area: area || "", micro: !!micro, date: new Date().toISOString() });
    if (stats.examHistory.length > 20) stats.examHistory.shift();
    saveStats(stats);
  }

  /* ---------------------------------------------------------------- */
  /* Sessione interrotta (localStorage): salva in automatico lo stato   */
  /* di studio/esame in corso a ogni domanda e a ogni risposta, così se */
  /* l'esercitazione viene interrotta (pulsante "Interrompi", chiusura  */
  /* della scheda, ricaricamento della pagina) resta possibile          */
  /* riprenderla esattamente da dove si era rimasti. Per l'esame, si    */
  /* salva l'istante assoluto di scadenza (non i secondi residui): il   */
  /* tempo scorre comunque nel mondo reale, come in una prova vera, e   */
  /* riprendendo dopo la scadenza la prova si chiude automaticamente    */
  /* con le risposte già date.                                         */
  /* ---------------------------------------------------------------- */
  function saveInProgress() {
    if (!state.mode || !state.queue.length) return;
    try {
      const payload = {
        mode: state.mode,
        examArea: state.examArea,
        examMicro: state.examMicro,
        queueIds: state.queue.map((q) => q.id),
        index: state.index,
        answers: state.answers,
        examEndAt: state.mode === "exam" ? state.examEndAt : null,
        savedAt: Date.now()
      };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(payload));
    } catch (e) { /* ignore (storage full/unavailable) */ }
  }

  function clearInProgress() {
    try { localStorage.removeItem(PROGRESS_KEY); } catch (e) { /* ignore */ }
  }

  // Ricostruisce la sessione salvata sostituendo gli id delle domande con gli
  // oggetti reali del banco corrente: se una domanda salvata non esiste più
  // (es. dopo un aggiornamento del sito) la sessione non è più ripristinabile
  // in sicurezza e viene scartata.
  function resolveInProgress() {
    let saved;
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (!raw) return null;
      saved = JSON.parse(raw);
    } catch (e) { return null; }
    if (!saved || !Array.isArray(saved.queueIds) || saved.queueIds.length === 0) return null;
    const byId = {};
    QUESTIONS.forEach((q) => (byId[q.id] = q));
    const queue = saved.queueIds.map((id) => byId[id]);
    if (queue.some((q) => !q)) return null;
    if (typeof saved.index !== "number" || saved.index < 0 || saved.index >= queue.length) return null;
    if (!Array.isArray(saved.answers)) return null;
    saved.queue = queue;
    return saved;
  }

  function renderResumeCard() {
    const card = el("resumeCard");
    if (!card) return;
    const resolved = resolveInProgress();
    if (!resolved) {
      card.hidden = true;
      clearInProgress();
      return;
    }
    card.hidden = false;
    const total = resolved.queue.length;
    const answered = resolved.answers.length;
    const modeLabel = resolved.mode === "exam"
      ? (resolved.examMicro ? "Micro esame personalizzato" : `Esame simulato · ${AREAS[resolved.examArea].icon} ${AREAS[resolved.examArea].name}`)
      : resolved.mode === "ripasso" ? "Sessione di ripasso" : "Sessione di studio";
    let extra = "";
    if (resolved.mode === "exam" && resolved.examEndAt) {
      const msLeft = resolved.examEndAt - Date.now();
      extra = msLeft > 0
        ? ` Tempo residuo: circa ${Math.max(1, Math.round(msLeft / 60000))} min.`
        : " Il tempo a disposizione è scaduto: riprendendo, la prova verrà chiusa subito con le risposte già date.";
    }
    el("resumeInfo").textContent = `${modeLabel} — hai risposto a ${answered} domande su ${total}.${extra}`;
  }

  function resumeSession() {
    const resolved = resolveInProgress();
    if (!resolved) { renderResumeCard(); return; }
    state.mode = resolved.mode;
    state.examArea = resolved.examArea;
    state.examMicro = resolved.examMicro;
    state.queue = resolved.queue;
    state.index = resolved.index;
    state.answers = resolved.answers;
    state.locked = false;
    state.pendingMc = null;
    clearInterval(state.timerId);

    if (resolved.mode === "exam") {
      state.examEndAt = resolved.examEndAt;
      el("timerBox").hidden = false;
      if (Date.now() >= state.examEndAt) {
        // Il tempo è scaduto mentre l'esercitazione era interrotta: si chiude
        // subito, con le risposte già date, come una prova a tempo vero.
        finishSession(true);
        return;
      }
      refreshSecondsLeft();
      updateTimerDisplay();
      state.timerId = setInterval(tickTimer, 1000);
    } else {
      state.examEndAt = null;
      el("timerBox").hidden = true;
    }
    showScreen("quiz");
    renderQuestion();
  }

  /* ---------------------------------------------------------------- */
  /* Sincronizzazione tra dispositivi: nessun server, nessun database.  */
  /* L'intero stato dei progressi viene codificato in un codice di      */
  /* testo autosufficiente (algoritmo deterministico, reversibile) da   */
  /* copiare su un altro dispositivo per riprendere da lì.              */
  /* ---------------------------------------------------------------- */
  const SYNC_MAGIC_LEGACY = "KRK1"; // formato precedente, senza calendario giornaliero né materia dell'esame
  const SYNC_MAGIC = "KRK2";

  function fnv1aHash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(36);
  }

  function encodeSyncCode(stats) {
    const studyPart = `${stats.studyCorrect.toString(36)},${stats.studyTotal.toString(36)}`;

    const topicsPart = Object.keys(stats.byTopic)
      .filter((k) => stats.byTopic[k] && stats.byTopic[k].total > 0)
      .map((k) => `${k}:${stats.byTopic[k].correct.toString(36)}:${stats.byTopic[k].total.toString(36)}`)
      .join(",");

    const examsPart = stats.examHistory
      .map((h) => {
        const scoreX10 = Math.max(0, Math.round(h.score * 10));
        const dateSec = Math.floor(new Date(h.date).getTime() / 1000) || 0;
        return `${scoreX10.toString(36)}:${h.max.toString(36)}:${h.passed ? 1 : 0}:${dateSec.toString(36)}:${h.area || ""}:${h.micro ? 1 : 0}`;
      })
      .join(",");

    const dailyPart = Object.keys(stats.dailyLog)
      .filter((k) => stats.dailyLog[k] && Object.keys(stats.dailyLog[k]).length > 0)
      .sort()
      .map((dayKey) => {
        const topics = stats.dailyLog[dayKey];
        const topicsStr = Object.keys(topics)
          .filter((k) => topics[k] && topics[k].total > 0)
          .map((k) => `${k}.${topics[k].correct.toString(36)}.${topics[k].total.toString(36)}`)
          .join(";");
        return `${dayKeyToBase36(dayKey)}:${topicsStr}`;
      })
      .join(",");

    const payload = [SYNC_MAGIC, studyPart, topicsPart, examsPart, dailyPart].join("~");
    return `${payload}~${fnv1aHash(payload)}`;
  }

  function decodeSyncCode(code) {
    const parts = String(code || "").trim().split("~");
    const stats = defaultStats();

    if (parts.length === 6) {
      const [magic, studyPart, topicsPart, examsPart, dailyPart, checksum] = parts;
      if (magic !== SYNC_MAGIC) throw new Error("Codice non valido o generato da una versione diversa del sito.");
      const payload = [magic, studyPart, topicsPart, examsPart, dailyPart].join("~");
      if (fnv1aHash(payload) !== checksum) throw new Error("Il codice risulta incompleto o alterato: ricopialo per intero.");

      const [scStr, stStr] = studyPart.split(",");
      stats.studyCorrect = parseInt(scStr, 36) || 0;
      stats.studyTotal = parseInt(stStr, 36) || 0;

      if (topicsPart) {
        topicsPart.split(",").forEach((entry) => {
          const [key, c, t] = entry.split(":");
          if (!key) return;
          stats.byTopic[key] = { correct: parseInt(c, 36) || 0, total: parseInt(t, 36) || 0 };
        });
      }

      if (examsPart) {
        examsPart.split(",").forEach((entry) => {
          const [scoreX10, max, passed, dateSec, area, micro] = entry.split(":");
          stats.examHistory.push({
            score: (parseInt(scoreX10, 36) || 0) / 10,
            max: parseInt(max, 36) || 0,
            passed: passed === "1",
            area: area || "",
            micro: micro === "1",
            date: new Date((parseInt(dateSec, 36) || 0) * 1000).toISOString()
          });
        });
      }

      if (dailyPart) {
        dailyPart.split(",").forEach((dayEntry) => {
          const sepIdx = dayEntry.indexOf(":");
          if (sepIdx === -1) return;
          const dayB36 = dayEntry.slice(0, sepIdx);
          const topicsStr = dayEntry.slice(sepIdx + 1);
          const dayKey = base36ToDayKey(dayB36);
          const topics = {};
          if (topicsStr) {
            topicsStr.split(";").forEach((t) => {
              const [key, c, tot] = t.split(".");
              if (!key) return;
              topics[key] = { correct: parseInt(c, 36) || 0, total: parseInt(tot, 36) || 0 };
            });
          }
          stats.dailyLog[dayKey] = topics;
        });
      }

      return stats;
    }

    if (parts.length === 5) {
      // Formato precedente (KRK1): nessun calendario giornaliero, esami senza materia.
      const [magic, studyPart, topicsPart, examsPart, checksum] = parts;
      if (magic !== SYNC_MAGIC_LEGACY) throw new Error("Codice non valido o generato da una versione diversa del sito.");
      const payload = [magic, studyPart, topicsPart, examsPart].join("~");
      if (fnv1aHash(payload) !== checksum) throw new Error("Il codice risulta incompleto o alterato: ricopialo per intero.");

      const [scStr, stStr] = studyPart.split(",");
      stats.studyCorrect = parseInt(scStr, 36) || 0;
      stats.studyTotal = parseInt(stStr, 36) || 0;

      if (topicsPart) {
        topicsPart.split(",").forEach((entry) => {
          const [key, c, t] = entry.split(":");
          if (!key) return;
          stats.byTopic[key] = { correct: parseInt(c, 36) || 0, total: parseInt(t, 36) || 0 };
        });
      }

      if (examsPart) {
        examsPart.split(",").forEach((entry) => {
          const [scoreX10, max, passed, dateSec] = entry.split(":");
          stats.examHistory.push({
            score: (parseInt(scoreX10, 36) || 0) / 10,
            max: parseInt(max, 36) || 0,
            passed: passed === "1",
            area: "",
            micro: false,
            date: new Date((parseInt(dateSec, 36) || 0) * 1000).toISOString()
          });
        });
      }

      return stats;
    }

    throw new Error("Formato del codice non riconosciuto.");
  }

  function renderStats() {
    const stats = pruneWrongQuestions(loadStats());
    buildSyllabusProgress(stats);
    buildRipassoCard(stats);

    const card = el("statsCard");
    const body = el("statsBody");
    if (stats.studyTotal === 0 && stats.examHistory.length === 0) {
      card.hidden = true;
      return;
    }
    card.hidden = false;
    let html = "";
    if (stats.studyTotal > 0) {
      const pct = Math.round((stats.studyCorrect / stats.studyTotal) * 100);
      html += `<div class="stat-row"><span>Risposte corrette in modalità studio</span><b>${stats.studyCorrect}/${stats.studyTotal} (${pct}%)</b></div>`;
    }
    Object.keys(TOPICS).forEach((t) => {
      const d = stats.byTopic[t];
      if (d && d.total > 0) {
        const pct = Math.round((d.correct / d.total) * 100);
        html += `<div class="stat-row"><span>${AREAS[TOPICS[t].area].icon} ${TOPICS[t].name}</span><b>${d.correct}/${d.total} (${pct}%)</b></div>`;
      }
    });
    if (stats.examHistory.length > 0) {
      const last = stats.examHistory[stats.examHistory.length - 1];
      const lastLabel = last.micro ? "Ultimo micro esame" : "Ultimo esame simulato";
      html += `<div class="stat-row"><span>${lastLabel}</span><b>${last.score.toFixed(1)}/${last.max} — ${last.passed ? "Superato ✅" : "Non superato ❌"}</b></div>`;
      // Confronto per percentuale, non per punteggio grezzo: esame completo (max 31) e
      // micro esame (max 16) non sono altrimenti comparabili sulla stessa scala.
      const best = stats.examHistory.reduce((m, h) => (h.score / h.max > m.score / m.max ? h : m));
      html += `<div class="stat-row"><span>Miglior punteggio esame${best.micro ? " (micro)" : ""}</span><b>${best.score.toFixed(1)}/${best.max}</b></div>`;
    }
    html += dailyBreakdownHtml(stats);
    body.innerHTML = html;
  }

  /* ---------------------------------------------------------------- */
  /* Cronologia giornaliera dei progressi, in ordine cronologico        */
  /* inverso, secondo il calendario normale (nessuna datazione custom). */
  /* ---------------------------------------------------------------- */
  function examAreaIcon(areaKey) {
    return areaKey && AREAS[areaKey] ? AREAS[areaKey].icon : "📝";
  }

  function dailyBreakdownHtml(stats) {
    const examsByDay = {};
    stats.examHistory.forEach((h) => {
      const key = dateKeyFromDate(new Date(h.date));
      if (!examsByDay[key]) examsByDay[key] = [];
      examsByDay[key].push(h);
    });

    const dayKeys = new Set(Object.keys(stats.dailyLog).filter((k) => stats.dailyLog[k] && Object.keys(stats.dailyLog[k]).length > 0));
    Object.keys(examsByDay).forEach((k) => dayKeys.add(k));
    if (dayKeys.size === 0) return "";

    const sortedDays = Array.from(dayKeys).sort().reverse(); // "YYYY-MM-DD" ordina già cronologicamente
    let html = `<div class="daylog-title">Cronologia giornaliera</div><div class="daylog-list">`;
    sortedDays.forEach((dayKey) => {
      html += dayLogEntryHtml(dayKey, stats.dailyLog[dayKey] || {}, examsByDay[dayKey] || []);
    });
    html += `</div>`;
    return html;
  }

  function dayLogEntryHtml(dayKey, dayLog, exams) {
    const [y, m, d] = dayKey.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const weekday = WEEKDAY_NAMES_IT[(dateObj.getDay() + 6) % 7];
    const label = `${weekday} ${d} ${MONTH_NAMES_IT[m - 1].toLowerCase()} ${y}`;
    const topicKeys = Object.keys(dayLog).filter((k) => TOPICS[k] && dayLog[k].total > 0);

    let html = `<div class="daylog-day"><div class="daylog-day-label">${escapeHtml(label)}</div>`;
    if (topicKeys.length > 0) {
      html += `<div class="daylog-section-title">Modalità Studio</div>`;
      topicKeys.forEach((k) => {
        const t = TOPICS[k];
        const d2 = dayLog[k];
        const pct = Math.round((d2.correct / d2.total) * 100);
        html += `<div class="stat-row"><span>${AREAS[t.area].icon} ${escapeHtml(t.name)}</span><b>${d2.correct}/${d2.total} (${pct}%)</b></div>`;
      });
    }
    if (exams.length > 0) {
      html += `<div class="daylog-section-title">Esami simulati</div>`;
      exams.forEach((h) => {
        const examLabel = (h.area && AREAS[h.area] ? AREAS[h.area].name : "Esame") + (h.micro ? " (micro)" : "");
        html += `<div class="stat-row"><span>${examAreaIcon(h.area)} ${examLabel}</span><b>${h.score.toFixed(1)}/${h.max} — ${h.passed ? "Superato ✅" : "Non superato ❌"}</b></div>`;
      });
    }
    html += `</div>`;
    return html;
  }

  /* ---------------------------------------------------------------- */
  /* Syllabus & per-unit / per-topic progress panel                    */
  /* ---------------------------------------------------------------- */
  function buildSyllabusProgress(stats) {
    const container = el("syllabusBody");
    if (!container) return;
    stats = stats || loadStats();
    let html = "";

    function topicRowHtml(key) {
      const topic = TOPICS[key];
      const count = QUESTIONS.filter((q) => q.topic === key).length;
      const d = stats.byTopic[key];
      const has = d && d.total > 0;
      const pct = has ? Math.round((d.correct / d.total) * 100) : 0;
      return `
        <div class="syll-topic-row">
          <span class="topic-dot" style="background:${topic.color}"></span>
          <span class="syll-topic-name">${escapeHtml(topic.name)}</span>
          <span class="syll-topic-count">${count} domande</span>
          <span class="syll-topic-bar"><span class="syll-topic-fill" style="width:${pct}%;background:${topic.color}"></span></span>
          <span class="syll-topic-pct">${has ? `${d.correct}/${d.total} · ${pct}%` : "—"}</span>
        </div>`;
    }

    Object.keys(AREAS).forEach((areaKey) => {
      const area = AREAS[areaKey];
      const areaTopics = topicsByArea(areaKey);
      html += `<div class="syll-area"><div class="syll-area-header">${area.icon} ${escapeHtml(area.name)}</div>`;

      const units = SYLLABUS[areaKey];
      if (units) {
        units.forEach((u) => {
          const unitTopics = areaTopics.filter((t) => TOPICS[t].unit === u.unit);
          html += `<div class="syll-unit">
            <div class="syll-unit-header"><span class="syll-unit-badge">U.D. ${u.unit}</span> ${escapeHtml(u.name)}</div>`;
          if (unitTopics.length === 0) {
            html += `<div class="syll-unit-empty">Nessuna domanda disponibile su questo sito per questa unità, per ora.</div>`;
          } else {
            unitTopics.forEach((t) => (html += topicRowHtml(t)));
          }
          html += `</div>`;
        });
      } else {
        html += `<p class="syll-no-syllabus">Nessun syllabus ufficiale caricato per questa materia: argomenti elencati senza suddivisione in unità didattiche.</p>`;
        areaTopics.forEach((t) => (html += topicRowHtml(t)));
      }
      html += `</div>`;
    });

    container.innerHTML = html;
  }

  function buildRipassoCard(stats) {
    const startBtn = el("startRipasso");
    const emptyEl = el("ripassoEmpty");
    const breakdownEl = el("ripassoBreakdown");
    if (!startBtn) return;

    const counts = wrongCountByTopic(stats);
    const topicKeys = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const total = topicKeys.reduce((sum, k) => sum + counts[k], 0);

    if (total === 0) {
      emptyEl.hidden = false;
      breakdownEl.innerHTML = "";
      startBtn.disabled = true;
      startBtn.textContent = "Inizia il ripasso";
      return;
    }

    emptyEl.hidden = true;
    startBtn.disabled = false;
    startBtn.textContent = `Inizia il ripasso (${total})`;
    breakdownEl.innerHTML = topicKeys.map((k) => `
      <div class="ripasso-topic-row">
        <span class="topic-dot" style="background:${TOPICS[k].color}"></span>
        <span class="ripasso-topic-name">${escapeHtml(TOPICS[k].name)}</span>
        <span class="ripasso-topic-count">${counts[k]}</span>
      </div>`).join("");
  }

  /* ---------------------------------------------------------------- */
  /* Home screen setup                                                  */
  /* ---------------------------------------------------------------- */
  function topicsByArea(areaKey) {
    return Object.keys(TOPICS).filter((key) => TOPICS[key].area === areaKey);
  }

  function buildTopicRow(key) {
    const count = QUESTIONS.filter((q) => q.topic === key).length;
    const row = document.createElement("label");
    row.className = "topic-filter-row";
    row.innerHTML = `
      <input type="checkbox" value="${key}" checked>
      <span class="topic-dot" style="background:${TOPICS[key].color}"></span>
      <span class="topic-name">${TOPICS[key].name}</span>
      <span class="topic-qty">
        <input type="number" class="topic-qty-input" min="1" max="${count}" value="${count}" aria-label="Numero di domande da svolgere per ${TOPICS[key].name}">
        <span class="topic-count">/ ${count}</span>
      </span>
    `;
    const checkbox = row.querySelector('input[type="checkbox"]');
    const qtyInput = row.querySelector('input[type="number"]');
    // Clicking/typing in the quantity stepper must not toggle the row's
    // checkbox (the row is a <label> wrapping both controls).
    ["click", "mousedown"].forEach((evt) => qtyInput.addEventListener(evt, (e) => e.stopPropagation()));
    const syncQtyState = () => { qtyInput.disabled = !checkbox.checked; };
    checkbox.addEventListener("change", syncQtyState);
    syncQtyState();
    return row;
  }

  function buildTopicFilters() {
    const container = el("topicFilters");
    container.innerHTML = "";
    Object.keys(AREAS).forEach((areaKey) => {
      const group = document.createElement("div");
      group.className = "topic-area-group";
      const header = document.createElement("div");
      header.className = "topic-area-header";

      // Collapse/expand this subject's topic list, so long lists can be
      // tucked away without losing the checkbox selections underneath.
      const collapseBtn = document.createElement("button");
      collapseBtn.type = "button";
      collapseBtn.className = "topic-area-collapse";
      collapseBtn.setAttribute("aria-expanded", "true");
      collapseBtn.innerHTML = `<span>${AREAS[areaKey].icon} ${AREAS[areaKey].name}</span><span class="chevron">▾</span>`;

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "topic-area-toggle";
      header.appendChild(collapseBtn);
      header.appendChild(toggleBtn);
      group.appendChild(header);

      const body = document.createElement("div");
      body.className = "topic-area-body";

      const areaTopics = topicsByArea(areaKey);
      const units = SYLLABUS[areaKey];
      if (units) {
        // Group by official syllabus unit, in syllabus order; skip units with no questions yet.
        units.forEach((u) => {
          const unitTopics = areaTopics.filter((t) => TOPICS[t].unit === u.unit);
          if (unitTopics.length === 0) return;
          const unitHeader = document.createElement("div");
          unitHeader.className = "topic-unit-header";
          unitHeader.textContent = `Unità ${u.unit} · ${u.name}`;
          body.appendChild(unitHeader);
          unitTopics.forEach((key) => body.appendChild(buildTopicRow(key)));
        });
      } else {
        areaTopics.forEach((key) => body.appendChild(buildTopicRow(key)));
      }
      group.appendChild(body);
      container.appendChild(group);

      collapseBtn.addEventListener("click", () => {
        const expanded = collapseBtn.getAttribute("aria-expanded") === "true";
        collapseBtn.setAttribute("aria-expanded", String(!expanded));
        body.hidden = expanded;
      });

      // Select/deselect-all toggle for the whole subject block, so topics
      // can be added/removed in bulk without clicking each one.
      const groupCheckboxes = () => Array.from(body.querySelectorAll('input[type="checkbox"]'));
      const refreshToggleLabel = () => {
        const boxes = groupCheckboxes();
        const allChecked = boxes.length > 0 && boxes.every((b) => b.checked);
        toggleBtn.textContent = allChecked ? "Deseleziona tutto" : "Seleziona tutto";
      };
      toggleBtn.addEventListener("click", () => {
        const boxes = groupCheckboxes();
        const allChecked = boxes.length > 0 && boxes.every((b) => b.checked);
        boxes.forEach((b) => (b.checked = !allChecked));
        refreshToggleLabel();
      });
      groupCheckboxes().forEach((b) => b.addEventListener("change", refreshToggleLabel));
      refreshToggleLabel();
    });
  }

  // Returns one entry per checked topic: { key, count, total }, where count
  // is the (clamped) number of questions requested for that topic and total
  // is how many exist. Lets Study Mode do a partial run per topic instead of
  // always requiring every question of a selected topic.
  function selectedTopicCounts() {
    return Array.from(document.querySelectorAll("#topicFilters .topic-filter-row"))
      .map((row) => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) return null;
        const qtyInput = row.querySelector('input[type="number"]');
        const total = parseInt(qtyInput.max, 10) || 0;
        const count = Math.max(1, Math.min(total, parseInt(qtyInput.value, 10) || total));
        return { key: checkbox.value, count, total };
      })
      .filter(Boolean);
  }

  function buildExamAreaSelect() {
    const container = el("examAreaSelect");
    container.innerHTML = "";
    Object.keys(AREAS).forEach((areaKey, i) => {
      const id = `examArea_${areaKey}`;
      const label = document.createElement("label");
      label.className = "area-pill" + (i === 0 ? " is-checked" : "");
      label.setAttribute("for", id);
      label.innerHTML = `
        <input type="radio" name="examArea" id="${id}" value="${areaKey}" ${i === 0 ? "checked" : ""}>
        <span>${AREAS[areaKey].icon} ${AREAS[areaKey].name}</span>
      `;
      container.appendChild(label);
    });
    container.querySelectorAll('input[name="examArea"]').forEach((input) => {
      input.addEventListener("change", () => {
        container.querySelectorAll(".area-pill").forEach((p) => p.classList.remove("is-checked"));
        input.closest(".area-pill").classList.add("is-checked");
        buildMicroExamCustomizer();
      });
    });
  }

  function selectedExamArea() {
    const checked = document.querySelector('#examAreaSelect input[name="examArea"]:checked');
    return checked ? checked.value : Object.keys(AREAS)[0];
  }

  /* ---------------------------------------------------------------- */
  /* Starting a session                                                 */
  /* ---------------------------------------------------------------- */
  function startStudy() {
    const selections = selectedTopicCounts();
    if (selections.length === 0) { alert("Seleziona almeno un argomento."); return; }
    let pool = [];
    selections.forEach(({ key, count, total }) => {
      const topicQuestions = QUESTIONS.filter((q) => q.topic === key);
      pool = pool.concat(count >= total ? topicQuestions : shuffle(topicQuestions).slice(0, count));
    });
    if (el("shuffleStudy").checked) pool = shuffle(pool);
    state.mode = "study";
    state.queue = pool;
    state.index = 0;
    state.answers = [];
    state.locked = false;
    state.examEndAt = null;
    clearInterval(state.timerId);
    el("timerBox").hidden = true;
    showScreen("quiz");
    renderQuestion();
  }

  // Ripassa in ordine casuale tutte le domande attualmente "sbagliate"
  // (risposte errate in Studio, Esame o in un precedente Ripasso, non
  // ancora corrette di nuovo da allora), a prescindere dalla modalità in
  // cui erano state sbagliate.
  function startRipasso() {
    const stats = pruneWrongQuestions(loadStats());
    const byId = {};
    QUESTIONS.forEach((q) => (byId[q.id] = q));
    const pool = shuffle(Object.keys(stats.wrongQuestions).map((id) => byId[id]).filter(Boolean));
    if (pool.length === 0) { alert("Nessuna domanda da ripassare al momento."); return; }
    state.mode = "ripasso";
    state.queue = pool;
    state.index = 0;
    state.answers = [];
    state.locked = false;
    state.examEndAt = null;
    clearInterval(state.timerId);
    el("timerBox").hidden = true;
    showScreen("quiz");
    renderQuestion();
  }

  // Question counts, timer and passing threshold of the official exam format.
  // The micro exam threshold scales proportionally to this ratio (18/31) to
  // whatever custom length the person chooses.
  const EXAM_FORMAT = { mc: 21, fill: 10, minutes: 50, threshold: 18 };
  const microThreshold = (max) => Math.round((max * EXAM_FORMAT.threshold) / (EXAM_FORMAT.mc + EXAM_FORMAT.fill));

  function startExam() {
    const area = selectedExamArea();
    const areaTopics = topicsByArea(area);
    const areaQuestions = QUESTIONS.filter((q) => areaTopics.includes(q.topic));
    const mcPool = shuffle(areaQuestions.filter((q) => q.type === "mc"));
    const fillPool = shuffle(areaQuestions.filter((q) => q.type === "fill"));
    const mcPicked = mcPool.slice(0, EXAM_FORMAT.mc);
    const fillPicked = fillPool.slice(0, EXAM_FORMAT.fill);
    state.mode = "exam";
    state.examArea = area;
    state.examMicro = false;
    state.queue = shuffle(mcPicked.concat(fillPicked));
    state.index = 0;
    state.answers = [];
    state.locked = false;
    state.examEndAt = Date.now() + EXAM_FORMAT.minutes * 60000;
    refreshSecondsLeft();
    el("timerBox").hidden = false;
    updateTimerDisplay();
    clearInterval(state.timerId);
    state.timerId = setInterval(tickTimer, 1000);
    showScreen("quiz");
    renderQuestion();
  }

  // Micro esame personalizzabile: la persona sceglie quante domande casuali
  // includere per ciascuna materia e i minuti a disposizione. Di default i
  // campi sono impostati su metà dell'esame simulato ufficiale (16 domande
  // dalla materia correntemente selezionata, 25 minuti).
  function buildMicroExamCustomizer() {
    const container = el("microCustomizer");
    container.innerHTML = "";
    const defaultArea = selectedExamArea();
    Object.keys(AREAS).forEach((areaKey) => {
      const available = QUESTIONS.filter((q) => topicsByArea(areaKey).includes(q.topic)).length;
      const defaultValue = areaKey === defaultArea ? Math.min(16, available) : 0;
      const row = document.createElement("div");
      row.className = "micro-row";
      row.innerHTML = `
        <label for="microCount_${areaKey}">${AREAS[areaKey].icon} ${AREAS[areaKey].name}</label>
        <input type="number" id="microCount_${areaKey}" min="0" max="${available}" value="${defaultValue}">
        <span class="micro-max">/ ${available} disponibili</span>
      `;
      container.appendChild(row);
      row.querySelector("input").addEventListener("input", updateMicroTotal);
    });
    updateMicroTotal();
  }

  function updateMicroTotal() {
    const total = Object.keys(AREAS).reduce((sum, areaKey) => {
      const input = el(`microCount_${areaKey}`);
      return sum + (input ? Math.max(0, parseInt(input.value, 10) || 0) : 0);
    }, 0);
    el("microTotal").textContent = `Totale: ${total} domand${total === 1 ? "a" : "e"}`;
  }

  function startExamMicro() {
    const counts = {};
    let total = 0;
    Object.keys(AREAS).forEach((areaKey) => {
      const input = el(`microCount_${areaKey}`);
      const max = parseInt(input.max, 10) || 0;
      const requested = Math.max(0, Math.min(max, parseInt(input.value, 10) || 0));
      input.value = requested;
      counts[areaKey] = requested;
      total += requested;
    });
    if (total === 0) { alert("Scegli almeno una domanda, per almeno una materia."); return; }
    updateMicroTotal();

    const minutesInput = el("microMinutes");
    const minutes = Math.max(1, parseInt(minutesInput.value, 10) || 25);
    minutesInput.value = minutes;

    let queue = [];
    Object.keys(counts).forEach((areaKey) => {
      if (counts[areaKey] <= 0) return;
      const pool = shuffle(QUESTIONS.filter((q) => topicsByArea(areaKey).includes(q.topic)));
      queue = queue.concat(pool.slice(0, counts[areaKey]));
    });

    state.mode = "exam";
    state.examArea = null;
    state.examMicro = true;
    state.queue = shuffle(queue);
    state.index = 0;
    state.answers = [];
    state.locked = false;
    state.examEndAt = Date.now() + minutes * 60000;
    refreshSecondsLeft();
    el("timerBox").hidden = false;
    updateTimerDisplay();
    clearInterval(state.timerId);
    state.timerId = setInterval(tickTimer, 1000);
    showScreen("quiz");
    renderQuestion();
  }

  // Il tempo residuo si ricalcola sempre dall'istante assoluto di scadenza
  // (state.examEndAt), non da un contatore decrementato: così il tempo
  // trascorso rimane corretto anche riprendendo una prova dopo aver chiuso
  // la scheda o il browser, esattamente come in una prova cronometrata vera.
  function refreshSecondsLeft() {
    state.secondsLeft = Math.max(0, Math.round((state.examEndAt - Date.now()) / 1000));
  }
  function tickTimer() {
    refreshSecondsLeft();
    updateTimerDisplay();
    if (state.secondsLeft <= 0) {
      clearInterval(state.timerId);
      finishSession(true);
    }
  }
  function updateTimerDisplay() {
    const m = Math.floor(state.secondsLeft / 60);
    const s = state.secondsLeft % 60;
    el("timerText").textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    el("timerBox").classList.toggle("low", state.secondsLeft <= 120);
  }

  /* ---------------------------------------------------------------- */
  /* Rendering a question                                              */
  /* ---------------------------------------------------------------- */
  function renderQuestion() {
    state.locked = false;
    state.pendingMc = null;
    const q = state.queue[state.index];
    const total = state.queue.length;

    el("quizModeLabel").textContent = state.mode === "exam"
      ? (state.examMicro ? "Micro esame personalizzato" : `Esame simulato · ${AREAS[state.examArea].icon} ${AREAS[state.examArea].name}`)
      : state.mode === "ripasso" ? "Modalità ripasso" : "Modalità studio";
    el("quizCounter").textContent = `Domanda ${state.index + 1} di ${total}`;
    el("progressFill").style.width = `${(state.index / total) * 100}%`;

    const badge = el("qTopicBadge");
    const areaInfo = AREAS[TOPICS[q.topic].area];
    badge.textContent = `${areaInfo.icon} ${TOPICS[q.topic].name}` + (q.type === "fill" ? " · Completamento" : " · Risposta multipla");
    badge.style.color = TOPICS[q.topic].color;

    el("qText").innerHTML = escapeHtml(q.q);
    renderMath(el("qText"));
    el("feedback").hidden = true;
    el("feedback").innerHTML = "";
    // In exam mode, questions may be left blank (omitted), so "Avanti" stays enabled;
    // in study/ripasso mode an answer is required before moving on.
    el("btnNext").disabled = state.mode !== "exam";
    el("btnNext").textContent = state.index === total - 1 ? "Termina →" : "Avanti →";

    const mcBox = el("mcOptions");
    const fillBox = el("fillOptions");

    if (q.type === "mc") {
      fillBox.hidden = true;
      mcBox.hidden = false;
      mcBox.innerHTML = "";
      q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "mc-option";
        div.innerHTML = `<span class="letter">${letterFor(i)}</span><span>${escapeHtml(opt)}</span>`;
        div.addEventListener("click", () => selectMc(i));
        mcBox.appendChild(div);
      });
      renderMath(mcBox);
      el("mcHint").hidden = false;
      const confirmBtn = el("btnConfirmMc");
      confirmBtn.hidden = false;
      confirmBtn.disabled = true;
    } else {
      mcBox.hidden = true;
      el("mcHint").hidden = true;
      el("btnConfirmMc").hidden = true;
      fillBox.hidden = false;
      const input = el("fillInput");
      input.value = "";
      input.className = "fill-input";
      input.disabled = false;
      input.focus();
      input.onkeydown = (e) => { if (e.key === "Enter") submitFill(); };
      el("btnConfirmFill").hidden = false;
      el("btnConfirmFill").disabled = false;
    }

    saveInProgress();
  }

  /* Click on an option only selects it tentatively — it can be changed freely
     until confirmMc() is called (via the confirm button or the Enter key). */
  function selectMc(i) {
    if (state.locked) return;
    state.pendingMc = i;
    document.querySelectorAll("#mcOptions .mc-option").forEach((o, idx) => {
      o.classList.toggle("selected", idx === i);
    });
    el("btnConfirmMc").disabled = false;
  }

  function confirmMc() {
    if (state.locked || state.pendingMc == null) return;
    const i = state.pendingMc;
    const q = state.queue[state.index];
    const isCorrect = i === q.correct;
    commitAnswer(q, letterFor(i), isCorrect);

    const opts = document.querySelectorAll("#mcOptions .mc-option");
    opts.forEach((o, idx) => {
      o.classList.remove("selected");
      o.classList.add("disabled");
      if (state.mode !== "exam") {
        if (idx === q.correct) o.classList.add("correct");
        else if (idx === i) o.classList.add("wrong");
      } else if (idx === i) {
        o.classList.add("selected");
      }
    });
    el("btnConfirmMc").hidden = true;
    el("mcHint").hidden = true;

    if (state.mode !== "exam") showFeedback(isCorrect, q);
    finalizeLock();
  }

  function submitFill() {
    if (state.locked) return;
    const q = state.queue[state.index];
    const input = el("fillInput");
    const given = input.value.trim();
    if (!given) { input.focus(); return; }
    const isCorrect = checkFillAnswer(q, given);
    commitAnswer(q, given, isCorrect);
    input.disabled = true;
    el("btnConfirmFill").hidden = true;
    if (state.mode !== "exam") {
      input.classList.add(isCorrect ? "correct" : "wrong");
      showFeedback(isCorrect, q);
    }
    finalizeLock();
  }

  function commitAnswer(q, given, isCorrect) {
    state.answers.push({ qid: q.id, topic: q.topic, given, correct: isCorrect, skipped: false });
    if (state.mode === "study" || state.mode === "ripasso") recordStudyAnswer(q.topic, isCorrect);
    updateWrongTracking(q, isCorrect);
    saveInProgress();
  }

  function showFeedback(isCorrect, q) {
    const fb = el("feedback");
    fb.hidden = false;
    fb.className = "feedback " + (isCorrect ? "correct" : "wrong");
    const correctText = q.type === "mc" ? `${letterFor(q.correct)}) ${q.options[q.correct]}` : q.answer;
    let html = isCorrect ? "✅ Corretto!" : `❌ Sbagliato. Risposta corretta: <span class="correct-answer">${escapeHtml(correctText)}</span>`;
    if (q.explain) html += `<span class="explain">${escapeHtml(q.explain)}</span>`;
    fb.innerHTML = html;
    renderMath(fb);
  }

  function finalizeLock() {
    state.locked = true;
    el("btnNext").disabled = false;
  }

  /* skip current question without answering (used when exam time runs out, or user clicks next without answering in exam mode is not allowed — must click Next only after forced skip) */
  function skipCurrent() {
    const q = state.queue[state.index];
    state.answers.push({ qid: q.id, topic: q.topic, given: null, correct: false, skipped: true });
  }

  function goNext() {
    if (!state.locked) {
      // In exam mode, allow moving on without answering (counts as omitted)
      if (state.mode === "exam") {
        skipCurrent();
      } else {
        return; // study mode requires an answer first
      }
    }
    if (state.index < state.queue.length - 1) {
      state.index++;
      renderQuestion();
    } else {
      finishSession(false);
    }
  }

  // Interrompere non fa perdere nulla: la sessione (studio o esame) è già
  // salvata in automatico dopo ogni domanda/risposta e resta ripristinabile
  // dalla home tramite il pulsante "Riprendi", finché non la si porta a
  // termine o non la si scarta esplicitamente.
  function quitSession() {
    saveInProgress();
    clearInterval(state.timerId);
    showScreen("home");
    renderStats();
    renderResumeCard();
  }

  /* ---------------------------------------------------------------- */
  /* Results                                                            */
  /* ---------------------------------------------------------------- */
  function finishSession(timeUp) {
    clearInterval(state.timerId);
    clearInProgress();
    el("progressFill").style.width = "100%";

    if (state.mode === "exam") {
      renderExamResults(timeUp);
    } else {
      renderStudyResults();
    }
    showScreen("results");
    renderStats();
  }

  function renderStudyResults() {
    const total = state.answers.length;
    const correct = state.answers.filter((a) => a.correct).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const title = state.mode === "ripasso" ? "Sessione di ripasso completata" : "Sessione di studio completata";

    el("resultsSummary").innerHTML = `
      <h2>${title}</h2>
      <div class="score-big">${correct}/${total}</div>
      <div class="score-verdict ${pct >= 60 ? "pass" : "fail"}">${pct}% di risposte corrette</div>
    `;

    el("resultsBreakdown").innerHTML = breakdownHtml();
    el("resultsReview").innerHTML = reviewHtml(true);
    renderMath(el("resultsReview"));
  }

  function renderExamResults(timeUp) {
    // Official scoring: +1 correct, -0.1 wrong, 0 omitted. Max = number of questions
    // (31 per l'esame completo, 16 per il micro esame, metà arrotondata).
    let score = 0;
    state.answers.forEach((a) => {
      if (a.skipped) score += 0;
      else score += a.correct ? 1 : -0.1;
    });
    score = Math.max(0, score);
    const max = state.queue.length;
    const threshold = state.examMicro ? microThreshold(max) : EXAM_FORMAT.threshold;
    const passed = score >= threshold;
    const verdictText = passed ? `Superato ✅ (soglia ${threshold}/${max})` : `Non superato ❌ (soglia ${threshold}/${max})`;
    const title = state.examMicro ? "Micro esame completato" : "Esame simulato completato";

    el("resultsSummary").innerHTML = `
      <h2>${timeUp ? "⏰ Tempo scaduto — " : ""}${title}</h2>
      <div class="score-big">${score.toFixed(1)} <span style="font-size:1.2rem;color:var(--text-muted)">/ ${max}</span></div>
      <div class="score-verdict ${passed ? "pass" : "fail"}">${verdictText}</div>
      <p class="score-detail">Punteggio calcolato con le regole ufficiali: +1 risposta corretta, −0,1 risposta errata, 0 risposta omessa.</p>
    `;

    el("resultsBreakdown").innerHTML = breakdownHtml();
    el("resultsReview").innerHTML = reviewHtml(false);
    renderMath(el("resultsReview"));

    recordExamResult(score, max, passed, state.examArea, state.examMicro);
  }

  function breakdownHtml() {
    let html = "<h2>Risultato per argomento</h2>";
    Object.keys(TOPICS).forEach((t) => {
      const subset = state.answers.filter((a) => a.topic === t);
      if (subset.length === 0) return;
      const correct = subset.filter((a) => a.correct).length;
      const pct = Math.round((correct / subset.length) * 100);
      html += `
        <div class="breakdown-row">
          <span class="name">${AREAS[TOPICS[t].area].icon} ${TOPICS[t].name}</span>
          <span class="breakdown-bar"><span class="breakdown-fill" style="width:${pct}%;background:${TOPICS[t].color}"></span></span>
          <span class="frac">${correct}/${subset.length}</span>
        </div>`;
    });
    return html;
  }

  function reviewHtml(onlyWrong) {
    const byId = {};
    QUESTIONS.forEach((q) => (byId[q.id] = q));
    const items = state.answers.filter((a) => !a.correct);
    if (items.length === 0) {
      return "<h2>Revisione</h2><p style='color:var(--text-muted)'>Nessun errore o domanda omessa: ottimo lavoro! 🎉</p>";
    }
    let html = "<h2>Revisione domande sbagliate/omesse</h2>";
    items.forEach((a) => {
      const q = byId[a.qid];
      const correctText = q.type === "mc" ? `${letterFor(q.correct)}) ${q.options[q.correct]}` : q.answer;
      const tag = a.skipped ? `<span class="review-tag omitted">OMESSA</span>` : `<span class="review-tag wrong">ERRATA</span>`;
      const givenText = a.skipped ? "" : `<br>La tua risposta: <b class="your-wrong">${escapeHtml(a.given)}</b>`;
      html += `
        <div class="review-item">
          <div class="rq">${tag}${escapeHtml(q.q)}</div>
          <div class="ra">${givenText}<br>Risposta corretta: <b class="correct-ans">${escapeHtml(correctText)}</b>${q.explain ? `<br><em>${escapeHtml(q.explain)}</em>` : ""}</div>
        </div>`;
    });
    return html;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---------------------------------------------------------------- */
  /* Wiring                                                             */
  /* ---------------------------------------------------------------- */
  function init() {
    buildTopicFilters();
    buildExamAreaSelect();
    buildMicroExamCustomizer();
    renderStats();
    renderResumeCard();

    el("resumeBtn").addEventListener("click", resumeSession);
    el("discardResumeBtn").addEventListener("click", () => {
      if (!confirm("Scartare l'esercitazione interrotta? Le risposte già date in questa sessione andranno perse (le statistiche di studio già registrate restano invece salvate).")) return;
      clearInProgress();
      renderResumeCard();
    });

    el("rulesToggle").addEventListener("click", () => {
      const body = el("rulesBody");
      const btn = el("rulesToggle");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
    });

    el("syllabusToggle").addEventListener("click", () => {
      const body = el("syllabusBody");
      const btn = el("syllabusToggle");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
    });

    el("startStudy").addEventListener("click", startStudy);
    el("startExam").addEventListener("click", startExam);
    el("startExamMicro").addEventListener("click", startExamMicro);
    el("startRipasso").addEventListener("click", startRipasso);
    el("microToggle").addEventListener("click", () => {
      const body = el("microBody");
      const btn = el("microToggle");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
    });
    el("btnQuit").addEventListener("click", quitSession);
    el("btnNext").addEventListener("click", goNext);
    el("btnConfirmFill").addEventListener("click", submitFill);
    el("btnConfirmMc").addEventListener("click", confirmMc);

    // Enter confirms the tentatively selected MC option (fill-in questions already
    // confirm on Enter via their own input listener, set up in renderQuestion).
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      if (screens.quiz.hidden) return;
      const q = state.queue[state.index];
      if (!q || q.type !== "mc" || state.locked || state.pendingMc == null) return;
      e.preventDefault();
      confirmMc();
    });
    el("btnRestart").addEventListener("click", () => { showScreen("home"); renderStats(); });
    el("statsToggle").addEventListener("click", () => {
      const body = el("statsBodyWrap");
      const btn = el("statsToggle");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
    });
    el("resetStats").addEventListener("click", () => {
      if (confirm("Azzerare tutte le statistiche salvate su questo dispositivo?")) {
        localStorage.removeItem(STORAGE_KEY);
        renderStats();
      }
    });

    el("syncToggle").addEventListener("click", () => {
      const body = el("syncBody");
      const btn = el("syncToggle");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
    });

    el("syncGenerate").addEventListener("click", () => {
      const code = encodeSyncCode(loadStats());
      el("syncCode").value = code;
      el("syncGenerateResult").hidden = false;
      el("syncCopyStatus").textContent = "";
    });

    el("syncCopy").addEventListener("click", async () => {
      const field = el("syncCode");
      field.select();
      let copied = false;
      try {
        await navigator.clipboard.writeText(field.value);
        copied = true;
      } catch (e) {
        try { copied = document.execCommand("copy"); } catch (e2) { copied = false; }
      }
      el("syncCopyStatus").textContent = copied ? "Copiato negli appunti ✅" : "Copia non riuscita: seleziona e copia manualmente.";
    });

    el("syncImport").addEventListener("click", () => {
      const statusEl = el("syncImportStatus");
      const raw = el("syncImportInput").value;
      let incoming;
      try {
        incoming = decodeSyncCode(raw);
      } catch (e) {
        statusEl.textContent = "❌ " + e.message;
        statusEl.className = "sync-status sync-status-error";
        return;
      }
      const current = loadStats();
      const summary = `Il codice contiene ${incoming.studyTotal} risposte in modalità studio e ${incoming.examHistory.length} esami registrati. ` +
        `I progressi attuali su questo dispositivo (${current.studyTotal} risposte, ${current.examHistory.length} esami) verranno sostituiti. Continuare?`;
      if (!confirm(summary)) return;
      saveStats(incoming);
      renderStats();
      statusEl.textContent = "✅ Progressi importati con successo.";
      statusEl.className = "sync-status sync-status-ok";
      el("syncImportInput").value = "";
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
