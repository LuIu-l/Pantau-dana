<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { provinsiData } from '@/data/extendedMockData.js'
import { formatRupiah } from '@/data/mockData.js'

const router = useRouter()

// State
const selectedProvinsi = ref(null)
const searchQuery = ref('')
const showInfoPanel = ref(false)
const sortBy = ref('nama') // nama, transparansi, dana, desa

const sortOptions = [
  { id: 'nama', label: 'Nama A-Z' },
  { id: 'transparansi', label: 'Skor Tertinggi' },
  { id: 'dana', label: 'Dana Terbesar' },
  { id: 'desa', label: 'Desa Terbanyak' }
]

// Computed
const filteredAndSortedProvinsi = computed(() => {
  let result = [...provinsiData]
  
  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => p.nama.toLowerCase().includes(query))
  }
  
  // Sort
  switch (sortBy.value) {
    case 'transparansi':
      result.sort((a, b) => b.skorTransparansi - a.skorTransparansi)
      break
    case 'dana':
      result.sort((a, b) => b.totalDana - a.totalDana)
      break
    case 'desa':
      result.sort((a, b) => b.totalDesa - a.totalDesa)
      break
    default:
      result.sort((a, b) => a.nama.localeCompare(b.nama))
  }
  
  return result
})

const selectedProvinsiData = computed(() => {
  if (!selectedProvinsi.value) return null
  return provinsiData.find(p => p.id === selectedProvinsi.value)
})

const totalStats = computed(() => {
  return {
    totalProvinsi: provinsiData.length,
    totalDesa: provinsiData.reduce((sum, p) => sum + p.totalDesa, 0),
    totalDana: provinsiData.reduce((sum, p) => sum + p.totalDana, 0),
    avgTransparansi: Math.round(provinsiData.reduce((sum, p) => sum + p.skorTransparansi, 0) / provinsiData.length)
  }
})

// Methods
const handleProvinsiClick = (provinsiId) => {
  selectedProvinsi.value = provinsiId
  showInfoPanel.value = true
}

const closeInfoPanel = () => {
  showInfoPanel.value = false
  selectedProvinsi.value = null
}

const viewProvinsiDetail = () => {
  if (selectedProvinsiData.value) {
    router.push(`/statistik?provinsi=${selectedProvinsi.value}`)
  }
}

const getScoreColor = (score) => {
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  return 'danger'
}

const getScoreIcon = (score) => {
  if (score >= 80) return '✓'
  if (score >= 60) return '!'
  return '✗'
}

const getRegionIcon = (nama) => {
  if (nama.includes('Jawa')) return '🏛️'
  if (nama.includes('Sumatera') || nama.includes('Riau') || nama.includes('Jambi') || nama.includes('Aceh') || nama.includes('Lampung') || nama.includes('Bengkulu') || nama.includes('Bangka')) return '🌴'
  if (nama.includes('Kalimantan')) return '🌲'
  if (nama.includes('Sulawesi') || nama.includes('Gorontalo')) return '🏝️'
  if (nama.includes('Bali') || nama.includes('Nusa')) return '🏖️'
  if (nama.includes('Papua')) return '🌿'
  if (nama.includes('Maluku')) return '🐚'
  return '🏘️'
}
</script>

