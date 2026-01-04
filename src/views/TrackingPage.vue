<script setup>
import { ref, computed } from 'vue'
import { useReportsStore } from '@/stores/reports'
import { formatTanggal, getStatusLabel } from '@/data/mockData.js'

const reportsStore = useReportsStore()

// State
const activeTab = ref('dashboard') // dashboard, bulk, calendar, timeline
const searchQuery = ref('')
const filterStatus = ref('all')
const bulkCodes = ref('')

// Mock user reports
const userReports = computed(() => reportsStore.reports)

// Filtered reports
const filteredReports = computed(() => {
  let reports = [...userReports.value]
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    reports = reports.filter(r => 
      r.kode_tiket.toLowerCase().includes(query) ||
      r.deskripsi.toLowerCase().includes(query)
    )
  }
  
  if (filterStatus.value !== 'all') {
    reports = reports.filter(r => r.status === filterStatus.value)
  }
  
  return reports.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
})

// Calendar data
const calendarMonth = ref(new Date())
const calendarDays = computed(() => {
  const year = calendarMonth.value.getFullYear()
  const month = calendarMonth.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []
  
  // Previous month padding
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push({ date: null, reports: [] })
  }
  
  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const dayReports = userReports.value.filter(r => r.tanggal === dateStr)
    days.push({ date: i, dateStr, reports: dayReports })
  }
  
  return days
})

// Methods
const handleBulkTrack = () => {
  const codes = bulkCodes.value.split('\n').map(c => c.trim()).filter(c => c)
  if (codes.length === 0) {
    alert('Masukkan kode tiket (satu per baris)')
    return
  }
  // Mock: Show results
  alert(`Melacak ${codes.length} laporan...`)
}

const exportReports = (format) => {
  alert(`Mengekspor laporan ke ${format.toUpperCase()}...`)
}

const prevMonth = () => {
  calendarMonth.value = new Date(calendarMonth.value.setMonth(calendarMonth.value.getMonth() - 1))
}

const nextMonth = () => {
  calendarMonth.value = new Date(calendarMonth.value.setMonth(calendarMonth.value.getMonth() + 1))
}

const formatMonth = (date) => {
  return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date)
}
</script>

<template>
  <div class="tracking-page">
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Lacak Laporan Saya</h1>
        <p class="page-subtitle">Kelola dan pantau semua laporan yang pernah Anda buat</p>
      </div>
    </section>

    <!-- Tabs -->
    <section class="tabs-section">
      <div class="container">
        <div class="tabs">
          <button 
            class="tab" 
            :class="{ active: activeTab === 'dashboard' }"
            @click="activeTab = 'dashboard'"
          >
            <span>📋</span> Dashboard
          </button>
          <button 
            class="tab" 
            :class="{ active: activeTab === 'bulk' }"
            @click="activeTab = 'bulk'"
          >
            <span>📦</span> Bulk Tracking
          </button>
          <button 
            class="tab" 
            :class="{ active: activeTab === 'calendar' }"
            @click="activeTab = 'calendar'"
          >
            <span>📅</span> Kalender
          </button>
          <button 
            class="tab" 
            :class="{ active: activeTab === 'timeline' }"
            @click="activeTab = 'timeline'"
          >
            <span>⏱️</span> Timeline
          </button>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- Dashboard View -->
      <div v-if="activeTab === 'dashboard'" class="dashboard-view">
        <!-- Stats Summary -->
        <div class="stats-row">
          <div class="stat-box">
            <span class="stat-number">{{ userReports.length }}</span>
            <span class="stat-label">Total Laporan</span>
          </div>
          <div class="stat-box stat-box--warning">
            <span class="stat-number">{{ userReports.filter(r => r.status === 'diverifikasi').length }}</span>
            <span class="stat-label">Sedang Diproses</span>
          </div>
          <div class="stat-box stat-box--success">
            <span class="stat-number">{{ userReports.filter(r => r.status === 'ditindaklanjuti').length }}</span>
            <span class="stat-label">Ditindaklanjuti</span>
          </div>
          <div class="stat-box stat-box--info">
            <span class="stat-number">{{ userReports.filter(r => r.status === 'terkirim').length }}</span>
            <span class="stat-label">Menunggu</span>
          </div>
        </div>

        <!-- Search & Filter -->
        <div class="filter-bar">
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Cari kode tiket atau deskripsi..."
            />
          </div>
          <select v-model="filterStatus" class="filter-select">
            <option value="all">Semua Status</option>
            <option value="terkirim">Terkirim</option>
            <option value="diverifikasi">Diverifikasi</option>
            <option value="ditindaklanjuti">Ditindaklanjuti</option>
          </select>
          <div class="export-buttons">
            <button class="btn btn-outline btn-sm" @click="exportReports('pdf')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              PDF
            </button>
            <button class="btn btn-outline btn-sm" @click="exportReports('excel')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Excel
            </button>
          </div>
        </div>

        <!-- Reports List -->
        <div class="reports-list">
          <div 
            v-for="report in filteredReports"
            :key="report.kode_tiket"
            class="report-card"
          >
            <div class="report-header">
              <span class="ticket-code">{{ report.kode_tiket }}</span>
              <span 
                class="status-badge"
                :class="getStatusLabel(report.status).color"
              >
                {{ getStatusLabel(report.status).label }}
              </span>
            </div>
            <p class="report-description">{{ report.deskripsi }}</p>
            <div class="report-meta">
              <span class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {{ formatTanggal(report.tanggal) }}
              </span>
              <span class="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ report.lokasi }}
              </span>
            </div>
            <div class="report-actions">
              <router-link :to="`/lapor?kode=${report.kode_tiket}`" class="btn btn-sm btn-outline">
                Lihat Detail
              </router-link>
            </div>
          </div>

          <div v-if="filteredReports.length === 0" class="empty-state">
            <span class="empty-icon">📭</span>
            <h3>Tidak ada laporan</h3>
            <p>Belum ada laporan yang sesuai dengan filter</p>
            <router-link to="/lapor" class="btn btn-primary">
              Buat Laporan Baru
            </router-link>
          </div>
        </div>
      </div>

      <!-- Bulk Tracking View -->
      <div v-if="activeTab === 'bulk'" class="bulk-view">
        <div class="bulk-card">
          <h3>Lacak Banyak Laporan Sekaligus</h3>
          <p>Masukkan kode tiket (satu per baris) untuk melacak status beberapa laporan sekaligus</p>
          
          <textarea 
            v-model="bulkCodes"
            class="bulk-textarea"
            placeholder="LPR-2024-123456
