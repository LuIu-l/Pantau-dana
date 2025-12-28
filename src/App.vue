<script setup>
import { ref, computed } from 'vue'
import NavBar from './components/layout/NavBar.vue'
import FooterBar from './components/layout/FooterBar.vue'
import HeroSearch from './components/search/HeroSearch.vue'
import VillageSummary from './components/dashboard/VillageSummary.vue'
import BudgetTracker from './components/dashboard/BudgetTracker.vue'
import ProjectMap from './components/map/ProjectMap.vue'
import BansosCheck from './components/bansos/BansosCheck.vue'
import BansosExpenditure from './components/bansos/BansosExpenditure.vue'
import EducationPage from './components/education/EducationPage.vue'
import ReportModal from './components/report/ReportModal.vue'
import TrackReport from './components/report/TrackReport.vue'
import { desaDetail, proyekData } from './data/mockData.js'

const currentPage = ref('home')
const selectedDesaId = ref(null)

const selectedDesa = computed(() => {
  if (!selectedDesaId.value) return null
  return desaDetail[selectedDesaId.value] || null
})

const selectedProyek = computed(() => {
  if (!selectedDesaId.value) return []
  return proyekData[selectedDesaId.value] || []
})

const navigate = (page) => {
  currentPage.value = page
  selectedDesaId.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const selectDesa = (desaId) => {
  selectedDesaId.value = desaId
  // Scroll to dashboard after selecting
  setTimeout(() => {
    window.scrollTo({ top: 100, behavior: 'smooth' })
  }, 100)
}

const backToSearch = () => {
  selectedDesaId.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="app-wrapper">
    <NavBar :currentPage="currentPage" @navigate="navigate" />
    
    <main class="main-content">
      <!-- Home Page -->
      <template v-if="currentPage === 'home'">
        <!-- Show search if no desa selected -->
        <template v-if="!selectedDesa">
          <HeroSearch @selectDesa="selectDesa" />
          
          <!-- Features Section -->
          <section class="features-section">
            <div class="container">
              <h2 class="section-title">Mengapa Pantau Desa?</h2>
              <p class="section-subtitle">Platform transparansi untuk memastikan dana desa digunakan dengan tepat</p>
              
              <div class="features-grid">
                <div class="feature-card">
                  <div class="feature-icon" style="background-color: rgba(15, 76, 129, 0.1); color: #0F4C81;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                  <h3>Mudah Diakses</h3>
                  <p>Cukup pilih lokasi desamu untuk melihat informasi anggaran tanpa perlu login atau registrasi.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon" style="background-color: rgba(46, 204, 113, 0.1); color: #2ECC71;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                      <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                    </svg>
                  </div>
                  <h3>Data Visual</h3>
                  <p>Grafik dan peta interaktif memudahkan pemahaman penggunaan dana desa.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon" style="background-color: rgba(243, 156, 18, 0.1); color: #F39C12;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3>Aman & Terpercaya</h3>
                  <p>Laporkan masalah dengan identitas terlindungi. Privasi pelapor dijamin keamanannya.</p>
                </div>

                <div class="feature-card">
                  <div class="feature-icon" style="background-color: rgba(231, 76, 60, 0.1); color: #E74C3C;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                      <line x1="8" y1="2" x2="8" y2="18"/>
                      <line x1="16" y1="6" x2="16" y2="22"/>
                    </svg>
                  </div>
                  <h3>Peta Proyek</h3>
                  <p>Lihat lokasi proyek pembangunan lengkap dengan foto bukti sebelum dan sesudah.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="cta-section">
            <div class="container">
              <div class="cta-card">
                <div class="cta-content">
                  <h2>Temukan Masalah di Desamu?</h2>
                  <p>Laporkan secara anonim dan aman. Identitas pelapor dilindungi dan hanya dapat diakses oleh pihak berwenang.</p>
                </div>
                <div class="cta-actions">
                  <button class="btn btn-alert btn-lg" @click="$refs.reportModal.openModal()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Buat Laporan
                  </button>
                  <button class="btn btn-outline btn-lg" @click="navigate('lacak')">
                    Lacak Status Laporan
                  </button>
                </div>
              </div>
            </div>
          </section>
        </template>

        <!-- Show dashboard if desa is selected -->
        <template v-else>
          <VillageSummary :desa="selectedDesa" @back="backToSearch" />
          <BudgetTracker 
            :kategoris="selectedDesa.kategori_anggaran" 
            :projects="selectedProyek"
          />
          <ProjectMap 
            :projects="selectedProyek"
            :centerCoordinat="selectedDesa.koordinat"
          />
        </template>
      </template>

      <!-- Bansos Check Page -->
      <template v-else-if="currentPage === 'bansos'">
        <BansosCheck />
      </template>

      <!-- Track Report Page -->
      <template v-else-if="currentPage === 'lacak'">
        <TrackReport />
      </template>

      <!-- Education Page -->
      <template v-else-if="currentPage === 'edukasi'">
        <EducationPage />
      </template>

      <!-- Bansos Expenditure Page -->
      <template v-else-if="currentPage === 'laporan-bansos'">
        <BansosExpenditure />
      </template>
    </main>

    <FooterBar @navigate="navigate" />
    
    <!-- Report Modal (Global) -->
    <ReportModal ref="reportModal" />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

/* Features Section */
.features-section {
  padding: var(--spacing-2xl) 0;
}

.section-title {
  text-align: center;
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto var(--spacing-xl);
}

.features-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.feature-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
}

.feature-icon svg {
  width: 32px;
  height: 32px;
}

.feature-card h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.feature-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-2xl) 0;
  background-color: var(--color-surface);
}

.cta-card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .cta-card {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
}

.cta-content {
  color: white;
}

.cta-content h2 {
  color: white;
  margin-bottom: var(--spacing-sm);
}

.cta-content p {
  opacity: 0.9;
  margin: 0;
  max-width: 450px;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

@media (min-width: 480px) {
  .cta-actions {
    flex-direction: row;
  }
}

.cta-actions .btn-outline {
  border-color: white;
  color: white;
}

.cta-actions .btn-outline:hover {
  background-color: white;
  color: var(--color-primary);
}

.cta-actions .btn svg {
  width: 20px;
  height: 20px;
}
</style>
