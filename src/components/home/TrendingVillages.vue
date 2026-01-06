<script setup>
import { formatRupiah } from '@/data/mockData.js'

const props = defineProps({
  villages: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['selectDesa'])
</script>

<template>
  <section class="trending-section">
    <div class="container">
      <div class="section-header">
        <div>
          <h2 class="section-title">★ Desa dengan Transparansi Terbaik</h2>
          <p class="section-subtitle">Top 5 desa dengan skor transparansi tertinggi bulan ini</p>
        </div>
        <router-link to="/statistik" class="btn btn-outline btn-sm">
          Lihat Ranking Lengkap
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
      
      <div class="trending-grid">
        <article 
          v-for="(desa, index) in villages" 
          :key="desa.id"
          class="trending-card"
          :class="{ 'trending-card--featured': index === 0 }"
          @click="emit('selectDesa', desa.id)"
        >
          <div class="rank-badge" :class="`rank-${index + 1}`">
            {{ index + 1 }}
          </div>
          
          <div class="card-content">
            <h3 class="village-name">{{ desa.nama }}</h3>
            <p class="village-location">{{ desa.kabupaten }}</p>
            
            <div class="score-container">
              <div class="score-bar">
                <div 
                  class="score-fill" 
                  :style="{ width: `${desa.skorTransparansi}%` }"
                ></div>
              </div>
              <span class="score-value">{{ desa.skorTransparansi }}%</span>
            </div>
            
            <div class="stats-row">
              <div class="stat-item">
                <span class="stat-label">Dana Kelola</span>
                <span class="stat-value">{{ formatRupiah(desa.totalDana) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Proyek Selesai</span>
                <span class="stat-value">{{ desa.proyekSelesai }}</span>
              </div>
            </div>
            
            <div class="change-indicator" :class="desa.perubahan >= 0 ? 'positive' : 'negative'">
              <svg v-if="desa.perubahan >= 0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5H7z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z"/>
              </svg>
              <span>{{ desa.perubahan >= 0 ? '+' : '' }}{{ desa.perubahan }} pts</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trending-section {
  padding: var(--spacing-3xl) 0;
  background: var(--color-surface);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.section-title {
  text-align: left;
  margin-bottom: var(--spacing-xs);
}

.section-subtitle {
  text-align: left;
  color: var(--color-text-secondary);
  margin: 0;
}

.section-header .btn svg {
  width: 16px;
  height: 16px;
}

.trending-grid {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .trending-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .trending-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.trending-card {
  position: relative;
  background: var(--gradient-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: all var(--transition-base);
}

.trending-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.trending-card--featured {
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-accent-50) 100%);
  border-color: var(--color-primary-200);
}

.rank-badge {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--font-size-lg);
  color: white;
  box-shadow: var(--shadow-md);
}

.rank-1 { background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); }
.rank-2 { background: linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%); }
.rank-3 { background: linear-gradient(135deg, #CD7F32 0%, #8B4513 100%); }
.rank-4, .rank-5 { background: var(--color-primary); }

.card-content {
  padding-top: var(--spacing-sm);
}

.village-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-primary);
}

.village-location {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-md);
}

.score-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.score-bar {
  flex: 1;
  height: 8px;
  background: var(--color-border-light);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-secondary) 0%, var(--color-primary) 100%);
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
}

.score-value {
  font-weight: 700;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  min-width: 40px;
}

.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-item .stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.stat-item .stat-value {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.change-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: 600;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.change-indicator svg {
  width: 16px;
  height: 16px;
}

.change-indicator.positive {
  background: rgba(5, 150, 105, 0.1);
  color: var(--color-success);
}

.change-indicator.negative {
  background: rgba(220, 38, 38, 0.1);
  color: var(--color-danger);
}
</style>
