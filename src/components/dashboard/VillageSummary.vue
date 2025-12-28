<template>
  <section class="dashboard-section">
    <div class="container">
      <!-- Back Button -->
      <button class="btn btn-ghost back-btn" @click="$emit('back')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Kembali ke Pencarian
      </button>

      <!-- Village Header Card -->
      <div class="card village-header-card">
        <div class="village-header">
          <div class="village-info">
            <h1 class="village-name">{{ desa.nama }}</h1>
            <p class="village-location">
              {{ desa.kecamatan }}, {{ desa.kabupaten }}, {{ desa.provinsi }}
            </p>
          </div>
          <div class="village-badge">
            <span class="badge badge-success">Data Terbaru {{ desa.anggaran.tahun }}</span>
          </div>
        </div>

        <div class="village-stats">
          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ desa.jumlah_penduduk.toLocaleString('id-ID') }}</span>
              <span class="stat-label">Jiwa</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ desa.jumlah_kk.toLocaleString('id-ID') }}</span>
              <span class="stat-label">Kepala Keluarga</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/>
                <line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ desa.luas_wilayah }}</span>
              <span class="stat-label">Luas Wilayah</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value stat-text">{{ desa.kepala_desa }}</span>
              <span class="stat-label">Kepala Desa</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Budget Summary Card -->
      <div class="card budget-summary-card">
        <div class="card-header">
          <h2 class="card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="title-icon">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            Ringkasan Anggaran Desa {{ desa.anggaran.tahun }}
          </h2>
          <p class="card-subtitle">Dana yang diterima dan sudah digunakan oleh desa</p>
        </div>

        <div class="budget-overview">
          <div class="budget-total">
            <div class="budget-item">
              <span class="budget-label">Total Dana Diterima</span>
              <span class="budget-value primary">{{ formatRupiah(desa.anggaran.total_pendapatan) }}</span>
            </div>
            <div class="budget-item">
              <span class="budget-label">Dana yang Sudah Dipakai</span>
              <span class="budget-value secondary">{{ formatRupiah(desa.anggaran.total_terpakai) }}</span>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-header">
              <span>Realisasi Penggunaan Dana</span>
              <span class="progress-percentage">{{ desa.anggaran.persentase_terpakai }}%</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: desa.anggaran.persentase_terpakai + '%' }"
              ></div>
            </div>
            <p class="progress-info">
              Dari total {{ formatRupiah(desa.anggaran.total_pendapatan) }}, 
              desa sudah menggunakan {{ formatRupiah(desa.anggaran.total_terpakai) }} 
              ({{ desa.anggaran.persentase_terpakai }}%)
            </p>
          </div>
        </div>

        <!-- Budget Breakdown -->
        <div class="budget-breakdown">
          <h3>Sumber Dana Desa</h3>
          <div class="breakdown-grid">
            <div class="breakdown-item">
              <span class="breakdown-label">Dana Desa (Pemerintah Pusat)</span>
              <span class="breakdown-value">{{ formatRupiah(desa.anggaran.dana_desa) }}</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-label">Alokasi Dana Desa (Pemda)</span>
              <span class="breakdown-value">{{ formatRupiah(desa.anggaran.alokasi_dana_desa) }}</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-label">Bagi Hasil Pajak</span>
              <span class="breakdown-value">{{ formatRupiah(desa.anggaran.bagi_hasil_pajak) }}</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-label">Pendapatan Asli Desa</span>
              <span class="breakdown-value">{{ formatRupiah(desa.anggaran.pendapatan_asli_desa) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatRupiah } from '@/data/mockData.js'

defineProps({
  desa: {
    type: Object,
    required: true
  }
})

defineEmits(['back'])
</script>

<style scoped>
.dashboard-section {
  padding: var(--spacing-xl) 0;
}

.back-btn {
  margin-bottom: var(--spacing-lg);
  color: var(--color-primary);
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.village-header-card {
  margin-bottom: var(--spacing-lg);
}

.village-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

@media (min-width: 640px) {
  .village-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.village-name {
  font-size: var(--font-size-2xl);
  margin: 0 0 var(--spacing-xs);
  color: var(--color-primary);
}

.village-location {
  color: var(--color-text-secondary);
  margin: 0;
}

.village-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .village-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
}

.stat-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 76, 129, 0.1);
  border-radius: var(--radius-md);
  color: var(--color-primary);
  flex-shrink: 0;
}

.stat-icon svg {
  width: 22px;
  height: 22px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat-value.stat-text {
  font-size: var(--font-size-sm);
  font-weight: 600;
  line-height: 1.3;
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Budget Summary Card */
.budget-summary-card .card-header {
  border-bottom: none;
  padding-bottom: 0;
}

.title-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: var(--spacing-sm);
  color: var(--color-secondary);
}

.budget-overview {
  display: grid;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 768px) {
  .budget-overview {
    grid-template-columns: 1fr 1.5fr;
  }
}

.budget-total {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.budget-item {
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-primary);
}

.budget-item:last-child {
  border-left-color: var(--color-secondary);
}

.budget-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.budget-value {
  display: block;
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.budget-value.primary {
  color: var(--color-primary);
}

.budget-value.secondary {
  color: var(--color-secondary);
}

.progress-section {
  padding: var(--spacing-lg);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.progress-percentage {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-secondary);
}

.progress-bar {
  height: 12px;
  background-color: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%);
  border-radius: var(--radius-full);
  transition: width 1s ease;
}

.progress-info {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* Budget Breakdown */
.budget-breakdown h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.breakdown-grid {
  display: grid;
  gap: var(--spacing-sm);
}

@media (min-width: 640px) {
  .breakdown-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
}

.breakdown-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.breakdown-value {
  font-weight: 600;
  color: var(--color-text-primary);
}
</style>
