<template>
  <div class="legal-page">
    <div class="container">
      <div class="page-header">
        <button class="back-btn" @click="$emit('navigate', 'home')" aria-label="Kembali ke beranda">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali
        </button>
        <h1>Kebijakan Privasi</h1>
        <p class="last-updated">Terakhir diperbarui: 1 Januari 2026</p>
      </div>

      <div class="card legal-content">
        <section class="legal-section">
          <h2>1. Pendahuluan</h2>
          <p>
            Pantau Desa ("kami", "kita", atau "Platform") berkomitmen untuk melindungi privasi Anda. 
            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, 
            dan melindungi informasi Anda ketika Anda menggunakan platform kami.
          </p>
        </section>

        <section class="legal-section">
          <h2>2. Informasi yang Kami Kumpulkan</h2>
          
          <h3>2.1 Informasi yang Anda Berikan</h3>
          <ul>
            <li><strong>Data Laporan:</strong> Kategori masalah, deskripsi, lokasi kejadian, dan foto bukti yang Anda kirimkan</li>
            <li><strong>Data Pencarian:</strong> Nama dan wilayah yang Anda gunakan untuk mencari data penerima bantuan sosial</li>
          </ul>
          
          <h3>2.2 Informasi yang Dikumpulkan Secara Otomatis</h3>
          <ul>
            <li><strong>Data Teknis:</strong> Alamat IP, jenis browser, sistem operasi, dan informasi perangkat</li>
            <li><strong>Data Penggunaan:</strong> Halaman yang dikunjungi, waktu akses, dan interaksi dengan platform</li>
            <li><strong>Cookies:</strong> Data kecil yang disimpan di perangkat Anda untuk meningkatkan pengalaman pengguna</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>3. Bagaimana Kami Menggunakan Informasi</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul>
            <li>Memproses dan menindaklanjuti laporan masalah yang Anda kirimkan</li>
            <li>Menyediakan layanan pencarian data bantuan sosial</li>
            <li>Meningkatkan dan mengoptimalkan platform kami</li>
            <li>Menganalisis tren penggunaan untuk pengembangan fitur baru</li>
            <li>Memastikan keamanan dan mencegah penyalahgunaan platform</li>
            <li>Memenuhi kewajiban hukum yang berlaku</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>4. Perlindungan Data Penerima Bantuan</h2>
          <p>
            Kami menerapkan prinsip <strong>Privacy-First</strong> dalam menampilkan data penerima bantuan sosial:
          </p>
          <ul>
            <li>Nama penerima ditampilkan dalam format tersamarkan (masked)</li>
            <li>Tidak menampilkan NIK, alamat lengkap, atau data sensitif lainnya</li>
            <li>Data pencarian tidak disimpan atau dilacak</li>
            <li>Tidak ada profiling atau tracking individual pengguna</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>5. Perlindungan Identitas Pelapor</h2>
          <p>
            Untuk laporan masalah, kami menjamin:
          </p>
          <ul>
            <li>Identitas pelapor dijaga kerahasiaannya</li>
            <li>Laporan dapat dilakukan secara anonim</li>
            <li>Hanya pihak berwenang yang dapat mengakses detail laporan</li>
            <li>Data pelapor tidak akan disebarkan ke pihak ketiga tanpa persetujuan</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>6. Berbagi Informasi</h2>
          <p>Kami dapat membagikan informasi Anda kepada:</p>
          <ul>
            <li><strong>Instansi Pemerintah:</strong> Untuk tindak lanjut laporan sesuai kewenangan</li>
            <li><strong>Penyedia Layanan:</strong> Pihak ketiga yang membantu operasional platform dengan perjanjian kerahasiaan</li>
            <li><strong>Kewajiban Hukum:</strong> Jika diwajibkan oleh hukum atau proses peradilan</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>7. Keamanan Data</h2>
          <p>Kami menerapkan langkah-langkah keamanan termasuk:</p>
          <ul>
            <li>Enkripsi data dalam transit menggunakan SSL/TLS</li>
            <li>Akses terbatas ke data sensitif</li>
            <li>Monitoring keamanan secara berkala</li>
            <li>Backup data secara rutin</li>
            <li>Audit keamanan berkala</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>8. Hak Anda</h2>
          <p>Anda memiliki hak untuk:</p>
          <ul>
            <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
            <li>Meminta koreksi data yang tidak akurat</li>
            <li>Meminta penghapusan data (dengan batasan tertentu)</li>
            <li>Menolak penggunaan data untuk tujuan tertentu</li>
            <li>Menarik persetujuan yang telah diberikan</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>9. Cookies dan Teknologi Pelacakan</h2>
          <p>
            Kami menggunakan cookies untuk:
          </p>
          <ul>
            <li>Menyimpan preferensi pengguna</li>
            <li>Menganalisis penggunaan platform</li>
            <li>Meningkatkan kinerja dan pengalaman pengguna</li>
          </ul>
          <p>
            Anda dapat mengatur browser untuk menolak cookies, namun beberapa fitur platform mungkin tidak berfungsi optimal.
          </p>
        </section>

        <section class="legal-section">
          <h2>10. Retensi Data</h2>
          <p>
            Kami menyimpan data selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini, 
            atau selama diwajibkan oleh hukum. Data laporan disimpan minimal 5 tahun untuk keperluan audit dan arsip.
          </p>
        </section>

        <section class="legal-section">
          <h2>11. Perubahan Kebijakan</h2>
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. 
            Perubahan signifikan akan diumumkan melalui platform. 
            Penggunaan berkelanjutan setelah perubahan berarti Anda menerima kebijakan yang diperbarui.
          </p>
        </section>

        <section class="legal-section">
          <h2>12. Kontak</h2>
          <p>
            Untuk pertanyaan tentang Kebijakan Privasi ini, hubungi kami di:
          </p>
          <div class="contact-info">
            <p><strong>Email:</strong> privacy@pantaudesa.id</p>
            <p><strong>Telepon:</strong> (021) 1500-123</p>
            <p><strong>Alamat:</strong> Jakarta, Indonesia</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['navigate'])
</script>

<style scoped>
.legal-page {
  padding: var(--spacing-xl) 0 var(--spacing-2xl);
  background: var(--color-background);
  min-height: 100vh;
}

.page-header {
  margin-bottom: var(--spacing-xl);
  padding-top: var(--spacing-lg);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
  margin-bottom: var(--spacing-lg);
}

.back-btn:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.page-header h1 {
  font-size: 2.25rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-sm);
}

.last-updated {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.legal-content {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);
}

.legal-section {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.legal-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.legal-section h2 {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.legal-section h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: var(--spacing-lg) 0 var(--spacing-sm);
}

.legal-section p {
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.legal-section ul {
  margin: var(--spacing-md) 0;
  padding-left: var(--spacing-xl);
}

.legal-section li {
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-sm);
}

.legal-section li strong {
  color: var(--color-text-primary);
}

.contact-info {
  background: var(--color-background);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-md);
}

.contact-info p {
  margin-bottom: var(--spacing-sm);
}

.contact-info p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .legal-content {
    padding: var(--spacing-lg);
  }
  
  .page-header h1 {
    font-size: 1.75rem;
  }
}
</style>
