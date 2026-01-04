<script setup>
import { ref, computed } from 'vue'
import { 
  statistikNasional, 
  trendDanaDesa, 
  distribusiDanaKategori, 
  statusProyekNasional, 
  topDesaDana,
  provinsiData 
} from '@/data/extendedMockData.js'
import { formatRupiah } from '@/data/mockData.js'

const selectedMetric = ref('all')
const comparisonProvinsi = ref(null)
const isSidebarOpen = ref(false)

const metrics = [
  { id: 'all', label: 'Semua', icon: '📊' },
  { id: 'dana', label: 'Dana Desa', icon: '💰' },
  { id: 'proyek', label: 'Proyek', icon: '🏗️' },
  { id: 'transparansi', label: 'Transparansi', icon: '📈' }
]

// Infographic data
const infographics = [
  {
    id: 1,
    icon: '🛣️',
    value: '156.432',
    unit: 'km',
    label: 'Jalan Desa Dibangun',
    description: 'Setara 4x keliling bumi!'
  },
  {
    id: 2,
    icon: '🏫',
    value: '12.543',
    unit: 'unit',
    label: 'Sekolah & PAUD',
    description: 'Terbangun dari dana desa'
  },
  {
    id: 3,
    icon: '💧',
    value: '45.678',
    unit: 'unit',
    label: 'Sarana Air Bersih',
    description: 'Melayani jutaan warga'
  },
  {
    id: 4,
    icon: '🏥',
    value: '8.765',
    unit: 'unit',
    label: 'Posyandu & Puskesmas',
    description: 'Untuk kesehatan warga desa'
  }
]

