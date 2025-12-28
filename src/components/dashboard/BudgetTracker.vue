<template>
  <div class="container">
    <div class="card budget-tracker-card">
      <div class="card-header">
        <h2 class="card-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="title-icon">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
            <path d="M22 12A10 10 0 0 0 12 2v10z"/>
          </svg>
          Penggunaan Dana Berdasarkan Kategori
        </h2>
        <p class="card-subtitle">Klik kategori untuk melihat detail proyek</p>
      </div>

      <div class="tracker-content">
        <!-- Donut Chart -->
        <div class="chart-section">
          <div class="donut-chart">
            <svg viewBox="0 0 100 100" class="donut-svg">
              <circle
                v-for="(segment, index) in chartSegments"
                :key="index"
                cx="50"
                cy="50"
                r="35"
                fill="none"
                :stroke="segment.warna"
                stroke-width="20"
                :stroke-dasharray="segment.dashArray"
                :stroke-dashoffset="segment.dashOffset"
                :class="{ 'segment-active': selectedCategory === segment.nama }"
                @click="selectCategory(segment.nama)"
                style="cursor: pointer; transition: all 0.3s ease;"
              />
            </svg>
            <div class="donut-center">
              <span class="donut-total">{{ formatRupiah(totalUsed) }}</span>
              <span class="donut-label">Total Terpakai</span>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="legend-section">
          <div 
            v-for="kategori in kategoris" 
            :key="kategori.nama"
            class="legend-item"
            :class="{ 'legend-active': selectedCategory === kategori.nama }"
            @click="selectCategory(kategori.nama)"
          >
            <div class="legend-color" :style="{ backgroundColor: kategori.warna }"></div>
            <div class="legend-info">
              <span class="legend-name">{{ kategori.nama }}</span>
              <span class="legend-value">{{ formatRupiah(kategori.nilai) }}</span>
            </div>
            <span class="legend-percentage">{{ kategori.persentase }}%</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="legend-arrow">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Projects Drill-down -->
      <transition name="slide">
        <div v-if="selectedCategory" class="projects-section">
          <div class="projects-header">
            <h3>
              <span class="projects-category-dot" :style="{ backgroundColor: selectedCategoryColor }"></span>
              Proyek {{ selectedCategory }}
            </h3>
            <button class="btn btn-ghost btn-sm" @click="selectedCategory = null">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Tutup
            </button>
          </div>

          <div class="projects-list">
            <div 
              v-for="project in filteredProjects" 
              :key="project.id"
              class="project-card"
              @click="$emit('selectProject', project)"
            >
              <div class="project-status">
                <span 
                  class="status-dot" 
                  :class="getStatusClass(project.status)"
                ></span>
              </div>
              <div class="project-info">
                <h4 class="project-name">{{ project.nama }}</h4>
                <p class="project-value">{{ formatRupiah(project.nilai_anggaran) }}</p>
                <p class="project-contractor">Pelaksana: {{ project.kontraktor }}</p>
              </div>
              <div class="project-progress">
                <div class="progress-ring">
                  <svg viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e9ecef"
                      stroke-width="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      :stroke="getProgressColor(project.status)"
                      stroke-width="3"
                      :stroke-dasharray="`${project.progress}, 100`"
                    />
                  </svg>
                  <span class="progress-text">{{ project.progress }}%</span>
                </div>
                <span class="badge" :class="'badge-' + getStatusInfo(project.status).color">
                  {{ getStatusInfo(project.status).label }}
                </span>
              </div>
            </div>

            <div v-if="filteredProjects.length === 0" class="no-projects">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>Belum ada proyek di kategori ini</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatRupiah, getStatusLabel } from '@/data/mockData.js'

const props = defineProps({
  kategoris: {
    type: Array,
    required: true
  },
  projects: {
    type: Array,
    default: () => []
  }
})

defineEmits(['selectProject'])

const selectedCategory = ref(null)

const totalUsed = computed(() => {
  return props.kategoris.reduce((sum, k) => sum + k.nilai, 0)
})

