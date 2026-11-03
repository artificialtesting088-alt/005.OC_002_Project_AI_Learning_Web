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

const sidebar = $('#sidebar');
const overlay = $('#sidebarOverlay');
function setSidebar(open) {
  sidebar.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
}
$('#burger').addEventListener('click', () => setSidebar(true));
overlay.addEventListener('click', () => setSidebar(false));

const TITLES = {
  beranda: 'Beranda',
  kelas: 'Kelas',
  jelajah: 'Jelajah AI',
  komunitas: 'Komunitas',
  tantangan: 'Tantangan',
  achievement: 'Achievement',
  catatan: 'Catatan',
  pengaturan: 'Pengaturan'
};

function routeTo(name) {
  Object.keys(TITLES).forEach(p => {
    const el = $('#pg-' + p);
    if (el) el.hidden = p !== name;
  });
  $$('.nav-item').forEach(n => n.classList.toggle('is-active', n.dataset.route === name));
  document.title = 'AI Learn — Belajar AI Untuk Dunia yang Lebih Baik' + (name === 'beranda' ? '' : ' · ' + TITLES[name]);
  window.scrollTo({ top: 0 });
}

$$('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    routeTo(item.dataset.route);
    setSidebar(false);
  });
});
routeTo('beranda');

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

  const act = e.target.closest('[data-action]');
  if (act) {
    showToast(`✦ <span class="t-sp">${esc(act.dataset.action)}</span> — sebentar lagi, ya!`);
    return;
  }

  const like = e.target.closest('.like');
  if (like) {
    const liked = like.classList.toggle('liked');
    const n = +like.dataset.n + (liked ? 1 : -1);
    like.dataset.n = n;
    like.querySelector('span').textContent = n;
    like.querySelector('svg').style.fill = liked ? 'var(--ink)' : 'none';
    return;
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
  }
});
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && input.value.trim()) {
    showToast(`⌕ Mencari <span class="t-sp">"${esc(input.value.trim())}"</span>… (demo)`);
  }
});

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
function animatePct(el, pct, delay = 300) {
  const start = performance.now() + delay;
  function frame(now) {
    const t = Math.min(Math.max((now - start) / 1400, 0), 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(pct * eased) + '%';
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
animatePct($('.progress-pct'), 60);
animatePct($('.ring-text'), 42);
setTimeout(() => {
  $('.progress-fill').style.width = '60%';
  $('.ring-val').style.strokeDashoffset = CIRC * (1 - 0.42);
}, 350);

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
