<script setup>
const emit = defineEmits(['navigate', 'openReport'])

const quickCards = [
  {
    id: 'search',
    title: 'Cari Desa',
    description: 'Temukan informasi desa di seluruh Indonesia',
    icon: '◎',
    color: 'primary',
    path: '/'
  },
  {
    id: 'bansos',
    title: 'Cek Bansos',
    description: 'Verifikasi status penerima bantuan sosial',
    icon: '○',
    color: 'secondary',
    path: '/bansos'
  },
  {
    id: 'report',
    title: 'Buat Laporan',
    description: 'Laporkan masalah dengan aman & anonim',
    icon: '▤',
    color: 'warning',
    action: 'openReport'
  },
  {
    id: 'ranking',
    title: 'Lihat Ranking',
    description: 'Peringkat transparansi desa se-Indonesia',
    icon: '◉',
    color: 'accent',
    path: '/statistik'
  }
]

const handleClick = (card) => {
  if (card.action) {
    emit(card.action)
  } else if (card.path) {
    emit('navigate', card.path)
  }
}
</script>

<template>
  <section class="quick-access-section">
    <div class="container">
      <div class="quick-access-grid">
        <button 
          v-for="card in quickCards" 
          :key="card.id"
          class="quick-card"
          :class="`quick-card--${card.color}`"
          @click="handleClick(card)"
        >
          <span class="card-icon">{{ card.icon }}</span>
          <div class="card-content">
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-description">{{ card.description }}</p>
          </div>
          <svg class="card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quick-access-section {
  padding: var(--spacing-2xl) 0;
  margin-top: -60px;
  position: relative;
  z-index: 10;
}

.quick-access-grid {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .quick-access-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .quick-access-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.quick-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: all var(--transition-base);
  text-align: left;
  width: 100%;
}

.quick-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.quick-card--primary:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}

.quick-card--secondary:hover {
  border-color: var(--color-secondary);
  background: var(--color-secondary-50);
}

.quick-card--warning:hover {
  border-color: var(--color-warning);
  background: var(--color-warning-50);
}

.quick-card--accent:hover {
  border-color: var(--color-accent);
  background: var(--color-accent-50);
}

.card-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-primary);
}

.card-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.4;
}

.card-arrow {
  width: 24px;
  height: 24px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: transform var(--transition-base);
}

.quick-card:hover .card-arrow {
  transform: translateX(4px);
}

.quick-card--primary:hover .card-arrow { color: var(--color-primary); }
.quick-card--secondary:hover .card-arrow { color: var(--color-secondary); }
.quick-card--warning:hover .card-arrow { color: var(--color-warning); }
.quick-card--accent:hover .card-arrow { color: var(--color-accent); }
</style>
