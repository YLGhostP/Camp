const content = window.CAMP_CONTENT;

function setText(selector, value, allowHtml = false) {
  document.querySelectorAll(selector).forEach((element) => {
    if (allowHtml) element.innerHTML = value;
    else element.textContent = value;
  });
}

function renderCamp() {
  const { camp, gallery, members } = content;
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

  const galleryRoot = document.querySelector("[data-gallery]");
  galleryRoot.innerHTML = gallery.map((item, index) => `
    <figure class="gallery-card reveal">
      <button class="gallery-button" type="button" data-gallery-index="${index}" aria-label="放大檢視：${item.title}">
        <img src="${item.image}" alt="${item.alt}" loading="lazy" />
      </button>
      <figcaption><strong>${item.title}</strong><span>${item.caption}</span></figcaption>
    </figure>
  `).join("");

  const memberRoot = document.querySelector("[data-members]");
  memberRoot.innerHTML = members.map((member, index) => `
    <li class="member reveal">
      <span class="member-index">${String(index + 1).padStart(2, "0")}</span>
      <strong>${member.name}</strong>
      <span>${member.role}</span>
    </li>
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
  }, { threshold: 0.12 });
  elements.forEach((element) => observer.observe(element));
}

renderCamp();
setupLightbox();
setupReveal();
