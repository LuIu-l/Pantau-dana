<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <div class="error-illustration">
          <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
            <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="2" opacity="0.2"/>
            <circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="2" opacity="0.3"/>
            <circle cx="100" cy="100" r="40" stroke="currentColor" stroke-width="2" opacity="0.4"/>
            <text x="100" y="115" text-anchor="middle" font-size="48" font-weight="bold" fill="currentColor">404</text>
          </svg>
        </div>
        
        <h1>Halaman Tidak Ditemukan</h1>
        <p>Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
        
        <div class="actions">
          <button class="btn btn-primary btn-lg" @click="goHome">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Kembali ke Beranda
          </button>
          <button class="btn btn-outline btn-lg" @click="goBack">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Halaman Sebelumnya
          </button>
        </div>

        <div class="quick-links">
          <p>Atau coba halaman berikut:</p>
          <div class="links">
            <router-link to="/">Beranda</router-link>
            <router-link to="/bansos">Cek Bansos</router-link>
            <router-link to="/edukasi">Edukasi</router-link>
            <router-link to="/lapor">Laporan</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  padding: var(--spacing-2xl) 0;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.error-illustration {
  width: 200px;
  height: 200px;
  margin: 0 auto var(--spacing-xl);
  color: var(--color-primary);
}

.error-illustration svg {
  width: 100%;
  height: 100%;
}

h1 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-sm);
}

p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 480px) {
  .actions {
    flex-direction: row;
    justify-content: center;
  }
}

.actions .btn svg {
  width: 20px;
  height: 20px;
}

.quick-links {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

.quick-links p {
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.links {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.links a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-base);
}

.links a:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}
</style>
