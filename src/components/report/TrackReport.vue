<template>
  <div class="track-report-page">
    <div class="container">
      <div class="page-header">
        <h1>Lacak Laporan</h1>
        <p>Masukkan kode tiket untuk melihat status laporan Anda</p>
      </div>

      <div class="card search-card">
        <form @submit.prevent="searchReport" class="search-form">
          <div class="form-group">
            <label class="form-label" for="ticket">Kode Tiket Laporan</label>
            <input 
              type="text"
              id="ticket"
              class="form-input"
              v-model="ticketCode"
              placeholder="Contoh: LPR-2024-123456"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary" :disabled="!ticketCode || isSearching">
            <span v-if="isSearching" class="spinner"></span>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            {{ isSearching ? 'Mencari...' : 'Lacak Status' }}
          </button>
        </form>
      </div>

      <!-- Search Result -->
      <transition name="fade">
        <div v-if="hasSearched" class="result-section">
          <div v-if="report" class="card result-card">
            <div class="result-header">
              <div>
                <span class="result-ticket">{{ report.kode_tiket }}</span>
                <span class="result-date">Dilaporkan {{ formatTanggal(report.tanggal) }}</span>
              </div>
              <span 
                class="badge" 
                :class="'badge-' + getStatusInfo(report.status).color"
              >
                {{ getStatusInfo(report.status).label }}
              </span>
            </div>

            <div class="result-body">
              <div class="result-row">
                <span class="result-label">Kategori</span>
                <span class="result-value">{{ getKategoriName(report.kategori) }}</span>
              </div>
              <div class="result-row">
                <span class="result-label">Lokasi</span>
                <span class="result-value">{{ report.lokasi }}</span>
              </div>
              <div class="result-row">
                <span class="result-label">Deskripsi</span>
                <span class="result-value">{{ report.deskripsi }}</span>
              </div>
            </div>

            <!-- Status Timeline -->
            <div class="status-timeline">
              <h4>Riwayat Status</h4>
              <div class="timeline">
                <div 
                  class="timeline-item"
                  :class="{ 'timeline-active': true }"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <span class="timeline-title">Laporan Terkirim</span>
                    <span class="timeline-date">{{ formatTanggal(report.tanggal) }}</span>
                  </div>
                </div>

                <div 
                  class="timeline-item"
                  :class="{ 'timeline-active': report.status === 'diverifikasi' || report.status === 'ditindaklanjuti' }"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <span class="timeline-title">Sedang Diverifikasi</span>
                    <span class="timeline-date">Tim sedang memeriksa laporan</span>
                  </div>
                </div>

                <div 
                  class="timeline-item"
                  :class="{ 'timeline-active': report.status === 'ditindaklanjuti' }"
                >
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <span class="timeline-title">Ditindaklanjuti</span>
                    <span class="timeline-date">Laporan sedang diproses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="card no-result-card">
            <div class="no-result-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3>Laporan Tidak Ditemukan</h3>
            <p>Kode tiket yang Anda masukkan tidak ditemukan dalam sistem.</p>
            <ul>
              <li>Pastikan kode tiket diketik dengan benar</li>
              <li>Format kode: LPR-TAHUN-6DIGIT (contoh: LPR-2024-123456)</li>
            </ul>
          </div>
        </div>
      </transition>

      <!-- Info Section -->
      <div class="info-section">
        <h3>Tentang Sistem Laporan</h3>
        <div class="info-grid">
          <div class="card info-card">
            <div class="info-icon info-icon-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h4>Keamanan Terjamin</h4>
            <p>Identitas pelapor dienkripsi dan dilindungi. Hanya pihak berwenang yang dapat mengakses data sensitif.</p>
          </div>

          <div class="card info-card">
            <div class="info-icon info-icon-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <h4>Proses Transparan</h4>
            <p>Pantau perkembangan laporan Anda secara real-time melalui sistem tracking dengan kode tiket unik.</p>
          </div>

          <div class="card info-card">
            <div class="info-icon info-icon-warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h4>Respon Cepat</h4>
            <p>Laporan yang masuk akan diverifikasi dalam 3x24 jam dan ditindaklanjuti sesuai prioritas.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { laporanData, kategoriLaporan, formatTanggal, getStatusLabel } from '@/data/mockData.js'

