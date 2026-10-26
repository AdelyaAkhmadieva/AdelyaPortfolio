// Работы. Положите картинку (png, jpg или gif) в папку works/ под именем из поля file.
const WORKS = [
  { file: 'works/01-nike.svg',    name: { ru: 'Кроссовки', en: 'Sneakers' },   type: 'ui',   brand: 'Nike' },
  { file: 'works/02-vision.svg',  name: { ru: 'Очки',      en: 'Headset' },    type: 'ui',   brand: 'Apple' },
  { file: 'works/03-drone.svg',   name: { ru: 'Дрон',      en: 'Drone' },      type: 'card', brand: 'MDR' },
  { file: 'works/04-buds.svg',    name: { ru: 'Наушники',  en: 'Earbuds' },    type: 'ux',   brand: 'Samsung' },
  { file: 'works/05-dryer.svg',   name: { ru: 'Фен',       en: 'Hair dryer' }, type: 'card', brand: 'Whoosh' },
  { file: 'works/06-bexance.svg', name: { ru: 'Фитнес',    en: 'Fitness' },    type: 'case', brand: 'Bexance' },
];

const TYPES = {
  ui:   { ru: 'Интерфейс',       en: 'Interface' },
  card: { ru: 'Карточка товара', en: 'Product card' },
  ux:   { ru: 'UX-исследование', en: 'UX study' },
  case: { ru: 'Кейс',            en: 'Case study' },
};

const I18N = {
  ru: {
    name: 'Аделя Ахмадиева',
    navWorks: 'Работы', navAbout: 'Обо мне', navSkills: 'Навыки', navContact: 'Контакты',
    kicker: 'Коллекция · {n} работ',
    hero1: 'Вещи,', hero2: 'которые хочется', hero3: 'взять в руки',
    intro: 'Я — Аделя. Придумываю, как предметы встречаются с людьми на экране: от одной карточки товара до целого интерфейса.',
    cta: 'Смотреть экспозицию',
    worksTitle: 'Экспозиция',
    worksHint: 'Наведите, чтобы пролистать. Нажмите, чтобы открыть.',
    worksHintTouch: 'Нажмите на работу, чтобы открыть целиком.',
    aboutTitle: 'Обо мне',
    aboutLead: 'Рисую макеты в Figma и верстаю их на HTML и CSS. Работаю в штате и на фрилансе, а ещё учу детей основам веб-разработки.',
    p1Title: 'В найме', p1Text: 'Интерфейсы и сайты в роли штатного специалиста.',
    p2Title: 'Фриланс', p2Text: 'Проекты для блогеров и экспертов.',
    p3Title: 'Преподаю', p3Text: 'Основы веб-разработки для детей.',
    skillsTitle: 'Навыки',
    contactKicker: 'Есть вещь, которой нужен голос?',
    toTop: 'Наверх ↑',
    cursor: 'Смотреть',
    title: 'Аделя Ахмадиева — коллекция предметов',
  },
  en: {
    name: 'Adelya Akhmadieva',
    navWorks: 'Works', navAbout: 'About', navSkills: 'Skills', navContact: 'Contact',
    kicker: 'Collection · {n} works',
    hero1: 'Things', hero2: 'you want', hero3: 'to hold',
    intro: 'I’m Adelya. I shape how objects meet people on screen — from a single product card to a whole interface.',
    cta: 'View the collection',
    worksTitle: 'Collection',
    worksHint: 'Hover to scroll through. Click to open.',
    worksHintTouch: 'Tap a work to see it in full.',
    aboutTitle: 'About',
    aboutLead: 'I draw layouts in Figma and code them in HTML and CSS. I work both in-house and freelance, and I teach kids the basics of web development.',
    p1Title: 'In-house', p1Text: 'Interfaces and websites as a staff specialist.',
    p2Title: 'Freelance', p2Text: 'Projects for bloggers and experts.',
    p3Title: 'Teaching', p3Text: 'Web development basics for kids.',
    skillsTitle: 'Skills',
    contactKicker: 'Got a thing that needs a voice?',
    toTop: 'Back to top ↑',
    cursor: 'View',
    title: 'Adelya Akhmadieva — a collection of objects',
  },
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = (n) => String(n).padStart(2, '0');
const $ = (s) => document.querySelector(s);

let lang = 'ru';
try { lang = localStorage.getItem('lang') === 'en' ? 'en' : 'ru'; } catch (e) {}

/* ---------- smooth scroll ---------- */
let lenis = null;
if (!reduceMotion && window.Lenis) {
  lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

/* ---------- marquee ---------- */
function renderMarquee() {
  const words = WORKS.map((w) => w.name[lang]);
  const row = words.concat(words).map((w) => `<span>${w} ·</span>`).join('');
  $('#marquee').innerHTML = row + row;
}

/* ---------- exhibits ---------- */
const track = $('#track');

function placeholderHTML(w, i) {
  return `<span class="placeholder">
      <span class="placeholder__circle"></span>
      <span class="placeholder__num">${pad(i + 1)}</span>
    </span>`;
}

function metaText(w) {
  return [TYPES[w.type][lang], w.brand].filter(Boolean).join(' · ');
}

function renderWorks() {
  track.innerHTML = WORKS.map((w, i) => `
    <article class="exhibit reveal" style="--i:${i % 3}">
      <button class="exhibit__frame" type="button" data-index="${i}" aria-label="${w.name[lang]}">
        <span class="exhibit__bar"><i></i><i></i><i></i></span>
        <span class="exhibit__view">
          <img src="${w.file}" alt="${w.name[lang]} — ${TYPES[w.type][lang]}" loading="lazy">
        </span>
      </button>
      <div class="exhibit__label">
        <span class="exhibit__num">№ ${pad(i + 1)}</span>
        <h3 class="exhibit__name">${w.name[lang]}</h3>
        <p class="exhibit__meta">${metaText(w)}</p>
      </div>
    </article>`).join('');

  track.querySelectorAll('.exhibit__view img').forEach((img, i) => {
    img.addEventListener('load', () => measureShift(img));
    img.addEventListener('error', () => {
      WORKS[i].missing = true;
      img.replaceWith(document.createRange().createContextualFragment(placeholderHTML(WORKS[i], i)));
    });
    if (img.complete && img.naturalWidth) measureShift(img);
  });

  track.querySelectorAll('.exhibit__frame').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(+btn.dataset.index));
  });

  $('#worksTotal').textContent = pad(WORKS.length);
  observeReveals(track);
  layoutGallery();
}

