import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  // State
  const notifications = ref([])
  const settings = ref({
    email: true,
    push: true,
    sms: false,
    updateDesa: true,
    statusLaporan: true,
    trending: false,
    newsletter: true,
  })

  // Computed
  const unreadCount = computed(() => 
    notifications.value.filter(n => !n.read).length
  )

  const sortedNotifications = computed(() =>
    [...notifications.value].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )
  )

  // Actions
  function addNotification(notification) {
    notifications.value.unshift({
      id: Date.now(),
      ...notification,
      read: false,
      timestamp: new Date().toISOString(),
    })
  }

  function markAsRead(id) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => {
      n.read = true
    })
  }

  function removeNotification(id) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function clearAll() {
    notifications.value = []
  }

  function updateSettings(newSettings) {
    settings.value = { ...settings.value, ...newSettings }
    saveToStorage()
  }

  // Persistence
  function saveToStorage() {
    localStorage.setItem('notification-settings', JSON.stringify(settings.value))
  }

  function loadFromStorage() {
    const saved = localStorage.getItem('notification-settings')
    if (saved) {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    }
  }

  // Initialize
  loadFromStorage()

  return {
    notifications,
    settings,
    unreadCount,
    sortedNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    updateSettings,
  }
})
