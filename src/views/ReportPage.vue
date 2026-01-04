<script setup>
import ReportModal from '@/components/report/ReportModal.vue'
import TrackReport from '@/components/report/TrackReport.vue'
import { ref } from 'vue'

const reportModal = ref(null)
const activeTab = ref('track') // 'create' or 'track'

const openReportModal = () => {
  reportModal.value?.openModal()
}
</script>

<template>
  <div class="report-page">
    <!-- Hero Section -->
    <section class="report-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Layanan Pengaduan Masyarakat</h1>
            <p class="hero-subtitle">
              Platform aman dan terpercaya untuk melaporkan indikasi penyalahgunaan dana desa. Identitas Anda terlindungi.
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-value">1.2k+</span>
                <span class="stat-label">Laporan Masuk</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">98%</span>
                <span class="stat-label">Tindak Lanjut</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">24/7</span>
                <span class="stat-label">Layanan</span>
              </div>
            </div>
          </div>
          <div class="hero-image">
            <div class="shield-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container main-content">
      <!-- Action Cards -->
      <div class="action-grid">
        <div class="action-card create-report" @click="openReportModal">
          <div class="card-bg-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
          <div class="card-content">
            <div class="icon-box primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </div>
            <h3>Buat Laporan Baru</h3>
            <p>Laporkan indikasi penyimpangan dengan bukti pendukung. Bisa anonim.</p>
            <button class="action-btn primary">
              Mulai Lapor
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div class="action-card track-report" :class="{ 'active': activeTab === 'track' }" @click="activeTab = 'track'">
          <div class="card-bg-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <div class="card-content">
            <div class="icon-box secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3>Lacak Status</h3>
            <p>Pantau progress tindak lanjut laporan Anda menggunakan ID Tiket.</p>
            <button class="action-btn secondary">
              Cek Status
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Track Report Component -->
      <transition name="slide-fade">
        <div class="track-section" v-if="activeTab === 'track'">
          <div class="section-header">
            <h2>Pelacakan Laporan</h2>
            <button class="close-btn" @click="activeTab = null">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <TrackReport />
        </div>
      </transition>

      <!-- Recent Activity Ticker -->
      <div class="recent-activity">
        <div class="ticker-label">Laporan Terbaru:</div>
        <div class="ticker-content">
          <div class="ticker-item">
            <span class="ticker-time">Baru saja</span>
            <span class="ticker-text">Laporan #TK-8823 masuk dari Jawa Tengah</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-time">5 menit lalu</span>
            <span class="ticker-text">Laporan #TK-8821 status diupdate: Sedang Diproses</span>
          </div>
          <div class="ticker-item">
            <span class="ticker-time">12 menit lalu</span>
            <span class="ticker-text">Laporan #TK-8819 selesai ditindaklanjuti</span>
          </div>
        </div>
      </div>

      <!-- Info Section -->
      <div class="info-grid">
        <div class="info-card security">
          <div class="card-header">
            <div class="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3>Jaminan Keamanan</h3>
          </div>
          <ul class="feature-list">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Identitas pelapor dirahasiakan (Whistleblower System)
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Enkripsi data end-to-end
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              Opsi pelaporan anonim tersedia
            </li>
          </ul>
        </div>

        <div class="info-card tips">
          <div class="card-header">
            <div class="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </div>
            <h3>Panduan Pelaporan</h3>
          </div>
          <ul class="feature-list">
            <li>
              <span class="step-num">1</span>
              Uraikan kronologi kejadian dengan jelas (5W + 1H)
            </li>
            <li>
              <span class="step-num">2</span>
              Lampirkan bukti pendukung (Foto, Dokumen, Rekaman)
            </li>
            <li>
              <span class="step-num">3</span>
              Simpan ID Tiket untuk memantau perkembangan
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Report Modal -->
    <ReportModal ref="reportModal" />
  </div>
</template>

<style scoped>
.report-page {
  min-height: 100vh;
  background-color: var(--color-background);
  padding-top: var(--navbar-height);
}

/* Hero Section */
.report-hero {
  background: var(--color-surface);
  padding: var(--spacing-2xl) 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-2xl);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--spacing-2xl);
  align-items: center;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-image {
    display: none;
  }
  
  .hero-stats {
    justify-content: center;
  }
}

.hero-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
}

.hero-stats {
  display: flex;
  gap: var(--spacing-2xl);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-primary);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-image {
  display: flex;
  justify-content: center;
}

.shield-icon {
  width: 200px;
  height: 200px;
  color: var(--color-primary-100);
}

/* Action Grid */
.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.action-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.card-bg-icon {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 150px;
  height: 150px;
  color: var(--color-background);
  opacity: 0.5;
  pointer-events: none;
  transition: all var(--transition-base);
}

.action-card:hover .card-bg-icon {
  transform: scale(1.1);
  color: var(--color-primary-50);
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.icon-box {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.icon-box.primary {
  background: var(--color-primary-50);
  color: var(--color-primary);
}

.icon-box.secondary {
  background: var(--color-secondary-50);
  color: var(--color-secondary);
}

.action-card h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.action-card p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
  flex-grow: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: all var(--transition-base);
  border: none;
  cursor: pointer;
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.action-btn.primary {
  background: var(--color-primary);
  color: white;
}

.action-btn.secondary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.action-card:hover .action-btn.secondary {
  background: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);
}

/* Track Section */
.track-section {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border-light);
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: var(--spacing-xs);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.close-btn:hover {
  background: var(--color-danger-50);
  color: var(--color-danger);
}

/* Recent Activity */
.recent-activity {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md) var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  border: 1px solid var(--color-border-light);
  overflow: hidden;
}

.ticker-label {
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
}

.ticker-content {
  display: flex;
  gap: var(--spacing-xl);
  animation: ticker 20s linear infinite;
}

@keyframes ticker {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  white-space: nowrap;
}

.ticker-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background: var(--color-background);
  padding: 2px 6px;
  border-radius: 4px;
}

.ticker-text {
  font-size: var(--font-size-sm);
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.info-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  border: 1px solid var(--color-border-light);
}

.info-card .card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.info-card .icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.security .icon-wrapper {
  background: var(--color-success-50);
  color: var(--color-success);
}

.tips .icon-wrapper {
  background: var(--color-warning-50);
  color: var(--color-warning);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.feature-list li svg {
  width: 18px;
  height: 18px;
  color: var(--color-success);
  flex-shrink: 0;
  margin-top: 2px;
}

.step-num {
  width: 20px;
  height: 20px;
  background: var(--color-text-muted);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
