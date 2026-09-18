/* ============================================================
   Skills — chips grouped by category, staggered on first view
   ============================================================ */
(function () {
  const host = document.getElementById('stackGroups');
  if (!host || typeof STACK === 'undefined') return;

  host.innerHTML = `
    <div class="stack-grid">
      ${STACK.map(group => `
        <div class="stack-group">
          <p class="stack-group__label">${group.label}</p>
          <div class="chips">
            ${group.items.map(item => `<span class="chip">${item}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const chips = Array.from(host.querySelectorAll('.chip'));
  chips.forEach(chip => {
    chip.style.opacity = '0';
    chip.style.transform = 'translateY(10px)';
  });

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      chips.forEach((chip, i) => {
        setTimeout(() => {
          chip.style.transition = 'opacity .45s ease, transform .45s cubic-bezier(.32,.72,0,1)';
          chip.style.opacity = '1';
          chip.style.transform = 'none';
        }, i * 30);
      });
      obs.disconnect();
    });
  }, { threshold: 0.15 });

  io.observe(host);
})();