const chartSegments = computed(() => {
  const circumference = 2 * Math.PI * 35 // radius = 35
  let accumulatedOffset = 0
  
  return props.kategoris.map(kategori => {
    const segmentLength = (kategori.persentase / 100) * circumference
    const segment = {
      ...kategori,
      dashArray: `${segmentLength} ${circumference - segmentLength}`,
      dashOffset: -accumulatedOffset + circumference / 4 // Start from top
    }
    accumulatedOffset += segmentLength
    return segment
  })
})

const selectedCategoryColor = computed(() => {
  const kategori = props.kategoris.find(k => k.nama === selectedCategory.value)
  return kategori ? kategori.warna : '#0F4C81'
})

const filteredProjects = computed(() => {
  if (!selectedCategory.value) return []
  return props.projects.filter(p => p.kategori === selectedCategory.value)
})

const selectCategory = (nama) => {
  selectedCategory.value = selectedCategory.value === nama ? null : nama
}

const getStatusClass = (status) => {
  const classMap = {
    selesai: 'status-success',
    sedang_berjalan: 'status-warning',
    belum_mulai: 'status-danger'
  }
  return classMap[status] || 'status-info'
}

const getProgressColor = (status) => {
  const colorMap = {
    selesai: 'var(--color-success)',
    sedang_berjalan: 'var(--color-warning)',
    belum_mulai: 'var(--color-danger)'
  }
  return colorMap[status] || 'var(--color-info)'
}

const getStatusInfo = (status) => {
  return getStatusLabel(status)
}
</script>

<style scoped>
.budget-tracker-card {
  margin-bottom: var(--spacing-lg);
}

.title-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: var(--spacing-sm);
  color: var(--color-secondary);
}

.tracker-content {
  display: grid;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .tracker-content {
    grid-template-columns: 280px 1fr;
    align-items: start;
  }
}

/* Donut Chart */
.chart-section {
  display: flex;
  justify-content: center;
}

.donut-chart {
  position: relative;
  width: 220px;
  height: 220px;
}

.donut-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.donut-svg circle {
  transform-origin: center;
}

.donut-svg circle:hover,
.donut-svg circle.segment-active {
  filter: brightness(1.1);
  stroke-width: 24;
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.donut-total {
  display: block;
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

.donut-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Legend */
.legend-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
}

.legend-item:hover {
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.legend-item.legend-active {
  border-color: var(--color-primary);
  background-color: var(--color-surface);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.legend-info {
  flex: 1;
  min-width: 0;
}

.legend-name {
  display: block;
  font-weight: 500;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.legend-value {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.legend-percentage {
  font-weight: 600;
  color: var(--color-text-primary);
}

.legend-arrow {
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  transition: transform var(--transition-fast);
}

.legend-item.legend-active .legend-arrow {
  transform: rotate(90deg);
  color: var(--color-primary);
}

/* Projects Section */
.projects-section {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border);
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.projects-header h3 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  margin: 0;
}

.projects-category-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.projects-list {
  display: grid;
  gap: var(--spacing-md);
}

.project-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.project-card:hover {
  background-color: var(--color-surface);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.project-status {
  display: flex;
  align-items: flex-start;
  padding-top: var(--spacing-xs);
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-dot.status-success { background-color: var(--color-success); }
.status-dot.status-warning { background-color: var(--color-warning); }
.status-dot.status-danger { background-color: var(--color-danger); }

.project-info {
  min-width: 0;
}

.project-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin: 0 0 var(--spacing-xs);
  color: var(--color-text-primary);
}

.project-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-secondary);
  margin: 0 0 var(--spacing-xs);
}

.project-contractor {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin: 0;
}

.project-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.progress-ring {
  position: relative;
  width: 44px;
  height: 44px;
}

.progress-ring svg {
  transform: rotate(-90deg);
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.no-projects {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
}

.no-projects svg {
  width: 48px;
  height: 48px;
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
