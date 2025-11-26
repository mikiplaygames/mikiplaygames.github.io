const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' }
];
const STORAGE_KEY = 'mstaroniewski.locale';

const portfolioImageMap = {
  '/images/1.png': new URL('../images/1.png', import.meta.url).href,
  '/images/6.png': new URL('../images/6.png', import.meta.url).href,
  '/images/7.png': new URL('../images/7.png', import.meta.url).href,
};

const selectors = {
  languageButtons: Array.from(document.querySelectorAll('[data-locale-button]')),
  nav: document.getElementById('primary-nav'),
  brandEyebrow: document.querySelector('[data-slot="brand-eyebrow"]'),
  brandTitle: document.querySelector('[data-slot="brand-title"]'),
  brandTagline: document.querySelector('[data-slot="brand-tagline"]'),
  heroEyebrow: document.querySelector('[data-slot="hero-eyebrow"]'),
  heroTitle: document.querySelector('[data-slot="hero-title"]'),
  heroSubtitle: document.querySelector('[data-slot="hero-subtitle"]'),
  heroBullets: document.getElementById('hero-bullets'),
  heroStats: document.getElementById('hero-stats'),
  heroCtaPrimary: document.getElementById('hero-cta-primary'),
  heroCtaSecondary: document.getElementById('hero-cta-secondary'),
  gamesHead: {
    eyebrow: document.querySelector('[data-slot="games-eyebrow"]'),
    title: document.querySelector('[data-slot="games-title"]'),
    subtitle: document.querySelector('[data-slot="games-subtitle"]')
  },
  gamesGrid: document.getElementById('games-grid'),
  skillsHead: {
    eyebrow: document.querySelector('[data-slot="skills-eyebrow"]'),
    title: document.querySelector('[data-slot="skills-title"]'),
    subtitle: document.querySelector('[data-slot="skills-subtitle"]')
  },
  skillsGrid: document.getElementById('skills-grid'),
  codeHead: {
    eyebrow: document.querySelector('[data-slot="code-eyebrow"]'),
    title: document.querySelector('[data-slot="code-title"]'),
    subtitle: document.querySelector('[data-slot="code-subtitle"]')
  },
  codeShowcase: document.getElementById('code-showcase'),
  experienceHead: {
    eyebrow: document.querySelector('[data-slot="experience-eyebrow"]'),
    title: document.querySelector('[data-slot="experience-title"]'),
    subtitle: document.querySelector('[data-slot="experience-subtitle"]')
  },
  experienceList: document.getElementById('experience-list'),
  contact: {
    eyebrow: document.querySelector('[data-slot="contact-eyebrow"]'),
    title: document.querySelector('[data-slot="contact-title"]'),
    subtitle: document.querySelector('[data-slot="contact-subtitle"]'),
    list: document.getElementById('contact-list'),
    cta: document.getElementById('contact-cta')
  },
  footer: {
    text: document.querySelector('[data-slot="footer-text"]'),
    legal: document.querySelector('[data-slot="footer-legal"]')
  }
};

function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function setupNavFocus() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  nav.addEventListener('focusin', () => nav.classList.add('focused'));
  nav.addEventListener('focusout', () => nav.classList.remove('focused'));
}

function normalizeLocale(input) {
  const lower = (input || '').toLowerCase();
  const short = lower.split('-')[0];
  const supportedCodes = SUPPORTED_LOCALES.map(l => l.code);
  if (supportedCodes.includes(lower)) return lower;
  if (supportedCodes.includes(short)) return short;
  return SUPPORTED_LOCALES[0].code;
}

async function loadLocale(locale) {
  const basePath = import.meta.env.BASE_URL ?? '/';
  const url = `${basePath.replace(/\/$/, '')}/locales/${locale}.json?cache-bust=${Date.now()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unable to load locale ${locale}: ${response.status}`);
  }
  return response.json();
}

function renderNavigation(navItems = []) {
  if (!selectors.nav) return;
  selectors.nav.innerHTML = navItems
    .map(item => `<a href="${item.href}">${item.label}</a>`)
    .join('');
}

function renderList(listEl, items = [], formatter = text => text) {
  if (!listEl) return;
  listEl.innerHTML = items.map((item, index) => formatter(item, index)).join('');
}

function renderHeroBullets(bullets = []) {
  renderList(selectors.heroBullets, bullets, bullet => `<li>${bullet}</li>`);
}

function renderHeroStats(stats = []) {
  renderList(
    selectors.heroStats,
    stats,
    stat => `
      <article class="stat-card">
        <span class="stat-card__value">${stat.value ?? ''}</span>
        <p>${stat.label ?? ''}</p>
      </article>
    `
  );
}

function renderServices(cards = []) {
  renderList(
    selectors.gamesGrid,
    cards,
    card => `
      <article class="service-card game-card">
        <header>
          <span class="badge">${card.badge ?? ''}</span>
          <h4>${card.title ?? ''}</h4>
        </header>
        <p>${card.description ?? ''}</p>
        <ul>
          ${(card.specs || []).map(spec => `<li>${spec}</li>`).join('')}
        </ul>
      </article>
    `
  );
}

function renderSkills(categories = []) {
  renderList(
    selectors.skillsGrid,
    categories,
    category => `
      <div class="skill-category">
        <h4 class="skill-category__name">${category.name ?? ''}</h4>
        <div class="skill-tags">
          ${(category.items || []).map(item => `<span class="skill-tag">${item}</span>`).join('')}
        </div>
      </div>
    `
  );
}