<template>
  <div class="explore-page">
    <!-- Hero Header -->
    <section class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">
            <span class="title-icon">🗺️</span>
            Jelajahi Provinsi Indonesia
          </h1>
          <p class="page-subtitle">Telusuri data transparansi dan dana desa dari {{ totalStats.totalProvinsi }} provinsi di Indonesia</p>
        </div>
        
        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="quick-stat">
            <span class="stat-number">{{ totalStats.totalProvinsi }}</span>
            <span class="stat-text">Provinsi</span>
          </div>
          <div class="stat-divider"></div>
          <div class="quick-stat">
            <span class="stat-number">{{ totalStats.totalDesa.toLocaleString('id-ID') }}</span>
            <span class="stat-text">Total Desa</span>
          </div>
          <div class="stat-divider"></div>
          <div class="quick-stat">
            <span class="stat-number">{{ formatRupiah(totalStats.totalDana) }}</span>
            <span class="stat-text">Total Dana</span>
          </div>
          <div class="stat-divider"></div>
          <div class="quick-stat">
            <span class="stat-number">{{ totalStats.avgTransparansi }}%</span>
            <span class="stat-text">Rata-rata Transparansi</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Search & Filter Controls -->
    <section class="controls-section">
      <div class="container">
        <div class="controls-wrapper">
          <!-- Search -->
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Cari provinsi..."
              class="search-input"
            />
            <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Sort -->
          <div class="sort-dropdown">
            <label>Urutkan:</label>
            <select v-model="sortBy" class="sort-select">
              <option v-for="opt in sortOptions" :key="opt.id" :value="opt.id">
                {{ opt.label }}
              </option>
            </select>
          </div>


        </div>
      </div>
    </section>

    <!-- Results Info -->
    <section class="results-info">
      <div class="container">
        <p class="results-count">
          Menampilkan <strong>{{ filteredAndSortedProvinsi.length }}</strong> provinsi
          <span v-if="searchQuery"> untuk pencarian "{{ searchQuery }}"</span>
        </p>
      </div>
    </section>

    <!-- Province Cards Grid -->
    <section class="provinces-section">
      <div class="container">
        <div class="provinces-grid">
          <button 
            v-for="provinsi in filteredAndSortedProvinsi"
            :key="provinsi.id"
            class="province-card"
            :class="{ selected: selectedProvinsi === provinsi.id }"
            @click="handleProvinsiClick(provinsi.id)"
          >
            <div class="card-header">
              <span class="region-icon">{{ getRegionIcon(provinsi.nama) }}</span>
              <div 
                class="score-badge"
                :class="getScoreColor(provinsi.skorTransparansi)"
              >
                <span class="score-icon">{{ getScoreIcon(provinsi.skorTransparansi) }}</span>
                {{ provinsi.skorTransparansi }}%
              </div>
            </div>
            
            <div class="card-body">
              <h3 class="province-name">{{ provinsi.nama }}</h3>
              <div class="province-stats">
                <div class="mini-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <span>{{ provinsi.totalDesa.toLocaleString('id-ID') }} desa</span>
                </div>
                <div class="mini-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span>{{ formatRupiah(provinsi.totalDana) }}</span>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <span class="view-detail">Lihat Detail</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="filteredAndSortedProvinsi.length === 0" class="empty-state">
          <span class="empty-icon">🔍</span>
          <h3>Tidak Ada Hasil</h3>
          <p>Tidak ditemukan provinsi dengan kata kunci "{{ searchQuery }}"</p>
          <button class="btn btn-primary" @click="searchQuery = ''">Reset Pencarian</button>
        </div>
      </div>
    </section>

    <!-- Info Panel / Detail Sidebar -->
    <Transition name="slide-panel">
      <aside v-if="showInfoPanel && selectedProvinsiData" class="info-panel">
        <div class="panel-header">
          <div class="panel-title-wrapper">
            <span class="panel-icon">{{ getRegionIcon(selectedProvinsiData.nama) }}</span>
            <h3>{{ selectedProvinsiData.nama }}</h3>
          </div>
          <button class="close-btn" @click="closeInfoPanel">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="panel-content">
          <!-- Transparency Score -->
          <div class="score-card">
            <div class="score-header">
              <span class="score-label">Skor Transparansi</span>
              <span 
                class="score-value"
                :class="getScoreColor(selectedProvinsiData.skorTransparansi)"
              >
                {{ selectedProvinsiData.skorTransparansi }}%
              </span>
            </div>
            <div class="score-bar">
              <div 
                class="score-fill"
                :style="{ width: `${selectedProvinsiData.skorTransparansi}%` }"
                :class="getScoreColor(selectedProvinsiData.skorTransparansi)"
              ></div>
            </div>
            <p class="score-desc">
              <span v-if="selectedProvinsiData.skorTransparansi >= 80">✅ Transparansi Sangat Baik</span>
              <span v-else-if="selectedProvinsiData.skorTransparansi >= 60">⚠️ Transparansi Cukup Baik</span>
              <span v-else>❌ Perlu Peningkatan</span>
            </p>
          </div>

          <!-- Stats Grid -->
          <div class="detail-stats">
            <div class="detail-stat">
              <div class="detail-stat-icon">🏘️</div>
              <div class="detail-stat-info">
                <span class="detail-stat-value">{{ selectedProvinsiData.totalDesa.toLocaleString('id-ID') }}</span>
                <span class="detail-stat-label">Total Desa</span>
              </div>
            </div>
            <div class="detail-stat">
              <div class="detail-stat-icon">💰</div>
              <div class="detail-stat-info">
                <span class="detail-stat-value">{{ formatRupiah(selectedProvinsiData.totalDana) }}</span>
                <span class="detail-stat-label">Total Dana Desa</span>
              </div>
            </div>
            <div class="detail-stat">
              <div class="detail-stat-icon">📊</div>
              <div class="detail-stat-info">
                <span class="detail-stat-value">{{ formatRupiah(Math.round(selectedProvinsiData.totalDana / selectedProvinsiData.totalDesa)) }}</span>
                <span class="detail-stat-label">Rata-rata Dana/Desa</span>
              </div>
            </div>
            <div class="detail-stat">
              <div class="detail-stat-icon">🏆</div>
              <div class="detail-stat-info">
                <span class="detail-stat-value">#{{ provinsiData.sort((a,b) => b.skorTransparansi - a.skorTransparansi).findIndex(p => p.id === selectedProvinsi) + 1 }}</span>
                <span class="detail-stat-label">Ranking Nasional</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="panel-actions">
            <button class="btn btn-primary btn-lg btn-block" @click="viewProvinsiDetail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              Lihat Statistik Lengkap
            </button>
            <button class="btn btn-outline btn-lg btn-block" @click="closeInfoPanel">
              Tutup
            </button>
          </div>
        </div>
      </aside>
    </Transition>

    <!-- Overlay when panel is open -->
    <Transition name="fade">
      <div v-if="showInfoPanel" class="panel-overlay" @click="closeInfoPanel"></div>
    </Transition>
  </div>
