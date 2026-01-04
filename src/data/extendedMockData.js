// ===== EXTENDED MOCK DATA FOR PANTAU DESA =====

// Statistics Data
export const statistikNasional = {
  totalDesa: 74954,
  totalDanaDesa: 72000000000000, // 72 Triliun
  totalProyek: 245678,
  totalLaporan: 15432,
  desaTerdaftar: 12543,
  penggunaDaftar: 89654,
  laporanSelesai: 12876,
  skorTransparansiRata: 78.5,
}

// Trending Villages
export const trendingDesa = [
  {
    id: '3404012001',
    nama: 'Desa Ambarketawang',
    kabupaten: 'Sleman, DI Yogyakarta',
    skorTransparansi: 95,
    totalDana: 1910000000,
    proyekSelesai: 12,
    perubahan: +5,
  },
  {
    id: '3404012002',
    nama: 'Desa Balecatur',
    kabupaten: 'Sleman, DI Yogyakarta',
    skorTransparansi: 92,
    totalDana: 1640000000,
    proyekSelesai: 10,
    perubahan: +3,
  },
  {
    id: '3515082001',
    nama: 'Kelurahan Sidokare',
    kabupaten: 'Sidoarjo, Jawa Timur',
    skorTransparansi: 89,
    totalDana: 2100000000,
    proyekSelesai: 15,
    perubahan: +7,
  },
  {
    id: '3201012001',
    nama: 'Kelurahan Cibinong',
    kabupaten: 'Bogor, Jawa Barat',
    skorTransparansi: 87,
    totalDana: 1850000000,
    proyekSelesai: 11,
    perubahan: -2,
  },
  {
    id: '3404062001',
    nama: 'Desa Sinduadi',
    kabupaten: 'Sleman, DI Yogyakarta',
    skorTransparansi: 85,
    totalDana: 1720000000,
    proyekSelesai: 9,
    perubahan: +1,
  },
]

// News & Updates
export const beritaUpdates = [
  {
    id: 1,
    judul: 'Desa Ambarketawang Raih Penghargaan Transparansi Terbaik',
    ringkasan: 'Dengan skor 95%, Desa Ambarketawang menjadi desa dengan tingkat transparansi tertinggi di DIY.',
    tanggal: '2025-12-28',
    kategori: 'Penghargaan',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop',
    desaId: '3404012001',
  },
  {
    id: 2,
    judul: 'Proyek Jalan Desa di Sidoarjo Selesai Lebih Cepat dari Target',
    ringkasan: 'Pembangunan jalan sepanjang 2km selesai 2 minggu lebih cepat dengan kualitas terjamin.',
    tanggal: '2025-12-25',
    kategori: 'Proyek',
    thumbnail: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=250&fit=crop',
    desaId: '3515082001',
  },
  {
    id: 3,
    judul: 'Pelatihan Digital Marketing untuk 500 UMKM Desa',
    ringkasan: 'Program pemberdayaan masyarakat desa sukses melatih ratusan pelaku UMKM.',
    tanggal: '2025-12-20',
    kategori: 'Pemberdayaan',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    desaId: null,
  },
  {
    id: 4,
    judul: 'Laporan Korupsi Desa Berhasil Ditindaklanjuti',
    ringkasan: 'Berkat laporan masyarakat, penyimpangan dana desa senilai 200 juta berhasil diungkap.',
    tanggal: '2025-12-18',
    kategori: 'Laporan',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop',
    desaId: null,
  },
  {
    id: 5,
    judul: 'BLT Dana Desa 2026 Akan Naik 25%',
    ringkasan: 'Pemerintah mengumumkan kenaikan alokasi BLT Dana Desa untuk tahun anggaran 2026.',
    tanggal: '2025-12-15',
    kategori: 'Kebijakan',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
    desaId: null,
  },
]

