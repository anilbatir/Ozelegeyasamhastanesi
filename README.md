# Özel Ege Yaşam Hastanesi — Web Sitesi

Hastane için sıfırdan tasarlanmış, statik HTML/CSS/JS tabanlı kurumsal web sitesi.

## Sayfalar

- `index.html` — Ana sayfa
- `hakkimizda.html` — Hakkımızda
- `bolumler.html` — Bölümlerimiz (tüm uzmanlık alanları)
- `doktorlarimiz.html` — Doktorlarımız
- `iletisim.html` — İletişim ve online randevu formu

## Önemli: Doldurulması Gereken Yer Tutucular

Bu site tasarım/şablon olarak hazırlanmıştır. Canlıya almadan önce aşağıdaki yer tutucu içerikler gerçek bilgilerle değiştirilmelidir:

- **Adres, telefon, e-posta** — tüm sayfaların footer'ında ve `iletisim.html` içinde `[Hastane Adresi Buraya Gelecek]` ve `444 0 000` ile işaretli.
- **Doktor bilgileri** — `doktorlarimiz.html` ve ana sayfadaki doktor kartları `[İsim Soyisim]` yer tutucusu ile işaretli; gerçek isim, unvan ve fotoğraflarla değiştirilmelidir.
- **Harita** — `iletisim.html` içindeki `.map-frame` alanına gerçek Google Haritalar embed kodu eklenmelidir.
- **Randevu formu** — `iletisim.html` içindeki form şu an yalnızca arayüz demosudur (`js/main.js`), bir sunucuya veri göndermez. Gerçek randevu akışı için bir API/e-posta servisi (ör. `api/` klasöründe bir Vercel Function) bağlanmalıdır.
- **Kurumsal metinler** — `hakkimizda.html` içindeki tarihçe/misyon/vizyon metinleri örnek olarak yazılmıştır.

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
