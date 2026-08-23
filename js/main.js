// Özel Ege Yaşam Hastanesi — ortak site betiği

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle && header) {
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.main-nav a').forEach((link) => {
      link.addEventListener('click', () => header.classList.remove('nav-open'));
    });
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const appointmentForm = document.querySelector('#appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const successBox = document.querySelector('#form-success');
      if (successBox) successBox.classList.add('show');
      appointmentForm.reset();
    });
  }

  initHeroAurora();
  initHeroHeadlineRotator();
});

// Fareyi takip eden aurora efekti (hero bölümü arka planında)
function initHeroAurora() {
  const hero = document.querySelector('#hero');
  const canvas = document.querySelector('#hero-aurora');
  if (!hero || !canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  const layers = [
    { hue: 214, offset: 0, amplitude: 70, frequency: 0.005, speed: 0.0009, opacity: 0.55 },
    { hue: 168, offset: 70, amplitude: 90, frequency: 0.0035, speed: 0.0013, opacity: 0.4 },
    { hue: 222, offset: 140, amplitude: 55, frequency: 0.006, speed: 0.0007, opacity: 0.35 },
  ];

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resize();
  mouse.x = mouse.tx = width * 0.7;
  mouse.y = mouse.ty = height * 0.5;

  window.addEventListener('resize', resize);
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
  });

  let time = 0;
  let raf;

  function render() {
    time += 1;
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    ctx.clearRect(0, 0, width, height);

    const mx = mouse.x;
    const my = mouse.y;

    layers.forEach((layer) => {
      ctx.beginPath();
      ctx.moveTo(0, height);
      const step = 10;
      for (let x = 0; x <= width; x += step) {
        const dist = Math.abs(x - mx);
        const influence = Math.exp(-(dist * dist) / (2 * 280 * 280));
        const wave1 = Math.sin(x * layer.frequency + time * layer.speed + layer.offset) * layer.amplitude;
        const wave2 = Math.sin(x * layer.frequency * 2.2 + time * layer.speed * 1.4) * (layer.amplitude * 0.35);
        const baseY = height * 0.45 + layer.offset;
        const mouseYPull = (my - height * 0.45) * 0.3 * influence;
        const y = baseY + wave1 + wave2 - influence * 100 + mouseYPull;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, height * 0.2, 0, height);
      grad.addColorStop(0, `hsla(${layer.hue}, 65%, 88%, ${layer.opacity})`);
      grad.addColorStop(0.5, `hsla(${layer.hue}, 55%, 84%, ${layer.opacity * 0.6})`);
      grad.addColorStop(1, `hsla(${layer.hue}, 45%, 90%, 0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    raf = window.requestAnimationFrame(render);
  }
  raf = window.requestAnimationFrame(render);

  hero.addEventListener('mouseleave', () => {
    mouse.tx = width * 0.7;
    mouse.ty = height * 0.5;
  });
}

// Ana sayfa hero başlığı belirli aralıklarla değişen metinler
function initHeroHeadlineRotator() {
  const content = document.querySelector('.hero-content');
  const titleEl = document.querySelector('[data-hero-title]');
  const leadEl = document.querySelector('[data-hero-lead]');
  const eyebrowEl = document.querySelector('[data-hero-eyebrow]');
  const photoEl = document.querySelector('[data-hero-photo]');
  if (!content || !titleEl || !leadEl) return;

  const slides = [
    {
      eyebrow: '7/24 Acil ve Uzman Hekim Desteği',
      title: 'Dünya standartında bakım, <span>evinize yakın</span>',
      lead: 'Önleyici sağlık kontrollerinden ileri cerrahiye; ekibimiz güvenli, zamanında ve şefkatli bakım sunar.',
      image: 'img/hero/hacer-cutout.png',
      imageAlt: 'Uzm. Dr. Hacer Ağça',
      imageVariant: 'doctor',
    },
    {
      eyebrow: 'SGK ve Özel Sigortalarla Anlaşmalıyız',
      title: 'SGK anlaşmamız <span>vardır</span>',
      lead: 'SGK ve özel sağlık sigortası kurumlarıyla anlaşmalı olarak, ek ücret endişesi olmadan kaliteli sağlık hizmetine erişebilirsiniz.',
      image: 'img/hastane/bina.jpg',
      imageAlt: 'Özel Ege Yaşam Hastanesi binası',
      imageVariant: 'building',
    },
    {
      eyebrow: 'Modern Teknoloji, Güvenilir Bakım',
      title: 'Sağlık, güven ve <span>teknoloji</span> bir arada',
      lead: 'İleri tanı ve görüntüleme teknolojileri ile modern, güvenilir ve şefkatli bir sağlık deneyimi sunuyoruz.',
      image: 'img/hero/hacer-cutout.png',
      imageAlt: 'Uzm. Dr. Hacer Ağça',
      imageVariant: 'doctor',
    },
    {
      eyebrow: 'Uzman Kadromuzla Tanışın',
      title: '27+ uzman hekimle <span>7/24 yanınızdayız</span>',
      lead: 'Farklı branşlarda deneyimli hekim kadromuz ve acil servisimizle kesintisiz sağlık hizmeti sunuyoruz.',
      image: 'img/hero/hacer-cutout.png',
      imageAlt: 'Uzm. Dr. Hacer Ağça',
      imageVariant: 'doctor',
    },
  ];

  let index = 0;

  function applySlide(i) {
    const data = slides[i];
    if (eyebrowEl) {
      const icon = eyebrowEl.querySelector('svg');
      eyebrowEl.innerHTML = (icon ? icon.outerHTML : '') + data.eyebrow;
    }
    titleEl.innerHTML = data.title;
    leadEl.textContent = data.lead;
    if (photoEl) {
      photoEl.src = data.image;
      photoEl.alt = data.imageAlt;
      photoEl.classList.toggle('is-building', data.imageVariant === 'building');
    }
  }

  function nextSlide() {
    content.classList.add('is-swapping');
    if (photoEl) photoEl.classList.add('is-swapping');
    window.setTimeout(() => {
      index = (index + 1) % slides.length;
      applySlide(index);
      content.classList.remove('is-swapping');
      if (photoEl) photoEl.classList.remove('is-swapping');
    }, 350);
  }

  window.setInterval(nextSlide, 4500);
}
