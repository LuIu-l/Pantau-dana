<template>
  <section class="hero-search">
    <!-- Animated Background Particles -->
    <div class="particles">
      <div class="particle" v-for="n in 20" :key="n"></div>
    </div>
    
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          Platform Transparansi Dana Desa
        </div>
        
        <h1 class="hero-title">
          <span class="title-line">Pantau Penggunaan</span>
          <span class="title-highlight">Dana Desamu</span>
        </h1>
        
        <p class="hero-subtitle">
          Akses informasi anggaran desa dan distribusi bantuan sosial secara transparan. 
          Bersama kita awasi pembangunan untuk Indonesia yang lebih baik.
        </p>
        
        <div class="search-card">
          <div class="card-header">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <div class="card-title">
              <h2>Cari Data Desa</h2>
              <p>Pilih lokasi untuk melihat informasi anggaran</p>
            </div>
          </div>
          
          <div class="search-form">
            <!-- Provinsi -->
            <div class="form-group">
              <label class="form-label" for="provinsi">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Provinsi
              </label>
              <div class="select-wrapper">
                <select 
                  id="provinsi" 
                  class="form-select"
                  v-model="selectedProvinsi"
                  @change="onProvinsiChange"
                >
                  <option value="">Pilih Provinsi</option>
                  <option 
                    v-for="prov in provinsiList" 
                    :key="prov.id" 
                    :value="prov.id"
                  >
                    {{ prov.nama }}
                  </option>
                </select>
                <div class="select-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Kabupaten -->
            <div class="form-group">
              <label class="form-label" for="kabupaten">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                Kabupaten/Kota
              </label>
              <div class="select-wrapper">
                <select 
                  id="kabupaten" 
                  class="form-select"
                  v-model="selectedKabupaten"
                  @change="onKabupatenChange"
                  :disabled="!selectedProvinsi"
                  :class="{ disabled: !selectedProvinsi }"
                >
                  <option value="">Pilih Kabupaten/Kota</option>
                  <option 
                    v-for="kab in kabupatenList" 
                    :key="kab.id" 
                    :value="kab.id"
                  >
                    {{ kab.nama }}
                  </option>
                </select>
                <div class="select-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Kecamatan -->
            <div class="form-group">
              <label class="form-label" for="kecamatan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
                Kecamatan
              </label>
              <div class="select-wrapper">
                <select 
                  id="kecamatan" 
                  class="form-select"
                  v-model="selectedKecamatan"
                  @change="onKecamatanChange"
                  :disabled="!selectedKabupaten"
                  :class="{ disabled: !selectedKabupaten }"
                >
                  <option value="">Pilih Kecamatan</option>
                  <option 
                    v-for="kec in kecamatanList" 
                    :key="kec.id" 
                    :value="kec.id"
                  >
                    {{ kec.nama }}
                  </option>
                </select>
                <div class="select-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Desa - Input Manual -->
            <div class="form-group">
              <label class="form-label" for="desa">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                Nama Desa/Kelurahan
              </label>
              <div class="input-wrapper">
                <input 
                  id="desa" 
                  type="text"
                  class="form-input"
                  v-model="inputDesa"
                  :disabled="!selectedKecamatan"
                  :class="{ disabled: !selectedKecamatan }"
                  placeholder="Ketik nama desa..."
                  @input="onDesaInput"
                />
                <div class="input-icon" v-if="inputDesa">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" @click="clearDesa">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </div>
              </div>
              <!-- Suggestion Dropdown -->
              <div class="suggestions" v-if="showSuggestions && filteredDesa.length > 0">
                <div 
                  class="suggestion-item"
                  v-for="desa in filteredDesa"
                  :key="desa.id"
                  @click="selectDesaSuggestion(desa)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {{ desa.nama }}
                </div>
              </div>
            </div>

            <button 
              class="btn btn-primary btn-lg search-btn"
              :disabled="!canSearch"
              @click="searchDesa"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <span>Lihat Data Desa</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-arrow">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick Stats with Animation -->
        <div class="quick-stats">
          <div class="stat-item" v-for="(stat, index) in stats" :key="index">
            <div class="stat-icon">
              <component :is="stat.icon" />
            </div>
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="trust-badges">
          <div class="badge-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            <span>Data Terverifikasi</span>
          </div>
          <div class="badge-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>Privasi Terjamin</span>
          </div>
          <div class="badge-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>Update Real-time</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Wave Decoration -->
    <div class="hero-wave">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="var(--color-background)"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { wilayahData } from '@/data/mockData.js'

const emit = defineEmits(['selectDesa'])

const selectedProvinsi = ref('')
const selectedKabupaten = ref('')
const selectedKecamatan = ref('')
const inputDesa = ref('')
const selectedDesaId = ref('')
const showSuggestions = ref(false)

// Extended Provinsi List
const provinsiList = computed(() => wilayahData.provinsi)

const kabupatenList = computed(() => {
  if (!selectedProvinsi.value) return []
  return wilayahData.kabupaten[selectedProvinsi.value] || []
})

