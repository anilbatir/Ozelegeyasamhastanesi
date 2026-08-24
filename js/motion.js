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

    if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) raf = requestAnimationFrame(render);
    else raf = 0;
  };

  const requestRender = () => { if (!raf) raf = requestAnimationFrame(render); };

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

(() => {
  const hero = document.querySelector('.hero');
  const copy = hero?.querySelector('.hero-copy');
  const visual = hero?.querySelector('.hero-visual');
  if (!hero || !copy || !visual) return;

  const title = copy.querySelector('h1');
  const description = copy.querySelector(':scope > p');
  const topCard = visual.querySelector('.float-card.top');
  const bottomCard = visual.querySelector('.float-card.bottom');
  const doctor = visual.querySelector('.doctor-cutout');
  if (!title || !description || !topCard || !bottomCard || !doctor) return;

  const style = document.createElement('style');
  style.textContent = `
    .hero{--slide-accent:#145dc3}
    .hero-copy h1,.hero-copy>p,.float-card{transition:opacity .38s ease,transform .55s cubic-bezier(.2,.72,.2,1)}
    .float-card{transition:opacity .38s ease,transform .55s cubic-bezier(.2,.72,.2,1),top .5s ease,right .5s ease,bottom .5s ease,left .5s ease}
    .hero.is-changing .hero-copy h1,.hero.is-changing .hero-copy>p{opacity:0;transform:translateY(10px)}
    .hero.is-changing .float-card{opacity:0;transform:translateY(8px)}
    .hero-slide-media{position:absolute;inset:0;z-index:1;overflow:hidden;opacity:0;transform:scale(1.018);transition:opacity .8s ease,transform 5s ease;background:#dceef8 center/cover no-repeat}
    .hero-slide-media::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.97) 0%,rgba(255,255,255,.9) 20%,rgba(255,255,255,.5) 36%,rgba(255,255,255,.14) 54%,rgba(255,255,255,0) 70%);pointer-events:none}
    .hero.scene-photo .hero-slide-media{opacity:1;transform:scale(1.002)}
    .hero.scene-photo::before,.hero.scene-photo::after{opacity:0}
    .hero.scene-photo .doctor-cutout,.hero.scene-photo .orb,.hero.scene-photo .ring{opacity:0;pointer-events:none}
    .hero .doctor-cutout,.hero .orb,.hero .ring{transition:opacity .55s ease,transform .35s ease}
    .hero::before,.hero::after{transition:opacity .6s ease}
    .hero-slider-nav{position:absolute;right:clamp(28px,7vw,112px);bottom:34px;z-index:18;display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:999px;background:rgba(255,255,255,.72);border:1px solid rgba(210,225,239,.9);backdrop-filter:blur(12px);box-shadow:0 10px 26px rgba(27,72,112,.08)}
    .hero-slider-nav button{width:28px;height:28px;border:0;border-radius:50%;background:transparent;color:#6f8196;font:700 11px/1 Inter,system-ui;cursor:pointer;transition:.2s ease}
    .hero-slider-nav button.is-active{background:#0f5fc4;color:#fff}
    .hero-slider-progress{width:90px;height:2px;border-radius:99px;background:rgba(32,83,139,.15);overflow:hidden}
    .hero-slider-progress span{display:block;width:100%;height:100%;background:#0f5fc4;transform-origin:left;animation:heroProgress 5s linear forwards}
    @keyframes heroProgress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @media(max-width:900px){.hero-slider-nav{right:50%;transform:translateX(50%);bottom:18px}.hero-slide-media::after{background:linear-gradient(180deg,rgba(255,255,255,.97) 0%,rgba(255,255,255,.92) 38%,rgba(255,255,255,.4) 60%,rgba(255,255,255,0) 78%)}}
    @media(max-width:560px){.hero-slider-progress{width:62px}.hero-slider-nav{bottom:10px}}
    @media(prefers-reduced-motion:reduce){.hero-slide-media,.hero-copy h1,.hero-copy>p,.float-card{transition:none!important}.hero-slider-progress span{animation:none!important}}
  `;
  document.head.appendChild(style);

  const media = document.createElement('div');
  media.className = 'hero-slide-media';
  hero.prepend(media);

  const slides = [
    {mode:'photo',image:'img/hero/slide-doctor-hallway.jpg',pos:'68% 27%',title:'Dünya standartlarında<br>bakım, <span>evinize yakın</span>',description:'Gelişmiş teknoloji ve uzman kadromuzla, sağlığınızı korumak için yanınızdayız.',top:['27+ Uzman Hekim','Farklı branşlarda deneyimli hekim kadrosu'],bottom:['Acil Durumlarda Yanınızdayız','7/24 aktif hizmet']},
    {mode:'photo',image:'img/hero/slide-surgery.jpg',pos:'62% 32%',title:'Güvenli cerrahi,<br><span>deneyimli eller.</span>',description:'Modern cerrahi yaklaşımımız ve ileri teknoloji desteğimizle güvenli tedavi süreçleri sunuyoruz.',top:['Modern Ameliyathane','Teknoloji destekli cerrahi altyapı'],bottom:['Deneyimli Cerrahi Ekip','Hasta güvenliği odaklı yaklaşım'],cardPos:{top:{top:'58%',right:'1%'},bottom:{bottom:'-4%',left:'0%'}}},
    {mode:'photo',image:'img/hero/slide-mother-child.jpg',pos:'64% 30%',title:'Hayatın en özel<br>anlarında <span>yanınızdayız.</span>',description:'Kadın doğum ve çocuk sağlığı alanlarında anne ve bebeğin sağlığını, sevgi ve özenle koruyoruz.',top:['Kadın Doğum & Çocuk Sağlığı','Anne ve bebeğe bütüncül yaklaşım'],bottom:['Şefkatli Bakım','Uzman ekip, güvenli takip'],cardPos:{top:{top:'50%',right:'3%'}}},
    {mode:'photo',image:'img/hero/slide-emergency.jpg',pos:'66% 35%',title:'Sağlığınız için<br><span>7/24 buradayız.</span>',description:'Deneyimli acil servis ekibimiz ve tam donanımlı ünitemizle, günün her saati yanınızdayız.',top:['7/24 Acil Servis','Kesintisiz müdahale imkânı'],bottom:['Acil Servis Aktif','Hazır ekip ve güçlü altyapı'],cardPos:{top:{top:'12%',right:'1%'}}}
  ];

  slides.filter(s=>s.image).forEach(s=>{ const i=new Image(); i.src=s.image; });

  const nav = document.createElement('div');
  nav.className = 'hero-slider-nav';
  nav.setAttribute('aria-label','Hero sahneleri');
  const progress = document.createElement('div');
  progress.className = 'hero-slider-progress';
  let progressBar = document.createElement('span');
  progress.appendChild(progressBar);
  nav.appendChild(progress);
  const buttons = slides.map((_,i)=>{
    const b=document.createElement('button');
    b.type='button'; b.textContent=String(i+1).padStart(2,'0');
    b.setAttribute('aria-label',`${i+1}. sahne`);
    nav.appendChild(b); return b;
  });
  hero.appendChild(nav);

  let index=0;
  let timer=0;
  let busy=false;

  const setCard = (card, lines, showDot=false) => {
    const dot = showDot ? '<i></i>' : '';
    card.innerHTML = `${dot}<div><strong>${lines[0]}</strong><span>${lines[1]}</span></div>`;
  };

  const restartProgress = () => {
    const clone = progressBar.cloneNode(true);
    progressBar.replaceWith(clone);
    progressBar = clone;
  };

  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(()=>show((index+1)%slides.length),5000);
  };

  const show = (next, immediate=false) => {
    if (busy || (next===index && !immediate)) { schedule(); return; }
    busy=true;
    const slide=slides[next];
    if (!immediate) hero.classList.add('is-changing');
    const swap = () => {
      title.innerHTML=slide.title;
      description.textContent=slide.description;
      setCard(topCard,slide.top,false);
      setCard(bottomCard,slide.bottom,true);
      [topCard,bottomCard].forEach(c=>{c.style.top='';c.style.right='';c.style.bottom='';c.style.left='';});
      if(slide.cardPos){
        if(slide.cardPos.top) Object.assign(topCard.style, slide.cardPos.top);
        if(slide.cardPos.bottom) Object.assign(bottomCard.style, slide.cardPos.bottom);
      }
      if(slide.mode==='photo'){
        media.style.backgroundImage=`url('${slide.image}')`;
        media.style.backgroundPosition=slide.pos||'center';
        hero.classList.add('scene-photo');
      } else {
        hero.classList.remove('scene-photo');
        media.style.backgroundImage='none';
      }
      index=next;
      buttons.forEach((b,i)=>b.classList.toggle('is-active',i===index));
      restartProgress();
      requestAnimationFrame(()=>hero.classList.remove('is-changing'));
      window.setTimeout(()=>{busy=false;},820);
      schedule();
    };
    if(immediate) swap(); else window.setTimeout(swap,360);
  };

  buttons.forEach((b,i)=>b.addEventListener('click',()=>show(i)));
  hero.addEventListener('mouseenter',()=>window.clearTimeout(timer));
  hero.addEventListener('mouseleave',schedule);
  hero.addEventListener('focusin',()=>window.clearTimeout(timer));
  hero.addEventListener('focusout',schedule);
  document.addEventListener('visibilitychange',()=>document.hidden?window.clearTimeout(timer):schedule());

  show(0,true);
})();
