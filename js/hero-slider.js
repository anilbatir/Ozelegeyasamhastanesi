(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const title = hero.querySelector('.hero-copy h1');
  const text = hero.querySelector('.hero-copy > p');
  const eyebrow = hero.querySelector('.eyebrow');
  const stats = hero.querySelector('.stats');
  const photos = [...hero.querySelectorAll('.hero-slide-photo')];
  const dots = [...hero.querySelectorAll('.hero-slider-dot')];
  const slides = [
    {title:'Dünya standartlarında<br>bakım, <span>evinize yakın</span>',text:'Gelişmiş teknoloji ve uzman kadromuzla, sağlığınızı korumak için yanınızdayız.',eyebrow:'✓ &nbsp; SGK ve Özel Sigortalarla Anlaşmalıyız <b>›</b>',stats:'<div><strong>15+</strong><span>Uzmanlık Dalı</span></div><div><strong>SGK</strong><span>Anlaşmalı Kurum</span></div><div><strong>%100</strong><span>Hasta Odaklı Bakım</span></div>',media:false},
    {title:'Güvenli cerrahi,<br><span>deneyimli eller.</span>',text:'Modern cerrahi yaklaşım ve hasta güvenliği odaklı süreçlerle her aşamada yanınızdayız.',eyebrow:'✦ &nbsp; Cerrahide güven ve teknoloji',stats:'<div><strong>Modern</strong><span>Cerrahi Altyapı</span></div><div><strong>Uzman</strong><span>Hekim Kadrosu</span></div><div><strong>Güven</strong><span>Hasta Odaklı Süreç</span></div>',media:true},
    {title:'Hayatın en özel anlarında<br><span>yanınızdayız.</span>',text:'Kadın sağlığı, doğum ve çocuk sağlığında sıcak, güvenli ve bütüncül bir yaklaşım sunuyoruz.',eyebrow:'♡ &nbsp; Anne ve çocuk sağlığı',stats:'<div><strong>Anne</strong><span>Odaklı Yaklaşım</span></div><div><strong>Bebek</strong><span>Güvenli Bakım</span></div><div><strong>Çocuk</strong><span>Uzman Desteği</span></div>',media:true},
    {title:'Sağlığınız için<br><span>7/24 buradayız.</span>',text:'Acil durumlarda hızlı değerlendirme ve kesintisiz sağlık hizmeti için ekibimiz hazır.',eyebrow:'● &nbsp; 7/24 Acil Servis',stats:'<div><strong>7/24</strong><span>Kesintisiz Hizmet</span></div><div><strong>Hızlı</strong><span>Değerlendirme</span></div><div><strong>Hazır</strong><span>Sağlık Ekibi</span></div>',media:true}
  ];
  let current = 0, timer;
  const show = (i) => {
    current = (i + slides.length) % slides.length;
    const s = slides[current];
    hero.classList.add('hero-copy-changing');
    setTimeout(() => {
      title.innerHTML = s.title; text.textContent = s.text; eyebrow.innerHTML = s.eyebrow; stats.innerHTML = s.stats;
      hero.classList.toggle('hero-media-mode', s.media);
      photos.forEach((p,n)=>p.classList.toggle('active', n===current && s.media));
      dots.forEach((d,n)=>{d.classList.remove('active'); void d.offsetWidth; d.classList.toggle('active',n===current); d.setAttribute('aria-current',n===current?'true':'false');});
      hero.classList.remove('hero-copy-changing');
    }, 320);
  };
  const restart = () => { clearInterval(timer); timer=setInterval(()=>show(current+1),5000); };
  dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart();}));
  show(0); restart();
})();