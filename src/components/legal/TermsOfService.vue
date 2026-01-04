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
        <h1>Syarat dan Ketentuan</h1>
        <p class="last-updated">Terakhir diperbarui: 1 Januari 2026</p>
      </div>

      <div class="card legal-content">
        <section class="legal-section">
          <h2>1. Penerimaan Syarat</h2>
          <p>
            Dengan mengakses dan menggunakan platform Pantau Desa ("Platform"), Anda menyetujui untuk terikat 
            dengan Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak 
            menggunakan Platform.
          </p>
        </section>

        <section class="legal-section">
          <h2>2. Tentang Pantau Desa</h2>
          <p>
            Pantau Desa adalah platform transparansi publik yang bertujuan untuk:
          </p>
          <ul>
            <li>Menyediakan informasi penggunaan Dana Desa kepada masyarakat</li>
            <li>Memfasilitasi pengecekan data penerima Bantuan Sosial</li>
            <li>Menyediakan saluran pelaporan masalah terkait dana publik</li>
            <li>Meningkatkan transparansi dan akuntabilitas pengelolaan dana desa</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>3. Penggunaan Platform</h2>
          
          <h3>3.1 Penggunaan yang Diizinkan</h3>
          <ul>
            <li>Mencari informasi anggaran dan proyek Dana Desa</li>
            <li>Memeriksa status penerima bantuan sosial di wilayah Anda</li>
            <li>Melaporkan dugaan penyimpangan atau masalah secara bertanggung jawab</li>
            <li>Melacak status laporan yang telah Anda kirimkan</li>
          </ul>
          
          <h3>3.2 Penggunaan yang Dilarang</h3>
          <p>Anda dilarang untuk:</p>
          <ul>
            <li>Membuat laporan palsu atau menyesatkan</li>
            <li>Menyebarkan data pribadi penerima bantuan tanpa izin</li>
            <li>Melakukan serangan terhadap sistem atau infrastruktur Platform</li>
            <li>Menggunakan bot atau sistem otomatis untuk mengakses Platform secara massal</li>
            <li>Menyalahgunakan fitur Platform untuk tujuan yang tidak semestinya</li>
            <li>Melanggar hak privasi atau hak-hak pihak lain</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>4. Pelaporan Masalah</h2>
          
          <h3>4.1 Ketentuan Pelaporan</h3>
          <p>Dalam membuat laporan, Anda harus:</p>
          <ul>
            <li>Memberikan informasi yang benar dan akurat sesuai pengetahuan Anda</li>
            <li>Menyertakan bukti yang valid jika tersedia</li>
            <li>Tidak membuat tuduhan palsu yang dapat merugikan pihak lain</li>
            <li>Bertanggung jawab atas isi laporan yang Anda kirimkan</li>
          </ul>
          
          <h3>4.2 Proses Tindak Lanjut</h3>
          <ul>
            <li>Laporan akan ditinjau oleh tim verifikasi</li>
            <li>Laporan valid akan diteruskan ke instansi terkait</li>
            <li>Status laporan dapat dipantau menggunakan kode tiket</li>
            <li>Waktu penyelesaian tergantung pada kompleksitas masalah</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>5. Data dan Informasi</h2>
          
          <h3>5.1 Sumber Data</h3>
          <p>
            Data yang ditampilkan di Platform berasal dari sumber resmi pemerintah dan dapat berupa 
            data simulasi untuk keperluan demonstrasi. Platform tidak menjamin keakuratan data secara absolut.
          </p>
          
          <h3>5.2 Pembaruan Data</h3>
          <p>
            Data diperbarui secara berkala. Untuk informasi terbaru dan resmi, pengguna disarankan 
            untuk memverifikasi ke instansi terkait.
          </p>
        </section>

        <section class="legal-section">
          <h2>6. Hak Kekayaan Intelektual</h2>
          <p>
            Seluruh konten Platform termasuk namun tidak terbatas pada teks, grafik, logo, ikon, 
            gambar, dan perangkat lunak adalah milik Pantau Desa atau pemberi lisensinya dan dilindungi 
            oleh hukum hak cipta Indonesia.
          </p>
          <ul>
            <li>Anda tidak boleh menyalin, memodifikasi, atau mendistribusikan konten tanpa izin</li>
            <li>Penggunaan logo atau merek dagang harus mendapat persetujuan tertulis</li>
            <li>Konten yang Anda kirimkan (laporan, foto) tetap menjadi milik Anda namun Anda memberikan 
                lisensi kepada Platform untuk menggunakannya dalam konteks layanan</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>7. Batasan Tanggung Jawab</h2>
          <p>
            Platform disediakan "sebagaimana adanya" tanpa jaminan apapun. Kami tidak bertanggung jawab atas:
          </p>
          <ul>
            <li>Kerugian langsung atau tidak langsung akibat penggunaan Platform</li>
            <li>Ketidakakuratan data yang ditampilkan</li>
            <li>Gangguan layanan atau kegagalan sistem</li>
            <li>Tindakan pihak ketiga yang menggunakan informasi dari Platform</li>
            <li>Keputusan yang diambil berdasarkan informasi dari Platform</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>8. Ganti Rugi</h2>
          <p>
            Anda setuju untuk membebaskan dan melindungi Pantau Desa, afiliasi, dan karyawannya dari 
            segala klaim, tuntutan, atau kerugian yang timbul akibat:
          </p>
          <ul>
            <li>Pelanggaran Anda terhadap Syarat dan Ketentuan ini</li>
            <li>Konten yang Anda kirimkan ke Platform</li>
            <li>Pelanggaran hak pihak ketiga oleh Anda</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>9. Penghentian Akses</h2>
          <p>
            Kami berhak untuk membatasi atau menghentikan akses Anda ke Platform tanpa pemberitahuan 
            sebelumnya jika:
          </p>
          <ul>
            <li>Anda melanggar Syarat dan Ketentuan ini</li>
            <li>Terdeteksi aktivitas mencurigakan atau berbahaya</li>
            <li>Diwajibkan oleh hukum atau otoritas yang berwenang</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>10. Perubahan Ketentuan</h2>
          <p>
            Kami dapat mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan berlaku segera 
            setelah dipublikasikan di Platform. Penggunaan berkelanjutan setelah perubahan berarti 
            Anda menyetujui ketentuan yang diperbarui.
          </p>
        </section>

        <section class="legal-section">
          <h2>11. Hukum yang Berlaku</h2>
          <p>
            Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. 
            Setiap sengketa yang timbul akan diselesaikan di pengadilan yang berwenang di Indonesia.
          </p>
        </section>

        <section class="legal-section">
          <h2>12. Ketentuan Umum</h2>
          <ul>
            <li>Jika ada ketentuan yang dinyatakan tidak berlaku, ketentuan lainnya tetap berlaku penuh</li>
            <li>Kegagalan kami untuk menegakkan hak tidak berarti pelepasan hak tersebut</li>
            <li>Syarat dan Ketentuan ini merupakan keseluruhan perjanjian antara Anda dan Platform</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>13. Kontak</h2>
          <p>
            Untuk pertanyaan tentang Syarat dan Ketentuan ini, hubungi kami di:
          </p>
          <div class="contact-info">
            <p><strong>Email:</strong> legal@pantaudesa.id</p>
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
