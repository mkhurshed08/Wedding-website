/* ── LANGUAGE TOGGLE ──────────────────────────────────────── */
let lang = 'en';

function setLanguage(target) {
  lang = target;
  document.getElementById('lang-btn').textContent = lang === 'en' ? 'RU' : 'EN';
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) el.textContent = text;
  });
}

document.getElementById('lang-btn').addEventListener('click', () => {
  setLanguage(lang === 'en' ? 'ru' : 'en');
});

/* ── NAVBAR SCROLL ────────────────────────────────────────── */
const navbar = document.getElementById('navbar');

function updateNav() {
  if (window.scrollY > 80) {
    navbar.classList.add('nav-solid');
    navbar.classList.remove('nav-transparent');
  } else {
    navbar.classList.remove('nav-solid');
    navbar.classList.add('nav-transparent');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── MOBILE MENU ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── COUNTDOWN TIMER ──────────────────────────────────────── */
const RSVP_DEADLINE = new Date('2026-09-01T23:59:59');

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const diff = RSVP_DEADLINE - Date.now();

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-min').textContent   = '00';
    document.getElementById('cd-sec').textContent   = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const min   = Math.floor((diff % 3600000)  / 60000);
  const sec   = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-min').textContent   = pad(min);
  document.getElementById('cd-sec').textContent   = pad(sec);
}

tick();
setInterval(tick, 1000);

/* ── SCROLL ANIMATIONS ────────────────────────────────────── */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.anim').forEach(el => observer.observe(el));