const kecamatanList = computed(() => {
  if (!selectedKabupaten.value) return []
  return wilayahData.kecamatan[selectedKabupaten.value] || []
})

const desaList = computed(() => {
  if (!selectedKecamatan.value) return []
  return wilayahData.desa[selectedKecamatan.value] || []
})

const filteredDesa = computed(() => {
  if (!inputDesa.value || inputDesa.value.length < 1) return desaList.value
  const search = inputDesa.value.toLowerCase()
  return desaList.value.filter(d => d.nama.toLowerCase().includes(search))
})

const canSearch = computed(() => {
  return selectedKecamatan.value && inputDesa.value.trim().length > 0
})

const onProvinsiChange = () => {
  selectedKabupaten.value = ''
  selectedKecamatan.value = ''
  inputDesa.value = ''
  selectedDesaId.value = ''
}

const onKabupatenChange = () => {
  selectedKecamatan.value = ''
  inputDesa.value = ''
  selectedDesaId.value = ''
}

const onKecamatanChange = () => {
  inputDesa.value = ''
  selectedDesaId.value = ''
}

const onDesaInput = () => {
  showSuggestions.value = true
  selectedDesaId.value = ''
}

const selectDesaSuggestion = (desa) => {
  inputDesa.value = desa.nama
  selectedDesaId.value = desa.id
  showSuggestions.value = false
}

const clearDesa = () => {
  inputDesa.value = ''
  selectedDesaId.value = ''
}

const searchDesa = () => {
  if (selectedDesaId.value) {
    emit('selectDesa', selectedDesaId.value)
  } else if (inputDesa.value.trim()) {
    // If user typed custom desa name, use first matching or create temp id
    const matched = desaList.value.find(d => 
      d.nama.toLowerCase() === inputDesa.value.toLowerCase()
    )
    if (matched) {
      emit('selectDesa', matched.id)
    } else {
      // For demo, use first available desa data
      const firstDesa = desaList.value[0]
      if (firstDesa) {
        emit('selectDesa', firstDesa.id)
      }
    }
  }
}

// Stats data
const stats = [
  { 
    value: '74.961', 
    label: 'Desa Terdaftar',
    icon: {
      render() {
        return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
          h('polyline', { points: '9,22 9,12 15,12 15,22' })
        ])
      }
    }
  },
  { 
    value: 'Rp 72 T', 
    label: 'Dana Desa 2024',
    icon: {
      render() {
        return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('line', { x1: '12', y1: '1', x2: '12', y2: '23' }),
          h('path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' })
        ])
      }
    }
  },
  { 
    value: '10 Juta+', 
    label: 'Penerima Bansos',
    icon: {
      render() {
        return h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
          h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
          h('circle', { cx: '9', cy: '7', r: '4' }),
          h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
          h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
        ])
      }
    }
  }
]
</script>

<style scoped>
.hero-search {
  position: relative;
  background: linear-gradient(135deg, #0a3d62 0%, #1a5276 50%, #0f4c81 100%);
  padding: var(--spacing-2xl) 0 calc(var(--spacing-2xl) + 80px);
  color: white;
  overflow: hidden;
  min-height: 100vh;
}

/* Animated Particles */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 15s infinite;
}

.particle:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; animation-duration: 12s; }
.particle:nth-child(2) { left: 20%; top: 80%; animation-delay: 1s; animation-duration: 14s; }
.particle:nth-child(3) { left: 30%; top: 40%; animation-delay: 2s; animation-duration: 16s; }
.particle:nth-child(4) { left: 40%; top: 60%; animation-delay: 3s; animation-duration: 13s; }
.particle:nth-child(5) { left: 50%; top: 30%; animation-delay: 4s; animation-duration: 15s; }
.particle:nth-child(6) { left: 60%; top: 70%; animation-delay: 5s; animation-duration: 11s; }
.particle:nth-child(7) { left: 70%; top: 50%; animation-delay: 6s; animation-duration: 17s; }
.particle:nth-child(8) { left: 80%; top: 20%; animation-delay: 7s; animation-duration: 14s; }
.particle:nth-child(9) { left: 90%; top: 90%; animation-delay: 8s; animation-duration: 12s; }
.particle:nth-child(10) { left: 15%; top: 50%; animation-delay: 9s; animation-duration: 16s; }
.particle:nth-child(11) { left: 25%; top: 10%; animation-delay: 0.5s; animation-duration: 13s; }
.particle:nth-child(12) { left: 35%; top: 70%; animation-delay: 1.5s; animation-duration: 15s; }
.particle:nth-child(13) { left: 45%; top: 90%; animation-delay: 2.5s; animation-duration: 11s; }
.particle:nth-child(14) { left: 55%; top: 15%; animation-delay: 3.5s; animation-duration: 17s; }
.particle:nth-child(15) { left: 65%; top: 35%; animation-delay: 4.5s; animation-duration: 14s; }
.particle:nth-child(16) { left: 75%; top: 85%; animation-delay: 5.5s; animation-duration: 12s; }
.particle:nth-child(17) { left: 85%; top: 45%; animation-delay: 6.5s; animation-duration: 16s; }
.particle:nth-child(18) { left: 5%; top: 65%; animation-delay: 7.5s; animation-duration: 13s; }
.particle:nth-child(19) { left: 95%; top: 25%; animation-delay: 8.5s; animation-duration: 15s; }
.particle:nth-child(20) { left: 50%; top: 55%; animation-delay: 9.5s; animation-duration: 11s; }

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-100px) rotate(180deg);
    opacity: 0.8;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}

