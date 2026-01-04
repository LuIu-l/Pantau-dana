<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('articles')
const activeArticle = ref(null)
const searchQuery = ref('')

const tabs = [
  { id: 'articles', label: 'Artikel', icon: '📚' },
  { id: 'guides', label: 'Panduan', icon: '📖' },
  { id: 'infographics', label: 'Infografis', icon: '📊' }
]

const articles = [
  {
    id: 1,
    title: 'Memahami Dana Desa',
    summary: 'Dana Desa adalah dana yang bersumber dari Anggaran Pendapatan dan Belanja Negara yang diperuntukkan bagi Desa.',
    content: 'Dana Desa diprioritaskan untuk pembiayaan pelaksanaan program dan kegiatan berskala lokal desa dengan tujuan untuk meningkatkan kesejahteraan masyarakat desa dan kualitas hidup masyarakat serta penanggulangan kemiskinan. Prioritas penggunaan Dana Desa dipublikasikan kepada masyarakat oleh Pemerintah Desa di ruang publik yang dapat diakses masyarakat desa.\n\nPenggunaan Dana Desa meliputi:\n• Pembangunan infrastruktur desa\n• Pemberdayaan masyarakat\n• Pembinaan kemasyarakatan\n• Penanggulangan bencana\n• BLT Dana Desa',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
    icon: '💰',
    category: 'Dana Desa',
    readTime: '5 menit',
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Jenis-Jenis Bantuan Sosial',
    summary: 'Mengenal berbagai jenis bantuan sosial yang disalurkan pemerintah untuk masyarakat.',
    content: 'Pemerintah menyalurkan berbagai jenis bantuan sosial (Bansos) untuk membantu masyarakat yang membutuhkan:\n\n1. Program Keluarga Harapan (PKH)\nBantuan tunai bersyarat untuk keluarga miskin dengan komponen kesehatan dan pendidikan.\n\n2. Bantuan Pangan Non Tunai (BPNT)\nBantuan sembako melalui Kartu Sembako untuk keluarga kurang mampu.\n\n3. Bantuan Sosial Tunai (BST)\nBantuan langsung tunai untuk masyarakat terdampak ekonomi.\n\n4. Program Indonesia Pintar (PIP)\nBantuan pendidikan untuk siswa dari keluarga miskin.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000',
    icon: '🤝',
    category: 'Bansos',
    readTime: '7 menit',
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Cara Melaporkan Penyelewengan',
    summary: 'Panduan bagi masyarakat untuk melaporkan dugaan penyelewengan dana desa atau bansos.',
    content: 'Masyarakat memiliki hak untuk mengawasi penggunaan dana desa dan penyaluran bansos. Berikut langkah melaporkan penyelewengan:\n\n1. Kumpulkan Bukti\n• Foto atau video dokumentasi\n• Saksi yang dapat dikonfirmasi\n• Data pembanding (harga pasar, spesifikasi)\n\n2. Pilih Saluran Pelaporan\n• Aplikasi LAPOR! (lapor.go.id)\n• Inspektorat daerah setempat\n• Platform Pantau Desa\n• BPK atau BPKP\n\n3. Isi Laporan dengan Lengkap\n• Kronologi kejadian\n• Lokasi dan waktu\n• Pihak terlibat\n• Estimasi kerugian\n\n4. Pantau Tindak Lanjut\nSimpan nomor tiket laporan untuk tracking.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000',
    icon: '📢',
    category: 'Pelaporan',
    readTime: '8 menit',
    color: '#8B5CF6'
  },
  {
    id: 4,
    title: 'Hak Masyarakat dalam Pengawasan',
    summary: 'Masyarakat memiliki hak penuh untuk mengawasi dana desa dan bantuan sosial.',
    content: 'Berdasarkan Undang-Undang Desa No. 6 Tahun 2014, masyarakat desa memiliki hak:\n\n1. Hak Informasi\n• Mengakses data APBDes\n• Mengetahui rencana pembangunan\n• Melihat laporan realisasi anggaran\n\n2. Hak Partisipasi\n• Hadir dalam Musdes\n• Mengusulkan program pembangunan\n• Memberikan masukan perencanaan\n\n3. Hak Pengawasan\n• Memantau pelaksanaan proyek\n• Mengecek kualitas pekerjaan\n• Melaporkan penyimpangan\n\n4. Hak Keberatan\n• Mengajukan keberatan atas keputusan\n• Meminta klarifikasi penggunaan dana\n• Menuntut pertanggungjawaban',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    icon: '⚖️',
    category: 'Hukum',
    readTime: '6 menit',
    color: '#F59E0B'
  },
  {
    id: 5,
    title: 'Mengenal APBDes',
    summary: 'Anggaran Pendapatan dan Belanja Desa adalah rencana keuangan tahunan desa.',
    content: 'APBDes adalah instrumen penting dalam pengelolaan keuangan desa yang terdiri dari:\n\n1. Pendapatan Desa\n• Dana Desa dari APBN\n• Alokasi Dana Desa (ADD)\n• Bagi hasil pajak daerah\n• Pendapatan Asli Desa\n\n2. Belanja Desa\n• Bidang Penyelenggaraan Pemerintahan\n• Bidang Pembangunan\n• Bidang Pembinaan Kemasyarakatan\n• Bidang Pemberdayaan Masyarakat\n\n3. Pembiayaan\n• Penerimaan pembiayaan\n• Pengeluaran pembiayaan\n• SiLPA tahun sebelumnya\n\nAPBDes harus dipublikasikan agar masyarakat dapat mengawasi penggunaannya.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    icon: '📋',
    category: 'Dana Desa',
    readTime: '6 menit',
    color: '#EC4899'
  },
  {
    id: 6,
    title: 'Cara Cek Penerima Bansos',
    summary: 'Panduan lengkap cara mengecek apakah Anda terdaftar sebagai penerima bantuan sosial.',
    content: 'Berikut cara mengecek status penerima bantuan sosial:\n\n1. Melalui Website Resmi\n• cekbansos.kemensos.go.id\n• dtks.kemensos.go.id\n\n2. Data yang Dibutuhkan\n• NIK (Nomor Induk Kependudukan)\n• Nama lengkap sesuai KTP\n• Alamat domisili\n\n3. Jenis Bantuan yang Bisa Dicek\n• PKH (Program Keluarga Harapan)\n• BPNT/Kartu Sembako\n• BST (Bantuan Sosial Tunai)\n• BLT Dana Desa\n\n4. Jika Data Tidak Sesuai\n• Laporkan ke kantor desa\n• Ajukan ke Dinas Sosial\n• Gunakan fitur laporan di Pantau Desa\n\nPastikan data Anda sudah terupdate di DTKS untuk mendapat bantuan.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000',
    icon: '🔍',
    category: 'Bansos',
    readTime: '5 menit',
    color: '#06B6D4'
  }
]

