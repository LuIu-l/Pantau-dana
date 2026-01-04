<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="terms-page">
    <div class="container">
      <div class="terms-header">
        <button @click="router.push('/')" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>
        <h1>Syarat & Ketentuan</h1>
        <p class="update-date">Terakhir diperbarui: 1 Januari 2026</p>
      </div>

      <div class="terms-content">
        <section>
          <h2>1. Penerimaan Syarat</h2>
          <p>Dengan mengakses dan menggunakan platform Pantau Dana Desa, Anda setuju untuk terikat dengan syarat dan ketentuan berikut. Jika Anda tidak setuju, harap tidak menggunakan layanan kami.</p>
        </section>

        <section>
          <h2>2. Deskripsi Layanan</h2>
          <p>Pantau Dana Desa adalah platform transparansi yang menyediakan:</p>
          <ul>
            <li>Informasi publik tentang alokasi dan penggunaan dana desa</li>
            <li>Sistem pelaporan dugaan penyelewengan dana</li>
            <li>Data statistik dan visualisasi anggaran desa</li>
            <li>Edukasi tentang pengelolaan dana desa</li>
          </ul>
        </section>

        <section>
          <h2>3. Akun Pengguna</h2>
          <p>Untuk mengakses fitur tertentu, Anda perlu membuat akun:</p>
          <ul>
            <li>Anda bertanggung jawab menjaga kerahasiaan kredensial akun</li>
            <li>Informasi yang diberikan harus akurat dan terkini</li>
            <li>Satu orang hanya boleh memiliki satu akun</li>
            <li>Kami berhak menangguhkan akun yang melanggar ketentuan</li>
          </ul>
        </section>

        <section>
          <h2>4. Penggunaan yang Dilarang</h2>
          <p>Anda dilarang:</p>
          <ul>
            <li>Membuat laporan palsu atau menyesatkan</li>
            <li>Menggunakan platform untuk tujuan ilegal</li>
            <li>Mengganggu atau merusak sistem keamanan</li>
            <li>Menyebarkan malware atau konten berbahaya</li>
            <li>Melakukan scraping otomatis tanpa izin</li>
            <li>Menyalahgunakan data atau informasi pengguna lain</li>
            <li>Melakukan harassment atau hate speech</li>
          </ul>
        </section>

        <section>
          <h2>5. Pelaporan</h2>
          <p>Ketentuan penggunaan fitur pelaporan:</p>
          <ul>
            <li>Laporan harus berdasarkan fakta dan bukti yang valid</li>
            <li>Laporan palsu dapat dikenakan sanksi hukum</li>
            <li>Identitas pelapor dilindungi sesuai UU Perlindungan Saksi</li>
            <li>Kami berhak memverifikasi laporan sebelum ditindaklanjuti</li>
            <li>Bukti yang dilampirkan menjadi tanggung jawab pelapor</li>
          </ul>
        </section>

        <section>
          <h2>6. Hak Kekayaan Intelektual</h2>
          <p>Semua konten di platform ini (teks, grafik, logo, kode) dilindungi hak cipta:</p>
          <ul>
            <li>Platform dan konten adalah milik Pantau Dana Desa</li>
            <li>Anda dapat menggunakan untuk keperluan pribadi non-komersial</li>
            <li>Dilarang menduplikasi atau memodifikasi tanpa izin</li>
            <li>Data publik dapat digunakan dengan atribusi yang tepat</li>
          </ul>
        </section>

        <section>
          <h2>7. Disclaimer</h2>
          <p>Penting untuk diperhatikan:</p>
          <ul>
            <li>Platform disediakan "sebagaimana adanya" tanpa jaminan</li>
            <li>Kami tidak menjamin keakuratan 100% dari data pihak ketiga</li>
            <li>Kami tidak bertanggung jawab atas keputusan berdasarkan data kami</li>
            <li>Konten pengguna tidak merefleksikan pandangan kami</li>
          </ul>
        </section>

        <section>
          <h2>8. Batasan Tanggung Jawab</h2>
          <p>Kami tidak bertanggung jawab atas:</p>
          <ul>
            <li>Kerugian langsung atau tidak langsung dari penggunaan platform</li>
            <li>Gangguan layanan, bug, atau kesalahan teknis</li>
            <li>Kehilangan data akibat kesalahan pengguna</li>
            <li>Tindakan pihak ketiga berdasarkan laporan Anda</li>
          </ul>
        </section>

        <section>
          <h2>9. Perubahan Layanan</h2>
          <p>Kami berhak:</p>
          <ul>
            <li>Mengubah, menangguhkan, atau menghentikan layanan kapan saja</li>
            <li>Memperbarui syarat dan ketentuan dengan pemberitahuan</li>
            <li>Menolak layanan kepada siapa pun tanpa alasan</li>
          </ul>
        </section>

        <section>
          <h2>10. Hukum yang Berlaku</h2>
          <p>Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui pengadilan Indonesia yang berwenang.</p>
        </section>

        <section>
          <h2>11. Kontak</h2>
          <p>Untuk pertanyaan tentang syarat dan ketentuan:</p>
          <ul>
            <li>Email: legal@pantaudesa.id</li>
            <li>Telepon: +62 21-xxxx-xxxx</li>
            <li>Alamat: Jakarta, Indonesia</li>
          </ul>
        </section>
      </div>

      <div class="terms-footer">
        <router-link to="/privasi" class="link-button">Lihat Kebijakan Privasi</router-link>
        <router-link to="/" class="link-button primary">Kembali ke Beranda</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terms-page {
  min-height: 100vh;
  padding-top: calc(var(--navbar-height) + var(--spacing-xl));
  padding-bottom: var(--spacing-3xl);
  background: var(--color-background);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.terms-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
  margin-bottom: var(--spacing-lg);
}

.back-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.terms-header h1 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.update-date {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.terms-content {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-xl);
}

.terms-content section {
  margin-bottom: var(--spacing-2xl);
}

.terms-content section:last-child {
  margin-bottom: 0;
}

.terms-content h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
}

.terms-content p {
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.terms-content ul {
  list-style: none;
  padding-left: 0;
}

.terms-content li {
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  position: relative;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.terms-content li::before {
  content: '•';
  position: absolute;
  left: var(--spacing-sm);
  color: var(--color-primary);
  font-weight: bold;
}

.terms-footer {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.link-button {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-base);
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.link-button:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.link-button.primary {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.link-button.primary:hover {
  background: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .terms-content {
    padding: var(--spacing-lg);
  }
  
  .terms-header h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>
