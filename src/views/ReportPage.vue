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
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Laporan Masyarakat</h1>
        <p class="page-subtitle">Laporkan dugaan penyimpangan dana desa secara anonim dan aman</p>
      </div>

      <!-- Action Cards -->
      <div class="action-cards">
        <div class="action-card action-card--primary" @click="openReportModal">
          <div class="action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </div>
          <div class="action-content">
            <h3>Buat Laporan Baru</h3>
            <p>Laporkan masalah yang Anda temukan di desa secara anonim</p>
          </div>
          <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>

        <div class="action-card" :class="{ 'action-card--active': activeTab === 'track' }" @click="activeTab = 'track'">
          <div class="action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="action-content">
            <h3>Lacak Status Laporan</h3>
            <p>Pantau perkembangan laporan yang sudah Anda buat</p>
          </div>
          <svg class="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      <!-- Track Report Component -->
      <div class="track-section" v-if="activeTab === 'track'">
        <TrackReport />
      </div>

      <!-- Info Section -->
      <div class="info-section">
        <div class="info-card">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Keamanan Pelapor
          </h3>
          <ul>
            <li>Identitas pelapor dijaga kerahasiaannya</li>
            <li>Laporan dienkripsi dan hanya dapat diakses pihak berwenang</li>
            <li>Anda bisa memilih untuk melapor secara anonim</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Tips Pelaporan
          </h3>
          <ul>
            <li>Sertakan bukti berupa foto atau dokumen</li>
            <li>Jelaskan kronologi kejadian secara detail</li>
            <li>Simpan kode tiket untuk melacak status laporan</li>
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
  padding: var(--spacing-xl) 0;
  min-height: 60vh;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto;
}

.action-cards {
  display: grid;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 768px) {
  .action-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

.action-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.action-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.action-card--primary {
  background: linear-gradient(135deg, var(--color-alert) 0%, #b45309 100%);
  border-color: transparent;
  color: white;
}

.action-card--primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.action-card--active {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}

.action-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.action-card:not(.action-card--primary) .action-icon {
  background: var(--color-primary-50);
  color: var(--color-primary);
}

.action-icon svg {
  width: 24px;
  height: 24px;
}

.action-content {
  flex: 1;
}

.action-content h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-2xs);
}

.action-card--primary .action-content h3 {
  color: white;
}

.action-content p {
  font-size: var(--font-size-sm);
  margin: 0;
  opacity: 0.8;
}

.action-arrow {
  width: 24px;
  height: 24px;
  opacity: 0.5;
  flex-shrink: 0;
}

.track-section {
  margin-bottom: var(--spacing-xl);
}

.info-section {
  display: grid;
  gap: var(--spacing-lg);
}

@media (min-width: 768px) {
  .info-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.info-card h3 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
}

.info-card h3 svg {
  width: 24px;
  height: 24px;
}

.info-card ul {
  margin: 0;
  padding-left: var(--spacing-lg);
}

.info-card li {
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.info-card li:last-child {
  margin-bottom: 0;
}
</style>
