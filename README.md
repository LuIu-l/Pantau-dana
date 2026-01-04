# Pantau Dana Desa

Platform transparansi Dana Desa dan Bantuan Sosial untuk Indonesia.

## 📋 Daftar Isi

- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Deploy ke GitHub Pages](#deploy-ke-github-pages)
- [Testing](#testing)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## ✨ Fitur

- 🏠 Dashboard monitoring dana desa
- 💰 Tracking penggunaan dana
- 🗺️ Peta interaktif lokasi proyek
- 📊 Statistik dan visualisasi data
- 🎯 Cek bantuan sosial
- 📱 Progressive Web App (PWA)
- 🌙 Dark mode support
- 📱 Responsive design

## 🛠️ Teknologi

- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **Vue Router** - Official Router
- **Pinia** - State Management
- **Leaflet** - Interactive Maps
- **Vitest** - Unit Testing Framework
- **PWA** - Progressive Web App Support

## 📦 Instalasi

```bash
# Clone repository
git clone https://github.com/username/Pantau-dana.git

# Masuk ke direktori proyek
cd Pantau-dana

# Install dependencies
npm install
```

## 🚀 Penggunaan

### Development

```bash
# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build

```bash
# Build untuk production
npm run build
```

### Preview

```bash
# Preview production build
npm run preview
```

## 🌐 Deploy ke GitHub Pages

### Metode 1: Otomatis dengan GitHub Actions (Recommended)

1. **Push kode ke GitHub**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages"
   git push origin main
   ```

2. **Aktifkan GitHub Pages di repository Settings**
   - Buka repository di GitHub
   - Pergi ke **Settings** → **Pages**
   - Di bagian **Source**, pilih **GitHub Actions**

3. **Deploy otomatis**
   - Setiap push ke branch `main` akan otomatis trigger deployment
   - Workflow akan build dan deploy aplikasi
   - Setelah selesai, aplikasi akan tersedia di `https://username.github.io/Pantau-dana/`

4. **Update base path (jika perlu)**
   
   Di file [vite.config.js](vite.config.js), sesuaikan base path dengan nama repository:
   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/nama-repo-anda/' : '/'
   ```

### Metode 2: Manual dengan gh-pages

```bash
# Install dependencies (jika belum)
npm install

# Deploy ke GitHub Pages
npm run deploy
```

**Catatan penting:**
- Pastikan nama repository di `vite.config.js` sesuai dengan repository GitHub Anda
- Jika deploy ke `https://username.github.io/`, ubah base menjadi `'/'`
- Jika deploy ke `https://username.github.io/repo-name/`, ubah base menjadi `'/repo-name/'`

### Troubleshooting

**Halaman tidak muncul atau blank:**
1. Periksa base path di [vite.config.js](vite.config.js)
2. Pastikan GitHub Pages sudah diaktifkan
3. Cek status deployment di tab **Actions**

**Assets tidak load:**
- Pastikan base path sudah benar
- Clear cache browser
- Periksa console untuk error

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk detail.

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 📞 Kontak

Untuk pertanyaan atau saran, silakan buka issue di repository ini.

---

Dibuat dengan ❤️ untuk transparansi Dana Desa Indonesia

