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
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    const px = currentX;
    const py = currentY;

    hero.style.setProperty('--doctor-x', `${px * 8}px`);
    hero.style.setProperty('--doctor-y', `${py * 6}px`);
    hero.style.setProperty('--orb1-x', `${px * -16}px`);
    hero.style.setProperty('--orb1-y', `${py * -12}px`);
    hero.style.setProperty('--orb2-x', `${px * 12}px`);
    hero.style.setProperty('--orb2-y', `${py * 10}px`);
    hero.style.setProperty('--ring1-x', `${px * -13}px`);
    hero.style.setProperty('--ring1-y', `${py * -9}px`);
    hero.style.setProperty('--ring2-x', `${px * 9}px`);
    hero.style.setProperty('--ring2-y', `${py * 7}px`);
    hero.style.setProperty('--card1-x', `${px * 11}px`);
    hero.style.setProperty('--card1-y', `${py * 8}px`);
    hero.style.setProperty('--card2-x', `${px * -10}px`);
    hero.style.setProperty('--card2-y', `${py * -7}px`);

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
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    targetX = Math.max(-1, Math.min(1, nx));
    targetY = Math.max(-1, Math.min(1, ny));
    hero.classList.add('is-pointer-active');
    hero.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    hero.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    requestRender();
  });

  hero.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
    hero.style.setProperty('--mx', '50%');
    hero.style.setProperty('--my', '38%');
    requestRender();
    window.setTimeout(() => hero.classList.remove('is-pointer-active'), 220);
  });

  document.querySelectorAll('.hero .btn').forEach((button) => {
    button.classList.add('magnetic');
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.setProperty('--mag-x', `${x * 0.08}px`);
      button.style.setProperty('--mag-y', `${y * 0.08}px`);
    });
    button.addEventListener('pointerleave', () => {
      button.style.setProperty('--mag-x', '0px');
      button.style.setProperty('--mag-y', '0px');
    });
  });

  document.querySelectorAll('.doctor-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.classList.add('motion-tilt');
      card.style.setProperty('--tilt-x', `${y * -4}deg`);
      card.style.setProperty('--tilt-y', `${x * 5}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('motion-tilt');
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
})();
