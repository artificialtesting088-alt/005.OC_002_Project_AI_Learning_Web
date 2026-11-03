const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const toast = $('#toast');
let toastTimer;

const store = {
  get: (k, fallback) => {
    try { return JSON.parse(localStorage.getItem(k)) ?? fallback; }
    catch { return fallback; }
  },
  set: (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  }
};

const settings = () => store.get('ailearn-settings', {});

function beep() {
  if (!settings().sound) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch {}
}

function showToast(msg) {
  toast.innerHTML = msg;
  toast.classList.add('show');
  beep();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function actionMsg(label) {
  if (/trailer/i.test(label)) return '✦ Trailer sedang disiapkan, tunggu kabarnya!';
  if (/baca/i.test(label)) return `✦ Artikel <span class="t-sp">${esc(label.replace(/^Baca:\s*/i, ''))}</span> segera tayang`;
  if (/kelas|modul/i.test(label)) return '✦ Materi lengkap kelasku segera hadir';
  if (/quiz/i.test(label)) return '✦ Soal berikutnya segera hadir';
  if (/project/i.test(label)) return '✦ Brief project segera dibuka';
  if (/daftar|event/i.test(label)) return '✦ Sampai jumpa di Meetup #12!';
  return `✦ <span class="t-sp">${esc(label)}</span>`;
}

const sidebar = $('#sidebar');
const overlay = $('#sidebarOverlay');
function setSidebar(open) {
  sidebar.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
}
$('#burger').addEventListener('click', () => setSidebar(true));
overlay.addEventListener('click', () => setSidebar(false));

const TITLES = {
  beranda: null,
  kelas: 'Kelas',
  jelajah: 'Jelajah AI',
  komunitas: 'Komunitas',
  tantangan: 'Tantangan',
  achievement: 'Achievement',
  catatan: 'Catatan',
  pengaturan: 'Pengaturan',
  kursus: 'Kursus',
  modul: 'Materi Modul',
  artikel: 'Bacaan',
  quiz: 'Quiz Harian'
};

function routeTo(name) {
  $$('.page').forEach(p => { p.hidden = true; });
  const el = $('#pg-' + name);
  if (el) el.hidden = false;
  $$('.nav-item').forEach(n => n.classList.toggle('is-active', n.dataset.route === name));
  document.title = 'AI Learn — Belajar AI Untuk Dunia yang Lebih Baik' + (TITLES[name] ? ' · ' + TITLES[name] : '');
  window.scrollTo({ top: 0 });
}

$$('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    routeTo(item.dataset.route);
    setSidebar(false);
  });
});

function bindDropdown(btnId, wrapId) {
  const wrap = $(wrapId);
  $(btnId).addEventListener('click', e => {
    e.stopPropagation();
    $$('.dropdown').forEach(d => { if (d !== wrap) d.classList.remove('open'); });
    wrap.classList.toggle('open');
  });
}
bindDropdown('#bellBtn', '#bellDropdown');
bindDropdown('#profileBtn', '#profileDropdown');

document.addEventListener('click', e => {
  $$('.dropdown.open').forEach(d => {
    if (!d.contains(e.target)) d.classList.remove('open');
  });
  if (!e.target.closest('#searchBox')) hideSearchPop();

  const openBtn = e.target.closest('[data-openmod]');
  if (openBtn) {
    const [cIdx, mIdx] = openBtn.dataset.openmod.split(':').map(Number);
    openModul(cIdx, mIdx);
    return;
  }

  const clsBtn = e.target.closest('[data-cls]');
  if (clsBtn) { openKursus(+clsBtn.dataset.cls); return; }

  const artBtn = e.target.closest('[data-art]');
  if (artBtn) { openArtikel(+artBtn.dataset.art); return; }

  const quizBtn = e.target.closest('[data-quiz]');
  if (quizBtn) { openQuiz(); return; }

  if (e.target.closest('[data-weekly]')) { openWeekly(); return; }
  if (e.target.closest('[data-monthly]')) { openMonthly(); return; }

  const srBtn = e.target.closest('[data-sr]');
  if (srBtn) {
    hideSearchPop();
    const v = srBtn.dataset.sr.split(':');
    if (v[0] === 'k') openKursus(+v[1]);
    else if (v[0] === 'a') openArtikel(+v[1]);
    else openModul(+v[1], +v[2]);
    return;
  }

  const modBtn = e.target.closest('[data-mod]');
  if (modBtn) { openModul(+modBtn.dataset.mod); return; }

  const go = e.target.closest('[data-go]');
  if (go) { routeTo(go.dataset.go); return; }

  const act = e.target.closest('[data-action]');
  if (act) { showToast(actionMsg(act.dataset.action)); return; }

  const like = e.target.closest('.like');
  if (like) {
    const liked = like.classList.toggle('liked');
    const n = +like.dataset.n + (liked ? 1 : -1);
    like.dataset.n = n;
    like.querySelector('span').textContent = n;
    like.querySelector('svg').style.fill = liked ? 'var(--ink)' : 'none';
  }
});

