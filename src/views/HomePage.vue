<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HeroSearch from '@/components/search/HeroSearch.vue'
import VillageSummary from '@/components/dashboard/VillageSummary.vue'
import BudgetTracker from '@/components/dashboard/BudgetTracker.vue'
import ProjectMap from '@/components/map/ProjectMap.vue'
import ReportModal from '@/components/report/ReportModal.vue'
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue'
import NewsCard from '@/components/home/NewsCard.vue'
import TestimonialSlider from '@/components/home/TestimonialSlider.vue'
import TrendingVillages from '@/components/home/TrendingVillages.vue'
import QuickAccessCards from '@/components/home/QuickAccessCards.vue'
import { desaDetail, proyekData, formatRupiah } from '@/data/mockData.js'
import { 
  statistikNasional, 
  beritaUpdates, 
  testimonials, 
  trendingDesa 
} from '@/data/extendedMockData.js'

const router = useRouter()
const route = useRoute()
const reportModal = ref(null)
const selectedDesaId = ref(null)
const isLoading = ref(false)

// Animation refs
const statsVisible = ref(false)
const statsSection = ref(null)

// Check if we have a desa ID from route
onMounted(() => {
  if (route.params.id) {
    selectDesa(route.params.id)
  }
  
  // Intersection observer for stats animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statsVisible.value = true
        }
      })
    },
    { threshold: 0.2 }
  )
  
  if (statsSection.value) {
    observer.observe(statsSection.value)
  }
  
  onUnmounted(() => {
    observer.disconnect()
  })
})

const selectedDesa = computed(() => {
  if (!selectedDesaId.value) return null
  return desaDetail[selectedDesaId.value] || null
})

const selectedProyek = computed(() => {
  if (!selectedDesaId.value) return []
  return proyekData[selectedDesaId.value] || []
})

const selectDesa = (desaId) => {
  isLoading.value = true
  selectedDesaId.value = desaId
  router.push({ name: 'desa-detail', params: { id: desaId } })
  setTimeout(() => {
    isLoading.value = false
    window.scrollTo({ top: 100, behavior: 'smooth' })
  }, 300)
}