// how far a tall screenshot travels inside the frame on hover
function measureShift(img) {
  const view = img.parentElement;
  const shift = Math.max(0, img.offsetHeight - view.clientHeight);
  img.style.setProperty('--shift', shift + 'px');
  img.style.setProperty('--dur', Math.min(12, Math.max(1.5, shift / 450)) + 's');
}

/* ---------- horizontal gallery ---------- */
const works = $('#works');
const isNarrow = () => window.matchMedia('(max-width: 900px)').matches;
let galleryDist = 0;

function layoutGallery() {
  if (isNarrow()) {
    works.style.height = '';
    track.style.transform = '';
    galleryDist = 0;
    return;
  }
  galleryDist = Math.max(0, track.scrollWidth - window.innerWidth);
  works.style.height = galleryDist + window.innerHeight + 'px';
}

function updateGallery() {
  if (!galleryDist) return;
  const rect = works.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, -rect.top / (works.offsetHeight - window.innerHeight)));
  track.style.transform = `translate3d(${-p * galleryDist}px, 0, 0)`;
  $('#worksBar').style.transform = `scaleX(${p})`;
  $('#worksCurrent').textContent = pad(Math.min(WORKS.length, Math.round(p * (WORKS.length - 1)) + 1));
}

/* ---------- header ---------- */
const header = $('.header');
let lastY = 0;
function updateHeader() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 10);
  header.classList.toggle('is-hidden', y > 200 && y > lastY && !lightboxOpen);
  lastY = y;
}

/* ---------- reveal ---------- */
const io = 'IntersectionObserver' in window && !reduceMotion
  ? new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' })
  : null;

