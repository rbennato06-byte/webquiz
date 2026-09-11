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
    locked: false,       // true once the current question's answer has been confirmed
    pendingMc: null,      // index of the tentatively selected (not yet confirmed) MC option
    examArea: null,       // area selected for the current/last exam session
    calView: null,        // { year, month } currently displayed in the progress calendar (month: 0-11)
    calSelectedDay: null   // "YYYY-MM-DD" of the day currently shown in the calendar detail panel
  };

  const STORAGE_KEY = "webquiz_semestrefiltro_stats_v1";

  /* ---------------------------------------------------------------- */
  /* Calendario A.K. (After Kirk): stesso calendario di sempre, solo    */
  /* l'anno è ricontato a partire dal giorno di lancio del sito,        */
  /* in onore di Kirk, che ha aiutato a svilupparlo. Anno 1 A.K. =      */
  /* anno solare di lancio; il confine tra un anno e l'altro resta il  */
  /* 1° gennaio, come nel calendario normale.                          */
  /* ---------------------------------------------------------------- */
  const AK_EPOCH_YEAR = 2026;
  const MONTH_NAMES_IT = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const WEEKDAY_NAMES_IT = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

  function akYear(gregorianYear) { return gregorianYear - AK_EPOCH_YEAR + 1; }

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
    return { studyCorrect: 0, studyTotal: 0, examHistory: [], byTopic: {}, dailyLog: {} };
  }
  function saveStats(stats) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); } catch (e) { /* ignore */ }
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
  function recordExamResult(score, max, passed, area) {
    const stats = loadStats();
    stats.examHistory.push({ score, max, passed, area: area || "", date: new Date().toISOString() });
    if (stats.examHistory.length > 20) stats.examHistory.shift();
    saveStats(stats);
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
        return `${scoreX10.toString(36)}:${h.max.toString(36)}:${h.passed ? 1 : 0}:${dateSec.toString(36)}:${h.area || ""}`;
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
          const [scoreX10, max, passed, dateSec, area] = entry.split(":");
          stats.examHistory.push({
            score: (parseInt(scoreX10, 36) || 0) / 10,
            max: parseInt(max, 36) || 0,
            passed: passed === "1",
            area: area || "",
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
            date: new Date((parseInt(dateSec, 36) || 0) * 1000).toISOString()
          });
        });
      }

      return stats;
    }

    throw new Error("Formato del codice non riconosciuto.");
  }

  function renderStats() {
    const stats = loadStats();
    buildSyllabusProgress(stats);

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
      html += `<div class="stat-row"><span>Ultimo esame simulato</span><b>${last.score.toFixed(1)}/${last.max} — ${last.passed ? "Superato ✅" : "Non superato ❌"}</b></div>`;
      const best = stats.examHistory.reduce((m, h) => (h.score > m ? h.score : m), -Infinity);
      html += `<div class="stat-row"><span>Miglior punteggio esame</span><b>${best.toFixed(1)}/${last.max}</b></div>`;
    }
    body.innerHTML = html;
  }

  /* ---------------------------------------------------------------- */
  /* Calendario dei progressi (datazione A.K.)                         */
  /* ---------------------------------------------------------------- */
  function examAreaIcon(areaKey) {
    return areaKey && AREAS[areaKey] ? AREAS[areaKey].icon : "📝";
  }

  function renderProgressCalendar() {
    if (!state.calView) {
      const now = new Date();
      state.calView = { year: now.getFullYear(), month: now.getMonth() };
    }
    const stats = loadStats();
    const { year, month } = state.calView;

    el("calLabel").textContent = `${MONTH_NAMES_IT[month]} — Anno ${akYear(year)} A.K.`;

    const isAtEpoch = year < AK_EPOCH_YEAR || (year === AK_EPOCH_YEAR && month <= 8); // 8 = settembre (0-indicizzato)
    el("calPrev").disabled = isAtEpoch;

    const examsByDay = {};
    stats.examHistory.forEach((h) => {
      const key = dateKeyFromDate(new Date(h.date));
      if (!examsByDay[key]) examsByDay[key] = [];
      examsByDay[key].push(h);
    });

    const firstOfMonth = new Date(year, month, 1);
    const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Lun=0 ... Dom=6
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = todayKey();
    const now = new Date();

    let cells = "";
    for (let i = 0; i < startWeekday; i++) cells += `<span class="cal-cell cal-empty"></span>`;
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const key = dateKeyFromDate(dateObj);
      const dayLog = stats.dailyLog[key];
      let studyTotal = 0;
      if (dayLog) Object.values(dayLog).forEach((t) => (studyTotal += t.total));
      const exams = examsByDay[key] || [];
      const hasActivity = studyTotal > 0 || exams.length > 0;
      const isFuture = dateObj > now;
      const level = studyTotal >= 30 ? 4 : studyTotal >= 15 ? 3 : studyTotal >= 5 ? 2 : studyTotal > 0 ? 1 : 0;
      const classes = ["cal-cell", `cal-level-${level}`];
      if (key === todayStr) classes.push("cal-today");
      if (hasActivity) classes.push("cal-has-activity");
      if (key === state.calSelectedDay) classes.push("cal-selected");
      cells += `<button type="button" class="${classes.join(" ")}" data-day="${key}" ${isFuture ? "disabled" : ""}>
        <span class="cal-daynum">${day}</span>${exams.length ? `<span class="cal-exam-dot" title="Esame sostenuto"></span>` : ""}
      </button>`;
    }
    el("calGrid").innerHTML = cells;

    if (state.calSelectedDay) renderCalDayDetail(state.calSelectedDay);
  }

  function renderCalDayDetail(dayKey) {
    const stats = loadStats();
    const [y, m, d] = dayKey.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const weekday = WEEKDAY_NAMES_IT[(dateObj.getDay() + 6) % 7];
    const label = `${weekday} ${d} ${MONTH_NAMES_IT[m - 1].toLowerCase()} — Anno ${akYear(y)} A.K.`;

    const dayLog = stats.dailyLog[dayKey] || {};
    const topicKeys = Object.keys(dayLog).filter((k) => TOPICS[k] && dayLog[k].total > 0);
    const exams = stats.examHistory.filter((h) => dateKeyFromDate(new Date(h.date)) === dayKey);

    let html = `<h3>${label}</h3>`;
    if (topicKeys.length === 0 && exams.length === 0) {
      html += `<p class="cal-empty-note">Nessuna attività registrata in questo giorno.</p>`;
    } else {
      if (topicKeys.length > 0) {
        html += `<div class="cal-day-section-title">Modalità Studio</div>`;
        topicKeys.forEach((k) => {
          const t = TOPICS[k];
          const d2 = dayLog[k];
          const pct = Math.round((d2.correct / d2.total) * 100);
          html += `<div class="stat-row"><span>${AREAS[t.area].icon} ${escapeHtml(t.name)}</span><b>${d2.correct}/${d2.total} (${pct}%)</b></div>`;
        });
      }
      if (exams.length > 0) {
        html += `<div class="cal-day-section-title">Esami simulati</div>`;
        exams.forEach((h) => {
          html += `<div class="stat-row"><span>${examAreaIcon(h.area)} ${h.area && AREAS[h.area] ? AREAS[h.area].name : "Esame"}</span><b>${h.score.toFixed(1)}/${h.max} — ${h.passed ? "Superato ✅" : "Non superato ❌"}</b></div>`;
        });
      }
    }
    el("calDayDetail").innerHTML = html;
    el("calDayDetail").hidden = false;
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
      <span>${TOPICS[key].name}</span>
      <span class="topic-count">${count} domande</span>
    `;
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
      const headerLabel = document.createElement("span");
      headerLabel.textContent = `${AREAS[areaKey].icon} ${AREAS[areaKey].name}`;
      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "topic-area-toggle";
      header.appendChild(headerLabel);
      header.appendChild(toggleBtn);
      group.appendChild(header);

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
          group.appendChild(unitHeader);
          unitTopics.forEach((key) => group.appendChild(buildTopicRow(key)));
        });
      } else {
        areaTopics.forEach((key) => group.appendChild(buildTopicRow(key)));
      }
      container.appendChild(group);

      // Select/deselect-all toggle for the whole subject block, so topics
      // can be added/removed in bulk without clicking each one.
      const groupCheckboxes = () => Array.from(group.querySelectorAll('input[type="checkbox"]'));
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

  function selectedTopics() {
    return Array.from(document.querySelectorAll('#topicFilters input[type="checkbox"]:checked')).map((i) => i.value);
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
    const topics = selectedTopics();
    if (topics.length === 0) { alert("Seleziona almeno un argomento."); return; }
    let pool = QUESTIONS.filter((q) => topics.includes(q.topic));
    if (el("shuffleStudy").checked) pool = shuffle(pool);
    state.mode = "study";
    state.queue = pool;
    state.index = 0;
    state.answers = [];
    state.locked = false;
    el("timerBox").hidden = true;
    showScreen("quiz");
    renderQuestion();
  }

  function startExam() {
    const area = selectedExamArea();
    const areaTopics = topicsByArea(area);
    const areaQuestions = QUESTIONS.filter((q) => areaTopics.includes(q.topic));
    const mcPool = shuffle(areaQuestions.filter((q) => q.type === "mc"));
    const fillPool = shuffle(areaQuestions.filter((q) => q.type === "fill"));
    const mcPicked = mcPool.slice(0, 21);
    const fillPicked = fillPool.slice(0, 10);
    state.mode = "exam";
    state.examArea = area;
    state.queue = shuffle(mcPicked.concat(fillPicked));
    state.index = 0;
    state.answers = [];
    state.locked = false;
    state.secondsLeft = 50 * 60;
    el("timerBox").hidden = false;
    updateTimerDisplay();
    clearInterval(state.timerId);
    state.timerId = setInterval(tickTimer, 1000);
    showScreen("quiz");
    renderQuestion();
  }

  function tickTimer() {
    state.secondsLeft--;
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
      ? `Esame simulato · ${AREAS[state.examArea].icon} ${AREAS[state.examArea].name}`
      : "Modalità studio";
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
    // in study mode an answer is required before moving on.
    el("btnNext").disabled = state.mode === "study";
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
      if (state.mode === "study") {
        if (idx === q.correct) o.classList.add("correct");
        else if (idx === i) o.classList.add("wrong");
      } else if (idx === i) {
        o.classList.add("selected");
      }
    });
    el("btnConfirmMc").hidden = true;
    el("mcHint").hidden = true;

    if (state.mode === "study") showFeedback(isCorrect, q);
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
    if (state.mode === "study") {
      input.classList.add(isCorrect ? "correct" : "wrong");
      showFeedback(isCorrect, q);
    }
    finalizeLock();
  }

  function commitAnswer(q, given, isCorrect) {
    state.answers.push({ qid: q.id, topic: q.topic, given, correct: isCorrect, skipped: false });
    if (state.mode === "study") recordStudyAnswer(q.topic, isCorrect);
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

  function quitSession() {
    if (state.queue.length && !confirm("Interrompere la sessione corrente? I progressi di questa sessione andranno persi.")) return;
    clearInterval(state.timerId);
    showScreen("home");
    renderStats();
  }

  /* ---------------------------------------------------------------- */
  /* Results                                                            */
  /* ---------------------------------------------------------------- */
  function finishSession(timeUp) {
    clearInterval(state.timerId);
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

    el("resultsSummary").innerHTML = `
      <h2>Sessione di studio completata</h2>
      <div class="score-big">${correct}/${total}</div>
      <div class="score-verdict ${pct >= 60 ? "pass" : "fail"}">${pct}% di risposte corrette</div>
    `;

    el("resultsBreakdown").innerHTML = breakdownHtml();
    el("resultsReview").innerHTML = reviewHtml(true);
    renderMath(el("resultsReview"));
  }

  function renderExamResults(timeUp) {
    // Official scoring: +1 correct, -0.1 wrong, 0 omitted. Max = number of questions (31).
    let score = 0;
    state.answers.forEach((a) => {
      if (a.skipped) score += 0;
      else score += a.correct ? 1 : -0.1;
    });
    score = Math.max(0, score);
    const max = state.queue.length;
    const passed = score >= 18;
    const verdictText = passed ? `Superato ✅ (soglia 18/${max})` : `Non superato ❌ (soglia 18/${max})`;

    el("resultsSummary").innerHTML = `
      <h2>${timeUp ? "⏰ Tempo scaduto — " : ""}Esame simulato completato</h2>
      <div class="score-big">${score.toFixed(1)} <span style="font-size:1.2rem;color:var(--text-muted)">/ ${max}</span></div>
      <div class="score-verdict ${passed ? "pass" : "fail"}">${verdictText}</div>
      <p class="score-detail">Punteggio calcolato con le regole ufficiali: +1 risposta corretta, −0,1 risposta errata, 0 risposta omessa.</p>
    `;

    el("resultsBreakdown").innerHTML = breakdownHtml();
    el("resultsReview").innerHTML = reviewHtml(false);
    renderMath(el("resultsReview"));

    recordExamResult(score, max, passed, state.examArea);
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
    renderStats();
    renderProgressCalendar();

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
    el("btnRestart").addEventListener("click", () => { showScreen("home"); renderStats(); renderProgressCalendar(); });
    el("resetStats").addEventListener("click", () => {
      if (confirm("Azzerare tutte le statistiche salvate su questo dispositivo?")) {
        localStorage.removeItem(STORAGE_KEY);
        renderStats();
        state.calSelectedDay = null;
        el("calDayDetail").hidden = true;
        renderProgressCalendar();
      }
    });

    el("calToggle").addEventListener("click", () => {
      const body = el("calBody");
      const btn = el("calToggle");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
    });
    el("calPrev").addEventListener("click", () => {
      state.calView.month--;
      if (state.calView.month < 0) { state.calView.month = 11; state.calView.year--; }
      renderProgressCalendar();
    });
    el("calNext").addEventListener("click", () => {
      state.calView.month++;
      if (state.calView.month > 11) { state.calView.month = 0; state.calView.year++; }
      renderProgressCalendar();
    });
    el("calToday").addEventListener("click", () => {
      const now = new Date();
      state.calView = { year: now.getFullYear(), month: now.getMonth() };
      renderProgressCalendar();
    });
    el("calGrid").addEventListener("click", (e) => {
      const btn = e.target.closest(".cal-cell[data-day]");
      if (!btn || btn.disabled) return;
      state.calSelectedDay = btn.dataset.day;
      renderProgressCalendar();
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
      state.calSelectedDay = null;
      el("calDayDetail").hidden = true;
      renderProgressCalendar();
      statusEl.textContent = "✅ Progressi importati con successo.";
      statusEl.className = "sync-status sync-status-ok";
      el("syncImportInput").value = "";
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
