import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const profile = ref({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    foto: null,
  })

  const privacy = ref({
    tampilkanNama: false,
    izinkanLihatReview: true,
    subscribeNewsletter: true,
  })

  const appearance = ref({
    tema: 'auto', // 'light', 'dark', 'auto'
    bahasa: 'id', // 'id', 'en', 'jv'
    ukuranFont: 'normal', // 'kecil', 'normal', 'besar'
  })

  const onboardingCompleted = ref(false)
  const recentSearches = ref([])

  // Computed
  const isProfileComplete = computed(() => {
    return profile.value.nama && profile.value.email
  })

  const displayName = computed(() => {
    return profile.value.nama || 'Pengguna'
  })

  // Actions
  function updateProfile(data) {
    profile.value = { ...profile.value, ...data }
    saveToStorage()
  }

  function updatePrivacy(data) {
    privacy.value = { ...privacy.value, ...data }
    saveToStorage()
  }

  function updateAppearance(data) {
    appearance.value = { ...appearance.value, ...data }
    applyAppearance()
    saveToStorage()
  }

  function applyAppearance() {
    // Apply theme
    const theme = appearance.value.tema
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }

    // Apply font size
    const fontSizes = {
      kecil: '14px',
      normal: '16px',
      besar: '18px',
    }
    document.documentElement.style.fontSize = fontSizes[appearance.value.ukuranFont]

    // Apply language (could trigger i18n change)
    document.documentElement.lang = appearance.value.bahasa
  }

  function completeOnboarding() {
    onboardingCompleted.value = true
    saveToStorage()
  }

  function addRecentSearch(search) {
    // Remove duplicates
    recentSearches.value = recentSearches.value.filter(s => s.id !== search.id)
    // Add to beginning
    recentSearches.value.unshift(search)
    // Keep only last 10
    if (recentSearches.value.length > 10) {
      recentSearches.value = recentSearches.value.slice(0, 10)
    }
    saveToStorage()
  }

  function clearRecentSearches() {
    recentSearches.value = []
    saveToStorage()
  }

  function resetProfile() {
    profile.value = {
      nama: '',
      email: '',
      telepon: '',
      alamat: '',
      foto: null,
    }
    saveToStorage()
  }

  function exportData() {
    return JSON.stringify({
      profile: profile.value,
      privacy: privacy.value,
      appearance: appearance.value,
      recentSearches: recentSearches.value,
    }, null, 2)
  }

  function deleteAccount() {
    // Clear all data
    profile.value = { nama: '', email: '', telepon: '', alamat: '', foto: null }
    privacy.value = { tampilkanNama: false, izinkanLihatReview: true, subscribeNewsletter: true }
    appearance.value = { tema: 'auto', bahasa: 'id', ukuranFont: 'normal' }
    recentSearches.value = []
    onboardingCompleted.value = false
    localStorage.removeItem('user-store')
    applyAppearance()
  }

  // Persistence
  function saveToStorage() {
    localStorage.setItem('user-store', JSON.stringify({
      profile: profile.value,
      privacy: privacy.value,
      appearance: appearance.value,
      recentSearches: recentSearches.value,
      onboardingCompleted: onboardingCompleted.value,
    }))
  }

  function loadFromStorage() {
    const saved = localStorage.getItem('user-store')
    if (saved) {
      const data = JSON.parse(saved)
      if (data.profile) profile.value = data.profile
      if (data.privacy) privacy.value = data.privacy
      if (data.appearance) appearance.value = data.appearance
      if (data.recentSearches) recentSearches.value = data.recentSearches
      if (data.onboardingCompleted) onboardingCompleted.value = data.onboardingCompleted
    }
  }

  // Initialize
  loadFromStorage()
  applyAppearance()

  return {
    profile,
    privacy,
    appearance,
    onboardingCompleted,
    recentSearches,
    isProfileComplete,
    displayName,
    updateProfile,
    updatePrivacy,
    updateAppearance,
    completeOnboarding,
    addRecentSearch,
    clearRecentSearches,
    resetProfile,
    exportData,
    deleteAccount,
  }
})