// Testimonials
export const testimonials = [
  {
    id: 1,
    nama: 'Budi Santoso',
    jabatan: 'Kepala Desa Ambarketawang',
    lokasi: 'Sleman, DIY',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    kutipan: 'Pantau Desa membantu kami meningkatkan kepercayaan masyarakat. Kini warga bisa langsung memantau penggunaan dana desa.',
    rating: 5,
  },
  {
    id: 2,
    nama: 'Siti Rahayu',
    jabatan: 'Aktivis Desa',
    lokasi: 'Bogor, Jawa Barat',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    kutipan: 'Saya bisa melaporkan masalah dengan aman dan anonim. Dalam 2 minggu, laporan saya sudah ditindaklanjuti.',
    rating: 5,
  },
  {
    id: 3,
    nama: 'Ahmad Fauzi',
    jabatan: 'Warga Desa',
    lokasi: 'Sidoarjo, Jawa Timur',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    kutipan: 'Sekarang saya tahu kemana dana desa digunakan. Transparansi seperti ini yang kita butuhkan.',
    rating: 4,
  },
  {
    id: 4,
    nama: 'Dewi Anggraeni',
    jabatan: 'Ketua PKK',
    lokasi: 'Bantul, DIY',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    kutipan: 'Fitur cek bansos sangat membantu. Warga bisa mengecek status bantuan mereka dengan mudah.',
    rating: 5,
  },
]

// Data untuk Peta Indonesia
export const provinsiData = [
  { id: '11', nama: 'Aceh', skorTransparansi: 72, totalDesa: 6513, totalDana: 5200000000000 },
  { id: '12', nama: 'Sumatera Utara', skorTransparansi: 68, totalDesa: 5418, totalDana: 4800000000000 },
  { id: '13', nama: 'Sumatera Barat', skorTransparansi: 75, totalDesa: 1007, totalDana: 1200000000000 },
  { id: '14', nama: 'Riau', skorTransparansi: 70, totalDesa: 1836, totalDana: 2100000000000 },
  { id: '15', nama: 'Jambi', skorTransparansi: 73, totalDesa: 1551, totalDana: 1800000000000 },
  { id: '16', nama: 'Sumatera Selatan', skorTransparansi: 69, totalDesa: 3241, totalDana: 3500000000000 },
  { id: '17', nama: 'Bengkulu', skorTransparansi: 71, totalDesa: 1513, totalDana: 1600000000000 },
  { id: '18', nama: 'Lampung', skorTransparansi: 74, totalDesa: 2633, totalDana: 2900000000000 },
  { id: '31', nama: 'DKI Jakarta', skorTransparansi: 85, totalDesa: 267, totalDana: 450000000000 },
  { id: '32', nama: 'Jawa Barat', skorTransparansi: 78, totalDesa: 5957, totalDana: 6200000000000 },
  { id: '33', nama: 'Jawa Tengah', skorTransparansi: 82, totalDesa: 8562, totalDana: 8500000000000 },
  { id: '34', nama: 'DI Yogyakarta', skorTransparansi: 88, totalDesa: 438, totalDana: 520000000000 },
  { id: '35', nama: 'Jawa Timur', skorTransparansi: 80, totalDesa: 8501, totalDana: 8200000000000 },
  { id: '36', nama: 'Banten', skorTransparansi: 76, totalDesa: 1551, totalDana: 1700000000000 },
  { id: '51', nama: 'Bali', skorTransparansi: 86, totalDesa: 716, totalDana: 850000000000 },
  { id: '52', nama: 'NTB', skorTransparansi: 72, totalDesa: 1137, totalDana: 1300000000000 },
  { id: '53', nama: 'NTT', skorTransparansi: 65, totalDesa: 3270, totalDana: 3600000000000 },
  { id: '61', nama: 'Kalimantan Barat', skorTransparansi: 67, totalDesa: 2117, totalDana: 2400000000000 },
  { id: '62', nama: 'Kalimantan Tengah', skorTransparansi: 69, totalDesa: 1574, totalDana: 1800000000000 },
  { id: '63', nama: 'Kalimantan Selatan', skorTransparansi: 73, totalDesa: 2008, totalDana: 2200000000000 },
  { id: '64', nama: 'Kalimantan Timur', skorTransparansi: 75, totalDesa: 1026, totalDana: 1200000000000 },
  { id: '71', nama: 'Sulawesi Utara', skorTransparansi: 74, totalDesa: 1839, totalDana: 2000000000000 },
  { id: '72', nama: 'Sulawesi Tengah', skorTransparansi: 68, totalDesa: 1986, totalDana: 2200000000000 },
  { id: '73', nama: 'Sulawesi Selatan', skorTransparansi: 76, totalDesa: 3030, totalDana: 3300000000000 },
  { id: '74', nama: 'Sulawesi Tenggara', skorTransparansi: 70, totalDesa: 2281, totalDana: 2500000000000 },
  { id: '81', nama: 'Maluku', skorTransparansi: 62, totalDesa: 1191, totalDana: 1400000000000 },
  { id: '82', nama: 'Maluku Utara', skorTransparansi: 64, totalDesa: 1196, totalDana: 1300000000000 },
  { id: '91', nama: 'Papua', skorTransparansi: 58, totalDesa: 5419, totalDana: 6500000000000 },
  { id: '92', nama: 'Papua Barat', skorTransparansi: 60, totalDesa: 1742, totalDana: 2100000000000 },
]

