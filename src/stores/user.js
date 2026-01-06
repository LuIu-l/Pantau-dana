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
      if (data.recentSearches) recentSearches.value = data.recentSearches
      if (data.onboardingCompleted) onboardingCompleted.value = data.onboardingCompleted
    }
  }

  // Initialize
  loadFromStorage()
  // Force light theme
  document.documentElement.removeAttribute('data-theme')
  localStorage.setItem('theme', 'light')

  return {
    profile,
    privacy,
    onboardingCompleted,
    recentSearches,
    isProfileComplete,
    displayName,
    updateProfile,
    updatePrivacy,
    completeOnboarding,
    addRecentSearch,
    clearRecentSearches,
    resetProfile,
    exportData,
    deleteAccount,
  }
})
