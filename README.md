# Nostalji Şekerleme – Web Sitesi

Bursa'da nostaljik tatlar ve organizasyon hizmeti veren Nostalji Şekerleme'nin web sitesi.
**Next.js 16 · React 19 · Tailwind CSS 4 · Vercel Blob**

Sitenin tek amacı: Bursa'da hizmet arayanların bize **telefon / WhatsApp** ile ulaşması.

## Yayına alma adımları (Vercel)

1. **Framework ayarı (önemli):** Proje eskiden Create React App idi. Vercel → *Project → Settings → Build & Development*
   bölümünde **Framework Preset = Next.js** seçin. *Build Command*, *Output Directory* ve *Install Command*
   alanlarında "Override" açıksa kapatın (boş/varsayılan kalmalı).
2. **Galeri depolaması:** Vercel → *Storage → Create → Blob* → erişim türü **Public** → projeye bağlayın.
   `BLOB_READ_WRITE_TOKEN` otomatik eklenir.
3. **Ortam değişkenleri** (*Settings → Environment Variables*):

   | Ad | Açıklama |
   |----|----------|
   | `ADMIN_PASSWORD` | Admin paneline giriş şifresi (uzun, tahmin edilemez) |
   | `ADMIN_SESSION_SECRET` | En az 32 karakter rastgele metin (`openssl rand -base64 48`) |
   | `NEXT_PUBLIC_SITE_URL` | Sitenin adresi, örn. `https://www.alanadiniz.com` (sonunda `/` olmasın) |
   | `GOOGLE_SITE_VERIFICATION` | (İsteğe bağlı) Google Search Console doğrulama kodu |

4. Yeniden yayınlayın (*Deployments → Redeploy*). Panel: **`/admin`**

## Admin paneli

`/admin` adresinden şifreyle girilir. Panelden:

- Fotoğraf ve video yüklenir (birden fazla dosya aynı anda). Fotoğraflar tarayıcıda otomatik küçültülüp WebP'ye
  çevrilir; videolar için otomatik kapak görseli üretilir.
- Kategori ve açıklama düzenlenir, sıralama değiştirilir, öğeler silinir.
- Galerideki **ilk 9 öğe ana sayfada** görünür; hizmet sayfalarında ilgili kategorinin fotoğrafları gösterilir.

İpuçları: Videolarda MP4 (H.264) kullanın, en fazla 150 MB. iPhone'da *Ayarlar → Kamera → Biçimler → En Uyumlu*
seçili olursa HEIC/HEVC uyumluluk sorunları yaşanmaz.

> Admin paneli kurulmadan (Blob bağlanmadan) site, `public/images` altındaki başlangıç galerisini gösterir.

## Yerelde çalıştırma

```bash
cp .env.example .env.local   # değerleri doldurun
npm install
npm run dev                  # http://localhost:3000
```

## Yapı

```
src/app/(site)/           Herkese açık sayfalar (ana sayfa, hizmetler, organizasyonlar, galeri, iletişim)
src/app/admin/            Yönetim paneli
src/app/api/admin/        Panel API'leri (giriş, yükleme tokeni, galeri CRUD)
src/lib/site.ts           İşletme bilgileri (telefon, e-posta, ilçeler…) – tek yerden düzenlenir
src/lib/services.ts       Hizmet sayfası metinleri, SSS
src/lib/events.ts         Organizasyon türü sayfaları, genel SSS
src/lib/seo.ts            JSON-LD (LocalBusiness, Service, FAQ, Breadcrumb)
public/images/            Optimize edilmiş başlangıç görselleri
```

## SEO notları

- Ev adresi **bilinçli olarak sitede yayınlanmıyor** (yapılandırılmış veride yalnızca "Osmangazi, Bursa" ve hizmet
  bölgesi var). Google İşletme Profili'nde adresi gizleyip "hizmet bölgesi" tanımlayın.
- Alan adı alındığında `NEXT_PUBLIC_SITE_URL` güncellenir; sitemap, canonical ve paylaşım görselleri otomatik uyar.
- Yayına aldıktan sonra Google Search Console'a `…/sitemap.xml` adresini gönderin.
