# Özel Ege Yaşam Hastanesi — Web Sitesi

Hastane için sıfırdan tasarlanmış, statik HTML/CSS/JS tabanlı kurumsal web sitesi.

## Sayfalar

- `index.html` — Ana sayfa
- `bolumler.html` — Bölümlerimiz (tüm uzmanlık alanları)
- `doktorlarimiz.html` — Doktorlarımız
- `iletisim.html` — Hakkımızda, İletişim ve online randevu formu

## İçerik Kaynağı

Sitedeki kurumsal bilgiler (adres, telefon, e-posta, tarihçe, bölümler, doktor kadrosu) [egeyasamhastanesi.com.tr](https://www.egeyasamhastanesi.com.tr) adresinden alınmıştır.

## Kalan Geliştirme Notları

- **Doktor fotoğrafları** — `doktorlarimiz.html` ve ana sayfadaki doktor kartları şu an ikon kullanıyor; gerçek fotoğraflar eklenebilir.
- **Randevu formu** — `iletisim.html` içindeki form şu an yalnızca arayüz demosudur (`js/main.js`), bir sunucuya veri göndermez. Gerçek randevu akışı için bir API/e-posta servisi (ör. `api/` klasöründe bir Vercel Function) veya mevcut e-randevu sistemine (randevu.meddata.com.tr/egeyasamhastanesi) yönlendirme bağlanmalıdır.

## Deploy Adımları (Vercel)

1. [vercel.com](https://vercel.com) adresine git ve hesabınla giriş yap.
2. **"Add New Project"** → GitHub reposunu (`ozelegeyasamhastanesi`) seç.
3. **Framework Preset** olarak **"Other"** seç (statik site, build adımı yok).
4. **"Deploy"** butonuna bas.
5. `main` branch'e her push otomatik olarak canlıya (Production) alınır, diğer branch'ler Preview URL'si üretir.

## Yerel Geliştirme

Herhangi bir statik dosya sunucusuyla önizleyebilirsin, örneğin:

```bash
npx serve .
```
