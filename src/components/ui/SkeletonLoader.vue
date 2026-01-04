<template>
  <div class="skeleton-wrapper" :class="[`skeleton-${variant}`, { 'skeleton-animated': animated }]">
    <!-- Text Skeleton -->
    <template v-if="variant === 'text'">
      <div 
        v-for="n in lines" 
        :key="n" 
        class="skeleton-line"
        :style="{ width: n === lines ? '70%' : '100%' }"
      ></div>
    </template>

    <!-- Avatar Skeleton -->
    <template v-else-if="variant === 'avatar'">
      <div class="skeleton-avatar" :style="{ width: size, height: size }"></div>
    </template>

    <!-- Card Skeleton -->
    <template v-else-if="variant === 'card'">
      <div class="skeleton-card">
        <div class="skeleton-card-header">
          <div class="skeleton-avatar skeleton-sm"></div>
          <div class="skeleton-card-title">
            <div class="skeleton-line"></div>
            <div class="skeleton-line skeleton-short"></div>
          </div>
        </div>
        <div class="skeleton-card-body">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line skeleton-medium"></div>
        </div>
      </div>
    </template>

    <!-- Table Skeleton -->
    <template v-else-if="variant === 'table'">
      <div class="skeleton-table">
        <div v-for="row in rows" :key="row" class="skeleton-table-row">
          <div v-for="col in columns" :key="col" class="skeleton-table-cell">
            <div class="skeleton-line"></div>
          </div>
        </div>
      </div>
    </template>

    <!-- Chart Skeleton -->
    <template v-else-if="variant === 'chart'">
      <div class="skeleton-chart">
        <div class="skeleton-chart-bars">
          <div v-for="n in 5" :key="n" class="skeleton-bar" :style="{ height: `${30 + Math.random() * 50}%` }"></div>
        </div>
      </div>
    </template>

    <!-- Image Skeleton -->
    <template v-else-if="variant === 'image'">
      <div class="skeleton-image" :style="{ width, height }">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
    </template>

    <!-- Form Skeleton -->
    <template v-else-if="variant === 'form'">
      <div class="skeleton-form">
        <div v-for="n in fields" :key="n" class="skeleton-form-field">
          <div class="skeleton-label"></div>
          <div class="skeleton-input"></div>
        </div>
        <div class="skeleton-button"></div>
      </div>
    </template>

    <!-- Stats Skeleton -->
    <template v-else-if="variant === 'stats'">
      <div class="skeleton-stats">
        <div v-for="n in 4" :key="n" class="skeleton-stat-card">
          <div class="skeleton-stat-icon"></div>
          <div class="skeleton-stat-content">
            <div class="skeleton-line skeleton-short"></div>
            <div class="skeleton-line skeleton-medium"></div>
          </div>
        </div>
      </div>
    </template>

    <!-- Default/Custom -->
    <template v-else>
      <div class="skeleton-block" :style="{ width, height }"></div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (v) => ['text', 'avatar', 'card', 'table', 'chart', 'image', 'form', 'stats', 'block'].includes(v)
  },
  animated: {
    type: Boolean,
    default: true
  },
  lines: {
    type: Number,
    default: 3
  },
  rows: {
    type: Number,
    default: 5
  },
  columns: {
    type: Number,
    default: 4
  },
  fields: {
    type: Number,
    default: 3
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '200px'
  },
  size: {
    type: String,
    default: '48px'
  }
})
</script>

<style scoped>
.skeleton-wrapper {
  width: 100%;
}

/* Animation */
.skeleton-animated .skeleton-line,
.skeleton-animated .skeleton-avatar,
.skeleton-animated .skeleton-block,
.skeleton-animated .skeleton-image,
.skeleton-animated .skeleton-bar,
.skeleton-animated .skeleton-label,
.skeleton-animated .skeleton-input,
.skeleton-animated .skeleton-button,
.skeleton-animated .skeleton-stat-icon,
.skeleton-animated .skeleton-table-cell > div {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* Base skeleton element */
.skeleton-line,
.skeleton-avatar,
.skeleton-block,
.skeleton-image,
.skeleton-bar,
.skeleton-label,
.skeleton-input,
.skeleton-button,
.skeleton-stat-icon {
  background: linear-gradient(90deg, 
    var(--color-border-light, #e5e7eb) 25%, 
    var(--color-background, #f3f4f6) 50%, 
    var(--color-border-light, #e5e7eb) 75%
  );
  background-size: 200% 100%;
  border-radius: 0.25rem;
}

/* Text Skeleton */
.skeleton-line {
  height: 1rem;
  margin-bottom: 0.75rem;
}

.skeleton-line:last-child {
  margin-bottom: 0;
}

.skeleton-line.skeleton-short {
  width: 40% !important;
}

.skeleton-line.skeleton-medium {
  width: 70% !important;
}

/* Avatar Skeleton */
.skeleton-avatar {
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-avatar.skeleton-sm {
  width: 40px;
  height: 40px;
}

/* Card Skeleton */
.skeleton-card {
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border-light, #e5e7eb);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.skeleton-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skeleton-card-title {
  flex: 1;
}

.skeleton-card-title .skeleton-line:first-child {
  height: 1.25rem;
  width: 60%;
}

.skeleton-card-title .skeleton-line:last-child {
  height: 0.875rem;
  width: 40%;
}

/* Table Skeleton */
.skeleton-table {
  width: 100%;
}

.skeleton-table-row {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border-light, #e5e7eb);
}

.skeleton-table-row:last-child {
  border-bottom: none;
}

.skeleton-table-cell {
  flex: 1;
}

.skeleton-table-cell .skeleton-line {
  margin-bottom: 0;
  height: 0.875rem;
}

/* Chart Skeleton */
.skeleton-chart {
  height: 200px;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border-light, #e5e7eb);
  border-radius: 0.75rem;
}

.skeleton-chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  width: 100%;
  height: 100%;
}

.skeleton-bar {
  flex: 1;
  border-radius: 0.25rem 0.25rem 0 0;
}

/* Image Skeleton */
.skeleton-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-border-light, #e5e7eb);
  border-radius: 0.5rem;
}

.skeleton-image svg {
  width: 48px;
  height: 48px;
  color: var(--color-text-muted, #9ca3af);
  opacity: 0.5;
}

/* Form Skeleton */
.skeleton-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skeleton-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-label {
  height: 0.875rem;
  width: 30%;
}

.skeleton-input {
  height: 2.5rem;
  border-radius: 0.5rem;
}

.skeleton-button {
  height: 2.75rem;
  width: 120px;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}

/* Stats Skeleton */
.skeleton-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.skeleton-stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border-light, #e5e7eb);
  border-radius: 0.75rem;
}

.skeleton-stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.skeleton-stat-content {
  flex: 1;
}

.skeleton-stat-content .skeleton-line:first-child {
  height: 1.5rem;
  margin-bottom: 0.5rem;
}

.skeleton-stat-content .skeleton-line:last-child {
  height: 0.875rem;
}

/* Block Skeleton */
.skeleton-block {
  border-radius: 0.5rem;
}
</style>
