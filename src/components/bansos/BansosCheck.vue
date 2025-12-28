<template>
  <div class="bansos-check-page">
    <div class="container">
      <div class="page-header">
        <h1>Cek Penerima Bansos</h1>
        <p>Periksa status kepesertaan Bantuan Sosial dengan memasukkan nama dan wilayah</p>
      </div>

      <div class="card search-card">
        <div class="card-header">
          <h2 class="card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="title-icon">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            Cari Data Penerima
          </h2>
          <p class="card-subtitle">Masukkan nama sesuai KTP untuk memeriksa status</p>
        </div>

        <form @submit.prevent="searchBansos" class="search-form">
          <div class="form-group">
            <label class="form-label" for="nama">Nama Lengkap (Sesuai KTP)</label>
            <input 
              type="text"
              id="nama"
              class="form-input"
              v-model="searchName"
              placeholder="Contoh: Budi Santoso"
              required
            />
            <p class="form-hint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Kami tidak menyimpan data pencarian Anda
            </p>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="rt">RT</label>
              <select id="rt" class="form-select" v-model="selectedRT">
                <option value="">Semua RT</option>
                <option v-for="n in 10" :key="n" :value="'0' + n">RT {{ n < 10 ? '0' + n : n }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="rw">RW</label>
              <select id="rw" class="form-select" v-model="selectedRW">
                <option value="">Semua RW</option>
                <option v-for="n in 5" :key="n" :value="'0' + n">RW {{ n < 10 ? '0' + n : n }}</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" :disabled="!searchName || isSearching">
            <span v-if="isSearching" class="spinner"></span>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            {{ isSearching ? 'Mencari...' : 'Cari Data' }}
          </button>
        </form>
      </div>

      <!-- Search Results -->
      <transition name="fade">
        <div v-if="hasSearched" class="results-section">
          <div class="results-header">
            <h3>Hasil Pencarian</h3>
            <span class="results-count">{{ results.length }} data ditemukan</span>
          </div>

          <div v-if="results.length > 0" class="results-list">
            <div 
              v-for="(result, index) in results" 
              :key="index"
              class="card result-card"
            >
              <div class="result-header">
                <div class="result-name">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{{ result.nama_masked }}</span>
                </div>
                <span 
                  class="badge" 
                  :class="result.status === 'aktif' ? 'badge-success' : 'badge-danger'"
                >
                  {{ result.status === 'aktif' ? 'PENERIMA AKTIF' : 'TIDAK AKTIF' }}
                </span>
              </div>
              
              <div class="result-details">
                <div class="detail-row">
                  <span class="detail-label">Lokasi</span>
                  <span class="detail-value">RT {{ result.rt }} / RW {{ result.rw }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Jenis Bantuan</span>
                  <span class="detail-value highlight">{{ result.jenis }}</span>
                </div>
                <div v-if="result.status === 'aktif'" class="detail-row">
                  <span class="detail-label">Nominal per Bulan</span>
                  <span class="detail-value">{{ formatRupiah(result.nominal) }}</span>
                </div>
              </div>

              <div class="result-note">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <p>Data ditampilkan secara aman dengan penyamaran nama untuk melindungi privasi</p>
              </div>
            </div>
          </div>

          <div v-else class="no-results">
            <div class="no-results-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <h4>Data Tidak Ditemukan</h4>
            <p>Nama yang Anda cari tidak terdaftar sebagai penerima bantuan di wilayah ini.</p>
            <ul class="no-results-tips">
              <li>Pastikan nama dieja dengan benar sesuai KTP</li>
              <li>Coba cari dengan nama lengkap atau nama panggilan</li>
              <li>Pilih RT/RW yang sesuai dengan tempat tinggal</li>
            </ul>
          </div>
        </div>
      </transition>

      <!-- Privacy Notice -->
      <div class="card privacy-notice">
        <div class="notice-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div class="notice-content">
          <h4>Perlindungan Data Pribadi</h4>
          <p>
            Sistem ini dirancang dengan prinsip <strong>Privacy-First</strong>. 
            Data yang ditampilkan telah disamarkan untuk melindungi privasi penerima bantuan. 
            Fitur ini bertujuan untuk memberikan transparansi bagi masyarakat dalam mengawasi 
            penyaluran bantuan sosial di lingkungannya.
          </p>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="info-cards">
        <div class="card info-card">
          <div class="info-icon" style="background-color: rgba(46, 204, 113, 0.1); color: #2ECC71;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <h4>BLT Dana Desa</h4>
          <p>Bantuan Langsung Tunai dari alokasi Dana Desa untuk keluarga miskin di desa.</p>
        </div>

        <div class="card info-card">
          <div class="info-icon" style="background-color: rgba(15, 76, 129, 0.1); color: #0F4C81;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h4>PKH</h4>
          <p>Program Keluarga Harapan memberikan bantuan tunai bersyarat untuk keluarga miskin.</p>
        </div>

        <div class="card info-card">
          <div class="info-icon" style="background-color: rgba(243, 156, 18, 0.1); color: #F39C12;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h4>BPNT</h4>
          <p>Bantuan Pangan Non Tunai untuk membeli kebutuhan pangan melalui kartu elektronik.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { bansosData, formatRupiah } from '@/data/mockData.js'

const searchName = ref('')
const selectedRT = ref('')
const selectedRW = ref('')
const isSearching = ref(false)
const hasSearched = ref(false)
const results = ref([])

const searchBansos = async () => {
  isSearching.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Search in mock data (using first available desa)
  const desaId = '3404012001'
  const allData = bansosData[desaId] || []
  
  // Simple search logic - match first few characters
  const searchLower = searchName.value.toLowerCase().trim()
  results.value = allData.filter(item => {
    const namePart = item.nama_masked.split('*')[0].toLowerCase().trim()
    const matchesName = searchLower.startsWith(namePart.substring(0, searchLower.length)) ||
                       namePart.startsWith(searchLower.substring(0, namePart.length))
    
    const matchesRT = !selectedRT.value || item.rt === selectedRT.value
    const matchesRW = !selectedRW.value || item.rw === selectedRW.value
    
    return matchesName && matchesRT && matchesRW
  })
  
  isSearching.value = false
  hasSearched.value = true
}
</script>

<style scoped>
.bansos-check-page {
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
  max-width: 500px;
  margin: 0 auto;
}

/* Search Card */
.search-card {
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
}

.title-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: var(--spacing-sm);
  color: var(--color-secondary);
}

.search-form {
  margin-top: var(--spacing-lg);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.form-hint {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-top: var(--spacing-xs);
}

.form-hint svg {
  width: 14px;
  height: 14px;
}

.search-form .btn {
  width: 100%;
  margin-top: var(--spacing-md);
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

/* Results Section */
.results-section {
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.results-header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
}

.results-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.result-card {
  padding: var(--spacing-lg);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.result-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.result-name svg {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
}

.detail-label {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.detail-value {
  font-weight: 500;
}

.detail-value.highlight {
  color: var(--color-primary);
  font-weight: 600;
}

.result-note {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: rgba(15, 76, 129, 0.05);
  border-radius: var(--radius-md);
}

.result-note svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-primary);
}

.result-note p {
  margin: 0;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* No Results */
.no-results {
  text-align: center;
  padding: var(--spacing-2xl);
}

.no-results-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background);
  border-radius: 50%;
}

.no-results-icon svg {
  width: 40px;
  height: 40px;
  color: var(--color-text-muted);
}

.no-results h4 {
  margin: 0 0 var(--spacing-sm);
  color: var(--color-text-primary);
}

.no-results > p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.no-results-tips {
  text-align: left;
  max-width: 350px;
  margin: 0 auto;
  padding-left: var(--spacing-lg);
}

.no-results-tips li {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
}

/* Privacy Notice */
.privacy-notice {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
  background-color: rgba(15, 76, 129, 0.03);
  border: 1px solid rgba(15, 76, 129, 0.1);
}

.notice-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.notice-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.notice-content h4 {
  margin: 0 0 var(--spacing-sm);
  color: var(--color-primary);
}

.notice-content p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Info Cards */
.info-cards {
  display: grid;
  gap: var(--spacing-md);
  max-width: 900px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .info-cards {
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
