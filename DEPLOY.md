# 🚀 Panduan Deploy ke GitHub Pages

## 📋 Langkah-langkah Deployment

### 1. Persiapan Repository GitHub

1. **Buat repository baru di GitHub**
   - Buka https://github.com/new
   - Nama repository: `Pantau-dana` (atau nama lain sesuai keinginan)
   - Pilih **Public** (GitHub Pages gratis untuk repo public)
   - **Jangan** centang "Initialize with README" (karena sudah ada di local)

2. **Update `vite.config.js`**
   - Jika nama repository berbeda dari `Pantau-dana`, edit file `vite.config.js`:
   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/NAMA-REPO-ANDA/' : '/',
   ```
   - Ganti `NAMA-REPO-ANDA` dengan nama repository yang Anda buat

### 2. Push Kode ke GitHub

Jalankan perintah berikut di terminal (PowerShell):

```bash
# Inisialisasi Git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: Pantau Desa v1.0"

# Tambahkan remote repository (ganti USERNAME dan NAMA-REPO)
git remote add origin https://github.com/USERNAME/NAMA-REPO.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

### 3. Aktifkan GitHub Pages

1. Buka repository di GitHub
2. Klik tab **Settings**
3. Di sidebar kiri, klik **Pages**
4. Di **Source**, pilih:
   - Source: **GitHub Actions**
5. Simpan

### 4. Deploy Otomatis

Setelah push ke branch `main`:
- GitHub Actions akan otomatis menjalankan workflow
- Build aplikasi secara otomatis
- Deploy ke GitHub Pages
- Website akan tersedia di: `https://USERNAME.github.io/NAMA-REPO/`

**Cara melihat progress:**
1. Buka repository di GitHub
2. Klik tab **Actions**
3. Lihat workflow "Deploy to GitHub Pages"
4. Tunggu hingga selesai (status hijau ✅)

### 5. Akses Website

Setelah deploy berhasil, website dapat diakses di:
```
https://USERNAME.github.io/NAMA-REPO/
```

Ganti `USERNAME` dan `NAMA-REPO` dengan akun dan nama repository Anda.

---

## 🔄 Update Website

Setiap kali Anda melakukan perubahan:

```bash
# Simpan perubahan
git add .
git commit -m "Deskripsi perubahan"

# Push ke GitHub
git push origin main
```

GitHub Actions akan otomatis build dan deploy versi terbaru!

---

## 🛠️ Build Manual (Opsional)

Jika ingin build di local untuk testing:

```bash
# Build untuk production
npm run build

# Preview build
npm run preview
```

File hasil build akan ada di folder `dist/`.

---

## ⚙️ Konfigurasi Tambahan

### Custom Domain (Opsional)

Jika punya domain sendiri:

1. Buat file `public/CNAME` dengan isi:
   ```
   www.pantaudesa.com
   ```

2. Di **GitHub Settings > Pages**, masukkan custom domain

3. Update DNS domain Anda:
   - A Record: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME Record: `USERNAME.github.io`

### Environment Variables

Jika butuh environment variables:

1. Buat file `.env.production`:
   ```
   VITE_APP_TITLE=Pantau Desa
   VITE_API_URL=https://api.example.com
   ```

2. Di kode, akses dengan:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

---

## 🐛 Troubleshooting

### Website tidak muncul
- Cek GitHub Actions apakah ada error
- Pastikan GitHub Pages source sudah di-set ke "GitHub Actions"
- Tunggu 5-10 menit setelah deploy pertama

### CSS/JS tidak load
- Periksa `base` URL di `vite.config.js` sudah benar
- Pastikan nama repository sama dengan yang di konfigurasi

### 404 Error
- Pastikan mengakses dengan `/` di akhir URL
- Cek case sensitivity nama file (Linux case-sensitive)

### Build gagal
- Cek error di GitHub Actions logs
- Pastikan semua dependencies terinstall: `npm install`
- Test build di local: `npm run build`

---

## 📚 Referensi

- [Vite GitHub Pages Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## ✅ Checklist Deployment

- [ ] Repository GitHub sudah dibuat
- [ ] `vite.config.js` sudah di-update dengan nama repo yang benar
- [ ] Kode sudah di-push ke GitHub
- [ ] GitHub Pages sudah diaktifkan (Source: GitHub Actions)
- [ ] Workflow GitHub Actions berjalan sukses
- [ ] Website bisa diakses di `https://USERNAME.github.io/NAMA-REPO/`

---

**Selamat! Website Pantau Desa Anda sudah online! 🎉**
