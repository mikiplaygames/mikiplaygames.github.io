const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' }
];
const STORAGE_KEY = 'mikiheaddev.locale';

// const portfolioImageMap = {
//   '/images/1.png': new URL('../images/1.png', import.meta.url).href,
//   '/images/6.png': new URL('../images/6.png', import.meta.url).href,
//   '/images/7.png': new URL('../images/7.png', import.meta.url).href,
// };

const selectors = {
  languageButtons: Array.from(document.querySelectorAll('[data-locale-button]')),
  nav: document.getElementById('primary-nav'),
  brandEyebrow: document.querySelector('[data-slot="brand-eyebrow"]'),
  brandTitle: document.querySelector('[data-slot="brand-title"]'),
  brandTagline: document.querySelector('[data-slot="brand-tagline"]'),
  aboutEyebrow: document.querySelector('[data-slot="about-eyebrow"]'),
  aboutTitle: document.querySelector('[data-slot="about-title"]'),
  aboutSubtitle: document.querySelector('[data-slot="about-subtitle"]'),
  aboutIntro: document.querySelector('[data-slot="about-intro"]'),
  aboutParagraphs: document.getElementById('about-paragraphs'),
  aboutHighlights: document.getElementById('about-highlights'),
  aboutStats: document.getElementById('about-stats'),
  projectsHead: {
    eyebrow: document.querySelector('[data-slot="projects-eyebrow"]'),
    title: document.querySelector('[data-slot="projects-title"]'),
    subtitle: document.querySelector('[data-slot="projects-subtitle"]')
  },
  projectTabs: Array.from(document.querySelectorAll('.project-tab')),
  projectPanels: Array.from(document.querySelectorAll('.project-panel')),
  tabLabels: {
    published: document.querySelector('[data-slot="tab-published-label"]'),
    gamejam: document.querySelector('[data-slot="tab-gamejam-label"]'),
    private: document.querySelector('[data-slot="tab-private-label"]')
  },
  publishedSubtitle: document.querySelector('[data-slot="published-subtitle"]'),
  publishedGrid: document.getElementById('published-grid'),
  gamejamSubtitle: document.querySelector('[data-slot="gamejam-subtitle"]'),
  gamejamGrid: document.getElementById('gamejam-grid'),
  privateSubtitle: document.querySelector('[data-slot="private-subtitle"]'),
  privateGrid: document.getElementById('private-grid'),
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

function setupProjectTabs() {
  if (!selectors.projectTabs || selectors.projectTabs.length === 0) return;
  
  selectors.projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      switchProjectTab(targetTab);
    });
  });
}

function switchProjectTab(tabName) {
  // Update tabs
  selectors.projectTabs.forEach(tab => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle('project-tab--active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  // Update panels
  selectors.projectPanels.forEach(panel => {
    const isActive = panel.dataset.panel === tabName;
    panel.classList.toggle('project-panel--hidden', !isActive);
  });
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
  const url = `$/locales/${locale}.json}`;
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

function renderAboutParagraphs(paragraphs = []) {
  renderList(selectors.aboutParagraphs, paragraphs, p => `<p>${p}</p>`);
}

function renderAboutHighlights(highlights = []) {
  renderList(selectors.aboutHighlights, highlights, item => `<li>${item}</li>`);
}

function renderAboutStats(stats = []) {
  renderList(
    selectors.aboutStats,
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

function renderGameCards(gridElement, cards = [], labels = { role: 'Role:', keyContributions: 'Key Contributions:', viewOnSteam: 'View on Steam' }) {
  renderList(
    gridElement,
    cards,
    card => `
      <article class="service-card game-card">
        <header>
          <span class="badge">${card.badge ?? ''}</span>
          <h4>${card.title ?? ''}</h4>
        </header>
        <p class="game-card__description">${card.description ?? ''}</p>
        ${card.role ? `
          <div class="game-card__role">
            <strong>${labels.role}</strong> ${card.role}
          </div>
        ` : ''}
        ${card.responsibilities && card.responsibilities.length > 0 ? `
          <div class="game-card__responsibilities">
            <strong>${labels.keyContributions}</strong>
            <ul>
              ${card.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${card.specs && card.specs.length > 0 ? `
          <div class="game-card__specs">
            <ul>
              ${card.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${card.link ? `
          <div class="game-card__link">
            <a href="${card.link}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">${labels.viewOnSteam}</a>
          </div>
        ` : ''}
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

  if (data?.about) {
    selectors.aboutEyebrow.textContent = data.about.eyebrow ?? '';
    selectors.aboutTitle.textContent = data.about.title ?? '';
    selectors.aboutSubtitle.textContent = data.about.subtitle ?? '';
    selectors.aboutIntro.textContent = data.about.intro ?? '';
    renderAboutParagraphs(data.about.paragraphs);
    renderAboutHighlights(data.about.highlights);
    renderAboutStats(data.about.stats);
  }

  if (data?.nav) renderNavigation(data.nav);

  if (data?.projects) {
    selectors.projectsHead.eyebrow.textContent = data.projects.eyebrow ?? '';
    selectors.projectsHead.title.textContent = data.projects.title ?? '';
    selectors.projectsHead.subtitle.textContent = data.projects.subtitle ?? '';
  }

  if (data?.published) {
    if (selectors.publishedSubtitle) {
      selectors.publishedSubtitle.textContent = data.published.subtitle ?? '';
    }
    if (selectors.tabLabels.published) {
      selectors.tabLabels.published.textContent = data.published.tabLabel ?? 'Published';
    }
    renderGameCards(selectors.publishedGrid, data.published.cards, data.ui);
  }

  if (data?.gamejam) {
    if (selectors.gamejamSubtitle) {
      selectors.gamejamSubtitle.textContent = data.gamejam.subtitle ?? '';
    }
    if (selectors.tabLabels.gamejam) {
      selectors.tabLabels.gamejam.textContent = data.gamejam.tabLabel ?? 'Game Jams';
    }
    renderGameCards(selectors.gamejamGrid, data.gamejam.cards, data.ui);
  }

  if (data?.private) {
    if (selectors.privateSubtitle) {
      selectors.privateSubtitle.textContent = data.private.subtitle ?? '';
    }
    if (selectors.tabLabels.private) {
      selectors.tabLabels.private.textContent = data.private.tabLabel ?? 'Personal';
    }
    renderGameCards(selectors.privateGrid, data.private.cards, data.ui);
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
  setupProjectTabs();
  const stored = localStorage.getItem(STORAGE_KEY);
  const browser = navigator.language || navigator.userLanguage;
  const initialLocale = normalizeLocale(stored || browser);
  initLanguageToggle(initialLocale);
  switchLocale(initialLocale);
}

document.addEventListener('DOMContentLoaded', init);

