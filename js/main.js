/* ============================================================
   Main — small page-level bits
   ============================================================ */
(function () {
  /* footer year */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* smooth anchor scroll that respects the fixed header height */
  const header = document.getElementById('nav');

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href');
    if (id === '#' || id.length < 2) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const offset = (header ? header.offsetHeight : 0) + 24;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });

    history.replaceState(null, '', id);
  });
})();
