(() => {
  document.querySelectorAll('.lang-switch').forEach(ls => {
    const btn = ls.querySelector('.lang-switch-btn');
    const menu = ls.querySelector('.lang-switch-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const open = ls.classList.toggle('open');
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-switch.open').forEach(ls => {
      ls.classList.remove('open');
      const menu = ls.querySelector('.lang-switch-menu');
      const btn = ls.querySelector('.lang-switch-btn');
      if (menu) menu.hidden = true;
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.lang-switch.open').forEach(ls => {
      ls.classList.remove('open');
      const menu = ls.querySelector('.lang-switch-menu');
      if (menu) menu.hidden = true;
    });
  });
})();
