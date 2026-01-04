<template>
  <div class="empty-state" :class="[`empty-${size}`, variant]">
    <div class="empty-icon" :style="{ color: iconColor }">
      <!-- Search Empty -->
      <svg v-if="icon === 'search'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v6M8 11h6"/>
      </svg>
      
      <!-- Data Empty -->
      <svg v-else-if="icon === 'data'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="18" x2="12" y2="12"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
      
      <!-- Report Empty -->
      <svg v-else-if="icon === 'report'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
      
      <!-- Map Empty -->
      <svg v-else-if="icon === 'map'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
        <line x1="8" y1="2" x2="8" y2="18"/>
        <line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
      
      <!-- Error -->
      <svg v-else-if="icon === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      
      <!-- Offline -->
      <svg v-else-if="icon === 'offline'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="1" y1="1" x2="23" y2="23"/>
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9"/>
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <line x1="12" y1="20" x2="12.01" y2="20"/>
      </svg>
      
      <!-- Default/Inbox -->
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      </svg>
    </div>
    
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-description">{{ description }}</p>
    
    <div v-if="$slots.default || actionText" class="empty-actions">
      <slot>
        <button v-if="actionText" class="btn btn-primary" @click="$emit('action')">
          {{ actionText }}
        </button>
      </slot>
    </div>
    
    <div v-if="tips && tips.length" class="empty-tips">
      <p class="tips-title">Tips:</p>
      <ul>
        <li v-for="(tip, index) in tips" :key="index">{{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'inbox',
    validator: (v) => ['search', 'data', 'report', 'map', 'error', 'offline', 'inbox'].includes(v)
  },
  iconColor: {
    type: String,
    default: 'var(--color-text-muted, #9ca3af)'
  },
  title: {
    type: String,
    default: 'Tidak Ada Data'
  },
  description: {
    type: String,
    default: 'Data yang Anda cari tidak ditemukan.'
  },
  actionText: {
    type: String,
    default: ''
  },
  tips: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v)
  },
  variant: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
}

/* Size variants */
.empty-small {
  padding: 1.5rem 1rem;
}

.empty-small .empty-icon {
  width: 48px;
  height: 48px;
}

.empty-small .empty-title {
  font-size: 1rem;
}

.empty-small .empty-description {
  font-size: 0.875rem;
}

.empty-medium .empty-icon {
  width: 80px;
  height: 80px;
}

.empty-large {
  padding: 4rem 2rem;
}

.empty-large .empty-icon {
  width: 120px;
  height: 120px;
}

.empty-large .empty-title {
  font-size: 1.5rem;
}

/* Icon */
.empty-icon {
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
}

/* Title */
.empty-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary, #1f2937);
  margin-bottom: 0.5rem;
}

/* Description */
.empty-description {
  color: var(--color-text-secondary, #6b7280);
  max-width: 400px;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Actions */
.empty-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 0.875rem;
}

.btn-primary {
  background: var(--color-primary, #2563eb);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-dark, #1d4ed8);
}

/* Tips */
.empty-tips {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--color-background, #f9fafb);
  border-radius: 0.5rem;
  text-align: left;
  max-width: 400px;
}

.tips-title {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text-primary, #1f2937);
  margin-bottom: 0.5rem;
}

.empty-tips ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty-tips li {
  font-size: 0.875rem;
  color: var(--color-text-secondary, #6b7280);
  padding-left: 1.25rem;
  position: relative;
  margin-bottom: 0.25rem;
}

.empty-tips li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-primary, #2563eb);
}

.empty-tips li:last-child {
  margin-bottom: 0;
}
</style>
