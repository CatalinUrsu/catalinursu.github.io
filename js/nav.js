/* ============================================================
   Navigation — sticky state, mobile menu, active section
   ============================================================ */
(function () {
  const nav     = document.getElementById('nav');
  const burger  = document.getElementById('navBurger');
  const links   = document.getElementById('navLinks');
  const anchors = Array.from(links.querySelectorAll('.nav__link'));

  /* --- background on scroll --- */
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- mobile menu --- */
  const closeMenu = () => {
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });

  anchors.forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* --- active section highlight --- */
  const sections = anchors
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = id => anchors.forEach(a =>
    a.classList.toggle('is-active', a.getAttribute('href') === '#' + id)
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();
