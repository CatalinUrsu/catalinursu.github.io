/* ============================================================
   ID badge — pointer drag with elastic snap-back (no library)
   ============================================================ */
(function () {
  const badge = document.getElementById('idBadge');
  if (!badge) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let dragging = false;
  let startX = 0, startY = 0;
  let x = 0, y = 0;            // current offset
  let vx = 0, vy = 0;          // velocity for the spring
  let raf = null;

  const ELASTIC   = 0.35;      // how far it follows the pointer
  const STIFFNESS = 0.12;
  const DAMPING   = 0.78;

  const render = () => {
    const rot = x * 0.05;
    badge.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
  };

  const spring = () => {
    vx = (vx - x * STIFFNESS) * DAMPING;
    vy = (vy - y * STIFFNESS) * DAMPING;
    x += vx;
    y += vy;
    render();

    if (Math.abs(x) > 0.3 || Math.abs(y) > 0.3 || Math.abs(vx) > 0.3 || Math.abs(vy) > 0.3) {
      raf = requestAnimationFrame(spring);
    } else {
      x = y = vx = vy = 0;
      badge.style.transform = '';
      badge.classList.remove('is-dragging');   // resume float animation
      raf = null;
    }
  };

  badge.addEventListener('pointerdown', e => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    badge.classList.add('is-dragging');
    badge.setPointerCapture(e.pointerId);
  });

  badge.addEventListener('pointermove', e => {
    if (!dragging) return;
    x = (e.clientX - startX) * ELASTIC;
    y = (e.clientY - startY) * ELASTIC;
    render();
  });

  const release = () => {
    if (!dragging) return;
    dragging = false;
    if (!raf) raf = requestAnimationFrame(spring);
  };

  badge.addEventListener('pointerup', release);
  badge.addEventListener('pointercancel', release);
  badge.addEventListener('lostpointercapture', release);
})();
