<template>
  <header class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar-content">
      <a href="#" class="navbar-brand" @click.prevent="$emit('navigate', 'home')">
        <div class="logo-wrapper">
          <div class="logo-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#logoGradient)"/>
              <path d="M8 20L12 14L16 18L24 10" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="8" cy="20" r="2" fill="white"/>
              <circle cx="12" cy="14" r="2" fill="white"/>
              <circle cx="16" cy="18" r="2" fill="white"/>
              <circle cx="24" cy="10" r="2" fill="white"/>
              <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2563EB"/>
                  <stop offset="1" stop-color="#7C3AED"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">PantauDesa</span>
            <span class="brand-badge">BETA</span>
          </div>
        </div>
      </a>
      
      <nav class="navbar-nav" :class="{ 'is-open': isMenuOpen }">
        <a 
          v-for="item in navItems"
          :key="item.id"
          href="#" 
          class="nav-link" 
          :class="{ active: currentPage === item.id }"
          @click.prevent="navigate(item.id)"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          <span class="nav-text">{{ item.label }}</span>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </a>
      </nav>

      <div class="navbar-actions">
        <button class="theme-toggle" @click="toggleDarkMode" title="Toggle theme">
          <svg v-if="!isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <button class="navbar-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="Toggle menu">
          <div class="hamburger" :class="{ 'is-active': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="mobile-overlay" @click="isMenuOpen = false"></div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  currentPage: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['navigate'])

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isDark = ref(false)

const navItems = [
  {
    id: 'home',
    label: 'Beranda',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>'
  },
  {
    id: 'bansos',
    label: 'Cek Bansos',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    id: 'lacak',
    label: 'Lacak Laporan',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  },
  {
    id: 'edukasi',
    label: 'Edukasi',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
  },
  {
    id: 'laporan-bansos',
    label: 'Laporan',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>',
    badge: 'Baru'
  }
]

const navigate = (page) => {
  emit('navigate', page)
  isMenuOpen.value = false
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  // Apply dark mode to document
  if (isDark.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('theme', 'light')
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// Check for saved theme preference on mount
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  initializeTheme()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  height: var(--navbar-height);
  background: var(--navbar-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-base);
}

.navbar-scrolled {
  background: var(--navbar-bg-scrolled);
  border-bottom-color: var(--color-border-light);
  box-shadow: var(--shadow-md);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: var(--spacing-lg);
}

.navbar-brand {
  text-decoration: none;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo-icon {
  width: 40px;
  height: 40px;
  transition: transform var(--transition-base);
}

.logo-wrapper:hover .logo-icon {
  transform: scale(1.05) rotate(-5deg);
}

.logo-icon svg {
  width: 100%;
  height: 100%;
}

.brand-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.brand-name {
  font-size: var(--font-size-xl);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 6px;
  background: var(--gradient-secondary);
  color: white;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.navbar-nav {
  display: none;
  gap: var(--spacing-xs);
}

@media (min-width: 1024px) {
  .navbar-nav {
    display: flex;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: var(--font-size-sm);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  transition: width var(--transition-base);
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-primary-50);
}

.nav-link:hover::after {
  width: 50%;
}

.nav-link.active {
  color: var(--color-primary);
  background-color: var(--color-primary-50);
}

.nav-link.active::after {
  width: 70%;
}

.nav-icon {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.nav-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 6px;
  background: linear-gradient(135deg, #EF4444 0%, #F97316 100%);
  color: white;
  border-radius: var(--radius-full);
  animation: pulse-badge 2s infinite;
}

@keyframes pulse-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.theme-toggle:hover {
  background: var(--color-primary-50);
  color: var(--color-primary);
  border-color: var(--color-primary);
  transform: rotate(15deg);
}

.theme-toggle svg {
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
  border-radius: var(--radius-lg);
  cursor: pointer;
}

@media (min-width: 1024px) {
  .navbar-toggle {
    display: none;
  }
}

.hamburger {
  width: 24px;
  height: 20px;
  position: relative;
}

.hamburger span {
  position: absolute;
  width: 100%;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.hamburger span:nth-child(1) { top: 0; }
.hamburger span:nth-child(2) { top: 9px; }
.hamburger span:nth-child(3) { top: 18px; }

.hamburger.is-active span:nth-child(1) {
  transform: rotate(45deg);
  top: 9px;
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger.is-active span:nth-child(3) {
  transform: rotate(-45deg);
  top: 9px;
}

/* Mobile Menu */
.mobile-overlay {
  display: none;
}

@media (max-width: 1023px) {
  .mobile-overlay {
    display: block;
    position: fixed;
    top: var(--navbar-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: calc(var(--z-fixed) - 1);
  }

  .navbar-nav.is-open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: var(--spacing-md);
    right: var(--spacing-md);
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    padding: var(--spacing-md);
    box-shadow: var(--shadow-2xl);
    border: 1px solid var(--color-border-light);
    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .navbar-nav.is-open .nav-link {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-base);
    border-radius: var(--radius-lg);
  }

  .navbar-nav.is-open .nav-link::after {
    display: none;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-base);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