const input = $('#searchInput');
const kbd = $('#kbdHint');
if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
  kbd.textContent = '⌘ K';
} else {
  kbd.textContent = 'Ctrl K';
}
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    input.focus();
  }
  if (e.key === 'Escape') {
    setSidebar(false);
    $$('.dropdown.open').forEach(d => d.classList.remove('open'));
    hideSearchPop();
  }
});
input.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const first = $('#searchPop [data-sr]');
  if (!input.value.trim()) return;
  if (first) first.click();
  else showToast('⌕ Tidak ada hasil untuk itu — coba kata lain');
});

const SEARCH_INDEX = [
  ...CONTENT.classes.map((c, i) => ({
    t: c.title, k: 'Kelas', sr: `k:${i}`,
    needle: (c.title + ' ' + c.desc).toLowerCase()
  })),
  ...CONTENT.articles.map((a, i) => ({
    t: a.title, k: 'Artikel', sr: `a:${i}`,
    needle: (a.title + ' ' + a.hero).toLowerCase()
  })),
  ...CONTENT.classes.flatMap((c, ci) =>
    c.parts.map((p, pi) => ({
      t: p.t, k: 'Modul · ' + c.title, sr: `m:${ci}:${pi}`,
      needle: p.t.toLowerCase()
    })))
];

function hideSearchPop() {
  const pop = $('#searchPop');
  if (pop) { pop.hidden = true; pop.innerHTML = ''; }
}

function runSearch(term) {
  const pop = $('#searchPop');
  const q = term.trim().toLowerCase();
  if (q.length < 2) { hideSearchPop(); return; }
  const hits = SEARCH_INDEX.filter(x => x.needle.includes(q)).slice(0, 6);
  pop.hidden = false;
  pop.innerHTML = hits.length
    ? hits.map(h => `
      <button class="sr-item" data-sr="${h.sr}">
        <span class="sr-tag">${h.k}</span>
        <span class="sr-title">${esc(h.t)}</span>
        ${ARROW_L.replace('d="M19 12H5M11 18l-6-6 6-6"', 'd="M9 6l6 6-6 6"')}
      </button>`).join('')
    : `<div class="sr-empty">Tidak ada hasil untuk "${esc(term.trim())}"</div>`;
}
input.addEventListener('input', () => runSearch(input.value));
input.addEventListener('focus', () => runSearch(input.value));