const backToSearch = () => {
  selectedDesaId.value = null
  router.push({ name: 'home' })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openReport = () => {
  reportModal.value?.openModal()
}

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="home-page">
    <!-- Show search if no desa selected -->
    <template v-if="!selectedDesa">
      <!-- Hero Section with Dynamic Stats -->
      <section class="hero-section">
        <div class="hero-background">
          <div class="hero-gradient"></div>
          <div class="hero-particles">
            <span v-for="i in 20" :key="i" class="particle"></span>
          </div>
        </div>
        
        <div class="container hero-content">
          <div class="hero-badge">
            <span class="badge-icon">🏆</span>
            <span>Platform Transparansi Dana Desa #1 di Indonesia</span>
          </div>
          
          <h1 class="hero-title">
            Pantau <span class="gradient-text">Dana Desa</span>
            <br>dengan Mudah & Transparan
          </h1>
          
          <p class="hero-subtitle">
            Akses data anggaran, proyek pembangunan, dan bantuan sosial dari 
            {{ statistikNasional.totalDesa.toLocaleString('id-ID') }} desa di seluruh Indonesia
          </p>
          
          <HeroSearch @selectDesa="selectDesa" class="hero-search" />
          
          <!-- Mini Stats -->
          <div class="hero-stats">
            <div class="hero-stat">
              <span class="stat-value">{{ statistikNasional.totalDesa.toLocaleString('id-ID') }}</span>
              <span class="stat-label">Desa Terdaftar</span>
            </div>
            <div class="hero-stat">
              <span class="stat-value">Rp {{ (statistikNasional.totalDanaDesa / 1000000000000).toFixed(0) }}T</span>
              <span class="stat-label">Dana Dikelola</span>
            </div>
            <div class="hero-stat">
              <span class="stat-value">{{ statistikNasional.totalLaporan.toLocaleString('id-ID') }}</span>
              <span class="stat-label">Laporan Aktif</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Access Cards -->
      <QuickAccessCards @navigate="navigateTo" @openReport="openReport" />

      <!-- Statistics Counter Section -->
      <section ref="statsSection" class="stats-section">
        <div class="container">
          <h2 class="section-title">Pantau Desa dalam Angka</h2>
          <p class="section-subtitle">Update data real-time dari seluruh Indonesia</p>
          
          <div class="stats-grid">
            <div class="stat-card stat-card--primary">
              <div class="stat-icon">🏘️</div>
              <AnimatedCounter 
                :value="statistikNasional.desaTerdaftar" 
                :animate="statsVisible"
                suffix="+"
              />
              <span class="stat-label">Desa Terdaftar</span>
            </div>
            
            <div class="stat-card stat-card--secondary">
              <div class="stat-icon">📊</div>
              <AnimatedCounter 
                :value="statistikNasional.totalProyek" 
                :animate="statsVisible"
              />
              <span class="stat-label">Proyek Terlaksana</span>
            </div>
            
            <div class="stat-card stat-card--accent">
              <div class="stat-icon">💰</div>
              <AnimatedCounter 
                :value="72" 
                :animate="statsVisible"
                prefix="Rp "
                suffix=" Triliun"
              />
              <span class="stat-label">Total Dana Desa</span>
            </div>
            
            <div class="stat-card stat-card--success">
              <div class="stat-icon">✅</div>
              <AnimatedCounter 
                :value="statistikNasional.laporanSelesai" 
                :animate="statsVisible"
              />
              <span class="stat-label">Laporan Ditindaklanjuti</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Trending Villages -->
      <TrendingVillages :villages="trendingDesa" @selectDesa="selectDesa" />

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Mengapa Pantau Desa?</h2>
          <p class="section-subtitle">Platform transparansi untuk memastikan dana desa digunakan dengan tepat</p>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon feature-icon--primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h3>Mudah Diakses</h3>
              <p>Cukup pilih lokasi desamu untuk melihat informasi anggaran tanpa perlu login atau registrasi.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon feature-icon--secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                </svg>
              </div>
              <h3>Data Visual</h3>
              <p>Grafik dan peta interaktif memudahkan pemahaman penggunaan dana desa.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon feature-icon--warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Aman & Terpercaya</h3>
              <p>Laporkan masalah dengan identitas terlindungi. Privasi pelapor dijamin keamanannya.</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon feature-icon--danger">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                  <line x1="8" y1="2" x2="8" y2="18"/>
                  <line x1="16" y1="6" x2="16" y2="22"/>
                </svg>
              </div>
              <h3>Peta Proyek</h3>
              <p>Lihat lokasi proyek pembangunan lengkap dengan foto bukti sebelum dan sesudah.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- News & Updates -->
      <section class="news-section">
        <div class="container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Berita & Update Terbaru</h2>
              <p class="section-subtitle">Informasi terkini seputar dana desa di Indonesia</p>
            </div>
            <router-link to="/berita" class="btn btn-outline btn-sm">
              Lihat Semua
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>
          
          <div class="news-grid">
            <NewsCard 
              v-for="berita in beritaUpdates.slice(0, 4)" 
              :key="berita.id" 
              :berita="berita"
            />
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <TestimonialSlider :testimonials="testimonials" />

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-card">
            <div class="cta-content">
              <h2>Temukan Masalah di Desamu?</h2>
              <p>Laporkan secara anonim dan aman. Identitas pelapor dilindungi dan hanya dapat diakses oleh pihak berwenang.</p>
            </div>
            <div class="cta-actions">
              <button class="btn btn-alert btn-lg" @click="openReport">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
                Buat Laporan
              </button>
              <router-link to="/lapor" class="btn btn-outline-light btn-lg">
                Lacak Status Laporan
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- Show dashboard if desa is selected -->
    <template v-else>
      <VillageSummary :desa="selectedDesa" @back="backToSearch" />
      <BudgetTracker 
        :kategoris="selectedDesa.kategori_anggaran" 
        :projects="selectedProyek"
      />
      <ProjectMap 
        :projects="selectedProyek"
        :centerCoordinat="selectedDesa.koordinat"
      />
    </template>

    <!-- Report Modal -->
    <ReportModal ref="reportModal" />
  </div>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: calc(var(--navbar-height) + var(--spacing-2xl)) 0 var(--spacing-3xl);
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: var(--gradient-hero);
}

