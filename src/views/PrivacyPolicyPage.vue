<script setup>
// Pantau Dana - Privacy Policy Page
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="privacy-page">
    <div class="container">
      <div class="policy-header">
        <button @click="router.push('/')" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>
        <h1>Kebijakan Privasi</h1>
        <p class="update-date">Terakhir diperbarui: 1 Januari 2026</p>
      </div>

      <div class="policy-content">
        <section>
          <h2>1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi berikut saat Anda menggunakan platform Pantau Dana Desa:</p>
          <ul>
            <li>Informasi akun (nama, email) jika Anda mendaftar</li>
            <li>Data laporan yang Anda submit</li>
            <li>Data penggunaan aplikasi (halaman yang dikunjungi, fitur yang digunakan)</li>
            <li>Informasi teknis (alamat IP, browser, perangkat)</li>
          </ul>
        </section>

        <section>
          <h2>2. Bagaimana Kami Menggunakan Informasi</h2>
          <p>Informasi yang dikumpulkan digunakan untuk:</p>
          <ul>
            <li>Menyediakan dan meningkatkan layanan platform</li>
            <li>Memproses dan menindaklanjuti laporan</li>
            <li>Berkomunikasi dengan pengguna terkait laporan</li>
            <li>Analisis untuk meningkatkan transparansi dana desa</li>
            <li>Mencegah penyalahgunaan platform</li>
          </ul>
        </section>

        <section>
          <h2>3. Perlindungan Data Pelapor</h2>
          <p>Kami sangat menjaga kerahasiaan identitas pelapor:</p>
          <ul>
            <li>Data pelapor dienkripsi dengan standar industri</li>
            <li>Hanya petugas berwenang yang dapat mengakses identitas pelapor</li>
            <li>Tersedia opsi laporan anonim</li>
            <li>Identitas tidak akan dibagikan tanpa persetujuan eksplisit</li>
          </ul>
        </section>

        <section>
          <h2>4. Berbagi Informasi dengan Pihak Ketiga</h2>
          <p>Kami tidak menjual data pribadi Anda. Informasi hanya dibagikan kepada:</p>
          <ul>
            <li>Instansi pemerintah yang berwenang menangani laporan</li>
            <li>Penyedia layanan teknologi (hosting, analytics) dengan kontrak kerahasiaan</li>
            <li>Penegak hukum jika diwajibkan oleh peraturan</li>
          </ul>
        </section>

        <section>
          <h2>5. Cookies dan Teknologi Pelacakan</h2>
          <p>Kami menggunakan cookies untuk:</p>
          <ul>
            <li>Menjaga sesi login Anda</li>
            <li>Mengingat preferensi Anda</li>
            <li>Menganalisis penggunaan platform</li>
          </ul>
          <p>Anda dapat menonaktifkan cookies melalui pengaturan browser, namun beberapa fitur mungkin tidak berfungsi optimal.</p>
        </section>

        <section>
          <h2>6. Keamanan Data</h2>
          <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi:</p>
          <ul>
            <li>Enkripsi data saat transit dan penyimpanan</li>
            <li>Akses terbatas berbasis peran</li>
            <li>Audit keamanan berkala</li>
            <li>Backup data reguler</li>
          </ul>
        </section>

        <section>
          <h2>7. Hak Pengguna</h2>
          <p>Anda memiliki hak untuk:</p>
          <ul>
            <li>Mengakses data pribadi Anda</li>
            <li>Memperbaiki data yang tidak akurat</li>
            <li>Menghapus akun dan data Anda</li>
            <li>Menarik persetujuan penggunaan data</li>
            <li>Mengajukan keberatan atas pemrosesan data</li>
          </ul>
        </section>

        <section>
          <h2>8. Penyimpanan Data</h2>
          <p>Data pribadi disimpan selama:</p>
          <ul>
            <li>Akun aktif: selama Anda menggunakan layanan</li>
            <li>Laporan: sesuai ketentuan peraturan (minimal 5 tahun)</li>
            <li>Data anonim/agregat: untuk analisis jangka panjang</li>
          </ul>
        </section>

        <section>
          <h2>9. Perubahan Kebijakan</h2>
          <p>Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan signifikan akan diberitahukan melalui email atau notifikasi di platform.</p>
        </section>

        <section>
          <h2>10. Hubungi Kami</h2>
          <p>Jika ada pertanyaan tentang kebijakan privasi ini, hubungi:</p>
          <ul>
            <li>Email: privacy@pantaudesa.id</li>
            <li>Telepon: +62 21-xxxx-xxxx</li>
            <li>Alamat: Jakarta, Indonesia</li>
          </ul>
        </section>
      </div>

      <div class="policy-footer">
        <router-link to="/syarat" class="link-button">Lihat Syarat & Ketentuan</router-link>
        <router-link to="/" class="link-button primary">Kembali ke Beranda</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy-page {
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

.policy-header {
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

.policy-header h1 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.update-date {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.policy-content {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-xl);
}

.policy-content section {
  margin-bottom: var(--spacing-2xl);
}

.policy-content section:last-child {
  margin-bottom: 0;
}

.policy-content h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
}

.policy-content p {
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.policy-content ul {
  list-style: none;
  padding-left: 0;
}

.policy-content li {
  padding-left: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  position: relative;
  line-height: 1.8;
  color: var(--color-text-secondary);
}

.policy-content li::before {
  content: '•';
  position: absolute;
  left: var(--spacing-sm);
  color: var(--color-primary);
  font-weight: bold;
}

.policy-footer {
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
  .policy-content {
    padding: var(--spacing-lg);
  }
  
  .policy-header h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>
