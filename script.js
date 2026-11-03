const content = window.CAMP_CONTENT;

function setText(selector, value, allowHtml = false) {
  document.querySelectorAll(selector).forEach((element) => {
    if (allowHtml) element.innerHTML = value;
    else element.textContent = value;
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCamp() {
  const { camp, gallery, itinerary, marquee, members, quotes } = content;
  setText("[data-camp-short-title]", camp.shortTitle);
  setText("[data-camp-kicker]", camp.kicker);
  setText("[data-camp-title]", camp.title, true);
  setText("[data-camp-intro]", camp.intro);
  setText("[data-camp-date]", camp.date);
  setText("[data-camp-location]", camp.location);
  setText("[data-camp-note]", camp.note, true);
  setText("[data-camp-story]", camp.story);
  setText("[data-stat-days]", camp.days);
  setText("[data-stat-members]", members.length);
  setText("[data-current-year]", new Date().getFullYear());

  const cover = document.querySelector("[data-camp-cover]");
  cover.src = camp.cover;
  cover.alt = camp.coverAlt;

  const marqueeItems = [...marquee, ...marquee];
  document.querySelector("[data-marquee]").innerHTML = marqueeItems.map((item) => `
    <span>${escapeHtml(item)} <i aria-hidden="true">✦</i></span>
  `).join("");

  document.querySelector("[data-itinerary]").innerHTML = itinerary.map((day) => `
    <article class="day-card reveal">
      <header><span>${escapeHtml(day.day)}</span><h3>${escapeHtml(day.title)}</h3></header>
      <ol>
        ${day.items.map((item) => `
          <li><time>${escapeHtml(item.time)}</time><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></div></li>
        `).join("")}
      </ol>
    </article>
  `).join("");

  document.querySelector("[data-gallery]").innerHTML = gallery.map((item, index) => `
    <figure class="gallery-card reveal">
      <button class="gallery-button" type="button" data-gallery-index="${index}" aria-label="放大檢視：${escapeHtml(item.title)}">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" loading="lazy" />
      </button>
      <figcaption><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.caption)}</span></figcaption>
    </figure>
  `).join("");

  document.querySelector("[data-quotes]").innerHTML = quotes.slice(0, 3).map((quote, index) => `
    <blockquote class="quote-card reveal"><span>0${index + 1}</span><p>「${escapeHtml(quote)}」</p></blockquote>
  `).join("");

  document.querySelector("[data-members]").innerHTML = members.map((name, index) => `
    <li class="name-tag reveal"><span class="hello">HELLO, I'M</span><strong>${escapeHtml(name)}</strong><span class="name-index">NO. ${String(index + 1).padStart(2, "0")}</span></li>
  `).join("");
}

function setupLightbox() {
  const dialog = document.querySelector("[data-lightbox]");
  const image = dialog.querySelector("[data-lightbox-image]");
  const title = dialog.querySelector("[data-lightbox-title]");
  const caption = dialog.querySelector("[data-lightbox-caption]");

  document.querySelector("[data-gallery]").addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-index]");
    if (!button) return;
    const item = content.gallery[Number(button.dataset.galleryIndex)];
    image.src = item.image;
    image.alt = item.alt;
    title.textContent = item.title;
    caption.textContent = item.caption;
    dialog.showModal();
  });

  dialog.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
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
  }, { threshold: 0.1 });
  elements.forEach((element) => observer.observe(element));
}

renderCamp();
setupLightbox();
setupReveal();
