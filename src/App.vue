<script setup>
import { ref, provide, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import FooterBar from '@/components/layout/FooterBar.vue'
import ToastNotification from '@/components/ui/ToastNotification.vue'
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue'

const router = useRouter()
const toastRef = ref(null)

// Provide toast to child components and set global reference
const toastMethods = {
  success: (msg, title) => toastRef.value?.success(msg, title),
  error: (msg, title) => toastRef.value?.error(msg, title),
  warning: (msg, title) => toastRef.value?.warning(msg, title),
  info: (msg, title) => toastRef.value?.info(msg, title)
}
provide('toast', toastMethods)

// Set global toast reference for error handler
onMounted(() => {
  window.__TOAST__ = toastMethods
})

const handleErrorBoundaryRetry = () => {
  router.go(0)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="app-wrapper">
    <NavBar />
    
    <main class="main-content">
      <ErrorBoundary @retry="handleErrorBoundaryRetry" @go-home="goHome">
        <RouterView v-slot="{ Component }">
          <Suspense>
            <template #default>
              <component :is="Component" />
            </template>
            <template #fallback>
              <div class="loading-page">
                <div class="loading-spinner"></div>
                <p>Memuat halaman...</p>
              </div>
            </template>
          </Suspense>
        </RouterView>
      </ErrorBoundary>
    </main>

    <FooterBar />
    
    <!-- Toast Notifications (Global) -->
    <ToastNotification ref="toastRef" />
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

.loading-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: var(--spacing-md);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-page p {
  color: var(--color-text-secondary)\;
}
</style>