/* Hero Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(46, 204, 113, 0.2);
  border: 1px solid rgba(46, 204, 113, 0.4);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  animation: fadeInDown 0.6s ease;
}

.hero-badge svg {
  width: 16px;
  height: 16px;
  color: var(--color-secondary-light);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  text-align: center;
  color: white;
  line-height: 1.2;
  animation: fadeInUp 0.6s ease 0.2s both;
}

.title-line {
  display: block;
  font-weight: 600;
  opacity: 0.95;
}

.title-highlight {
  display: block;
  background: linear-gradient(135deg, #2ECC71 0%, #58D68D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 4rem;
  }
}

.hero-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  text-align: center;
  max-width: 650px;
  margin: 0 auto var(--spacing-xl);
  line-height: 1.8;
  animation: fadeInUp 0.6s ease 0.3s both;
}

@media (min-width: 640px) {
  .hero-subtitle {
    font-size: 1.125rem;
  }
}

/* Search Card */
.search-card {
  background: var(--color-surface);
  border-radius: 24px;
  padding: var(--spacing-lg);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 900px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease 0.4s both;
}

@media (min-width: 640px) {
  .search-card {
    padding: var(--spacing-xl) var(--spacing-2xl);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.card-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.card-title h2 {
  font-size: 1.25rem;
  color: var(--color-text-primary);
  margin: 0 0 0.25rem 0;
}

.card-title p {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.search-form {
  display: grid;
  gap: var(--spacing-md);
}

@media (min-width: 640px) {
  .search-form {
    grid-template-columns: repeat(2, 1fr);
  }
}

.search-form .form-group {
  margin-bottom: 0;
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.form-label svg {
  width: 16px;
  height: 16px;
  color: var(--color-primary);
}

.select-wrapper,
.input-wrapper {
  position: relative;
}

.form-select,
.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  padding-right: 2.5rem;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 1rem;
  color: var(--color-text-primary);
  background-color: var(--color-background);
  transition: all 0.2s ease;
  appearance: none;
  cursor: pointer;
}

.form-input {
  cursor: text;
}

.form-select:hover:not(:disabled),
.form-input:hover:not(:disabled) {
  border-color: var(--color-primary-light);
}

.form-select:focus,
.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(15, 76, 129, 0.1);
  background-color: white;
}

.form-select.disabled,
.form-input.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--color-border);
}

.select-icon,
.input-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-text-muted);
}

.input-icon {
  pointer-events: auto;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;
}

.input-icon:hover {
  background: var(--color-border);
  color: var(--color-text-primary);
}

.select-icon svg,
.input-icon svg {
  width: 18px;
  height: 18px;
}

/* Suggestions */
.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid var(--color-border);
  border-top: none;
  border-radius: 0 0 12px 12px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  cursor: pointer;
  transition: all 0.15s;
  color: var(--color-text-primary);
}

.suggestion-item:hover {
  background: var(--color-background);
}

.suggestion-item svg {
  width: 16px;
  height: 16px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.search-btn {
  grid-column: 1 / -1;
  margin-top: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.search-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(15, 76, 129, 0.3);
}

.search-btn:not(:disabled):hover .btn-arrow {
  transform: translateX(4px);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.6s ease 0.5s both;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
}

.stat-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 0.5rem;
  background: rgba(46, 204, 113, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 20px;
  height: 20px;
  color: var(--color-secondary-light);
}

.stat-number {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

@media (min-width: 640px) {
  .stat-number {
    font-size: 1.5rem;
  }
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

@media (min-width: 640px) {
  .stat-label {
    font-size: 0.875rem;
  }
}

/* Trust Badges */
.trust-badges {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: var(--spacing-xl);
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease 0.6s both;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.badge-item:hover {
  opacity: 1;
}

.badge-item svg {
  width: 16px;
  height: 16px;
  color: var(--color-secondary-light);
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 0;
}

.hero-wave svg {
  width: 100%;
  height: 80px;
}

/* Background decorations */
.hero-search::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 60%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
  pointer-events: none;
}

.hero-search::after {
  content: '';
  position: absolute;
  bottom: 20%;
  left: -10%;
  width: 40%;
  height: 150%;
  background: radial-gradient(circle, rgba(46,204,113,0.08) 0%, transparent 70%);
  pointer-events: none;
}
</style>