// Trend Dana Desa per Tahun
export const trendDanaDesa = [
  { tahun: 2020, total: 62000000000000, proyek: 185432, desaTerdaftar: 74954 },
  { tahun: 2021, total: 65000000000000, proyek: 195678, desaTerdaftar: 74954 },
  { tahun: 2022, total: 68000000000000, proyek: 215432, desaTerdaftar: 74954 },
  { tahun: 2023, total: 70000000000000, proyek: 232156, desaTerdaftar: 74954 },
  { tahun: 2024, total: 72000000000000, proyek: 245678, desaTerdaftar: 74954 },
  { tahun: 2025, total: 75000000000000, proyek: 260000, desaTerdaftar: 74954 },
]

// Distribusi Dana per Kategori (Nasional)
export const distribusiDanaKategori = [
  { kategori: 'Pembangunan Fisik', persentase: 42, total: 30240000000000, warna: '#1D4ED8' },
  { kategori: 'Pemberdayaan Masyarakat', persentase: 25, total: 18000000000000, warna: '#059669' },
  { kategori: 'Operasional Pemerintahan', persentase: 18, total: 12960000000000, warna: '#D97706' },
  { kategori: 'Bantuan Sosial', persentase: 10, total: 7200000000000, warna: '#DC2626' },
  { kategori: 'Lainnya', persentase: 5, total: 3600000000000, warna: '#7C3AED' },
]

// Status Proyek Nasional
export const statusProyekNasional = [
  { status: 'Selesai', jumlah: 198543, persentase: 80.8, warna: '#059669' },
  { status: 'Sedang Berjalan', jumlah: 35421, persentase: 14.4, warna: '#D97706' },
  { status: 'Belum Dimulai', jumlah: 11714, persentase: 4.8, warna: '#DC2626' },
]

// Top 10 Desa dengan Dana Terbesar
export const topDesaDana = [
  { nama: 'Kelurahan Sidokare', kabupaten: 'Sidoarjo', dana: 2500000000 },
  { nama: 'Desa Ambarketawang', kabupaten: 'Sleman', dana: 2200000000 },
  { nama: 'Kelurahan Cibinong', kabupaten: 'Bogor', dana: 2100000000 },
  { nama: 'Desa Balecatur', kabupaten: 'Sleman', dana: 1950000000 },
  { nama: 'Desa Sinduadi', kabupaten: 'Sleman', dana: 1850000000 },
  { nama: 'Desa Caturtunggal', kabupaten: 'Sleman', dana: 1800000000 },
  { nama: 'Kelurahan Tropodo', kabupaten: 'Sidoarjo', dana: 1750000000 },
  { nama: 'Desa Maguwoharjo', kabupaten: 'Sleman', dana: 1700000000 },
  { nama: 'Desa Condongcatur', kabupaten: 'Sleman', dana: 1650000000 },
  { nama: 'Kelurahan Medaeng', kabupaten: 'Sidoarjo', dana: 1600000000 },
]
