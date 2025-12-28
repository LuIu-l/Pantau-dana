<template>
  <header class="navbar">
    <div class="container navbar-content">
      <a href="#" class="navbar-brand" @click.prevent="$emit('navigate', 'home')">
        <svg class="navbar-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1"/>
          <path d="M12 24 L18 16 L22 22 L28 12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="24" r="2" fill="currentColor"/>
          <circle cx="18" cy="16" r="2" fill="currentColor"/>
          <circle cx="22" cy="22" r="2" fill="currentColor"/>
          <circle cx="28" cy="12" r="2" fill="currentColor"/>
        </svg>
        <span class="navbar-title">Pantau Desa</span>
      </a>
      
      <nav class="navbar-nav" :class="{ 'is-open': isMenuOpen }">
        <a 
          href="#" 
          class="nav-link" 
          :class="{ active: currentPage === 'home' }"
          @click.prevent="navigate('home')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Beranda
        </a>
        <a 
          href="#" 
          class="nav-link"
          :class="{ active: currentPage === 'bansos' }"
          @click.prevent="navigate('bansos')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Cek Bansos
        </a>
        <a 
          href="#" 
          class="nav-link"
          :class="{ active: currentPage === 'lacak' }"
          @click.prevent="navigate('lacak')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          Lacak Laporan
        </a>
        <a 
          href="#" 
          class="nav-link"
          :class="{ active: currentPage === 'edukasi' }"
          @click.prevent="navigate('edukasi')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          Edukasi
        </a>
        <a 
          href="#" 
          class="nav-link"
          :class="{ active: currentPage === 'laporan-bansos' }"
          @click.prevent="navigate('laporan-bansos')"
        >
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          Laporan Bansos
        </a>
      </nav>

      <button class="navbar-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="Toggle menu">
        <svg v-if="!isMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  currentPage: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['navigate'])

const isMenuOpen = ref(false)

const navigate = (page) => {
  emit('navigate', page)
  isMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-primary);
  font-weight: 700;
  font-size: var(--font-size-lg);
  text-decoration: none;
}

.navbar-logo {
  width: 36px;
  height: 36px;
  color: var(--color-primary);
}

.navbar-title {
  display: none;
}

@media (min-width: 480px) {
  .navbar-title {
    display: inline;
  }
}

.navbar-nav {
  display: none;
  gap: var(--spacing-xs);
}

@media (min-width: 768px) {
  .navbar-nav {
    display: flex;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: rgba(15, 76, 129, 0.05);
}

.nav-link.active {
  color: var(--color-primary);
  background-color: rgba(15, 76, 129, 0.1);
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.navbar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  cursor: pointer;
}

.navbar-toggle:hover {
  background-color: var(--color-border);
}

.navbar-toggle svg {
  width: 24px;
  height: 24px;
}

@media (min-width: 768px) {
  .navbar-toggle {
    display: none;
  }
}

/* Mobile Menu */
@media (max-width: 767px) {
  .navbar-nav.is-open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-lg);
    animation: slideDown 0.2s ease;
  }

  .navbar-nav.is-open .nav-link {
    padding: var(--spacing-md);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
