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

function groupInPairs(items) {
  const pairs = [];
  for (let index = 0; index < items.length; index += 2) {
    pairs.push(items.slice(index, index + 2));
  }
  return pairs;
}

function renderParticipant(person, index) {
  const name = person.name ?? "尚未填寫姓名";
  return `
    <article class="participant-card">
      <figure class="participant-portrait">
        <img src="${escapeHtml(safeImagePath(person.photo, "img/cover.jpg"))}" alt="${escapeHtml(name)}的照片" loading="${index < 2 ? "eager" : "lazy"}" />
      </figure>
      <div class="participant-copy">
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(person.intro ?? "這裡可以放一段簡單介紹。")}</p>
        <i aria-hidden="true"></i>
      </div>
    </article>
  `;
}

function renderSite(data) {
  const site = data.site ?? {};
  const participants = Array.isArray(data.participants) ? data.participants : [];
  const activityPhotos = Array.isArray(data.activityPhotos) ? data.activityPhotos : [];

  setText("[data-site-title]", site.title ?? "逃離日常");
  setText("[data-site-subtitle]", site.subtitle ?? "多認識一個人，多跨出一步，多留下一段回憶，一起玩，也一起成為更靠近的團契");
  setText("[data-current-year]", new Date().getFullYear());

  document.querySelector("[data-site-cover]").src = safeImagePath(site.cover, "img/cover.jpg");

  let participantIndex = 0;
  const participantList = document.querySelector("[data-participants]");
  participantList.innerHTML = groupInPairs(participants).map((pair, pairIndex) => {
    const cards = pair.map((person) => renderParticipant(person, participantIndex++)).join("");
    return `<section class="participant-pair" aria-label="第 ${pairIndex + 1} 組參加者">${cards}</section>`;
  }).join("");
  participantList.setAttribute("aria-busy", "false");

  const repeatedPhotos = [...activityPhotos, ...activityPhotos];
  const photoTrack = document.querySelector("[data-photo-track]");
  photoTrack.style.setProperty("--marquee-duration", `${Math.max(64, activityPhotos.length * 2)}s`);
  photoTrack.innerHTML = repeatedPhotos.map((photo, index) => `
    <figure class="memory-card" ${index >= activityPhotos.length ? 'aria-hidden="true"' : ""}>
      <img src="${escapeHtml(safeImagePath(photo.src, "img/memory-01.jpg"))}" alt="${index >= activityPhotos.length ? "" : escapeHtml(photo.alt ?? "活動照片")}" loading="lazy" />
      <figcaption>${escapeHtml(photo.caption ?? "活動回憶")}</figcaption>
    </figure>
  `).join("");
}

function setupGsapAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  media.add(
    {
      desktop: "(min-width: 901px)",
      compact: "(max-width: 900px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { desktop, reduceMotion } = context.conditions;

      if (reduceMotion) {
        gsap.set(".participant-card, .hero-content > *", { clearProps: "all" });
        return;
      }

      gsap.from(".hero-content > *", {
        autoAlpha: 0,
        y: 34,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out"
      });

      gsap.to(".hero-photo-wrap", {
        yPercent: desktop ? 18 : 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".hero-content", {
        yPercent: desktop ? 10 : 5,
        autoAlpha: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom 20%",
          scrub: 0.8
        }
      });

      gsap.from(".participants-intro > *", {
        autoAlpha: 0,
        y: 44,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".participants-intro",
          start: "top 78%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.utils.toArray(".participant-pair").forEach((pair) => {
        const cards = gsap.utils.toArray(".participant-card", pair);
        const portraits = gsap.utils.toArray(".participant-portrait img", pair);

        gsap.set(cards, { transformOrigin: "50% 55%" });

        const pairTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: pair,
            start: "top 92%",
            end: "bottom 8%",
            scrub: 0.75
          }
        });

        pairTimeline
          .fromTo(
            cards,
            { autoAlpha: 0, y: desktop ? 90 : 45, scale: desktop ? 0.965 : 1 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.34, stagger: 0.06, ease: "none" }
          )
          .to(cards, { autoAlpha: 0.28, y: desktop ? -70 : -35, scale: desktop ? 0.97 : 1, duration: 0.28, stagger: 0.04, ease: "none" }, 0.72);

        gsap.fromTo(
          portraits,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: pair,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9
            }
          }
        );
      });

      gsap.from(".memories-heading > *", {
        autoAlpha: 0,
        y: 40,
        duration: 0.75,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".memories-heading",
          start: "top 78%",
          toggleActions: "play none none reverse"
        }
      });
    }
  );

  const images = [...document.images];
  const ready = images.map((image) => {
    if (image.complete) return Promise.resolve();
    if (typeof image.decode === "function") return image.decode().catch(() => undefined);
    return new Promise((resolve) => image.addEventListener("load", resolve, { once: true }));
  });
  Promise.all(ready).then(() => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

async function init() {
  try {
    const response = await fetch("data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    renderSite(await response.json());
    setupGsapAnimations();
  } catch (error) {
    console.error("Unable to load data.json", error);
    document.querySelector("[data-participants]").setAttribute("aria-busy", "false");
    document.querySelector("[data-load-error]").hidden = false;
  }
}

init();