.hero-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 15s infinite;
}

.particle:nth-child(odd) {
  animation-duration: 20s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
  }
}

.particle:nth-child(1) { left: 5%; animation-delay: 0s; }
.particle:nth-child(2) { left: 10%; animation-delay: 1s; }
.particle:nth-child(3) { left: 15%; animation-delay: 2s; }
.particle:nth-child(4) { left: 20%; animation-delay: 3s; }
.particle:nth-child(5) { left: 25%; animation-delay: 4s; }
.particle:nth-child(6) { left: 30%; animation-delay: 0.5s; }
.particle:nth-child(7) { left: 35%; animation-delay: 1.5s; }
.particle:nth-child(8) { left: 40%; animation-delay: 2.5s; }
.particle:nth-child(9) { left: 45%; animation-delay: 3.5s; }
.particle:nth-child(10) { left: 50%; animation-delay: 4.5s; }
.particle:nth-child(11) { left: 55%; animation-delay: 0.25s; }
.particle:nth-child(12) { left: 60%; animation-delay: 1.25s; }
.particle:nth-child(13) { left: 65%; animation-delay: 2.25s; }
.particle:nth-child(14) { left: 70%; animation-delay: 3.25s; }
.particle:nth-child(15) { left: 75%; animation-delay: 4.25s; }
.particle:nth-child(16) { left: 80%; animation-delay: 0.75s; }
.particle:nth-child(17) { left: 85%; animation-delay: 1.75s; }
.particle:nth-child(18) { left: 90%; animation-delay: 2.75s; }
.particle:nth-child(19) { left: 95%; animation-delay: 3.75s; }
.particle:nth-child(20) { left: 100%; animation-delay: 4.75s; }

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);
  animation: fadeInDown 0.6s ease-out;
}

.badge-icon {
  font-size: 1.2em;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  animation: fadeInUp 0.6s ease-out 0.1s both;
}

.gradient-text {
  background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
  opacity: 0.9;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.hero-search {
  animation: fadeInUp 0.6s ease-out 0.3s both;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-stat .stat-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.hero-stat .stat-label {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

@media (max-width: 640px) {
  .hero-stats {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .hero-stat {
    flex-direction: row;
    gap: var(--spacing-sm);
  }
}

/* Stats Section */
.stats-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-surface);
}

.stats-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background: var(--gradient-card);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  text-align: center;
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-card .stat-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.stat-card .stat-label {
  display: block;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
}

.stat-card--primary { border-top: 3px solid var(--color-primary); }
.stat-card--secondary { border-top: 3px solid var(--color-secondary); }
.stat-card--accent { border-top: 3px solid var(--color-accent); }
.stat-card--success { border-top: 3px solid var(--color-success); }

/* Section Styles */
.section-title {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto var(--spacing-xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.section-header .section-title,
.section-header .section-subtitle {
  text-align: left;
  margin: 0;
}

.section-header .section-subtitle {
  margin-top: var(--spacing-xs);
}

.section-header .btn svg {
  width: 16px;
  height: 16px;
}

/* Features Section */
.features-section {
  padding: var(--spacing-3xl) 0;
}

.features-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  border: 1px solid var(--color-border-light);
}

.feature-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
}

.feature-icon--primary {
  background-color: var(--color-primary-50);
  color: var(--color-primary);
}

.feature-icon--secondary {
  background-color: var(--color-secondary-50);
  color: var(--color-secondary);
}

.feature-icon--warning {
  background-color: rgba(217, 119, 6, 0.1);
  color: var(--color-alert);
}

.feature-icon--danger {
  background-color: rgba(220, 38, 38, 0.1);
  color: var(--color-danger);
}

.feature-icon svg {
  width: 32px;
  height: 32px;
}

.feature-card h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.feature-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* News Section */
.news-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-surface);
}

.news-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-3xl) 0;
}

.cta-card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .cta-card {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
}

.cta-content {
  color: white;
}

.cta-content h2 {
  color: white;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-2xl);
}

.cta-content p {
  opacity: 0.9;
  margin: 0;
  max-width: 450px;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

@media (min-width: 480px) {
  .cta-actions {
    flex-direction: row;
  }
}

.btn-outline-light {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
