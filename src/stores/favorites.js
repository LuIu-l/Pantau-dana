import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storage } from '@/services/storage.js'

export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const favorites = ref([])
  const isLoading = ref(false)

  // Getters
  const totalFavorites = computed(() => favorites.value.length)
  
  const isFavorite = computed(() => {
    return (desaId) => favorites.value.some(f => f.desaId === desaId)
  })

  const favoritesByProvince = computed(() => {
    const grouped = {}
    favorites.value.forEach(fav => {
      const province = fav.province || 'Lainnya'
      if (!grouped[province]) {
        grouped[province] = []
      }
      grouped[province].push(fav)
    })
    return grouped
  })

  // Actions
  async function loadFavorites() {
    isLoading.value = true
    try {
      const storedFavorites = await storage.getFavorites()
      favorites.value = storedFavorites
    } catch (err) {
      console.error('Failed to load favorites:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function addFavorite(desa) {
    if (isFavorite.value(desa.id)) {
      return // Already favorited
    }

    const favorite = {
      id: Date.now().toString(),
      desaId: desa.id,
      name: desa.nama,
      province: desa.provinsi,
      regency: desa.kabupaten,
      district: desa.kecamatan,
      addedAt: new Date().toISOString()
    }

    await storage.addFavorite(favorite)
    favorites.value.push(favorite)
    return favorite
  }

  async function removeFavorite(desaId) {
    const index = favorites.value.findIndex(f => f.desaId === desaId)
    if (index === -1) return

    const favorite = favorites.value[index]
    await storage.removeFavorite(favorite.id)
    favorites.value.splice(index, 1)
  }

  async function toggleFavorite(desa) {
    if (isFavorite.value(desa.id)) {
      await removeFavorite(desa.id)
      return false
    } else {
      await addFavorite(desa)
      return true
    }
  }

  async function clearAllFavorites() {
    for (const fav of favorites.value) {
      await storage.removeFavorite(fav.id)
    }
    favorites.value = []
  }

  return {
    // State
    favorites,
    isLoading,
    // Getters
    totalFavorites,
    isFavorite,
    favoritesByProvince,
    // Actions
    loadFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearAllFavorites
  }
})