const ticketCode = ref('')
const isSearching = ref(false)
const hasSearched = ref(false)
const report = ref(null)

const searchReport = async () => {
  isSearching.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Search in mock data
  report.value = laporanData.find(r => r.kode_tiket === ticketCode.value.toUpperCase()) || null
  
  isSearching.value = false
  hasSearched.value = true
}

const getKategoriName = (id) => {
  const kategori = kategoriLaporan.find(k => k.id === id)
  return kategori ? kategori.nama : '-'
}

const getStatusInfo = (status) => {
  return getStatusLabel(status)
}
</script>

<style scoped>
.track-report-page {
  padding: var(--spacing-xl) 0 var(--spacing-2xl);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-header h1 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.page-header p {
  color: var(--color-text-secondary);
}

/* Search Card */
.search-card {
  max-width: 500px;
  margin: 0 auto var(--spacing-xl);
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (min-width: 480px) {
  .search-form {
    flex-direction: row;
    align-items: flex-end;
  }
  
  .search-form .form-group {
    flex: 1;
    margin-bottom: 0;
  }
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Result Section */
.result-section {
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
}

.result-card {
  padding: var(--spacing-xl);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.result-ticket {
  display: block;
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xs);
}

.result-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.result-body {
  margin-bottom: var(--spacing-lg);
}

.result-row {
  padding: var(--spacing-sm) 0;
}

.result-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.result-value {
  color: var(--color-text-primary);
}

/* Status Timeline */
.status-timeline {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.status-timeline h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-lg);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-left: var(--spacing-md);
}

.timeline-item {
  display: flex;
  gap: var(--spacing-md);
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 24px;
  bottom: -20px;
  width: 2px;
  background-color: var(--color-border);
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-marker {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-border);
  flex-shrink: 0;
  margin-top: 4px;
}

.timeline-active .timeline-marker {
  background-color: var(--color-success);
  box-shadow: 0 0 0 4px rgba(46, 204, 113, 0.2);
}

.timeline-active::before {
  background-color: var(--color-success);
}

.timeline-content {
  flex: 1;
  padding-bottom: var(--spacing-md);
}

.timeline-title {
  display: block;
  font-weight: 500;
  color: var(--color-text-primary);
}

.timeline-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* No Result */
.no-result-card {
  text-align: center;
  padding: var(--spacing-2xl);
}

.no-result-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-warning-50);
  border-radius: 50%;
  color: var(--color-alert);
}

.no-result-icon svg {
  width: 32px;
  height: 32px;
}

.no-result-card h3 {
  margin-bottom: var(--spacing-sm);
}

.no-result-card > p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.no-result-card ul {
  text-align: left;
  max-width: 350px;
  margin: 0 auto;
  padding-left: var(--spacing-lg);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.no-result-card li {
  margin-bottom: var(--spacing-xs);
}

/* Info Section */
.info-section {
  max-width: 900px;
  margin: 0 auto;
}

.info-section h3 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
}

.info-grid {
  display: grid;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .info-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.info-card {
  text-align: center;
  padding: var(--spacing-xl);
}

.info-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
}

.info-icon-primary {
  background-color: var(--color-primary-50);
  color: var(--color-primary);
}

.info-icon-success {
  background-color: var(--color-secondary-50);
  color: var(--color-secondary);
}

.info-icon-warning {
  background-color: var(--color-warning-50);
  color: var(--color-warning);
}

.info-icon svg {
  width: 28px;
  height: 28px;
}

.info-card h4 {
  margin: 0 0 var(--spacing-sm);
}

.info-card p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
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
</style>
