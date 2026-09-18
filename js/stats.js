/* ============================================================
   Stats carousel — infinite loop, arrows below, drag to scroll
   The list is rendered three times; when the scroll position
   leaves the middle copy it is snapped back by one set width,
   which makes the loop seamless in both directions.
   ============================================================ */
(function () {
  const track = document.getElementById('statsTrack');
  if (!track || typeof STATS === 'undefined') return;

  const cardHTML = s => `
    <article class="stat-card">
      <p class="stat-card__value">
        ${s.from ? `<span class="from">${s.from}</span>` : ''}${s.value}
      </p>
      <p class="stat-card__label">${s.label}</p>
      <span class="stat-card__tag">${s.tag}</span>
    </article>
  `;

  const set = STATS.map(cardHTML).join('');
  track.innerHTML = set + set + set;          // [copy A][copy B][copy C]

  const cards = () => Array.from(track.querySelectorAll('.stat-card'));

  /* width of one full copy, including gaps */
  function setWidth() {
    const all = cards();
    if (!all.length) return 0;
    const card = all[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    return (card + gap) * STATS.length;
  }

  /* start in the middle copy so there is room to scroll both ways */
  function center() {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = setWidth();
    track.style.scrollBehavior = '';
  }

  /* keep the position inside the middle copy */
  function wrap() {
    const w = setWidth();
    if (!w) return;
    if (track.scrollLeft < w * 0.5) {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft += w;
      track.style.scrollBehavior = '';
    } else if (track.scrollLeft > w * 1.5) {
      track.style.scrollBehavior = 'auto';
      track.scrollLeft -= w;
      track.style.scrollBehavior = '';
    }
  }

  let wrapTimer = null;
  track.addEventListener('scroll', () => {
    clearTimeout(wrapTimer);
    wrapTimer = setTimeout(wrap, 90);          // wrap once the movement settles
  }, { passive: true });

  window.addEventListener('resize', center);
  window.addEventListener('load', center);
  center();

  /* --- arrows --- */
  const step = () => {
    const first = cards()[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
    return first ? first.getBoundingClientRect().width + gap : 280;
  };

  document.querySelectorAll('.stats__arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      track.scrollBy({ left: Number(btn.dataset.dir) * step(), behavior: 'smooth' });
    });
  });

  /* --- drag to scroll (pointer devices) --- */
  let down = false, startX = 0, startScroll = 0, moved = false;

  track.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;      // native touch scrolling is fine
    down = true; moved = false;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
  });

  track.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    track.scrollLeft = startScroll - dx;
  });

  const stop = () => {
    if (!down) return;
    down = false;
    track.classList.remove('is-dragging');
    wrap();
  };

  track.addEventListener('pointerup', stop);
  track.addEventListener('pointerleave', stop);
  track.addEventListener('click', e => { if (moved) e.preventDefault(); });
})();
