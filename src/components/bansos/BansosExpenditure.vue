<script setup>
import { ref, computed } from 'vue'

const selectedYear = ref(2024)
const selectedRegion = ref('all')

const expenditureData = ref([
  {
    id: 1,
    program: 'Program Keluarga Harapan (PKH)',
    budget: 28700000000000,
    realization: 28000000000000,
    beneficiaries: 10000000,
    region: 'Nasional',
    year: 2024
  },
  {
    id: 2,
    program: 'Bantuan Pangan Non Tunai (BPNT)',
    budget: 45100000000000,
    realization: 44500000000000,
    beneficiaries: 18800000,
    region: 'Nasional',
    year: 2024
  },
  {
    id: 3,
    program: 'Bantuan Langsung Tunai (BLT) Desa',
    budget: 10500000000000,
    realization: 9800000000000,
    beneficiaries: 2500000,
    region: 'Jawa Barat',
    year: 2024
  },
  {
    id: 4,
    program: 'Program Indonesia Pintar (PIP)',
    budget: 9600000000000,
    realization: 9000000000000,
    beneficiaries: 17900000,
    region: 'Nasional',
    year: 2023
  }
])

const filteredData = computed(() => {
  return expenditureData.value.filter(item => {
    const yearMatch = item.year === selectedYear.value
    const regionMatch = selectedRegion.value === 'all' || item.region === selectedRegion.value
    return yearMatch && regionMatch
  })
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const formatNumber = (value) => {
  return new Intl.NumberFormat('id-ID').format(value)
}

const calculatePercentage = (realization, budget) => {
  return ((realization / budget) * 100).toFixed(1)
}
</script>

<template>
  <div class="expenditure-page">
    <div class="container">
      <div class="header-section">
        <h1>Laporan Pengeluaran Bansos</h1>
        <p>Transparansi realisasi anggaran bantuan sosial pemerintah</p>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>Tahun Anggaran</label>
          <select v-model="selectedYear">
            <option :value="2024">2024</option>
            <option :value="2023">2023</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Wilayah</label>
          <select v-model="selectedRegion">
            <option value="all">Semua Wilayah</option>
            <option value="Nasional">Nasional</option>
            <option value="Jawa Barat">Jawa Barat</option>
          </select>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card total">
          <h3>Total Anggaran</h3>
          <div class="value">{{ formatCurrency(filteredData.reduce((acc, curr) => acc + curr.budget, 0)) }}</div>
        </div>
        <div class="stat-card realization">
          <h3>Total Realisasi</h3>
          <div class="value">{{ formatCurrency(filteredData.reduce((acc, curr) => acc + curr.realization, 0)) }}</div>
        </div>
        <div class="stat-card percentage">
          <h3>Persentase Penyerapan</h3>
          <div class="value">
            {{ calculatePercentage(
              filteredData.reduce((acc, curr) => acc + curr.realization, 0),
              filteredData.reduce((acc, curr) => acc + curr.budget, 0)
            ) }}%
          </div>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Program</th>
              <th>Wilayah</th>
              <th>Penerima Manfaat</th>
              <th>Anggaran</th>
              <th>Realisasi</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.id">
              <td class="program-name">{{ item.program }}</td>
              <td>{{ item.region }}</td>
              <td>{{ formatNumber(item.beneficiaries) }} Jiwa</td>
              <td>{{ formatCurrency(item.budget) }}</td>
              <td>{{ formatCurrency(item.realization) }}</td>
              <td>
                <div class="progress-wrapper">
                  <span class="percentage-text">{{ calculatePercentage(item.realization, item.budget) }}%</span>
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: `${calculatePercentage(item.realization, item.budget)}%` }"
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="filteredData.length === 0">
              <td colspan="6" class="empty-state">Tidak ada data untuk filter yang dipilih</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expenditure-page {
  padding: 2rem 0 4rem;
  background-color: #f8fafc;
  min-height: 80vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-section {
  margin-bottom: 2rem;
}

.header-section h1 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.header-section p {
  color: #64748b;
}

.filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.filter-group select {
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #1e293b;
  font-size: 0.95rem;
  cursor: pointer;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.stat-card h3 {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-card .value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-card.percentage .value {
  color: #2563eb;
}

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th {
  background-color: #f1f5f9;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  font-size: 0.95rem;
}

.program-name {
  font-weight: 500;
  color: #1e293b;
}

.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.percentage-text {
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 45px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #2563eb;
  border-radius: 4px;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #94a3b8;
}

@media (max-width: 640px) {
  .filters {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