LPR-2024-789012
LPR-2024-345678"
            rows="8"
          ></textarea>
          
          <div class="bulk-actions">
            <button class="btn btn-primary btn-lg" @click="handleBulkTrack">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Lacak Semua
            </button>
          </div>
        </div>
      </div>

      <!-- Calendar View -->
      <div v-if="activeTab === 'calendar'" class="calendar-view">
        <div class="calendar-card">
          <div class="calendar-header">
            <button class="nav-btn" @click="prevMonth">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <h3>{{ formatMonth(calendarMonth) }}</h3>
            <button class="nav-btn" @click="nextMonth">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          
          <div class="calendar-grid">
            <div class="calendar-day-header">Min</div>
            <div class="calendar-day-header">Sen</div>
            <div class="calendar-day-header">Sel</div>
            <div class="calendar-day-header">Rab</div>
            <div class="calendar-day-header">Kam</div>
            <div class="calendar-day-header">Jum</div>
            <div class="calendar-day-header">Sab</div>
            
            <div 
              v-for="(day, index) in calendarDays"
              :key="index"
              class="calendar-day"
              :class="{ 
                empty: !day.date,
                'has-reports': day.reports.length > 0
              }"
            >
              <span v-if="day.date" class="day-number">{{ day.date }}</span>
              <div v-if="day.reports.length > 0" class="day-reports">
                <span 
                  v-for="report in day.reports.slice(0, 2)"
                  :key="report.kode_tiket"
                  class="report-dot"
                  :class="getStatusLabel(report.status).color"
                  :title="report.kode_tiket"
                ></span>
                <span v-if="day.reports.length > 2" class="more-reports">
                  +{{ day.reports.length - 2 }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="calendar-legend">
            <span class="legend-item">
              <span class="legend-dot success"></span>
              Ditindaklanjuti
            </span>
            <span class="legend-item">
              <span class="legend-dot warning"></span>
              Diverifikasi
            </span>
            <span class="legend-item">
              <span class="legend-dot info"></span>
              Terkirim
            </span>
          </div>
        </div>
      </div>

      <!-- Timeline View -->
      <div v-if="activeTab === 'timeline'" class="timeline-view">
        <div class="timeline">
          <div 
            v-for="report in filteredReports"
            :key="report.kode_tiket"
            class="timeline-item"
          >
            <div class="timeline-marker" :class="getStatusLabel(report.status).color"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-date">{{ formatTanggal(report.tanggal) }}</span>
                <span 
                  class="status-badge small"
                  :class="getStatusLabel(report.status).color"
                >
                  {{ getStatusLabel(report.status).label }}
                </span>
              </div>
              <h4 class="timeline-title">{{ report.kode_tiket }}</h4>
              <p class="timeline-description">{{ report.deskripsi }}</p>
              <span class="timeline-location">📍 {{ report.lokasi }}</span>
            </div>
          </div>

          <div v-if="filteredReports.length === 0" class="empty-timeline">
            <p>Tidak ada laporan untuk ditampilkan</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-page {
  min-height: 100vh;
  padding-top: var(--navbar-height);
  padding-bottom: var(--spacing-2xl);
}

/* Header */
.page-header {
  background: var(--gradient-hero);
  padding: var(--spacing-2xl) 0;
  color: white;
  text-align: center;
}

.page-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  opacity: 0.9;
}

