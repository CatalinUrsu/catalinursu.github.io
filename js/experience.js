/* ============================================================
   Experience — accordion built from EXPERIENCE data
   ============================================================ */
(function () {
  const host = document.getElementById('experienceList');
  if (!host || typeof EXPERIENCE === 'undefined') return;

  host.innerHTML = EXPERIENCE.map((job, i) => `
    <div class="acc-item ${job.open ? 'is-open' : ''}" data-index="${i}">
      <button class="acc-head" aria-expanded="${job.open ? 'true' : 'false'}" aria-controls="acc-body-${i}">
        <span class="acc-period">${job.period}</span>
        <span class="acc-title">
          ${job.company}
          <small>${job.role}</small>
        </span>
        <span class="acc-toggle" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      </button>
      <div class="acc-body" id="acc-body-${i}">
        <div class="acc-body__inner">
          <ul>${job.points.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  `).join('');

  host.addEventListener('click', e => {
    const head = e.target.closest('.acc-head');
    if (!head) return;

    const item = head.closest('.acc-item');
    const open = item.classList.toggle('is-open');
    head.setAttribute('aria-expanded', String(open));
  });
})();
