(() => {
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)');
  if (!finePointer.matches || reducedMotion.matches) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  let raf = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.11;
    currentY += (targetY - currentY) * 0.11;

    const px = currentX;
    const py = currentY;
    const distance = Math.min(1, Math.hypot(px, py));

    // Magnetic Focus: doctor stays visually stable; surrounding layers react.
    hero.style.setProperty('--orb1-x', `${px * -10}px`);
    hero.style.setProperty('--orb1-y', `${py * -7}px`);
    hero.style.setProperty('--orb1-scale', `${1.02 + distance * 0.035}`);

    hero.style.setProperty('--orb2-x', `${px * 8}px`);
    hero.style.setProperty('--orb2-y', `${py * 6}px`);
    hero.style.setProperty('--orb2-scale', `${1 + distance * 0.025}`);

    hero.style.setProperty('--ring1-x', `${px * -6}px`);
    hero.style.setProperty('--ring1-y', `${py * -4}px`);
    hero.style.setProperty('--ring1-scale', `${1 + distance * 0.02}`);

    hero.style.setProperty('--ring2-x', `${px * 5}px`);
    hero.style.setProperty('--ring2-y', `${py * 4}px`);

    hero.style.setProperty('--card1-x', `${px * 11}px`);
    hero.style.setProperty('--card1-y', `${py * 7}px`);
    hero.style.setProperty('--card1-scale', `${1 + Math.max(0, px) * 0.014}`);

    hero.style.setProperty('--card2-x', `${px * -9}px`);
    hero.style.setProperty('--card2-y', `${py * -6}px`);
    hero.style.setProperty('--card2-scale', `${1 + Math.max(0, -px) * 0.012}`);

    hero.style.setProperty('--focus-strength', `${0.72 + distance * 0.16}`);

    if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) {
      raf = requestAnimationFrame(render);
    } else {
      raf = 0;
    }
  };

  const requestRender = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const rx = (event.clientX - rect.left) / rect.width;
    const ry = (event.clientY - rect.top) / rect.height;

    targetX = Math.max(-1, Math.min(1, rx * 2 - 1));
    targetY = Math.max(-1, Math.min(1, ry * 2 - 1));

    hero.classList.add('is-pointer-active');
    hero.style.setProperty('--mx', `${rx * 100}%`);
    hero.style.setProperty('--my', `${ry * 100}%`);
    requestRender();
  });

  hero.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
    hero.style.setProperty('--mx', '72%');
    hero.style.setProperty('--my', '38%');
    requestRender();
    window.setTimeout(() => hero.classList.remove('is-pointer-active'), 240);
  });

  // Keep hero buttons calm; only a very small magnetic response.
  document.querySelectorAll('.hero .btn').forEach((button) => {
    button.classList.add('magnetic');
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.setProperty('--mag-x', `${x * 0.045}px`);
      button.style.setProperty('--mag-y', `${y * 0.045}px`);
    });
    button.addEventListener('pointerleave', () => {
      button.style.setProperty('--mag-x', '0px');
      button.style.setProperty('--mag-y', '0px');
    });
  });
})();