function renderCodeShowcase(snippets = []) {
  renderList(
    selectors.codeShowcase,
    snippets,
    snippet => `
      <article class="code-snippet">
        <header class="code-snippet__header">
          <h4>${snippet.title ?? ''}</h4>
          <span class="badge badge--code">${snippet.language ?? ''}</span>
        </header>
        <p class="code-snippet__description">${snippet.description ?? ''}</p>
        <pre class="code-snippet__code"><code>${escapeHtml(snippet.code ?? '')}</code></pre>
      </article>
    `
  );
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderExperience(points = []) {
  renderList(selectors.experienceList, points, point => `<li>${point}</li>`);
}

function renderContactList(bullets = []) {
  renderList(selectors.contact.list, bullets, bullet => `<li>${bullet}</li>`);
}

function applyLocaleToDom(data, localeCode) {
  document.documentElement.lang = localeCode;
  const title = data?.site?.title;
  if (title) {
    document.title = title;
    selectors.brandTitle.textContent = title;
  }
  if (selectors.brandEyebrow && data?.site?.eyebrow) {
    selectors.brandEyebrow.textContent = data.site.eyebrow;
  }
  if (selectors.brandTagline && data?.site?.tagline) {
    selectors.brandTagline.textContent = data.site.tagline;
  }

  if (data?.hero) {
    selectors.heroEyebrow.textContent = data.hero.eyebrow ?? '';
    selectors.heroTitle.textContent = data.hero.title ?? '';
    selectors.heroSubtitle.textContent = data.hero.subtitle ?? '';
    renderHeroBullets(data.hero.bullets);
    renderHeroStats(data.hero.stats);
    if (selectors.heroCtaPrimary && data.hero.ctaPrimary) {
      selectors.heroCtaPrimary.textContent = data.hero.ctaPrimary.label;
      selectors.heroCtaPrimary.href = data.hero.ctaPrimary.href;
    }
    if (selectors.heroCtaSecondary && data.hero.ctaSecondary) {
      selectors.heroCtaSecondary.textContent = data.hero.ctaSecondary.label;
      selectors.heroCtaSecondary.href = data.hero.ctaSecondary.href;
    }
  }

  if (data?.nav) renderNavigation(data.nav);

  if (data?.games) {
    selectors.gamesHead.eyebrow.textContent = data.games.eyebrow ?? '';
    selectors.gamesHead.title.textContent = data.games.title ?? '';
    selectors.gamesHead.subtitle.textContent = data.games.subtitle ?? '';
    renderServices(data.games.cards);
  }

  if (data?.skills) {
    selectors.skillsHead.eyebrow.textContent = data.skills.eyebrow ?? '';
    selectors.skillsHead.title.textContent = data.skills.title ?? '';
    selectors.skillsHead.subtitle.textContent = data.skills.subtitle ?? '';
    renderSkills(data.skills.categories);
  }

  if (data?.code) {
    selectors.codeHead.eyebrow.textContent = data.code.eyebrow ?? '';
    selectors.codeHead.title.textContent = data.code.title ?? '';
    selectors.codeHead.subtitle.textContent = data.code.subtitle ?? '';
    renderCodeShowcase(data.code.snippets);
  }

  if (data?.experience) {
    selectors.experienceHead.eyebrow.textContent = data.experience.eyebrow ?? '';
    selectors.experienceHead.title.textContent = data.experience.title ?? '';
    selectors.experienceHead.subtitle.textContent = data.experience.subtitle ?? '';
    renderExperience(data.experience.points);
  }

  if (data?.contact) {
    selectors.contact.eyebrow.textContent = data.contact.eyebrow ?? '';
    selectors.contact.title.textContent = data.contact.title ?? '';
    selectors.contact.subtitle.textContent = data.contact.subtitle ?? '';
    renderContactList(data.contact.bullets);
    if (selectors.contact.cta && data.contact.cta) {
      selectors.contact.cta.textContent = data.contact.cta.label;
      selectors.contact.cta.href = data.contact.cta.href;
    }
  }

  if (data?.footer) {
    selectors.footer.text.textContent = data.footer.text ?? '';
    selectors.footer.legal.innerHTML = `${data.footer.legal ?? ''} <span id="year">${new Date().getFullYear()}</span>`;
  }
}

function setActiveLanguageButton(locale) {
  if (!selectors.languageButtons || selectors.languageButtons.length === 0) return;
  selectors.languageButtons.forEach(btn => {
    const isActive = btn.dataset.localeButton === locale;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

async function switchLocale(nextLocale) {
  const locale = normalizeLocale(nextLocale);
  try {
    const payload = await loadLocale(locale);
    applyLocaleToDom(payload, locale);
    localStorage.setItem(STORAGE_KEY, locale);
    setActiveLanguageButton(locale);
    console.info(`Locale ready: ${locale}`);
  } catch (error) {
    console.error(error);
  }
}

function initLanguageToggle(currentLocale) {
  if (!selectors.languageButtons || selectors.languageButtons.length === 0) return;
  selectors.languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLocale = btn.dataset.localeButton;
      if (targetLocale) {
        switchLocale(targetLocale);
      }
    });
  });
  setActiveLanguageButton(currentLocale);
}

function init() {
  setCurrentYear();
  setupNavFocus();
  const stored = localStorage.getItem(STORAGE_KEY);
  const browser = navigator.language || navigator.userLanguage;
  const initialLocale = normalizeLocale(stored || browser);
  initLanguageToggle(initialLocale);
  switchLocale(initialLocale);
}

document.addEventListener('DOMContentLoaded', init);