const downloadReport = (format) => {
  alert(`Mengunduh laporan dalam format ${format.toUpperCase()}...`)
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="statistics-page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">
            <span class="title-icon">📊</span>
            Statistik Nasional
          </h1>
          <p class="page-subtitle">Dashboard data dana desa dan pembangunan seluruh Indonesia</p>
        </div>
        
        <!-- Mobile Filter Toggle -->
        <button class="filter-toggle-btn" @click="toggleSidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="4" y1="21" x2="4" y2="14"/>
            <line x1="4" y1="10" x2="4" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="3"/>
            <line x1="20" y1="21" x2="20" y2="16"/>
            <line x1="20" y1="12" x2="20" y2="3"/>
            <line x1="1" y1="14" x2="7" y2="14"/>
            <line x1="9" y1="8" x2="15" y2="8"/>
            <line x1="17" y1="16" x2="23" y2="16"/>
          </svg>
          Filter
        </button>
      </div>
    </header>

    <!-- Main Content Area -->
    <div class="dashboard-layout">
      <!-- Sidebar Filter -->
      <aside class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <h2>Filter Data</h2>
            <button class="close-sidebar" @click="isSidebarOpen = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="filter-section">
            <label>Metrik Utama</label>
            <div class="metric-buttons">
              <button 
                v-for="metric in metrics"
                :key="metric.id"
                class="metric-btn"
                :class="{ active: selectedMetric === metric.id }"
                @click="selectedMetric = metric.id"
              >
                <span class="metric-icon">{{ metric.icon }}</span>
                <span class="metric-label">{{ metric.label }}</span>
              </button>
            </div>
          </div>

          <div class="filter-section">
            <label>Bandingkan Provinsi</label>
            <select v-model="comparisonProvinsi" class="filter-select">
              <option :value="null">Pilih Provinsi...</option>
              <option v-for="prov in provinsiData" :key="prov.id" :value="prov">
                {{ prov.nama }}
              </option>
            </select>
          </div>

          <div class="sidebar-actions">
            <button class="btn btn-primary" @click="downloadReport('pdf')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Unduh Laporan PDF
            </button>
          </div>
        </div>
      </aside>

      <!-- Overlay for mobile sidebar -->
      <div 
        v-if="isSidebarOpen" 
        class="sidebar-overlay" 
        @click="isSidebarOpen = false"
      ></div>

      <!-- Main Dashboard Content -->
      <main class="main-content">
        <div class="content-wrapper">
          <!-- Summary Cards -->
          <section class="summary-section">
            <div class="summary-grid">
              <div class="summary-card">
                <div class="card-icon icon-blue">💰</div>
                <div class="card-info">
                  <span class="card-label">Total Dana Desa</span>
                  <span class="card-value">{{ formatRupiah(statistikNasional.totalDana) }}</span>
                  <span class="card-trend positive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    </svg>
                    +12.5% dari 2023
                  </span>
                </div>
              </div>
              
              <div class="summary-card">
                <div class="card-icon icon-green">🏗️</div>
                <div class="card-info">
                  <span class="card-label">Proyek Selesai</span>
                  <span class="card-value">{{ statistikNasional.totalProyek.toLocaleString('id-ID') }}</span>
                  <span class="card-trend positive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    </svg>
                    +8.2% dari 2023
                  </span>
                </div>
              </div>
              
              <div class="summary-card">
                <div class="card-icon icon-purple">📈</div>
                <div class="card-info">
                  <span class="card-label">Rata-rata Penyerapan</span>
                  <span class="card-value">{{ statistikNasional.rataRataPenyerapan }}%</span>
                  <span class="card-trend neutral">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Stabil
                  </span>
                </div>
              </div>

              <div class="summary-card">
                <div class="card-icon icon-orange">🏘️</div>
                <div class="card-info">
                  <span class="card-label">Total Desa</span>
                  <span class="card-value">{{ statistikNasional.totalDesa?.toLocaleString('id-ID') || '74.961' }}</span>
                  <span class="card-trend positive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    </svg>
                    Aktif menerima dana
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Charts Section -->
          <section class="charts-section">
            <!-- Trend Chart - Full Width -->
            <div class="chart-card chart-full">
              <div class="chart-header">
                <h3>📈 Tren Penyerapan Dana Desa (5 Tahun Terakhir)</h3>
              </div>
              <div class="chart-body">
                <div class="simple-chart trend-chart">
                  <div class="chart-bars">
                    <div 
                      v-for="(item, index) in trendDanaDesa" 
                      :key="index"
                      class="bar-item"
                    >
                      <div class="bar-wrapper">
                        <div 
                          class="bar" 
                          :style="{ height: `${(item.total / 80000000000000) * 100}%` }"
                        >
                          <span class="bar-value">Rp {{ (item.total / 1000000000000).toFixed(1) }}T</span>
                        </div>
                      </div>
                      <span class="bar-label">{{ item.tahun }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Two Column Charts -->
            <div class="charts-row">
              <!-- Distribution Chart -->
              <div class="chart-card">
                <div class="chart-header">
                  <h3>💰 Alokasi Penggunaan Dana</h3>
                </div>
                <div class="chart-body">
                  <div class="distribution-list">
                    <div 
                      v-for="(item, index) in distribusiDanaKategori" 
                      :key="index"
                      class="distribution-item"
                    >
                      <div class="dist-header">
                        <span class="dist-color" :style="{ background: item.warna }"></span>
                        <span class="dist-label">{{ item.kategori }}</span>
                        <span class="dist-value">{{ item.persentase }}%</span>
                      </div>
                      <div class="dist-bar">
                        <div 
                          class="dist-fill" 
                          :style="{ width: `${item.persentase}%`, background: item.warna }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Project Status Chart -->
              <div class="chart-card">
                <div class="chart-header">
                  <h3>🏗️ Status Proyek</h3>
                </div>
                <div class="chart-body">
                  <div class="status-grid">
                    <div 
                      v-for="(item, index) in statusProyekNasional" 
                      :key="index"
                      class="status-item"
                      :style="{ borderColor: item.warna }"
                    >
                      <span class="status-color" :style="{ background: item.warna }"></span>
                      <div class="status-info">
                        <span class="status-label">{{ item.status }}</span>
                        <span class="status-value">{{ item.jumlah.toLocaleString('id-ID') }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top Villages Chart - Full Width -->
            <div class="chart-card chart-full">
              <div class="chart-header">
                <h3>🏆 Top 10 Desa Penyerapan Terbaik</h3>
              </div>
              <div class="chart-body">
                <div class="top-villages-list">
                  <div 
                    v-for="(desa, index) in topDesaDana" 
                    :key="index"
                    class="village-item"
                  >
                    <div class="village-rank">#{{ index + 1 }}</div>
                    <div class="village-info">
                      <span class="village-name">{{ desa.nama }}</span>
                      <span class="village-location">{{ desa.kabupaten }}</span>
                    </div>
                    <div class="village-bar-wrapper">
                      <div 
                        class="village-bar" 
                        :style="{ width: `${(desa.dana / topDesaDana[0].dana) * 100}%` }"
                      ></div>
                    </div>
                    <div class="village-amount">{{ formatRupiah(desa.dana) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Infographics Section -->
          <section class="infographics-section">
            <h2 class="section-title">🌟 Dampak Nyata Dana Desa</h2>
            <div class="infographics-grid">
              <div 
                v-for="item in infographics" 
                :key="item.id" 
                class="infographic-card"
              >
                <div class="info-icon">{{ item.icon }}</div>
                <div class="info-content">
                  <div class="info-value-wrapper">
                    <span class="info-value">{{ item.value }}</span>
                    <span class="info-unit">{{ item.unit }}</span>
                  </div>
                  <span class="info-label">{{ item.label }}</span>
                  <p class="info-desc">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.statistics-page {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: var(--navbar-height);
}

/* Page Header */
.page-header {
  background: var(--gradient-hero);
  padding: var(--spacing-xl) 0;
  color: white;
}

.page-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-xs);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.title-icon {
  font-size: 1.2em;
}

.page-subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: var(--font-size-base);
}

.filter-toggle-btn {
  display: none;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: var(--radius-md);
  color: white;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.filter-toggle-btn svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 1024px) {
  .filter-toggle-btn {
    display: flex;
  }
}

/* Dashboard Layout */
.dashboard-layout {
  display: flex;
  position: relative;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  flex-shrink: 0;
}

.sidebar-content {
  position: sticky;
  top: var(--navbar-height);
  padding: var(--spacing-lg);
  max-height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.sidebar-header h2 {
  font-size: var(--font-size-lg);
  margin: 0;
}

.close-sidebar {
  display: none;
  padding: var(--spacing-xs);
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

.close-sidebar:hover {
  background: var(--color-background);
}

.close-sidebar svg {
  width: 20px;
  height: 20px;
}

.filter-section {
  margin-bottom: var(--spacing-lg);
}

.filter-section label {
  display: block;
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.metric-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.metric-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  text-align: left;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.metric-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.metric-btn.active {
  background: var(--color-primary-50);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.metric-icon {
  font-size: 1.1rem;
}

.filter-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  cursor: pointer;
}

.sidebar-actions {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

.sidebar-actions .btn {
  width: 100%;
  justify-content: center;
  gap: var(--spacing-sm);
}

.sidebar-actions .btn svg {
  width: 18px;
  height: 18px;
}

/* Sidebar Overlay & Mobile */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 90;
}

@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
  
  .sidebar-content {
    top: 0;
    max-height: 100vh;
    padding-top: var(--spacing-xl);
  }
  
  .close-sidebar {
    display: block;
  }
  
  .sidebar-overlay {
    display: block;
  }
}

/* Main Content */
.main-content {
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
}

.content-wrapper {
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

/* Summary Section */
.summary-section {
  margin-bottom: var(--spacing-xl);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

@media (max-width: 1200px) {
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

.summary-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.icon-blue { background: rgba(29, 78, 216, 0.1); }
.icon-green { background: rgba(5, 150, 105, 0.1); }
.icon-purple { background: rgba(124, 58, 237, 0.1); }
.icon-orange { background: rgba(234, 88, 12, 0.1); }

.card-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.card-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 2px;
}

.card-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
}

.card-trend svg {
  width: 12px;
  height: 12px;
}

.card-trend.positive { color: var(--color-success); }
.card-trend.negative { color: var(--color-danger); }
.card-trend.neutral { color: var(--color-text-muted); }

/* Charts Section */
.charts-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

@media (max-width: 900px) {
  .charts-row {
    grid-template-columns: 1fr;
  }
}

.chart-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.chart-header {
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
}

.chart-header h3 {
  margin: 0;
  font-size: var(--font-size-base);
  font-weight: 600;
}

.chart-body {
  padding: var(--spacing-lg);
}

/* Trend Chart */
.trend-chart {
  height: 250px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  gap: var(--spacing-sm);
}

.bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 80px;
}

.bar-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 60%;
  background: var(--gradient-primary);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  min-height: 20px;
  position: relative;
  transition: all 0.3s ease;
}

.bar:hover {
  opacity: 0.8;
}

.bar-value {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  padding-bottom: 4px;
}

.bar-label {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* Distribution List */
.distribution-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.distribution-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.dist-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.dist-color {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.dist-label {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.dist-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.dist-bar {
  height: 8px;
  background: var(--color-border-light);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.dist-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

/* Status Grid */
.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.status-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-background);
  border-radius: var(--radius-md);
  border-left: 4px solid;
}

.status-color {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.status-info {
  display: flex;
  flex-direction: column;
}

.status-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.status-value {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Top Villages List */
.top-villages-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.village-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.village-item:last-child {
  border-bottom: none;
}

.village-rank {
  width: 32px;
  height: 32px;
  background: var(--color-primary-50);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: 700;
  flex-shrink: 0;
}

.village-info {
  flex: 0 0 150px;
  min-width: 0;
}

.village-name {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.village-location {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.village-bar-wrapper {
  flex: 1;
  height: 8px;
  background: var(--color-border-light);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.village-bar {
  height: 100%;
  background: var(--gradient-secondary);
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.village-amount {
  flex: 0 0 100px;
  text-align: right;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .village-info {
    flex: 0 0 100px;
  }
  
  .village-amount {
    flex: 0 0 80px;
    font-size: var(--font-size-xs);
  }
}

/* Infographics Section */
.infographics-section {
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.infographics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

@media (max-width: 1024px) {
  .infographics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .infographics-grid {
    grid-template-columns: 1fr;
  }
}

.infographic-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  transition: all var(--transition-base);
}

.infographic-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.info-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
}

.info-value-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: var(--spacing-xs);
}

.info-value {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-primary);
}

.info-unit {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.info-label {
  display: block;
  font-weight: 600;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-primary);
}

.info-desc {
  margin: 0;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>
