<template>
  <section class="dashboard-section">
    <div class="container">
      <!-- Back Button -->
      <button class="btn btn-ghost back-btn" @click="$emit('back')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="9" cy="7" r="4"/>
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                <path d="M16 3a4 4 0 0 1 0 8"/>
                <path d="M21 21v-2a4 4 0 0 0-3-4"/>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ desa.jumlah_penduduk.toLocaleString('id-ID') }}</span>
              <span class="stat-label">Jiwa</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z"/>
                <path d="M9 21V12h6v9"/>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ desa.jumlah_kk.toLocaleString('id-ID') }}</span>
              <span class="stat-label">Kepala Keluarga</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/>
                <path d="M9 3v15M15 6v15"/>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ desa.luas_wilayah }}</span>
              <span class="stat-label">Luas Wilayah</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="7" r="4"/>
                <path d="M4 21v-2a8 8 0 0 1 16 0v2"/>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="title-icon">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
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
import { computed } from 'vue'
import { formatRupiah } from '@/data/mockData.js'

const props = defineProps({
  desa: {
    type: Object,
    required: true
  }
})

defineEmits(['back'])

const villageStats = computed(() => [
  {
    value: props.desa.jumlah_penduduk.toLocaleString('id-ID'),
    label: 'Jiwa',
    color: 'primary'
  },
  {
    value: props.desa.jumlah_kk.toLocaleString('id-ID'),
    label: 'Kepala Keluarga',
    color: 'secondary'
  },
  {
    value: props.desa.luas_wilayah,
    label: 'Luas Wilayah',
    color: 'accent'
  },
  {
    value: props.desa.kepala_desa,
    label: 'Kepala Desa',
    color: 'warning',
    isText: true
  }
])
</script>

<style scoped>
.dashboard-section {
  padding: var(--spacing-xl) 0;
  background: var(--color-background);
  min-height: 100vh;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: slideUp 0.6s ease forwards;
}

.back-btn {
  margin-bottom: var(--spacing-lg);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-weight: 600;
  transition: all 0.3s var(--transition-bounce);
}

.back-btn:hover {
  background: var(--color-primary);
  color: white;
  transform: translateX(-4px);
  box-shadow: var(--shadow-md);
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.village-header-card {
  margin-bottom: var(--spacing-lg);
  position: relative;
  overflow: hidden;
}

.village-header-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
}

.village-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.village-info {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
}

.village-icon {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--shadow-glow);
}

.village-icon svg {
  width: 30px;
  height: 30px;
  color: white;
}

@media (min-width: 640px) {
  .village-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.village-name {
  font-size: 1.75rem;
  margin: 0 0 var(--spacing-xs);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
}

.village-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 0.95rem;
}

.village-location svg {
  width: 16px;
  height: 16px;
  color: var(--color-secondary);
}

.village-badge .badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
}

.pulse-badge {
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
}

.village-badge svg {
  width: 14px;
  height: 14px;
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
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  transition: all 0.3s var(--transition-bounce);
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.stat-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  flex-shrink: 0;
}

.stat-icon.primary {
  background: var(--color-primary-50);
  color: var(--color-primary);
}

.stat-icon.secondary {
  background: var(--color-secondary-50);
  color: var(--color-secondary);
}

.stat-icon.accent {
  background: var(--color-accent-50);
  color: var(--color-accent);
}

.stat-icon.warning {
  background: var(--color-warning-50);
  color: var(--color-warning);
}

.stat-icon svg {
  width: 26px;
  height: 26px;
}

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-value {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-text-primary);
}

.stat-value.stat-text {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.3;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* Budget Summary Card */
.budget-summary-card {
  position: relative;
  overflow: hidden;
}

.budget-summary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-secondary);
}

.budget-summary-card .card-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  border-bottom: none;
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.header-icon {
  width: 52px;
  height: 52px;
  background: var(--gradient-secondary);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon svg {
  width: 26px;
  height: 26px;
  color: white;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0 0 0.25rem 0;
  color: var(--color-text-primary);
}

.card-subtitle {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin: 0;
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
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-background);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.budget-item:hover {
  transform: translateX(4px);
}

.budget-item.primary {
  border-left: 4px solid var(--color-primary);
}

.budget-item.secondary {
  border-left: 4px solid var(--color-secondary);
}

.budget-item-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.budget-item.primary .budget-item-icon {
  background: var(--color-primary-50);
  color: var(--color-primary);
}

.budget-item.secondary .budget-item-icon {
  background: var(--color-secondary-50);
  color: var(--color-secondary);
}

.budget-item-icon svg {
  width: 22px;
  height: 22px;
}

.budget-item-content {
  display: flex;
  flex-direction: column;
}

.budget-label {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.budget-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text-primary);
}

.progress-section {
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-radius: 16px;
  border: 1px solid var(--color-border);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
}

.progress-percentage {
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.progress-bar {
  height: 14px;
  background: var(--color-border);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.progress-fill {
  height: 100%;
  background: var(--gradient-secondary);
  border-radius: 10px;
  transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-info {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

.progress-info svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--color-primary);
  margin-top: 2px;
}

/* Budget Breakdown */
.budget-breakdown h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
}

.budget-breakdown h3 svg {
  width: 22px;
  height: 22px;
  color: var(--color-accent);
}

.breakdown-grid {
  display: grid;
  gap: var(--spacing-md);
}

@media (min-width: 640px) {
  .breakdown-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.breakdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  transition: all 0.3s var(--transition-bounce);
}

.breakdown-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.breakdown-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.breakdown-icon svg {
  width: 20px;
  height: 20px;
}

.breakdown-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.breakdown-label {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
}

.breakdown-value {
  font-weight: 700;
  color: var(--color-text-primary);
  font-size: 1rem;
}
</style>
