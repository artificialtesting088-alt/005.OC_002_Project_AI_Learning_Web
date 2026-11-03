const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const toast = $('#toast');
let toastTimer;
function showToast(msg) {
  toast.innerHTML = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

const sidebar = $('#sidebar');
const overlay = $('#sidebarOverlay');
function setSidebar(open) {
  sidebar.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
}
$('#burger').addEventListener('click', () => setSidebar(true));
$('#sidebarClose').addEventListener('click', () => setSidebar(false));
overlay.addEventListener('click', () => setSidebar(false));

$$('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    $$('.nav-item').forEach(n => n.classList.remove('is-active'));
    item.classList.add('is-active');
    setSidebar(false);
    const name = $('span', item).textContent;
    if (item.dataset.route !== 'beranda') {
      showToast(`✦ Halaman <span class="t-sp">${name}</span> — masih dalam pengembangan`);
    } else {
      showToast('✦ Kamu sedang di Beranda ⌁');
    }
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

document.addEventListener('click', () => {
  $$('.dropdown.open').forEach(d => d.classList.remove('open'));
});

$$('.dropdown-item').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.dropdown.open').forEach(d => d.classList.remove('open'));
    showToast(`✦ <span class="t-sp">${btn.dataset.action}</span> — segera hadir`);
  });
});

$$('[data-action]').forEach(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
    showToast(`✦ <span class="t-sp">${el.dataset.action}</span> — sebentar lagi, ya!`);
  });
});

const input = $('#searchInput');
const kbd = $('#kbdHint');
if (/Mac|iPhone|iPad/.test(navigator.platform)) {
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
    showToast(`⌕ Mencari <span class="t-sp">"${input.value.trim()}"</span>… (demo)`);
  }
});

function animateNumber(el, target, suffix, duration = 1400) {
  const start = performance.now();
  const end = target;
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    let val = Math.round(end * eased);
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

window.dispatchEvent(new Event('resize'));
