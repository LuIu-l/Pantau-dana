<script setup>
import BansosCheck from '@/components/bansos/BansosCheck.vue'
import BansosExpenditure from '@/components/bansos/BansosExpenditure.vue'
import { ref } from 'vue'

const activeTab = ref('check') // 'check' or 'expenditure'
</script>

<template>
  <div class="bansos-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Bantuan Sosial</h1>
        <p class="page-subtitle">Cek status penerima dan transparansi pengeluaran bantuan sosial di desa Anda</p>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation" role="tablist">
        <button 
          :class="['tab-btn', { active: activeTab === 'check' }]"
          @click="activeTab = 'check'"
          role="tab"
          :aria-selected="activeTab === 'check'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          Cek Penerima
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'expenditure' }]"
          @click="activeTab = 'expenditure'"
          role="tab"
          :aria-selected="activeTab === 'expenditure'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          Laporan Pengeluaran
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <BansosCheck v-if="activeTab === 'check'" />
        <BansosExpenditure v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bansos-page {
  padding: var(--spacing-xl) 0;
  min-height: 60vh;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto;
}

.tab-navigation {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.tab-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.tab-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.tab-btn svg {
  width: 20px;
  height: 20px;
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
