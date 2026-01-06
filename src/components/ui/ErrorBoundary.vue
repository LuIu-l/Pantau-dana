<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h2>Oops! Terjadi Kesalahan</h2>
      <p>Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.</p>
      
      <div v-if="showDetails && errorInfo" class="error-details">
        <details>
          <summary>Detail Error (untuk developer)</summary>
          <pre>{{ errorInfo }}</pre>
        </details>
      </div>

      <div class="error-actions">
        <button class="btn btn-primary" @click="handleRetry">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="btn-icon">
            <path d="M23 4v6h-6"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          Coba Lagi
        </button>
        <button class="btn btn-secondary" @click="handleGoHome">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="btn-icon">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Ke Beranda
        </button>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'

const props = defineProps({
  showDetails: {
    type: Boolean,
    default: import.meta.env.DEV // Only show in development
  }
})

const emit = defineEmits(['error', 'retry', 'go-home'])

const hasError = ref(false)
const errorInfo = ref(null)

onErrorCaptured((error, instance, info) => {
  hasError.value = true
  errorInfo.value = {
    message: error.message,
    stack: error.stack,
    component: instance?.$options?.name || 'Unknown',
    info: info
  }

  // Emit error event for logging
  emit('error', { error, instance, info })

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('Error caught by ErrorBoundary:', error)
    console.error('Component:', instance)
    console.error('Info:', info)
  }

  // Return false to prevent the error from propagating further
  return false
})

const handleRetry = () => {
  hasError.value = false
  errorInfo.value = null
  emit('retry')
}

const handleGoHome = () => {
  hasError.value = false
  errorInfo.value = null
  emit('go-home')
  // Navigate to home
  window.location.href = '/'
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  color: var(--color-danger, #DC2626);
}

.error-icon svg {
  width: 100%;
  height: 100%;
}

.error-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary, #1f2937);
  margin-bottom: 0.75rem;
}

.error-content p {
  color: var(--color-text-secondary, #6b7280);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.error-details {
  margin-bottom: 1.5rem;
  text-align: left;
}

.error-details details {
  background: var(--color-background, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 0.5rem;
  padding: 1rem;
}

.error-details summary {
  cursor: pointer;
  font-weight: 500;
  color: var(--color-text-secondary, #6b7280);
  margin-bottom: 0.5rem;
}

.error-details pre {
  font-size: 0.75rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--color-danger, #DC2626);
  background: var(--color-surface, #fff);
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.btn-primary {
  background: var(--color-primary, #2563eb);
  color: white;
}

.btn-primary:hover {
  background: var(--color-primary-dark, #1d4ed8);
}

.btn-secondary {
  background: var(--color-surface, #fff);
  color: var(--color-text-primary, #1f2937);
  border: 1px solid var(--color-border, #e5e7eb);
}

.btn-secondary:hover {
  background: var(--color-background, #f9fafb);
}
</style>
