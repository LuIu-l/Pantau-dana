<script setup>
import { ref } from 'vue'

const articles = ref([
  {
    id: 1,
    title: 'Memahami Dana Desa',
    summary: 'Dana Desa adalah dana yang bersumber dari Anggaran Pendapatan dan Belanja Negara yang diperuntukkan bagi Desa.',
    content: 'Dana Desa diprioritaskan untuk pembiayaan pelaksanaan program dan kegiatan berskala lokal desa dengan tujuan untuk meningkatkan kesejahteraan masyarakat desa dan kualitas hidup masyarakat serta penanggulangan kemiskinan. Prioritas penggunaan Dana Desa dipublikasikan kepada masyarakat oleh Pemerintah Desa di ruang publik yang dapat diakses masyarakat desa.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000',
    icon: '💰',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Jenis-Jenis Bantuan Sosial',
    summary: 'Mengenal berbagai jenis bantuan sosial yang disalurkan pemerintah untuk masyarakat.',
    content: 'Pemerintah menyalurkan berbagai jenis bantuan sosial (Bansos) seperti Program Keluarga Harapan (PKH), Bantuan Pangan Non Tunai (BPNT), dan Bantuan Sosial Tunai (BST). Setiap bantuan memiliki kriteria penerima dan tujuan yang berbeda-beda untuk membantu masyarakat yang membutuhkan.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000',
    icon: '🤝',
    color: 'secondary'
  },
  {
    id: 3,
    title: 'Cara Melaporkan Penyelewengan',
    summary: 'Panduan bagi masyarakat untuk melaporkan dugaan penyelewengan dana desa atau bansos.',
    content: 'Masyarakat memiliki hak untuk mengawasi penggunaan dana desa dan penyaluran bansos. Jika menemukan indikasi penyelewengan, masyarakat dapat melaporkannya melalui saluran resmi seperti aplikasi LAPOR!, atau langsung ke inspektorat daerah setempat. Sertakan bukti-bukti yang kuat agar laporan dapat ditindaklanjuti.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000',
    icon: '📢',
    color: 'accent'
  },
  {
    id: 4,
    title: 'Hak Masyarakat dalam Pengawasan',
    summary: 'Masyarakat memiliki hak penuh untuk mengawasi dana desa dan bantuan sosial.',
    content: 'Berdasarkan Undang-Undang, masyarakat desa berhak memperoleh informasi dan memantau perencanaan dan pelaksanaan pembangunan desa. Transparansi anggaran adalah kunci untuk memastikan dana tersalurkan dengan tepat sasaran dan efisien.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    icon: '⚖️',
    color: 'warning'
  }
])

const activeArticle = ref(null)

const openArticle = (article) => {
  activeArticle.value = article
}

const closeArticle = () => {
  activeArticle.value = null
}
</script>

<template>
  <div class="education-page">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Pusat Edukasi
          </span>
          <h1>Edukasi Publik</h1>
          <p>Pelajari hak Anda sebagai warga negara dan pahami transparansi anggaran pemerintah desa</p>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="var(--color-background)" d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"/>
        </svg>
      </div>
    </div>

    <div class="container">
      <div class="articles-grid">
        <div v-for="(article, index) in articles" :key="article.id" class="article-card" :style="{ animationDelay: (index * 0.1) + 's' }">
          <div class="article-badge" :class="article.color">{{ article.icon }}</div>
          <div class="article-image" :style="{ backgroundImage: `url(${article.image})` }">
            <div class="image-overlay"></div>
          </div>
          <div class="article-content">
            <h3>{{ article.title }}</h3>
            <p>{{ article.summary }}</p>
            <button class="read-more-btn" @click="openArticle(article)">
              <span>Baca Selengkapnya</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Tips Section -->
      <div class="tips-section">
        <h2>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          Tips Penting
        </h2>
        <div class="tips-grid">
          <div class="tip-card">
            <div class="tip-number">01</div>
            <h4>Selalu Verifikasi</h4>
            <p>Pastikan informasi yang Anda terima berasal dari sumber resmi pemerintah.</p>
          </div>
          <div class="tip-card">
            <div class="tip-number">02</div>
            <h4>Simpan Bukti</h4>
            <p>Dokumentasikan setiap bukti jika menemukan indikasi penyelewengan.</p>
          </div>
          <div class="tip-card">
            <div class="tip-number">03</div>
            <h4>Gunakan Jalur Resmi</h4>
            <p>Laporkan melalui aplikasi LAPOR! atau instansi berwenang untuk tindak lanjut.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Modal -->
    <transition name="modal">
      <div v-if="activeArticle" class="modal-overlay" @click="closeArticle">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeArticle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <div class="modal-header">
            <span class="modal-badge">{{ activeArticle.icon }}</span>
            <h2>{{ activeArticle.title }}</h2>
          </div>
          <div class="modal-body">
            <img :src="activeArticle.image" :alt="activeArticle.title" class="modal-image">
            <p>{{ activeArticle.content }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.education-page {
  background: var(--color-background);
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: var(--gradient-dark);
  padding: calc(var(--spacing-2xl) + 80px) var(--spacing-md) var(--spacing-2xl);
  position: relative;
  overflow: hidden;
  text-align: center;
  color: white;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 60%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%);
  border: 1px solid rgba(139, 92, 246, 0.4);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.hero-badge svg {
  width: 18px;
  height: 18px;
  color: var(--color-accent);
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-section p {
  font-size: 1.15rem;
  opacity: 0.9;
  line-height: 1.7;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0;
}

.hero-wave svg {
  width: 100%;
  height: 60px;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: var(--spacing-2xl) 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-card {
  background: var(--color-surface);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.4s var(--transition-bounce);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  position: relative;
  border: 1px solid var(--color-border);
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
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
  z-index: 2;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
}

.article-badge.primary {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(37, 99, 235, 0.7) 100%);
}

.article-badge.secondary {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(16, 185, 129, 0.7) 100%);
}

.article-badge.accent {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(139, 92, 246, 0.7) 100%);
}

.article-badge.warning {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(245, 158, 11, 0.7) 100%);
}

.article-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%);
}

.article-content {
  padding: 1.5rem;
}

.article-content h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.article-content p {
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-size: 0.95rem;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s var(--transition-bounce);
}

.read-more-btn:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-glow);
}

.read-more-btn svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s;
}

.read-more-btn:hover svg {
  transform: translateX(4px);
}

/* Tips Section */
.tips-section {
  padding: var(--spacing-2xl) 0;
  border-top: 1px solid var(--color-border);
}

.tips-section h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: var(--spacing-xl);
  color: var(--color-text-primary);
}

.tips-section h2 svg {
  width: 28px;
  height: 28px;
  color: var(--color-accent);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  transition: all 0.3s var(--transition-bounce);
  position: relative;
  overflow: hidden;
}

.tip-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.tip-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
}

.tip-number {
  font-size: 3rem;
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 0.5rem;
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
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
  padding: 2rem;
  box-shadow: var(--shadow-xl);
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

.modal-header {
  margin-bottom: 1.5rem;
}

.modal-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--gradient-primary);
  border-radius: 16px;
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0;
}

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 1.5rem;
}

.modal-body p {
  color: var(--color-text-secondary);
  line-height: 1.9;
  font-size: 1.05rem;
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
    font-size: 2rem;
  }
  
  .modal-image {
    height: 200px;
  }
  
  .tips-section h2 {
    font-size: 1.5rem;
  }
}
</style>
