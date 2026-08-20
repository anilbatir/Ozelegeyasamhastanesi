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

  initHeroSlider();
});

function initHeroSlider() {
  const hero = document.querySelector('#hero');
  if (!hero) return;

  const slides = hero.querySelectorAll('.hero-slide');
  const dots = hero.querySelectorAll('[data-hero-dots] button');
  const content = hero.querySelector('[data-hero-content], #hero-content');
  const eyebrowEl = hero.querySelector('[data-hero-eyebrow]');
  const titleEl = hero.querySelector('[data-hero-title]');
  const leadEl = hero.querySelector('[data-hero-lead]');
  if (!slides.length || !titleEl || !leadEl) return;

  const slideContent = [
    {
      eyebrow: '7/24 Acil ve Uzman Hekim Desteği',
      title: 'Sağlığınız için <span>güvenilir</span>, modern ve şefkatli bakım',
      lead: 'Özel Ege Yaşam Hastanesi olarak; alanında uzman hekim kadromuz, ileri tanı-tedavi teknolojilerimiz ve hasta odaklı yaklaşımımızla yanınızdayız.',
    },
    {
      eyebrow: 'SGK ve Özel Sigortalarla Anlaşmalıyız',
      title: '<span>SGK</span> anlaşmamız vardır',
      lead: 'SGK ve özel sağlık sigortası kurumlarıyla anlaşmalı olarak, ek ücret endişesi olmadan kaliteli sağlık hizmetine erişebilirsiniz.',
    },
    {
      eyebrow: 'Modern Teknoloji, Güvenilir Bakım',
      title: '<span>Sağlık</span>, güven ve teknoloji bir arada',
      lead: 'İleri tanı ve görüntüleme teknolojileri ile modern, güvenilir ve şefkatli bir sağlık deneyimi sunuyoruz.',
    },
  ];

  let current = 0;
  let timer = null;

  function renderText(index) {
    const data = slideContent[index];
    if (!data) return;
    if (content) content.style.opacity = '0';
    window.setTimeout(() => {
      if (eyebrowEl) {
        eyebrowEl.innerHTML = eyebrowEl.querySelector('svg').outerHTML + data.eyebrow;
      }
      titleEl.innerHTML = data.title;
      leadEl.textContent = data.lead;
      if (content) content.style.opacity = '1';
    }, 250);
  }

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
    renderText(current);
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = window.setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    if (timer) window.clearInterval(timer);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      startAutoplay();
    });
  });

  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}