const guides = [
  {
    id: 1,
    title: 'Panduan Menggunakan Pantau Desa',
    steps: ['Buka aplikasi dan pilih provinsi', 'Telusuri kabupaten dan kecamatan', 'Pilih desa untuk melihat detail', 'Lihat data anggaran dan proyek'],
    icon: '🗺️',
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Cara Membuat Laporan',
    steps: ['Klik tombol "Buat Laporan"', 'Pilih jenis pelanggaran', 'Isi detail kronologi', 'Upload bukti pendukung', 'Submit dan simpan kode tiket'],
    icon: '📝',
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Cara Melacak Laporan',
    steps: ['Buka menu "Lacak Laporan"', 'Masukkan kode tiket', 'Lihat status terkini', 'Cek riwayat tindak lanjut'],
    icon: '🔎',
    color: '#8B5CF6'
  }
]

const infographics = [
  {
    id: 1,
    title: 'Alur Penyaluran Dana Desa',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    description: 'Dari APBN hingga sampai ke desa'
  },
  {
    id: 2,
    title: 'Hak Warga dalam Pengawasan',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    description: 'Ketahui hak Anda sebagai warga'
  },
  {
    id: 3,
    title: 'Tanda-tanda Korupsi Dana Desa',
    image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800',
    description: 'Kenali red flags penyelewengan'
  }
]

const tips = [
  {
    number: '01',
    title: 'Selalu Verifikasi',
    description: 'Pastikan informasi yang Anda terima berasal dari sumber resmi pemerintah.',
    icon: '✅'
  },
  {
    number: '02',
    title: 'Simpan Bukti',
    description: 'Dokumentasikan setiap bukti jika menemukan indikasi penyelewengan.',
    icon: '📸'
  },
  {
    number: '03',
    title: 'Gunakan Jalur Resmi',
    description: 'Laporkan melalui aplikasi LAPOR! atau instansi berwenang untuk tindak lanjut.',
    icon: '📨'
  },
  {
    number: '04',
    title: 'Ikuti Perkembangan',
    description: 'Pantau terus status laporan Anda hingga mendapat penyelesaian.',
    icon: '👁️'
  }
]

const filteredArticles = computed(() => {
  if (!searchQuery.value) return articles
  const query = searchQuery.value.toLowerCase()
  return articles.filter(a => 
    a.title.toLowerCase().includes(query) || 
    a.summary.toLowerCase().includes(query) ||
    a.category.toLowerCase().includes(query)
  )
})

const openArticle = (article) => {
  activeArticle.value = article
}

