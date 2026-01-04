<script setup>
import BansosCheck from '@/components/bansos/BansosCheck.vue'
import BansosExpenditure from '@/components/bansos/BansosExpenditure.vue'
import { ref } from 'vue'

const activeTab = ref('check') // 'check' or 'expenditure'
</script>

<template>
  <div class="bansos-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Portal Bantuan Sosial</h1>
          <p class="hero-subtitle">
            Transparansi penyaluran bantuan sosial untuk masyarakat. Cek status penerimaan dan pantau realisasi anggaran di desa Anda.
          </p>
        </div>
      </div>
      <div class="hero-pattern"></div>
    </section>

    <div class="container main-content">
      <!-- Tab Navigation -->
      <div class="tabs-container">
        <div class="tab-navigation" role="tablist">
          <button 
            :class="['tab-btn', { active: activeTab === 'check' }]"
            @click="activeTab = 'check'"
            role="tab"
            :aria-selected="activeTab === 'check'"
          >
            <div class="tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <div class="tab-info">
              <span class="tab-title">Cek Penerima</span>
              <span class="tab-desc">Cari data penerima bansos</span>
            </div>
          </button>
          
          <button 
            :class="['tab-btn', { active: activeTab === 'expenditure' }]"
            @click="activeTab = 'expenditure'"
            role="tab"
            :aria-selected="activeTab === 'expenditure'"
          >
            <div class="tab-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <div class="tab-info">
              <span class="tab-title">Laporan Penyaluran</span>
              <span class="tab-desc">Pantau realisasi anggaran</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="content-card">
        <transition name="fade" mode="out-in">
          <div :key="activeTab" class="tab-pane">
            <BansosCheck v-if="activeTab === 'check'" />
            <BansosExpenditure v-else />
          </div>
        </transition>
      </div>
      
      <!-- Info Section -->
      <section class="info-section">
        <div class="info-grid">
          <div class="info-item">
            <div class="info-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Data Terjamin</h3>
            <p>Data bersumber langsung dari DTKS Kementerian Sosial dan Pemerintah Desa.</p>
          </div>
          <div class="info-item">
            <div class="info-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 3.5 3.5L23 7z"/><path d="M16 5l-4.5 4.5"/><path d="M21 3l-6.5 6.5"/><path d="M3 14v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><line x1="12" y1="21" x2="12" y2="12"/></svg>
            </div>
            <h3>Update Berkala</h3>
            <p>Pembaruan data dilakukan setiap bulan sesuai jadwal penyaluran bantuan.</p>
          </div>
          <div class="info-item">
            <div class="info-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <h3>Lapor Masalah</h3>
            <p>Temukan ketidaksesuaian? Laporkan melalui fitur pengaduan kami.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.bansos-page {
  min-height: 100vh;
  background-color: var(--color-background);
  padding-top: var(--navbar-height);
}

/* Hero Section */
.hero-section {
  background: var(--gradient-hero);
  color: white;
  padding: var(--spacing-2xl) 0 var(--spacing-3xl);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
  font-weight: 800;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  line-height: 1.6;
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 20% 150%, rgba(255,255,255,0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% -50%, rgba(255,255,255,0.15) 0%, transparent 50%);
  z-index: 1;
}

/* Main Content */
.main-content {
  margin-top: -60px;
  position: relative;
  z-index: 10;
  padding-bottom: var(--spacing-2xl);
}

/* Tabs */
.tabs-container {
  margin-bottom: var(--spacing-lg);
}

.tab-navigation {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 2px solid transparent;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
  min-width: 250px;
  text-align: left;
}

.tab-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.tab-btn.active {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}

.tab-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: all var(--transition-base);
}

.tab-btn.active .tab-icon {
  background: var(--color-primary);
  color: white;
}

.tab-icon svg {
  width: 24px;
  height: 24px;
}

.tab-info {
  display: flex;
  flex-direction: column;
}

.tab-title {
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}

.tab-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Content Card */
.content-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  min-height: 400px;
  border: 1px solid var(--color-border-light);
}

/* Info Section */
.info-section {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border-light);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.info-item {
  text-align: center;
  padding: var(--spacing-lg);
}

.info-icon-wrapper {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
  background: var(--color-primary-50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.info-icon-wrapper svg {
  width: 32px;
  height: 32px;
}

.info-item h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.info-item p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .tab-btn {
    width: 100%;
    min-width: auto;
  }
  
  .hero-title {
    font-size: var(--font-size-2xl);
  }
}
</style>
