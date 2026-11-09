(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.topbar');

  const revealSelectors = ['.trust-copy', '.section-heading', '.numbers', '.appointment'];
  revealSelectors.forEach(selector => document.querySelectorAll(selector).forEach(el => el.classList.add('scroll-reveal')));

  const staggerGroups = [
    document.querySelectorAll('.trust-cards article'),
    document.querySelectorAll('.doctor-grid .doctor-card')
  ];
  staggerGroups.forEach(group => group.forEach(el => el.classList.add('scroll-stagger-item')));

  if (reduced) {
    document.querySelectorAll('.scroll-reveal,.scroll-stagger-item').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const seen = new WeakSet();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || seen.has(entry.target)) return;
      seen.add(entry.target);
      const el = entry.target;
      const parent = el.parentElement;
      let delay = 0;
      if (el.classList.contains('scroll-stagger-item') && parent) {
        const siblings = [...parent.children].filter(child => child.classList.contains('scroll-stagger-item'));
        delay = Math.max(0, siblings.indexOf(el)) * 70;
      }
      window.setTimeout(() => el.classList.add('is-visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll('.scroll-reveal,.scroll-stagger-item').forEach(el => observer.observe(el));

  let lastY = window.scrollY;
  let ticking = false;
  const updateScroll = () => {
    const y = window.scrollY;
    const delta = y - lastY;
    if (header) {
      if (y > 80 && delta > 2) header.classList.add('scroll-compact');
      else if (delta < -2 || y < 40) header.classList.remove('scroll-compact');
    }
    document.documentElement.style.setProperty('--scroll-bg-y', `${Math.max(-10, Math.min(10, y * .012))}px`);
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  updateScroll();
})();
