function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeImagePath(path, fallback) {
  return typeof path === "string" && /^img\/[a-zA-Z0-9_./-]+$/.test(path) ? path : fallback;
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function renderSite(data) {
  const fallbackPortrait = "img/person-placeholder.svg";
  const site = data.site ?? {};
  const participants = Array.isArray(data.participants) ? data.participants : [];
  const activityPhotos = Array.isArray(data.activityPhotos) ? data.activityPhotos : [];

  setText("[data-site-kicker]", site.kicker ?? "FELLOWSHIP CAMP");
  setText("[data-site-title]", site.title ?? "逃離日常");
  setText("[data-site-subtitle]", site.subtitle ?? "多認識一個人，多跨出一步，多留下一段回憶。一起玩，也一起成為更靠近的團契。");
  setText("[data-participant-count]", participants.length);
  setText("[data-current-year]", new Date().getFullYear());

  const cover = document.querySelector("[data-site-cover]");
  cover.src = safeImagePath(site.cover, "img/cover.svg");

  const participantRoot = document.querySelector("[data-participants]");
  participantRoot.innerHTML = participants.map((person, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `
      <article class="participant-story ${index % 2 ? "is-reversed" : ""}">
        <div class="portrait-frame reveal">
          <div class="portrait-parallax" data-photo-parallax>
            <img src="${escapeHtml(safeImagePath(person.photo, fallbackPortrait))}" alt="${escapeHtml(person.name ?? "參加者")}的照片" loading="${index < 2 ? "eager" : "lazy"}" />
          </div>
          <span class="portrait-number" aria-hidden="true">${number}</span>
        </div>
        <div class="participant-copy reveal">
          <span class="participant-label">PARTICIPANT ${number}</span>
          <h3>${escapeHtml(person.name ?? "尚未填寫姓名")}</h3>
          <p>${escapeHtml(person.intro ?? "這裡可以放一段簡單介紹。")}</p>
          <span class="participant-line" aria-hidden="true"></span>
        </div>
      </article>
    `;
  }).join("");

  const repeatedPhotos = [...activityPhotos, ...activityPhotos];
  document.querySelector("[data-photo-track]").innerHTML = repeatedPhotos.map((photo, index) => `
    <figure class="memory-card" ${index >= activityPhotos.length ? 'aria-hidden="true"' : ""}>
      <img src="${escapeHtml(safeImagePath(photo.src, "img/memory-01.svg"))}" alt="${index >= activityPhotos.length ? "" : escapeHtml(photo.alt ?? "活動照片")}" loading="lazy" />
      <figcaption>${escapeHtml(photo.caption ?? "活動回憶")}</figcaption>
    </figure>
  `).join("");
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  elements.forEach((element) => observer.observe(element));
}

function setupParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const heroLayers = [...document.querySelectorAll("[data-depth]")];
  const portraits = [...document.querySelectorAll("[data-photo-parallax]")];
  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY;
    heroLayers.forEach((layer) => {
      const depth = Number(layer.dataset.depth) || 0;
      layer.style.setProperty("--parallax-y", `${scrollTop * depth}px`);
    });

    const viewportCenter = window.innerHeight / 2;
    const strength = window.innerWidth < 700 ? 0.035 : 0.07;
    portraits.forEach((portrait) => {
      const rect = portrait.parentElement.getBoundingClientRect();
      const distance = rect.top + rect.height / 2 - viewportCenter;
      const offset = Math.max(-55, Math.min(55, distance * strength));
      portrait.style.setProperty("--portrait-y", `${offset}px`);
    });
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  update();
}

async function init() {
  try {
    const response = await fetch("data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    renderSite(data);
    setupReveal();
    setupParallax();
  } catch (error) {
    console.error("Unable to load data.json", error);
    document.querySelector("[data-load-error]").hidden = false;
  }
}

init();
