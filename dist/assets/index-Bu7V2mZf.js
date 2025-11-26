(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();const u=[{code:"en",label:"English"},{code:"pl",label:"Polski"}],d="mstaroniewski.locale";new URL("../images/1.png",import.meta.url).href,new URL("../images/6.png",import.meta.url).href,new URL("../images/7.png",import.meta.url).href;const o={languageButtons:Array.from(document.querySelectorAll("[data-locale-button]")),nav:document.getElementById("primary-nav"),brandEyebrow:document.querySelector('[data-slot="brand-eyebrow"]'),brandTitle:document.querySelector('[data-slot="brand-title"]'),brandTagline:document.querySelector('[data-slot="brand-tagline"]'),aboutEyebrow:document.querySelector('[data-slot="about-eyebrow"]'),aboutTitle:document.querySelector('[data-slot="about-title"]'),aboutSubtitle:document.querySelector('[data-slot="about-subtitle"]'),aboutIntro:document.querySelector('[data-slot="about-intro"]'),aboutParagraphs:document.getElementById("about-paragraphs"),aboutHighlights:document.getElementById("about-highlights"),aboutStats:document.getElementById("about-stats"),projectsHead:{eyebrow:document.querySelector('[data-slot="projects-eyebrow"]'),title:document.querySelector('[data-slot="projects-title"]'),subtitle:document.querySelector('[data-slot="projects-subtitle"]')},projectTabs:Array.from(document.querySelectorAll(".project-tab")),projectPanels:Array.from(document.querySelectorAll(".project-panel")),tabLabels:{published:document.querySelector('[data-slot="tab-published-label"]'),gamejam:document.querySelector('[data-slot="tab-gamejam-label"]'),private:document.querySelector('[data-slot="tab-private-label"]')},publishedSubtitle:document.querySelector('[data-slot="published-subtitle"]'),publishedGrid:document.getElementById("published-grid"),gamejamSubtitle:document.querySelector('[data-slot="gamejam-subtitle"]'),gamejamGrid:document.getElementById("gamejam-grid"),privateSubtitle:document.querySelector('[data-slot="private-subtitle"]'),privateGrid:document.getElementById("private-grid"),skillsHead:{eyebrow:document.querySelector('[data-slot="skills-eyebrow"]'),title:document.querySelector('[data-slot="skills-title"]'),subtitle:document.querySelector('[data-slot="skills-subtitle"]')},skillsGrid:document.getElementById("skills-grid"),codeHead:{eyebrow:document.querySelector('[data-slot="code-eyebrow"]'),title:document.querySelector('[data-slot="code-title"]'),subtitle:document.querySelector('[data-slot="code-subtitle"]')},codeShowcase:document.getElementById("code-showcase"),experienceHead:{eyebrow:document.querySelector('[data-slot="experience-eyebrow"]'),title:document.querySelector('[data-slot="experience-title"]'),subtitle:document.querySelector('[data-slot="experience-subtitle"]')},experienceList:document.getElementById("experience-list"),contact:{eyebrow:document.querySelector('[data-slot="contact-eyebrow"]'),title:document.querySelector('[data-slot="contact-title"]'),subtitle:document.querySelector('[data-slot="contact-subtitle"]'),list:document.getElementById("contact-list"),cta:document.getElementById("contact-cta")},footer:{text:document.querySelector('[data-slot="footer-text"]'),legal:document.querySelector('[data-slot="footer-legal"]')}};function g(){const e=document.getElementById("year");e&&(e.textContent=new Date().getFullYear())}function f(){const e=document.querySelector(".site-nav");e&&(e.addEventListener("focusin",()=>e.classList.add("focused")),e.addEventListener("focusout",()=>e.classList.remove("focused")))}function y(){!o.projectTabs||o.projectTabs.length===0||o.projectTabs.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;h(t)})})}function h(e){o.projectTabs.forEach(t=>{const n=t.dataset.tab===e;t.classList.toggle("project-tab--active",n),t.setAttribute("aria-selected",String(n))}),o.projectPanels.forEach(t=>{const n=t.dataset.panel===e;t.classList.toggle("project-panel--hidden",!n)})}function b(e){const t=(e||"").toLowerCase(),n=t.split("-")[0],r=u.map(i=>i.code);return r.includes(t)?t:r.includes(n)?n:u[0].code}async function S(e){const t=`/locales/${e}.json?cache-bust=${Date.now()}`,n=await fetch(t);if(!n.ok)throw new Error(`Unable to load locale ${e}: ${n.status}`);return n.json()}function v(e=[]){o.nav&&(o.nav.innerHTML=e.map(t=>`<a href="${t.href}">${t.label}</a>`).join(""))}function s(e,t=[],n=r=>r){e&&(e.innerHTML=t.map((r,i)=>n(r,i)).join(""))}function w(e=[]){s(o.aboutParagraphs,e,t=>`<p>${t}</p>`)}function x(e=[]){s(o.aboutHighlights,e,t=>`<li>${t}</li>`)}function L(e=[]){s(o.aboutStats,e,t=>`
      <article class="stat-card">
        <span class="stat-card__value">${t.value??""}</span>
        <p>${t.label??""}</p>
      </article>
    `)}function c(e,t=[],n={role:"Role:",keyContributions:"Key Contributions:",viewOnSteam:"View on Steam"}){s(e,t,r=>`
      <article class="service-card game-card">
        <header>
          <span class="badge">${r.badge??""}</span>
          <h4>${r.title??""}</h4>
        </header>
        <p class="game-card__description">${r.description??""}</p>
        ${r.role?`
          <div class="game-card__role">
            <strong>${n.role}</strong> ${r.role}
          </div>
        `:""}
        ${r.responsibilities&&r.responsibilities.length>0?`
          <div class="game-card__responsibilities">
            <strong>${n.keyContributions}</strong>
            <ul>
              ${r.responsibilities.map(i=>`<li>${i}</li>`).join("")}
            </ul>
          </div>
        `:""}
        ${r.specs&&r.specs.length>0?`
          <div class="game-card__specs">
            <ul>
              ${r.specs.map(i=>`<li>${i}</li>`).join("")}
            </ul>
          </div>
        `:""}
        ${r.link?`
          <div class="game-card__link">
            <a href="${r.link}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">${n.viewOnSteam}</a>
          </div>
        `:""}
      </article>
    `)}function j(e=[]){s(o.skillsGrid,e,t=>`
      <div class="skill-category">
        <h4 class="skill-category__name">${t.name??""}</h4>
        <div class="skill-tags">
          ${(t.items||[]).map(n=>`<span class="skill-tag">${n}</span>`).join("")}
        </div>
      </div>
    `)}function C(e=[]){s(o.codeShowcase,e,t=>`
      <article class="code-snippet">
        <header class="code-snippet__header">
          <h4>${t.title??""}</h4>
          <span class="badge badge--code">${t.language??""}</span>
        </header>
        <p class="code-snippet__description">${t.description??""}</p>
        <pre class="code-snippet__code"><code>${E(t.code??"")}</code></pre>
      </article>
    `)}function E(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function $(e=[]){s(o.experienceList,e,t=>`<li>${t}</li>`)}function q(e=[]){s(o.contact.list,e,t=>`<li>${t}</li>`)}function k(e,t){document.documentElement.lang=t;const n=e?.site?.title;n&&(document.title=n,o.brandTitle.textContent=n),o.brandEyebrow&&e?.site?.eyebrow&&(o.brandEyebrow.textContent=e.site.eyebrow),o.brandTagline&&e?.site?.tagline&&(o.brandTagline.textContent=e.site.tagline),e?.about&&(o.aboutEyebrow.textContent=e.about.eyebrow??"",o.aboutTitle.textContent=e.about.title??"",o.aboutSubtitle.textContent=e.about.subtitle??"",o.aboutIntro.textContent=e.about.intro??"",w(e.about.paragraphs),x(e.about.highlights),L(e.about.stats)),e?.nav&&v(e.nav),e?.projects&&(o.projectsHead.eyebrow.textContent=e.projects.eyebrow??"",o.projectsHead.title.textContent=e.projects.title??"",o.projectsHead.subtitle.textContent=e.projects.subtitle??""),e?.published&&(o.publishedSubtitle&&(o.publishedSubtitle.textContent=e.published.subtitle??""),o.tabLabels.published&&(o.tabLabels.published.textContent=e.published.tabLabel??"Published"),c(o.publishedGrid,e.published.cards,e.ui)),e?.gamejam&&(o.gamejamSubtitle&&(o.gamejamSubtitle.textContent=e.gamejam.subtitle??""),o.tabLabels.gamejam&&(o.tabLabels.gamejam.textContent=e.gamejam.tabLabel??"Game Jams"),c(o.gamejamGrid,e.gamejam.cards,e.ui)),e?.private&&(o.privateSubtitle&&(o.privateSubtitle.textContent=e.private.subtitle??""),o.tabLabels.private&&(o.tabLabels.private.textContent=e.private.tabLabel??"Personal"),c(o.privateGrid,e.private.cards,e.ui)),e?.skills&&(o.skillsHead.eyebrow.textContent=e.skills.eyebrow??"",o.skillsHead.title.textContent=e.skills.title??"",o.skillsHead.subtitle.textContent=e.skills.subtitle??"",j(e.skills.categories)),e?.code&&(o.codeHead.eyebrow.textContent=e.code.eyebrow??"",o.codeHead.title.textContent=e.code.title??"",o.codeHead.subtitle.textContent=e.code.subtitle??"",C(e.code.snippets)),e?.experience&&(o.experienceHead.eyebrow.textContent=e.experience.eyebrow??"",o.experienceHead.title.textContent=e.experience.title??"",o.experienceHead.subtitle.textContent=e.experience.subtitle??"",$(e.experience.points)),e?.contact&&(o.contact.eyebrow.textContent=e.contact.eyebrow??"",o.contact.title.textContent=e.contact.title??"",o.contact.subtitle.textContent=e.contact.subtitle??"",q(e.contact.bullets),o.contact.cta&&e.contact.cta&&(o.contact.cta.textContent=e.contact.cta.label,o.contact.cta.href=e.contact.cta.href)),e?.footer&&(o.footer.text.textContent=e.footer.text??"",o.footer.legal.innerHTML=`${e.footer.legal??""} <span id="year">${new Date().getFullYear()}</span>`)}function p(e){!o.languageButtons||o.languageButtons.length===0||o.languageButtons.forEach(t=>{const n=t.dataset.localeButton===e;t.classList.toggle("is-active",n),t.setAttribute("aria-pressed",String(n))})}async function m(e){const t=b(e);try{const n=await S(t);k(n,t),localStorage.setItem(d,t),p(t),console.info(`Locale ready: ${t}`)}catch(n){console.error(n)}}function H(e){!o.languageButtons||o.languageButtons.length===0||(o.languageButtons.forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.localeButton;n&&m(n)})}),p(e))}function B(){g(),f(),y();const e=localStorage.getItem(d),t=navigator.language||navigator.userLanguage,n=b(e||t);H(n),m(n)}document.addEventListener("DOMContentLoaded",B);
