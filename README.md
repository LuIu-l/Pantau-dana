# 🏘️ Pantau Desa

Platform transparansi Dana Desa dan Bantuan Sosial untuk Indonesia yang lebih baik dan transparan.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat&logo=vite)
![Pinia](https://img.shields.io/badge/Pinia-3.0-yellow?style=flat)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat)
![Vitest](https://img.shields.io/badge/Vitest-4.0-729B1B?style=flat&logo=vitest)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

> **💡 Note:** Aplikasi ini berjalan sepenuhnya di frontend (client-side) dengan data disimpan di **IndexedDB** browser. Mendukung mode offline sebagai Progressive Web App (PWA).

## 🚀 Demo

🌐 **Live Demo:** [https://pantau-dana.vercel.app](https://pantau-dana.vercel.app)

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Arsitektur](#-arsitektur)
- [Instalasi](#-instalasi)
- [Perintah](#-perintah)
- [Struktur Proyek](#-struktur-proyek)
- [Testing](#-testing)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur

### 🔍 Pencarian Dana Desa
- Cari informasi anggaran desa berdasarkan lokasi
- Visualisasi penggunaan dana dengan grafik interaktif
- Tracking progres proyek pembangunan

### 👥 Cek Penerima Bantuan Sosial
- Periksa status kepesertaan BLT, PKH, BPNT
- Data ditampilkan dengan perlindungan privasi (nama disamarkan)
- Filter berdasarkan RT/RW

### 📢 Sistem Pelaporan
- Laporkan masalah Dana Desa secara anonim
- Upload bukti foto
- Tracking status laporan dengan kode tiket
- Perlindungan identitas pelapor

### 🗺️ Peta Proyek
- Visualisasi lokasi proyek pembangunan
- Foto sebelum & sesudah proyek
- Detail anggaran dan progres

### 📚 Edukasi
- Artikel tentang Dana Desa dan hak warga
- Panduan pengawasan dana publik
- FAQ seputar bantuan sosial

### 📱 Progressive Web App (PWA)
- Install di perangkat mobile/desktop
- Offline support
- Push notifications (coming soon)

## 🛠️ Teknologi

### Frontend
- **Vue.js 3** - Framework JavaScript reaktif
- **Vite** - Build tool dan dev server super cepat
- **CSS Variables** - Design system modern
- **LocalStorage** - Penyimpanan data di browser

### Penyimpanan Data
- **LocalStorage API** - Menyimpan laporan pengguna
- **Mock Data** - Data simulasi untuk demo (Dana Desa, Bansos)
- **Session Storage** - Cache sementara untuk performa

## 📌 Persyaratan

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

> ✅ **Tidak memerlukan database MySQL** - Aplikasi sepenuhnya frontend!

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/pantau-desa.git
cd pantau-desa
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Selesai! 🎉

Tidak perlu setup database atau konfigurasi backend.

## ⚙️ Konfigurasi

Tidak ada konfigurasi khusus yang diperlukan! Aplikasi siap dijalankan out-of-the-box.

**Data disimpan di:**
- 🗂️ **LocalStorage** - Laporan yang Anda buat
- 📦 **Mock Data** - Data desa, bansos, proyek (file `src/data/mockData.js`)

## 🏃 Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
```

Buka browser di **http://localhost:5173**

### Production Build

```bash
# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

File hasil build ada di folder `dist/` siap di-deploy ke hosting statis (Netlify, Vercel, GitHub Pages).

## 📁 Struktur Proyek

```
Pantau-dana/
├── public/                 # Static files
│   ├── robots.txt         # SEO robots
│   └── sitemap.xml        # SEO sitemap
├── src/
│   ├── assets/            # Images, fonts
│   ├── components/
│   │   ├── bansos/        # Komponen Bansos
│   │   ├── dashboard/     # Dashboard komponen
│   │   ├── education/     # Halaman Edukasi
│   │   ├── layout/        # NavBar, FooterBar
│   │   ├── legal/         # Privacy, Terms
│   │   ├── map/           # Peta Proyek
│   │   ├── report/        # Sistem Pelaporan
│   │   ├── search/        # Pencarian Desa
│   │   └── ui/            # UI Components (Toast)
│   ├── data/
│   │   └── mockData.js    # 📦 Mock data (Desa, Bansos, Laporan)
│   ├── App.vue            # Root component
│   ├── main.js            # Vue entry point
│   └── style.css          # Global styles
├── index.html             # HTML entry
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── README.md              # Dokumentasi
```

> 📝 **Note:** Folder `server/` diabaikan karena tidak digunakan dalam mode frontend-only.

## � Penyimpanan Data

### LocalStorage
Aplikasi menyimpan data laporan pengguna di **localStorage browser**:

```javascript
// Contoh struktur data laporan di localStorage
{
  "pantau_desa_reports": [
    {
      "kode_tiket": "RPT-ABC12345",
      "kategori": "penyimpangan",
      "lokasi": "Desa Ngawen RT 05",
      "deskripsi": "...",
      "status": "pending",
      "tanggal": "2026-01-01T10:30:00Z"
    }
  ]
}
```

### Mock Data
Data desa, bansos, dan proyek ada di [`src/data/mockData.js`](src/data/mockData.js) untuk keperluan demonstrasi.

## 🚀 Deploy

Aplikasi ini dapat di-deploy ke platform hosting statis:

### Netlify / Vercel
```bash
npm run build
# Upload folder 'dist/' ke platform
```

### GitHub Pages
```bash
npm run build
# Push folder 'dist/' ke branch gh-pages
```

Semua data tersimpan di localStorage browser pengguna (client-side).

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## 📞 Kontak

- **Email**: info@pantaudesa.id
- **Website**: https://pantaudesa.id

---

<p align="center">
  Dibuat dengan ❤️ untuk Indonesia 🇮🇩
</p>
