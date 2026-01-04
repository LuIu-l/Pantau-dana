import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { storage } from '@/services/storage.js'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const settings = ref({
    theme: 'light',
    language: 'id',
    notifications: true,
    autoSave: true,
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false
  })
  const isLoading = ref(false)

  // Getters
  const isDarkTheme = computed(() => settings.value.theme === 'dark')
  const isNotificationsEnabled = computed(() => settings.value.notifications)

  // Actions
  async function loadSettings() {
    isLoading.value = true
    try {
      const storedSettings = await storage.getSettings()
      if (storedSettings) {
        settings.value = { ...settings.value, ...storedSettings }
      }
      applyTheme()
      applyAccessibilitySettings()
    } catch (err) {
      console.error('Failed to load settings:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function saveSettings() {
    try {
      await storage.saveSettings(settings.value)
    } catch (err) {
      console.error('Failed to save settings:', err)
    }
  }

  async function updateSetting(key, value) {
    settings.value[key] = value
    await saveSettings()

    // Apply theme changes immediately
    if (key === 'theme') {
      applyTheme()
    }
    
    // Apply accessibility changes immediately
    if (['reducedMotion', 'highContrast', 'fontSize'].includes(key)) {
      applyAccessibilitySettings()
    }
  }

  function applyTheme() {
    const root = document.documentElement
    if (settings.value.theme === 'dark') {
      root.classList.add('dark-theme')
    } else if (settings.value.theme === 'light') {
      root.classList.remove('dark-theme')
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark-theme', prefersDark)
    }
  }

  function applyAccessibilitySettings() {
    const root = document.documentElement
    
    // Reduced motion
    root.classList.toggle('reduced-motion', settings.value.reducedMotion)
    
    // High contrast
    root.classList.toggle('high-contrast', settings.value.highContrast)
    
    // Font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    }
    root.style.setProperty('--base-font-size', fontSizeMap[settings.value.fontSize] || '16px')
  }

  function toggleTheme() {
    const newTheme = settings.value.theme === 'dark' ? 'light' : 'dark'
    updateSetting('theme', newTheme)
  }

  async function resetSettings() {
    settings.value = {
      theme: 'light',
      language: 'id',
      notifications: true,
      autoSave: true,
      fontSize: 'medium',
      reducedMotion: false,
      highContrast: false
    }
    await saveSettings()
    applyTheme()
    applyAccessibilitySettings()
  }

  // Watch for system theme changes
  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (settings.value.theme === 'system') {
        applyTheme()
      }
    })
  }

  return {
    // State
    settings,
    isLoading,
    // Getters
    isDarkTheme,
    isNotificationsEnabled,
    // Actions
    loadSettings,
    saveSettings,
    updateSetting,
    toggleTheme,
    resetSettings,
    applyTheme,
    applyAccessibilitySettings
  }
})