function observeReveals(root = document) {
  root.querySelectorAll('.reveal:not(.is-in)').forEach((el) => {
    if (io) io.observe(el); else el.classList.add('is-in');
  });
}

/* ---------- lightbox ---------- */
const lb = $('#lightbox');
const lbBody = $('#lbBody');
let lbIndex = 0;
let lightboxOpen = false;
let lastFocus = null;

function fillLightbox() {
  const w = WORKS[lbIndex];
  $('#lbNum').textContent = '№ ' + pad(lbIndex + 1);
  $('#lbTitle').textContent = w.name[lang];
  $('#lbMeta').textContent = metaText(w);
  lbBody.innerHTML = w.missing
    ? `<div class="lightbox__placeholder">${placeholderHTML(w, lbIndex)}</div>`
    : `<img src="${w.file}" alt="${w.name[lang]}">`;
  const img = lbBody.querySelector('img');
  if (img) img.addEventListener('error', () => { w.missing = true; fillLightbox(); });
  lbBody.scrollTop = 0;
}

function openLightbox(i) {
  lbIndex = i;
  lastFocus = document.activeElement;
  fillLightbox();
  lb.hidden = false;
  lightboxOpen = true;
  document.body.style.overflow = 'hidden';
  if (lenis) lenis.stop();
  requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('is-open')));
  $('#lbClose').focus();
}

function closeLightbox() {
  lb.classList.remove('is-open');
  lightboxOpen = false;
  document.body.style.overflow = '';
  if (lenis) lenis.start();
  setTimeout(() => { if (!lightboxOpen) lb.hidden = true; }, reduceMotion ? 0 : 450);
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}

function stepLightbox(d) {
  lbIndex = (lbIndex + d + WORKS.length) % WORKS.length;
  lb.classList.remove('is-open');
  fillLightbox();
  requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('is-open')));
}

$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPrev').addEventListener('click', () => stepLightbox(-1));
$('#lbNext').addEventListener('click', () => stepLightbox(1));
document.addEventListener('keydown', (e) => {
  if (!lightboxOpen) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

/* ---------- cursor ---------- */
const cursor = $('#cursor');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.setProperty('--x', e.clientX + 'px');
    cursor.style.setProperty('--y', e.clientY + 'px');
    cursor.classList.toggle('is-active', !lightboxOpen && !!e.target.closest('.exhibit__frame'));
  }, { passive: true });
  document.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
}

/* ---------- language ---------- */
function applyLang(next) {
  lang = next;
  try { localStorage.setItem('lang', lang); } catch (e) {}
  document.documentElement.lang = lang;
  document.title = I18N[lang].title;
  const touch = window.matchMedia('(hover: none)').matches;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = touch && el.dataset.i18n === 'worksHint' ? 'worksHintTouch' : el.dataset.i18n;
    const v = I18N[lang][key];
    if (v != null) el.textContent = v.replace('{n}', WORKS.length);
  });
  document.querySelectorAll('[data-lang]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
  renderMarquee();
  renderWorks();
  // already-seen exhibits shouldn't animate again after a language switch
  if (document.body.classList.contains('is-loaded')) {
    track.querySelectorAll('.reveal').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.left < window.innerWidth) el.classList.add('is-in');
    });
  }
  updateGallery();
  if (lightboxOpen) fillLightbox();
}

document.querySelectorAll('[data-lang]').forEach((b) => {
  b.addEventListener('click', () => { if (b.dataset.lang !== lang) applyLang(b.dataset.lang); });
});

/* ---------- loop ---------- */
function tick(t) {
  if (lenis) lenis.raf(t);
  updateGallery();
  updateHeader();
  requestAnimationFrame(tick);
}

window.addEventListener('resize', () => {
  layoutGallery();
  track.querySelectorAll('.exhibit__view img').forEach(measureShift);
});

$('#year').textContent = new Date().getFullYear();
applyLang(lang);
observeReveals();
requestAnimationFrame(() => document.body.classList.add('is-loaded'));
requestAnimationFrame(tick);
// fonts change card widths, so re-measure once they arrive
if (document.fonts) document.fonts.ready.then(layoutGallery);
