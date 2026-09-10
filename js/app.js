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
    pendingMc: null       // index of the tentatively selected (not yet confirmed) MC option
  };

  const STORAGE_KEY = "webquiz_semestrefiltro_stats_v1";

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
    return { studyCorrect: 0, studyTotal: 0, examHistory: [], byTopic: {} };
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
    saveStats(stats);
  }
  function recordExamResult(score, max, passed) {
    const stats = loadStats();
    stats.examHistory.push({ score, max, passed, date: new Date().toISOString() });
    if (stats.examHistory.length > 20) stats.examHistory.shift();
    saveStats(stats);
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
      header.innerHTML = `<span>${AREAS[areaKey].icon} ${AREAS[areaKey].name}</span>`;
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

    recordExamResult(score, max, passed);
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
    el("btnRestart").addEventListener("click", () => { showScreen("home"); renderStats(); });
    el("resetStats").addEventListener("click", () => {
      if (confirm("Azzerare tutte le statistiche salvate su questo dispositivo?")) {
        localStorage.removeItem(STORAGE_KEY);
        renderStats();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