</template>

<style scoped>
.explore-page {
  min-height: 100vh;
  padding-top: var(--navbar-height);
  background: var(--color-background);
}

/* Header */
.page-header {
  background: var(--gradient-hero);
  padding: var(--spacing-2xl) 0;
  color: white;
}

.header-content {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.title-icon {
  font-size: 1.2em;
}

.page-subtitle {
  opacity: 0.9;
  font-size: var(--font-size-lg);
}

/* Quick Stats */
.quick-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--radius-xl);
  max-width: 900px;
  margin: 0 auto;
}

.quick-stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.stat-text {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

/* Controls */
.controls-section {
  background: var(--color-surface);
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid var(--color-border-light);
  position: sticky;
  top: var(--navbar-height);
  z-index: 50;
}

.controls-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  flex: 1;
  min-width: 200px;
  max-width: 350px;
}

.search-box svg {
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--font-size-base);
  outline: none;
  color: var(--color-text-primary);
}

.clear-btn {
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
}

.clear-btn:hover {
  background: var(--color-border-light);
}

.sort-dropdown, .year-select {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.sort-dropdown label, .year-select label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.sort-select, .year-dropdown {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  font-size: var(--font-size-sm);
  cursor: pointer;
  color: var(--color-text-primary);
}

.view-filters {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.filter-icon {
  font-size: 1.1em;
}

/* Results Info */
.results-info {
  padding: var(--spacing-md) 0;
}

.results-count {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* Province Cards */
.provinces-section {
  padding: var(--spacing-lg) 0 var(--spacing-2xl);
}

.provinces-grid {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.province-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  text-align: left;
}

.province-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.province-card.selected {
  background: var(--color-primary-50);
  border-color: var(--color-primary);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-md);
}

.region-icon {
  font-size: 2rem;
}

.score-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.score-badge.success { background: rgba(5, 150, 105, 0.15); color: var(--color-success); }
.score-badge.warning { background: rgba(217, 119, 6, 0.15); color: var(--color-warning); }
.score-badge.danger { background: rgba(220, 38, 38, 0.15); color: var(--color-danger); }

.score-icon {
  font-size: 0.8em;
}

.card-body {
  flex: 1;
}

.province-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0 0 var(--spacing-sm);
  color: var(--color-text-primary);
}

.province-stats {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.mini-stat {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.mini-stat svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border-light);
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.card-footer svg {
  width: 18px;
  height: 18px;
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

/* Info Panel */
.info-panel {
  position: fixed;
  top: var(--navbar-height);
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  background: var(--color-surface);
  box-shadow: var(--shadow-2xl);
  z-index: 200;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-light);
  position: sticky;
  top: 0;
  background: var(--color-surface);
  z-index: 10;
}

.panel-title-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.panel-icon {
  font-size: 1.5rem;
}

.panel-header h3 {
  margin: 0;
  font-size: var(--font-size-xl);
}

.close-btn {
  padding: var(--spacing-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
  color: var(--color-text-secondary);
}

.close-btn:hover {
  background: var(--color-background);
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.panel-content {
  padding: var(--spacing-lg);
}

/* Score Card */
.score-card {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.score-label {
  font-weight: 500;
  color: var(--color-text-secondary);
}

.score-value {
  font-size: var(--font-size-2xl);
  font-weight: 700;
}

.score-value.success { color: var(--color-success); }
.score-value.warning { color: var(--color-warning); }
.score-value.danger { color: var(--color-danger); }

.score-bar {
  height: 12px;
  background: var(--color-border-light);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
}

.score-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

.score-fill.success { background: var(--color-success); }
.score-fill.warning { background: var(--color-warning); }
.score-fill.danger { background: var(--color-danger); }

.score-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Detail Stats */
.detail-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.detail-stat {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-background);
  border-radius: var(--radius-md);
}

.detail-stat-icon {
  font-size: 1.5rem;
}

.detail-stat-info {
  display: flex;
  flex-direction: column;
}

.detail-stat-value {
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.detail-stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* Panel Actions */
.panel-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.btn-block {
  width: 100%;
  justify-content: center;
}

.btn-lg {
  padding: var(--spacing-md) var(--spacing-lg);
}

.btn svg {
  width: 20px;
  height: 20px;
  margin-right: var(--spacing-sm);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.btn-outline:hover {
  background: var(--color-background);
}

/* Panel Overlay */
.panel-overlay {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
}

/* Transitions */
.slide-panel-enter-active,
.slide-panel-leave-active {
  transition: transform 0.3s ease;
}

.slide-panel-enter-from,
.slide-panel-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .quick-stats {
    padding: var(--spacing-md);
    gap: var(--spacing-md);
  }
  
  .stat-divider {
    display: none;
  }
  
  .quick-stat {
    flex: 1;
    min-width: 80px;
  }
  
  .controls-wrapper {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .view-filters {
    justify-content: center;
  }
  
  .filter-label {
    display: none;
  }
  
  .info-panel {
    max-width: 100%;
  }
}
</style>
