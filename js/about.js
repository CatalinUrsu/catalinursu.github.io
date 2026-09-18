/* ============================================================
   About — education and languages blocks
   ============================================================ */
(function () {
  /* --- education --- */
  const edu = document.getElementById('educationList');
  if (edu && typeof EDUCATION !== 'undefined') {
    edu.innerHTML = EDUCATION.map(item => `
      <div class="edu-item">
        <p class="edu-item__period">${item.period}</p>
        <div>
          <p class="edu-item__place">${item.place}</p>
          <p class="edu-item__field">${item.field}</p>
          ${item.note ? `<p class="edu-item__note">${item.note}</p>` : ''}
        </div>
      </div>
    `).join('');
  }

  /* --- languages --- */
  const langs = document.getElementById('languageList');
  if (!langs || typeof LANGUAGES === 'undefined') return;

  langs.innerHTML = LANGUAGES.map(l => `
    <div class="lang-item">
      <p class="lang-item__name">${l.name}</p>
      <p class="lang-item__level">${l.level}</p>
      <div class="lang-item__bar"><i style="width:${l.bar}%"></i></div>
    </div>
  `).join('');

  /* fill the bars once they scroll into view */
  const items = Array.from(langs.querySelectorAll('.lang-item'));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      items.forEach((el, i) => setTimeout(() => el.classList.add('is-visible'), i * 120));
      obs.disconnect();
    });
  }, { threshold: 0.3 });

  io.observe(langs);
})();
