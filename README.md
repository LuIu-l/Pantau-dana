# Pantau Dana Desa

Pantau Dana Desa adalah aplikasi web berbasis Vue untuk meningkatkan transparansi penggunaan dana desa dan bantuan sosial melalui data anggaran, visualisasi, serta fitur pelaporan masyarakat.

## Fitur Utama

- Pencarian dan penelusuran data desa
- Ringkasan anggaran desa dan progres penggunaan dana
- Peta proyek pembangunan interaktif
- Statistik dana desa dan bantuan sosial
- Fitur laporan dugaan penyimpangan + pelacakan status laporan
- Halaman edukasi, bantuan, kebijakan privasi, dan syarat layanan

## Teknologi

- Vue 3
- Vite
- Vue Router
- Pinia
- Vitest
- Leaflet (`@vue-leaflet/vue-leaflet`)

## Menjalankan Proyek

### Prasyarat

- Node.js >= 18
- npm >= 9

### Instalasi

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build Production

```bash
npm run build
```

### Menjalankan Test

```bash
npm test
```

## Scripts NPM

- `npm run dev` — menjalankan development server
- `npm run build` — build aplikasi untuk production
- `npm run preview` — preview hasil build
- `npm test` — menjalankan test (watch mode)
- `npm run test:run` — menjalankan test sekali jalan
- `npm run test:coverage` — test dengan laporan coverage

## Struktur Direktori

```text
src/
├── components/   # Komponen UI
├── views/        # Halaman berdasarkan route
├── router/       # Konfigurasi route
├── stores/       # State management (Pinia)
├── services/     # Logika bisnis
├── data/         # Data mock / sumber data awal
├── utils/        # Utility functions
└── assets/       # Aset statis
```

## Kontribusi

Panduan kontribusi tersedia di [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Lisensi

Proyek ini menggunakan lisensi yang tercantum pada file [`LICENSE`](./LICENSE).