/* Tabs */
.tabs-section {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-light);
  position: sticky;
  top: var(--navbar-height);
  z-index: 50;
}

.tabs {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) 0;
  overflow-x: auto;
}

.tab {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-base);
}

.tab:hover {
  border-color: var(--color-primary);
}

.tab.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Dashboard View */
.dashboard-view {
  padding: var(--spacing-xl) 0;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-box {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  border-left: 4px solid var(--color-primary);
}

.stat-box--warning { border-left-color: var(--color-warning); }
.stat-box--success { border-left-color: var(--color-success); }
.stat-box--info { border-left-color: var(--color-info); }

.stat-number {
  display: block;
  font-size: var(--font-size-2xl);
  font-weight: 700;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Filter Bar */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.search-box {
  flex: 1;
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.search-box svg {
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
}

.filter-select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.export-buttons {
  display: flex;
  gap: var(--spacing-sm);
}

.export-buttons .btn svg {
  width: 16px;
  height: 16px;
  margin-right: var(--spacing-xs);
}

/* Reports List */
.reports-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.report-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border-light);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.ticket-code {
  font-weight: 600;
  font-family: monospace;
}

.status-badge {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.status-badge.success { background: rgba(5, 150, 105, 0.1); color: var(--color-success); }
.status-badge.warning { background: rgba(217, 119, 6, 0.1); color: var(--color-warning); }
.status-badge.info { background: rgba(29, 78, 216, 0.1); color: var(--color-info); }
.status-badge.danger { background: rgba(220, 38, 38, 0.1); color: var(--color-danger); }

.report-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}

.report-meta {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.meta-item svg {
  width: 16px;
  height: 16px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: var(--spacing-md);
}

.empty-state h3 {
  margin-bottom: var(--spacing-sm);
}

.empty-state p {
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-lg);
}

/* Bulk View */
.bulk-view {
  padding: var(--spacing-xl) 0;
}

.bulk-card {
  max-width: 600px;
  margin: 0 auto;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  text-align: center;
}

.bulk-card h3 {
  margin-bottom: var(--spacing-sm);
}

.bulk-card p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.bulk-textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: monospace;
  resize: vertical;
  margin-bottom: var(--spacing-lg);
}

.bulk-actions {
  display: flex;
  justify-content: center;
}

.bulk-actions .btn svg {
  width: 20px;
  height: 20px;
  margin-right: var(--spacing-sm);
}

/* Calendar View */
.calendar-view {
  padding: var(--spacing-xl) 0;
}

.calendar-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.calendar-header h3 {
  margin: 0;
}

.nav-btn {
  padding: var(--spacing-sm);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.nav-btn:hover {
  background: var(--color-background);
}

.nav-btn svg {
  width: 20px;
  height: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--spacing-xs);
}

.calendar-day-header {
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-muted);
  padding: var(--spacing-sm);
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xs);
  border-radius: var(--radius-md);
  background: var(--color-background);
}

.calendar-day.empty {
  background: transparent;
}

.calendar-day.has-reports {
  background: var(--color-primary-50);
}

.day-number {
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.day-reports {
  display: flex;
  gap: 2px;
  margin-top: var(--spacing-xs);
}

.report-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.report-dot.success { background: var(--color-success); }
.report-dot.warning { background: var(--color-warning); }
.report-dot.info { background: var(--color-info); }

.more-reports {
  font-size: 8px;
  color: var(--color-text-muted);
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-dot.success { background: var(--color-success); }
.legend-dot.warning { background: var(--color-warning); }
.legend-dot.info { background: var(--color-info); }

/* Timeline View */
.timeline-view {
  padding: var(--spacing-xl) 0;
}

.timeline {
  position: relative;
  padding-left: var(--spacing-xl);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}

.timeline-item {
  position: relative;
  padding-bottom: var(--spacing-xl);
}

.timeline-marker {
  position: absolute;
  left: calc(-1 * var(--spacing-xl) + 4px);
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--color-surface);
}

.timeline-marker.success { background: var(--color-success); }
.timeline-marker.warning { background: var(--color-warning); }
.timeline-marker.info { background: var(--color-info); }

.timeline-content {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border-light);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.timeline-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.status-badge.small {
  font-size: var(--font-size-xs);
  padding: 2px 6px;
}

.timeline-title {
  margin: 0 0 var(--spacing-sm);
  font-family: monospace;
}

.timeline-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.timeline-location {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.empty-timeline {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-muted);
}
</style>