function animateNumber(el, target, suffix, duration = 1400) {
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    let val = Math.round(target * eased);
    if (target >= 1000) val = val.toLocaleString('id-ID');
    el.textContent = val + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
$$('.hero-stats strong[data-count]').forEach(el => {
  animateNumber(el, +el.dataset.count, el.dataset.suffix, 1600);
});

const CIRC = 301.6;
function animatePct(el, pct, delay = 0) {
  const start = performance.now() + delay;
  function frame(now) {
    const t = Math.min(Math.max((now - start) / 1400, 0), 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(pct * eased) + '%';
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const PROG_KEY = 'ailearn-progress';
const CLASS_ICONS = [
  '<circle cx="12" cy="12" r="3.5"/><path d="M5 20c.9-3.5 3.7-5.5 7-5.5s6.1 2 7 5.5"/>',
  '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  '<path d="M13 2 4.5 13H11l-1 9L18.5 11H12z"/>',
  '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  '<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>',
  '<path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z"/>'
];
function classIcon(i) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${CLASS_ICONS[i % CLASS_ICONS.length]}</svg>`;
}
const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';

function getProg() { return store.get(PROG_KEY, {}); }
function className(ci) { return CONTENT.classes[ci].id; }
function clsDone(ci) { return new Set(getProg()[className(ci)] || []); }
function seedProgress() {
  if (!localStorage.getItem(PROG_KEY)) {
    store.set(PROG_KEY, { 'kenalan-ai': [0, 1, 2] });
  }
}

function refreshKelas() {
  $$('#pg-kelas .ccard').forEach((card, i) => {
    const c = CONTENT.classes[i];
    if (!c) return;
    const done = (getProg()[c.id] || []).length;
    const pct = Math.round(done / c.parts.length * 100);
    const fill = card.querySelector('.progress-fill');
    if (fill) {
      fill.classList.remove('animate-in');
      fill.style.width = pct + '%';
    }
    const cta = card.querySelector('.ccard-cta');
    if (cta) cta.textContent = pct >= 100 ? 'Selesai ✓' : (pct > 0 ? 'Lanjut ⌁' : 'Mulai ⌁');
  });
}

function refreshBeranda(firstTime = false) {
  const classes = CONTENT.classes;
  let pick = classes.findIndex(c => {
    const d = (getProg()[c.id] || []).length;
    return d > 0 && d < c.parts.length;
  });
  if (pick < 0) pick = classes.findIndex(c => (getProg()[c.id] || []).length < c.parts.length);
  if (pick < 0) pick = 0;
  const c = classes[pick];
  const done = (getProg()[c.id] || []);
  const next = c.parts.findIndex((_, i) => !done.includes(i));
  const idx = next < 0 ? 0 : next;
  const pct = Math.round(done.length / c.parts.length * 100);

  $('#bcKicker').textContent = 'Modul ' + (idx + 1) + ' dari ' + c.parts.length;
  $('#bcMod').textContent = c.parts[idx].t;
  $('#bcFill').style.width = pct + '%';
  $('#bcNote').textContent = `◆ ${c.title} · ${done.length}/${c.parts.length} selesai`;
  animatePct($('#bcPct'), pct, firstTime ? 400 : 0);

  let tDone = 0, tAll = 0;
  classes.forEach(cc => {
    const d = (getProg()[cc.id] || []).length;
    tDone += d;
    tAll += cc.parts.length;
  });
  const overall = tAll ? tDone / tAll : 0;
  $('#ringDone').textContent = tDone;
  $('#ringTotal').textContent = tAll;
  animatePct($('.ring-text'), Math.round(overall * 100), firstTime ? 400 : 0);
  setTimeout(() => {
    $('.ring-val').style.strokeDashoffset = CIRC * (1 - overall);
  }, firstTime ? 350 : 0);
}

function openKursus(ci) {
  const c = CONTENT.classes[ci];
  const done = clsDone(ci);
  const next = c.parts.findIndex((_, i) => !done.has(i));
  const pct = Math.round(done.size / c.parts.length * 100);
  const allDone = done.size === c.parts.length;
  const nextIdx = next < 0 ? 0 : next;
  const rows = c.parts.map((p, i) => {
    const isDone = done.has(i);
    const isNext = i === next && !allDone;
    const state = isDone ? 'selesai' : (isNext ? 'lanjut di sini' : 'belum dibuka');
    return `
      <button class="mod-row ${isDone ? 'done' : ''} ${isNext ? 'next' : ''}" data-openmod="${ci}:${i}">
        <span class="mod-num">${isDone ? CHECK_SVG : i + 1}</span>
        <span class="mod-main"><h3>${p.t}</h3><small>${p.m} · ${state}</small></span>
        ${ARROW_L.replace('d="M19 12H5M11 18l-6-6 6-6"', 'd="M9 6l6 6-6 6"')}
      </button>`;
  }).join('');

  $('#pg-kursus').innerHTML = `
    <div class="back-row">
      <button class="icon-btn" data-go="kelas" aria-label="Kembali ke Kelas">${ARROW_L}</button>
      <button class="head-link" data-go="kelas">Kembali ke Kelas</button>
    </div>
    <article class="card kd-hero">
      <div class="kd-tile ${c.thumb}">${classIcon(ci)}</div>
      <div class="kd-info">
        <div class="tag-row">
          <span class="tag tag-ghosted">${c.level} · ${c.parts.length} modul</span>
          <span class="tag ${allDone ? 'tag-mint' : 'tag-cyan'}">${allDone ? 'Selesai' : 'Sedang berjalan'}</span>
        </div>
        <h1>${c.title}</h1>
        <p>${c.desc}</p>
        <div class="progress-track sm"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    </article>
    <article class="card mod-card">
      <header class="card-head"><h2>Materi Kelas</h2><span class="mod-count">${done.size} dari ${c.parts.length} selesai</span></header>
      <div class="mod-list">${rows}</div>
    </article>`;
  routeTo('kursus');
}

function openModul(ci, mi) {
  const c = CONTENT.classes[ci];
  const p = c.parts[mi];
  const done = clsDone(ci);
  const isDone = done.has(mi);
  const last = mi === c.parts.length - 1;

  $('#pg-modul').innerHTML = `
    <div class="back-row">
      <button class="icon-btn" data-open-kursus="${ci}" aria-label="Kembali ke kursus">${ARROW_L}</button>
      <button class="head-link" data-open-kursus="${ci}">Kembali ke kursus</button>
    </div>
    <article class="card read-doc">
      <small class="read-meta">${esc(c.title)} · Modul ${mi + 1} dari ${c.parts.length}</small>
      <h1 class="read-title">${p.t}</h1>
      <div class="read-body">
        ${p.body.map(par => `<p>${par}</p>`).join('')}
        <div class="pbox">
          <strong>Poin Penting</strong>
          <ul>${p.points.map(pt => `<li>${CHECK_SVG}<span>${pt}</span></li>`).join('')}</ul>
        </div>
        ${p.ex ? `<div class="exbox"><small>${esc(p.ex.label)}</small><code>${esc(p.ex.code)}</code></div>` : ''}
      </div>
      <div class="mod-ctl">
        <button class="btn btn-soft ctrl-step" data-step="-1" ${mi === 0 ? 'disabled' : ''}>Sebelumnya</button>
        <button class="btn ${isDone ? 'btn-soft' : 'btn-primary'}" id="markBtn">${isDone ? 'Sudah Selesai ✓ (batal)' : 'Tandai Modul Selesai'}</button>
        <button class="btn btn-soft ctrl-step" data-step="1" ${last ? (done.has(mi) ? 'data-go="kelas"' : 'disabled') : ''}>${last ? 'Selesai' : 'Berikutnya'}</button>
      </div>
    </article>`;

  $$('#pg-modul [data-open-kursus]').forEach(b => b.addEventListener('click', () => openKursus(ci)));
  $('#markBtn').addEventListener('click', () => {
    const arr = [...(getProg()[c.id] || [])];
    const ix = arr.indexOf(mi);
    if (ix >= 0) arr.splice(ix, 1); else arr.push(mi);
    const prog = getProg();
    prog[c.id] = arr;
    store.set(PROG_KEY, prog);
    if (arr.length === c.parts.length) showToast('✦ Kelas ini tuntas — luar biasa! +50 XP');
    else showToast(`✦ Modul ${arr.length} dari ${c.parts.length} selesai! +20 XP`);
    refreshKelas();
    refreshBeranda();
    openModul(ci, mi);
  });
  $$('#pg-modul .ctrl-step').forEach(b => {
    b.addEventListener('click', () => openModul(ci, mi + +b.dataset.step));
  });
  routeTo('modul');
}

function openArtikel(ai) {
  const a = CONTENT.articles[ai];
  const last = ai === CONTENT.articles.length - 1;
  $('#pg-artikel').innerHTML = `
    <div class="back-row">
      <button class="icon-btn" data-go="jelajah" aria-label="Kembali ke jelajah">${ARROW_L}</button>
      <button class="head-link" data-go="jelajah">Kembali ke Jelajah AI</button>
    </div>
    <article class="card read-doc">
      <small class="read-meta">${esc(a.tag)}</small>
      <h1 class="read-title">${a.title}</h1>
      <p class="read-hero">${a.hero}</p>
      <div class="read-body">
        ${a.secs.map(s => `<h3>${s.h}</h3>` + s.p.map(par => `<p>${par}</p>`).join('')).join('')}
        <div class="pbox">
          <strong>Ringkasan</strong>
          <ul>${a.points.map(pt => `<li>${CHECK_SVG}<span>${pt}</span></li>`).join('')}</ul>
        </div>
      </div>
      <div class="mod-ctl">
        <button class="btn btn-soft" data-art="${ai - 1}" ${ai === 0 ? 'disabled' : ''}>Sebelumnya</button>
        <button class="btn btn-primary" data-art="${(ai + 1) % CONTENT.articles.length}">${last ? 'Baca dari Awal' : 'Artikel Berikutnya'}</button>
      </div>
    </article>`;
  routeTo('artikel');
}

let qState = null;

function openQuiz() {
  qState = { i: 0, picked: new Array(CONTENT.quiz.length).fill(null) };
  $('#pg-quiz').innerHTML = `
    <div class="back-row">
      <button class="icon-btn" data-go="tantangan" aria-label="Kembali ke tantangan">${ARROW_L}</button>
      <button class="head-link" data-go="tantangan">Kembali ke Tantangan</button>
    </div>
    <article class="card quiz-card">
      <div class="quiz-top">
        <div class="progress-track sm" style="flex:1"><div class="progress-fill" id="qFill" style="width:0%"></div></div>
        <small id="qMeta">Pertanyaan 1 dari ${CONTENT.quiz.length}</small>
      </div>
      <h2 class="q-title" id="qTitle"></h2>
      <div class="q-opts" id="qOpts"></div>
      <div class="quiz-feed" id="qFeed"></div>
      <div class="mod-ctl">
        <span class="quiz-score" id="qScoreMini"></span>
        <button class="btn btn-primary" id="qNext" disabled>Lanjut</button>
      </div>
    </article>`;
  renderQuestion();
  routeTo('quiz');
}

function renderQuestion() {
  const { i, picked } = qState;
  const q = CONTENT.quiz[i];
  $('#qFill').style.width = (i / CONTENT.quiz.length * 100) + '%';
  $('#qMeta').textContent = `Pertanyaan ${i + 1} dari ${CONTENT.quiz.length}`;
  $('#qTitle').textContent = q.q;
  $('#qOpts').innerHTML = q.opts.map((o, oi) => `
    <button class="q-opt" data-opt="${oi}">${String.fromCharCode(65 + oi)}. ${o}</button>`).join('') + `
    ${picked[i] !== null ? '<button class="q-opt q-explain" disabled><span>' + esc(q.why) + '</span></button>' : ''}`;
  const feed = $('#qFeed');
  feed.classList.remove('show', 'ok', 'bad');
  feed.textContent = '';
  $('#qNext').disabled = picked[i] === null;
  $('#qNext').textContent = i === CONTENT.quiz.length - 1 ? 'Lihat Skor' : 'Lanjut';
  $('#qOpts').querySelectorAll('.q-opt[data-opt]').forEach(btn => {
    btn.addEventListener('click', () => answerQ(i, +btn.dataset.opt, btn));
  });
  if (picked[i] !== null) {
    const buttons = $('#qOpts').querySelectorAll('.q-opt[data-opt]');
    showResult(picked, i, buttons[picked[i]]);
  }
  updateMini();
}

function answerQ(i, oi, btn) {
  if (qState.picked[i] !== null) return;
  qState.picked[i] = oi;
  const buttons = $('#qOpts').querySelectorAll('.q-opt[data-opt]');
  showResult(qState, i, btn, buttons);
}

function showResult(state, i, chosen, buttons = null) {
  const q = CONTENT.quiz[i];
  const list = buttons || $('#qOpts').querySelectorAll('.q-opt[data-opt]');
  list.forEach((b, bi) => {
    b.disabled = true;
    if (bi === q.a) b.classList.add('correct');
    if (state.picked[i] === bi && bi !== q.a) b.classList.add('wrong');
  });
  const right = state.picked[i] === q.a;
  const feed = $('#qFeed');
  feed.classList.add('show', right ? 'ok' : 'bad');
  feed.textContent = (right ? '✓ Tepat! ' : '✗ Belum tepat. ') + q.why;
  if (buttons) $('#qNext').disabled = false;
  updateMini();
}

function updateMini() {
  const score = qState.picked.reduce((s, p, i) => s + (p === CONTENT.quiz[i].a ? 1 : 0), 0);
  const answered = qState.picked.filter(p => p !== null).length;
  $('#qScoreMini').textContent = answered ? `Skor sementara: ${score}` : '';
}

$('#pg-quiz').addEventListener('click', e => {
  if (!e.target.closest('#qNext')) return;
  const { i, picked } = qState;
  if (picked[i] === null) return;
  if (i < CONTENT.quiz.length - 1) {
    qState.i = i + 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
});

function finishQuiz() {
  const score = qState.picked.reduce((s, p, i) => s + (p === CONTENT.quiz[i].a ? 1 : 0), 0);
  const best = store.get('ailearn-quiz-best', 0);
  const isRecord = score > best;
  if (isRecord) store.set('ailearn-quiz-best', score);
  const xp = isRecord ? score * 20 : 0;
  $('#pg-quiz .quiz-card').innerHTML = `
    <div class="quiz-final">
      <strong class="score-big">${score}/${CONTENT.quiz.length}</strong>
      <p class="quiz-sub">${score >= 4 ? 'Keren — pemahamanmu kuat!' : (score >= 2 ? 'Solid! Ulang soal yang keliru untuk menguatkan.' : 'Tidak apa-apa — materi modul 1 bisa dibaca ulang dulu.')}</p>
      <p class="quiz-xp">${isRecord ? `+${xp} XP · ` : ''}Best skor: ${Math.max(score, best)}/${CONTENT.quiz.length}</p>
      <div class="mod-ctl center">
        <button class="btn btn-soft" id="qRetry">Coba Lagi</button>
        <button class="btn btn-primary" data-go="tantangan">Ke Tantangan</button>
      </div>
    </div>`;
  $('#qRetry').addEventListener('click', openQuiz);
  refreshTantangan();
  showToast(isRecord ? `✦ Skor baru: ${score}/${CONTENT.quiz.length} — +${xp} XP!` : `✦ Skor ${score}/${CONTENT.quiz.length}. Rekor: ${best}.`);
}

const WEEK_KEY = 'ailearn-weekly';
const MON_KEY = 'ailearn-monthly';

const MON_STEPS = [
  { t: 'Rancang arsitektur mini', d: 'Sebutkan UI, mesin, dan memorinya — lalu tetapkan 3 kasus yang akan dijawab sempurna oleh botmu.' },
  { t: 'Bangun chat UI', d: 'Kotak chat sederhana: input pesan, tombol kirim, daftar percakapan.' },
  { t: 'Hubungkan ke LLM (dengan aman)', d: 'API key tersimpan di sisi server — jangan pernah ekspos ke frontend; system prompt menentukan kepribadian bot.' },
  { t: 'Uji dengan pengguna nyata', d: 'Minta 10 pertanyaan nyata dari temanmu; catat yang gagal dan update system prompt-nya.' }
];

function totalXP() {
  const best = store.get('ailearn-quiz-best', 0);
  const mod = store.get('ailearn-xpm', 0);
  const wk = (store.get(WEEK_KEY, []).length >= 3) ? 150 : 0;
  const mon = (store.get(MON_KEY, []).length >= MON_STEPS.length) ? 500 : 0;
  return 1250 + mod + best * 20 + wk + mon;
}

function refreshTantangan() {
  const best = store.get('ailearn-quiz-best', 0);
  const qFill = $('#chqFill');
  if (qFill) qFill.style.width = (best / CONTENT.quiz.length * 100) + '%';
  const qNote = $('#chqNote');
  if (qNote) qNote.textContent = best ? `Tersisa ${CONTENT.quiz.length - best} soal · Best ${best}/${CONTENT.quiz.length}` : 'Belum dicoba';

  const wk = store.get(WEEK_KEY, []).length;
  const wFill = $('#chWFill');
  if (wFill) wFill.style.width = (Math.min(wk, 3) / 3 * 100) + '%';
  const wNote = $('#chWNote');
  if (wNote) wNote.textContent = wk >= 3 ? 'Selesai ✓ · +150 XP' : `${wk} dari 3 prompt`;

  const mon = store.get(MON_KEY, []).length;
  const mFill = $('#chMFill');
  if (mFill) mFill.style.width = (mon / MON_STEPS.length * 100) + '%';
  const mNote = $('#chMNote');
  if (mNote) mNote.textContent = mon >= MON_STEPS.length ? 'Selesai ✓ · +500 XP' : `${mon} dari ${MON_STEPS.length} tahap`;

  const xp = totalXP().toLocaleString('id-ID');
  const t1 = $('#xpTotal'); if (t1) t1.textContent = xp;
  const t2 = $('#achXP'); if (t2) t2.textContent = xp;
}

function openWeekly() {
  const prompts = store.get(WEEK_KEY, []);
  $('#pg-weekly').innerHTML = `
    <div class="back-row">
      <button class="icon-btn" data-go="tantangan" aria-label="Kembali ke tantangan">${ARROW_L}</button>
      <button class="head-link" data-go="tantangan">Kembali ke Tantangan</button>
    </div>
    <article class="card read-doc">
      <small class="read-meta">Tantangan Mingguan · Tersisa 3 hari</small>
      <h1 class="read-title">3 Prompt Terbaikmu</h1>
      <p class="read-hero">Kumpulkan 3 prompt yang paling membantu pekerjaanmu minggu ini. Lengkapnya, +150 XP — dan kamu punya awal perpustakaan prompt pribadi.</p>
      <div class="wk-form">
        <textarea id="wkInput" placeholder="Tempel atau tulis promptmu di sini…" maxlength="600"></textarea>
        <button class="btn btn-primary" id="wkAdd">Tambahkan Prompt</button>
      </div>
      <div class="wk-list">
        ${prompts.length ? prompts.map((p, i) => `
          <div class="wk-item">
            <span class="wk-num">${i + 1}</span>
            <p>${esc(p)}</p>
            <button class="mini-btn" data-wkdel="${i}" aria-label="Hapus prompt">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>`).join('') : '<div class="notes-empty">Belum ada prompt.<br>Mulai dari yang kamu pakai hari ini ✧</div>'}
      </div>
      <div class="pbox">
        <strong>Ciri Prompt yang Berharga</strong>
        <ul>
          <li>${CHECK_SVG}<span>Muatau jelas: peran, tugas, format sebut apa saja yang ia hasilkan.</span></li>
          <li>${CHECK_SVG}<span>Dipakai lebih dari sekali — prompt latent jarang layak dihafalmudah.</span></li>
          <li>${CHECK_SVG}<span>Bisa dijadikan templat: ganti variabelnya dan tetap bekerja.</span></li>
        </ul>
      </div>
    </article>`;

  $('#wkAdd').addEventListener('click', () => {
    const ta = $('#wkInput');
    const text = ta.value.trim();
    if (!text) { showToast('Tulis promptnya dulu ✧'); return; }
    const arr = store.get(WEEK_KEY, []);
    const before = arr.length;
    arr.unshift(text);
    const kept = arr.slice(0, 3);
    store.set(WEEK_KEY, kept);
    if (before < 3 && kept.length >= 3) showToast('✦ 3 prompt terkumpul — +150 XP!');
    else showToast(`✦ Prompt ${Math.min(kept.length, 3)}/3 tersimpan!`);
    refreshTantangan();
    openWeekly();
  });
  $$('#pg-weekly [data-wkdel]').forEach(b => {
    b.addEventListener('click', () => {
      const arr = store.get(WEEK_KEY, []);
      arr.splice(+b.dataset.wkdel, 1);
      store.set(WEEK_KEY, arr);
      refreshTantangan();
      openWeekly();
    });
  });
  routeTo('weekly');
}

function openMonthly() {
  const done = new Set(store.get(MON_KEY, []));
  const allDone = done.size === MON_STEPS.length;
  $('#pg-monthly').innerHTML = `
    <div class="back-row">
      <button class="icon-btn" data-go="tantangan" aria-label="Kembali ke tantangan">${ARROW_L}</button>
      <button class="head-link" data-go="tantangan">Kembali ke Tantangan</button>
    </div>
    <article class="card read-doc">
      <small class="read-meta">Tantangan Bulanan · Tersisa 19 hari</small>
      <h1 class="read-title">Mini-Project Chatbot</h1>
      <p class="read-hero">Selesaikan 4 tahap untuk meluncurkan chatbot kecil versimu sendiri. Selesai semua: +500 XP dan satu karya nyata untuk portfolio-mu.</p>
      <div class="task-list">
        ${MON_STEPS.map((s, i) => `
          <button class="task-row ${done.has(i) ? 'done' : ''}" data-mon="${i}">
            <span class="task-check">${done.has(i) ? CHECK_SVG : ''}</span>
            <span class="mod-main"><h3>${s.t}</h3><small>${s.d}</small></span>
          </button>`).join('')}
      </div>
      ${allDone ? '<div class="pbox done-box"><strong>Tantangan selesai!</strong><ul><li>' + CHECK_SVG + '<span>+500 XP sudah diakui — karya kecilmu kini punya alur UI → mesin → memori → uji.</span></li></ul></div>' : ''}
      <div class="mod-ctl">
        <button class="btn btn-soft" data-refer="chatbot" data-cls="5">Baca Materi Kelasnya</button>
      </div>
    </article>`;
  $$('#pg-monthly [data-mon]').forEach(b => {
    b.addEventListener('click', () => {
      const i = +b.dataset.mon;
      const arr = store.get(MON_KEY, []);
      const ix = arr.indexOf(i);
      if (ix >= 0) arr.splice(ix, 1); else arr.push(i);
      const was = monCompleted();
      store.set(MON_KEY, arr);
      const now = arr.length >= MON_STEPS.length;
      showToast(now && !was ? '✦ Project tuntas — +500 XP! Tambah karyamu ke catatan dan komunitas.' : `✦ Tahap ${arr.length}/${MON_STEPS.length} tersimpan.`);
      refreshTantangan();
      openMonthly();
    });
  });
  routeTo('monthly');
}

function monCompleted() {
  return store.get(MON_KEY, []).length >= MON_STEPS.length;
}

$('#kelasFilters').addEventListener('click', e => {
  const chip = e.target.closest('.fchip');
  if (!chip) return;
  $$('#kelasFilters .fchip').forEach(c => c.classList.toggle('is-active', c === chip));
  const lv = chip.dataset.level;
  $$('#pg-kelas .ccard').forEach(card => {
    card.hidden = lv !== 'all' && card.dataset.level !== lv;
  });
});

const composer = $('#composerInput');
const charCount = $('#charCount');
composer.addEventListener('input', () => {
  charCount.textContent = composer.value.length + '/280';
});
$('#btnPost').addEventListener('click', () => {
  const text = composer.value.trim();
  if (!text) {
    showToast('✧ Tulis sesuatu dulu, ya');
    return;
  }
  const post = document.createElement('article');
  post.className = 'card post';
  post.innerHTML = `
    <header class="post-head">
      <span class="avatar" style="background:#E2F7FF"><b>A</b></span>
      <div><div class="post-name">${esc($('#profileName').textContent)}</div><div class="post-time">baru saja</div></div>
      <button class="like" type="button" data-n="0" aria-label="Suka"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.8 0 3.3 1 4.2 2.6C12.9 5 14.4 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2z"/></svg><span>0</span></button>
    </header>
    <p>${esc(text)}</p>
    <footer class="post-foot"><span>0 balasan</span><span>#umum</span></footer>`;
  $('#feed').prepend(post);
  composer.value = '';
  charCount.textContent = '0/280';
  showToast('✦ Terima kasih sudah berbagi!');
});

const NOTES_KEY = 'ailearn-notes';
const noteTs = () => new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

if (!localStorage.getItem(NOTES_KEY)) {
  store.set(NOTES_KEY, [
    { t: 'Ide project', b: 'Chatbot pengingat jadwal belajar: input to-do → dipecah jadi blok belajar ×25 menit.', d: '3 hari lalu' },
    { t: 'Catatan Modul 1', b: 'AI = bidang besar · ML = cara membuat AI belajar dari data · LLM = ML skala besar untuk bahasa.', d: 'kemarin' }
  ]);
}

function renderNotes() {
  const notes = store.get(NOTES_KEY, []);
  const list = $('#notesList');
  if (!notes.length) {
    list.innerHTML = '<div class="notes-empty">Belum ada catatan.<br>Mulai dari ide terkecil di panel kiri ✧</div>';
    return;
  }
  list.innerHTML = notes.map((n, i) => `
    <article class="card note">
      <div class="note-info">
        <h3>${esc(n.t)}</h3>
        <p>${esc(n.b)}</p>
        <span class="note-time">${esc(n.d)}</span>
      </div>
      <button class="mini-btn" type="button" data-del="${i}" aria-label="Hapus catatan">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m-9 0 1 14h8l1-14"/></svg>
      </button>
    </article>`).join('');
}
renderNotes();

document.addEventListener('click', e => {
  const del = e.target.closest('[data-del]');
  if (!del) return;
  const i = +del.dataset.del;
  const notes = store.get(NOTES_KEY, []);
  notes.splice(i, 1);
  store.set(NOTES_KEY, notes);
  renderNotes();
  showToast('Catatan dihapus');
});

$('#noteSave').addEventListener('click', () => {
  const title = $('#noteTitle').value.trim();
  const body = $('#noteBody').value.trim();
  if (!title && !body) {
    showToast('Isi judul atau isi catatannya dulu ✧');
    return;
  }
  const notes = store.get(NOTES_KEY, []);
  notes.unshift({ t: title || 'Tanpa judul', b: body || '—', d: noteTs() });
  store.set(NOTES_KEY, notes);
  $('#noteTitle').value = '';
  $('#noteBody').value = '';
  renderNotes();
  showToast('✦ Catatan tersimpan!');
});

function applySettings() {
  const s = settings();
  $('#setName').value = s.name || 'Anonim';
  $('#setEmail').value = s.email || 'anonim@ailearn.id';
  $('#setLang').value = s.lang || 'id';
  $('#setNotifEmail').checked = s.notifEmail !== false;
  $('#setSound').checked = !!s.sound;
  $('#setCompact').checked = !!s.compact;
  $('#profileName').textContent = s.name || 'Anonim';
  document.body.classList.toggle('compact', !!s.compact);
}
applySettings();

$('#setSave').addEventListener('click', () => {
  store.set('ailearn-settings', {
    name: $('#setName').value.trim() || 'Anonim',
    email: $('#setEmail').value.trim(),
    lang: $('#setLang').value,
    notifEmail: $('#setNotifEmail').checked,
    sound: $('#setSound').checked,
    compact: $('#setCompact').checked
  });
  applySettings();
  showToast('✦ Pengaturan tersimpan!');
});

seedProgress();
refreshKelas();
refreshBeranda(true);
refreshTantangan();
