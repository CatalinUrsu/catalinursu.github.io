/* ============================================================
   Projects — one centred card per carousel, arrows on the sides,
   dots underneath. Used twice: commercial work and pet projects.
   ============================================================ */
(function () {
  const carousels = {};

  function build(rootId, items, key) {
    const root = document.getElementById(rootId);
    if (!root || !items || !items.length) return;

    root.innerHTML = `
      <div class="pcar__stage">
        <button class="pcar__arrow" data-dir="-1" aria-label="Previous project">
          <svg viewBox="0 0 24 24" width="17" height="17"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="pcar__slot"></div>
        <button class="pcar__arrow" data-dir="1" aria-label="Next project">
          <svg viewBox="0 0 24 24" width="17" height="17"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
      <div class="pcar__dots"></div>
    `;

    const slot = root.querySelector('.pcar__slot');
    const dots = root.querySelector('.pcar__dots');
    let active = 0;

    dots.innerHTML = items.map((p, i) =>
      `<button class="pcar__dot" data-index="${i}" aria-label="${p.title}"></button>`
    ).join('');
    const dotEls = Array.from(dots.querySelectorAll('.pcar__dot'));

    let slideTimer = null;

    function render() {
      const p = items[active];
      const imgs = p.images && p.images.length ? p.images : [p.image];

      slot.innerHTML = `
        <article class="pcar__card">
          <div class="pcar__media">
            <span class="pcar__index">${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}</span>
            ${imgs.map((src, i) => `
              <div class="pcar__slide ${i === 0 ? 'is-shown' : ''}">
                <img class="pcar__slide-bg" src="${src}" alt="" aria-hidden="true" draggable="false">
                <img class="pcar__slide-img" src="${src}" alt="${p.title}" loading="lazy" draggable="false">
              </div>
            `).join('')}
            ${imgs.length > 1 ? `<span class="pcar__shots">${imgs.length} shots</span>` : ''}
          </div>
          <div class="pcar__body">
            <h4 class="pcar__title">${p.title}</h4>
            <p class="pcar__meta">${p.meta || ''}</p>
            <p class="pcar__text">${p.text}</p>
            <div class="pcar__tags">
              ${p.tags.map(t => `<span class="pcar__tag">${t}</span>`).join('')}
            </div>
            ${p.link ? `
              <a href="${p.link}" target="_blank" rel="noopener" class="btn btn--ghost pcar__link">
                Open repository
                <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>` : ''}
          </div>
        </article>
      `;

      dotEls.forEach((d, i) => d.classList.toggle('is-active', i === active));
      startSlideshow(imgs.length);
    }

    /* cross-fade between screenshots of the current project */
    function startSlideshow(count) {
      clearInterval(slideTimer);
      if (count < 2) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const slides = Array.from(slot.querySelectorAll('.pcar__slide'));
      let shown = 0;

      slideTimer = setInterval(() => {
        slides[shown].classList.remove('is-shown');
        shown = (shown + 1) % slides.length;
        slides[shown].classList.add('is-shown');
      }, 3600);
    }

    function go(index) {
      active = (index + items.length) % items.length;
      render();
    }

    root.querySelectorAll('.pcar__arrow').forEach(btn => {
      btn.addEventListener('click', () => go(active + Number(btn.dataset.dir)));
    });

    dots.addEventListener('click', e => {
      const dot = e.target.closest('.pcar__dot');
      if (dot) go(Number(dot.dataset.index));
    });

    /* swipe on touch devices */
    let startX = null;
    root.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 55) go(active + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });

    render();
    carousels[key] = { go, root };
  }

  build('workCarousel', typeof WORK_PROJECTS !== 'undefined' ? WORK_PROJECTS : [], 'work');
  build('petCarousel',  typeof PET_PROJECTS  !== 'undefined' ? PET_PROJECTS  : [], 'pet');

  /* --- deep links from the About section: data-goto-project="pet:0" --- */
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-goto-project]');
    if (!trigger) return;

    const [key, indexRaw] = trigger.dataset.gotoProject.split(':');
    const carousel = carousels[key];
    if (!carousel) return;

    carousel.go(Number(indexRaw) || 0);

    /* main.js handles the smooth scroll to #projects; nudge to the
       right carousel afterwards so the chosen card is in view */
    setTimeout(() => {
      const header = document.getElementById('nav');
      const offset = (header ? header.offsetHeight : 0) + 24;
      const top = carousel.root.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }, 620);
  });
})();