const closeArticle = () => {
  activeArticle.value = null
}
</script>

<template>
  <div class="education-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Pusat Edukasi
          </span>
          <h1>Belajar Transparansi<br/><span class="gradient-text">Dana Desa</span></h1>
          <p>Pahami hak Anda sebagai warga negara dan pelajari cara mengawasi penggunaan dana desa dengan efektif</p>
          
          <!-- Search -->
          <div class="hero-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Cari artikel atau topik..."
            />
          </div>
        </div>
      </div>
    </section>

    <div class="container main-content">
      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-icon">📚</span>
          <div class="stat-info">
            <span class="stat-value">{{ articles.length }}</span>
            <span class="stat-label">Artikel</span>
          </div>
        </div>
        <div class="stat-item">
          <span class="stat-icon">📖</span>
          <div class="stat-info">
            <span class="stat-value">{{ guides.length }}</span>
            <span class="stat-label">Panduan</span>
          </div>
        </div>
        <div class="stat-item">
          <span class="stat-icon">📊</span>
          <div class="stat-info">
            <span class="stat-value">{{ infographics.length }}</span>
            <span class="stat-label">Infografis</span>
          </div>
        </div>
        <div class="stat-item">
          <span class="stat-icon">💡</span>
          <div class="stat-info">
            <span class="stat-value">{{ tips.length }}</span>
            <span class="stat-label">Tips</span>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tabs-container">
        <div class="tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab-btn"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-label">{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- Articles Tab -->
      <section v-if="activeTab === 'articles'" class="articles-section">
        <div class="articles-grid">
          <article 
            v-for="article in filteredArticles" 
            :key="article.id"
            class="article-card"
            @click="openArticle(article)"
          >
            <div class="article-image">
              <img :src="article.image" :alt="article.title" loading="lazy" />
              <div class="article-overlay">
                <span class="read-btn">Baca Artikel</span>
              </div>
            </div>
            <div class="article-badge" :style="{ background: article.color }">
              {{ article.icon }}
            </div>
            <div class="article-content">
              <div class="article-meta">
                <span class="category" :style="{ color: article.color }">{{ article.category }}</span>
                <span class="read-time">{{ article.readTime }}</span>
              </div>
              <h3>{{ article.title }}</h3>
              <p>{{ article.summary }}</p>
            </div>
          </article>
        </div>

        <div v-if="filteredArticles.length === 0" class="no-results">
          <span class="no-results-icon">🔍</span>
          <p>Tidak ada artikel yang cocok dengan "{{ searchQuery }}"</p>
          <button class="btn-reset" @click="searchQuery = ''">Reset Pencarian</button>
        </div>
      </section>

      <!-- Guides Tab -->
      <section v-if="activeTab === 'guides'" class="guides-section">
        <div class="guides-grid">
          <div 
            v-for="guide in guides" 
            :key="guide.id"
            class="guide-card"
          >
            <div class="guide-header" :style="{ background: `linear-gradient(135deg, ${guide.color}, ${guide.color}dd)` }">
              <span class="guide-icon">{{ guide.icon }}</span>
              <h3>{{ guide.title }}</h3>
            </div>
            <div class="guide-steps">
              <div 
                v-for="(step, index) in guide.steps" 
                :key="index"
                class="step-item"
              >
                <span class="step-number" :style="{ background: guide.color }">{{ index + 1 }}</span>
                <span class="step-text">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Infographics Tab -->
      <section v-if="activeTab === 'infographics'" class="infographics-section">
        <div class="infographics-grid">
          <div 
            v-for="info in infographics" 
            :key="info.id"
            class="infographic-card"
          >
            <div class="infographic-image">
              <img :src="info.image" :alt="info.title" loading="lazy" />
              <div class="infographic-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <path d="M11 8v6M8 11h6"/>
                </svg>
              </div>
            </div>
            <div class="infographic-info">
              <h3>{{ info.title }}</h3>
              <p>{{ info.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tips Section -->
      <section class="tips-section">
        <div class="section-header">
          <h2>💡 Tips Penting untuk Warga</h2>
          <p>Panduan singkat agar pengawasan Anda efektif</p>
        </div>
        <div class="tips-grid">
          <div 
            v-for="tip in tips" 
            :key="tip.number"
            class="tip-card"
          >
            <div class="tip-icon">{{ tip.icon }}</div>
            <span class="tip-number">{{ tip.number }}</span>
            <h4>{{ tip.title }}</h4>
            <p>{{ tip.description }}</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <div class="cta-icon">🚀</div>
          <h2>Siap Mengawasi Dana Desa?</h2>
          <p>Mulai pantau penggunaan dana desa di wilayah Anda sekarang</p>
          <div class="cta-buttons">
            <router-link to="/jelajahi" class="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Jelajahi Desa
            </router-link>
            <router-link to="/laporan" class="btn btn-outline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              Buat Laporan
            </router-link>
          </div>
        </div>
      </section>
    </div>

    <!-- Article Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div v-if="activeArticle" class="modal-overlay" @click="closeArticle">
          <div class="modal-content" @click.stop>
            <button class="close-btn" @click="closeArticle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div class="modal-image">
              <img :src="activeArticle.image" :alt="activeArticle.title" />
            </div>
            
            <div class="modal-body">
              <div class="modal-meta">
                <span class="modal-category" :style="{ background: activeArticle.color }">
                  {{ activeArticle.icon }} {{ activeArticle.category }}
                </span>
                <span class="modal-time">⏱️ {{ activeArticle.readTime }} baca</span>
              </div>
              
              <h2>{{ activeArticle.title }}</h2>
              
              <div class="modal-text">
                <p v-for="(paragraph, index) in activeArticle.content.split('\n\n')" :key="index">
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style scoped>
.education-page {
  background: var(--color-background);
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: calc(var(--spacing-3xl) + 80px) var(--spacing-md) var(--spacing-3xl);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: var(--gradient-hero);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-badge svg {
  width: 18px;
  height: 18px;
}

.hero-section h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-section p {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.hero-search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.hero-search svg {
  width: 22px;
  height: 22px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.hero-search input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--color-text-primary);
  background: transparent;
}

/* Main Content */
.main-content {
  padding: var(--spacing-xl) var(--spacing-md);
  max-width: 1200px;
  margin: 0 auto;
}

/* Stats Bar */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: -60px;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
}

@media (max-width: 768px) {
  .stats-bar {
    grid-template-columns: repeat(2, 1fr);
    margin-top: -40px;
  }
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-surface);
  padding: 1.25rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border-light);
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

/* Tabs */
.tabs-container {
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  background: var(--color-surface);
  padding: 0.5rem;
  border-radius: 16px;
  border: 1px solid var(--color-border-light);
  overflow-x: auto;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  background: var(--color-background);
  color: var(--color-text-primary);
}

.tab-btn.active {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.tab-icon {
  font-size: 1.25rem;
}

/* Articles Section */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.article-card {
  background: var(--color-surface);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.1);
}

.article-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover .article-overlay {
  opacity: 1;
}

.read-btn {
  background: white;
  color: var(--color-primary);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.875rem;
}

.article-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.article-content {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.category {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.read-time {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.article-content h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
  line-height: 1.4;
}

.article-content p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Guides Section */
.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.guide-card {
  background: var(--color-surface);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  transition: all 0.3s ease;
}

.guide-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.guide-header {
  padding: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.guide-icon {
  font-size: 2.5rem;
}

.guide-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
}

.guide-steps {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-text {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
}

/* Infographics Section */
.infographics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.infographic-card {
  background: var(--color-surface);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: all 0.3s ease;
}

.infographic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.infographic-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.infographic-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.infographic-overlay {
  position: absolute;
  inset: 0;
  background: rgba(59, 130, 246, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.infographic-card:hover .infographic-overlay {
  opacity: 1;
}

.infographic-overlay svg {
  width: 48px;
  height: 48px;
  color: white;
}

.infographic-info {
  padding: 1.25rem;
}

.infographic-info h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--color-text-primary);
}

.infographic-info p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin: 0;
}

/* Tips Section */
.tips-section {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid var(--color-border-light);
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

.section-header p {
  color: var(--color-text-secondary);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--color-border-light);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  border-color: var(--color-primary);
}

.tip-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
}

.tip-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.tip-number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.2;
}

.tip-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

.tip-card p {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.cta-section {
  margin-top: 3rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-section h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
}

.cta-section p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-buttons .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-buttons .btn svg {
  width: 20px;
  height: 20px;
}

.cta-buttons .btn-primary {
  background: white;
  color: var(--color-primary);
}

.cta-buttons .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.cta-buttons .btn-outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.cta-buttons .btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--color-surface);
  border-radius: 20px;
  border: 1px dashed var(--color-border);
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.no-results p {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.btn-reset {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--color-surface);
  border-radius: 24px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #EF4444;
  border-color: #EF4444;
  color: white;
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.modal-image {
  height: 250px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-body {
  padding: 2rem;
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.modal-category {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
}

.modal-time {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.modal-body h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--color-text-primary);
}

.modal-text p {
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 1rem;
  white-space: pre-line;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}

@media (max-width: 640px) {
  .hero-section h1 {
    font-size: 1.75rem;
  }
  
  .articles-grid,
  .guides-grid,
  .infographics-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-image {
    height: 180px;
  }
}
</style>
