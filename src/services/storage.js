// ===== STORAGE SERVICE =====
// IndexedDB wrapper untuk storage yang lebih scalable dan persistent

const DB_NAME = 'pantau-desa-db'
const DB_VERSION = 1

const STORES = {
  REPORTS: 'reports',
  FAVORITES: 'favorites',
  CACHE: 'cache',
  SETTINGS: 'settings'
}

/**
 * Initialize IndexedDB
 * @returns {Promise<IDBDatabase>}
 */
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => {
      console.error('Failed to open database:', request.error)
      reject(request.error)
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      // Reports store - untuk menyimpan laporan
      if (!db.objectStoreNames.contains(STORES.REPORTS)) {
        const reportStore = db.createObjectStore(STORES.REPORTS, { keyPath: 'kode_tiket' })
        reportStore.createIndex('tanggal', 'tanggal', { unique: false })
        reportStore.createIndex('status', 'status', { unique: false })
        reportStore.createIndex('kategori', 'kategori', { unique: false })
      }

      // Favorites store - untuk desa favorit
      if (!db.objectStoreNames.contains(STORES.FAVORITES)) {
        const favStore = db.createObjectStore(STORES.FAVORITES, { keyPath: 'desaId' })
        favStore.createIndex('addedAt', 'addedAt', { unique: false })
      }

      // Cache store - untuk cache data
      if (!db.objectStoreNames.contains(STORES.CACHE)) {
        const cacheStore = db.createObjectStore(STORES.CACHE, { keyPath: 'key' })
        cacheStore.createIndex('expiry', 'expiry', { unique: false })
      }

      // Settings store - untuk user settings
      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' })
      }
    }
  })
}

/**
 * Generic CRUD operations
 */
class StorageService {
  constructor() {
    this.db = null
    this.isSupported = 'indexedDB' in window
  }

  async init() {
    if (!this.isSupported) {
      console.warn('IndexedDB not supported, falling back to localStorage')
      return false
    }

    try {
      this.db = await openDatabase()
      await this.migrateFromLocalStorage()
      return true
    } catch (error) {
      console.error('Failed to initialize storage:', error)
      return false
    }
  }

  /**
   * Migrate existing localStorage data to IndexedDB
   */
  async migrateFromLocalStorage() {
    try {
      // Migrate reports
      const reports = localStorage.getItem('reports')
      if (reports) {
        const parsedReports = JSON.parse(reports)
        for (const report of parsedReports) {
          await this.addReport(report)
        }
        localStorage.removeItem('reports')
        console.log('Migrated reports from localStorage to IndexedDB')
      }
    } catch (error) {
      console.error('Migration failed:', error)
    }
  }

  // ===== REPORTS OPERATIONS =====

  async addReport(report) {
    if (!this.db) {
      return this.fallbackAdd('reports', report, report.kode_tiket)
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.REPORTS], 'readwrite')
      const store = transaction.objectStore(STORES.REPORTS)
      
      const request = store.put({
        ...report,
        updatedAt: new Date().toISOString()
      })

      request.onsuccess = () => resolve(report)
      request.onerror = () => reject(request.error)
    })
  }

  async getReport(kode_tiket) {
    if (!this.db) {
      return this.fallbackGet('reports', kode_tiket)
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.REPORTS], 'readonly')
      const store = transaction.objectStore(STORES.REPORTS)
      const request = store.get(kode_tiket)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllReports() {
    if (!this.db) {
      return this.fallbackGetAll('reports')
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.REPORTS], 'readonly')
      const store = transaction.objectStore(STORES.REPORTS)
      const request = store.getAll()

      request.onsuccess = () => {
        // Sort by date descending
        const reports = request.result.sort((a, b) => 
          new Date(b.tanggal) - new Date(a.tanggal)
        )
        resolve(reports)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async updateReportStatus(kode_tiket, status) {
    const report = await this.getReport(kode_tiket)
    if (!report) return null
    
    report.status = status
    report.updatedAt = new Date().toISOString()
    
    return this.addReport(report)
  }

  async deleteReport(kode_tiket) {
    if (!this.db) {
      return this.fallbackDelete('reports', kode_tiket)
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.REPORTS], 'readwrite')
      const store = transaction.objectStore(STORES.REPORTS)
      const request = store.delete(kode_tiket)

      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(request.error)
    })
  }

  // ===== FAVORITES OPERATIONS =====

  async addFavorite(desaId, desaData) {
    if (!this.db) {
      return this.fallbackAdd('favorites', { desaId, ...desaData, addedAt: new Date().toISOString() }, desaId)
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.FAVORITES], 'readwrite')
      const store = transaction.objectStore(STORES.FAVORITES)
      
      const favorite = {
        desaId,
        ...desaData,
        addedAt: new Date().toISOString()
      }
      
      const request = store.put(favorite)
      request.onsuccess = () => resolve(favorite)
      request.onerror = () => reject(request.error)
    })
  }

  async removeFavorite(desaId) {
    if (!this.db) {
      return this.fallbackDelete('favorites', desaId)
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.FAVORITES], 'readwrite')
      const store = transaction.objectStore(STORES.FAVORITES)
      const request = store.delete(desaId)

      request.onsuccess = () => resolve(true)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllFavorites() {
    if (!this.db) {
      return this.fallbackGetAll('favorites')
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.FAVORITES], 'readonly')
      const store = transaction.objectStore(STORES.FAVORITES)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async isFavorite(desaId) {
    const favorites = await this.getAllFavorites()
    return favorites.some(f => f.desaId === desaId)
  }

  // ===== CACHE OPERATIONS =====

  async setCache(key, data, ttlMinutes = 60) {
    const cacheItem = {
      key,
      data,
      expiry: Date.now() + (ttlMinutes * 60 * 1000),
      createdAt: new Date().toISOString()
    }

    if (!this.db) {
      localStorage.setItem(`cache_${key}`, JSON.stringify(cacheItem))
      return cacheItem
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.CACHE], 'readwrite')
      const store = transaction.objectStore(STORES.CACHE)
      const request = store.put(cacheItem)

      request.onsuccess = () => resolve(cacheItem)
      request.onerror = () => reject(request.error)
    })
  }

  async getCache(key) {
    if (!this.db) {
      const item = localStorage.getItem(`cache_${key}`)
      if (!item) return null
      const parsed = JSON.parse(item)
      if (Date.now() > parsed.expiry) {
        localStorage.removeItem(`cache_${key}`)
        return null
      }
      return parsed.data
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.CACHE], 'readonly')
      const store = transaction.objectStore(STORES.CACHE)
      const request = store.get(key)

      request.onsuccess = () => {
        const result = request.result
        if (!result || Date.now() > result.expiry) {
          resolve(null)
        } else {
          resolve(result.data)
        }
      }
      request.onerror = () => reject(request.error)
    })
  }

  async clearExpiredCache() {
    if (!this.db) return

    const transaction = this.db.transaction([STORES.CACHE], 'readwrite')
    const store = transaction.objectStore(STORES.CACHE)
    const index = store.index('expiry')
    const range = IDBKeyRange.upperBound(Date.now())
    
    index.openCursor(range).onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        cursor.delete()
        cursor.continue()
      }
    }
  }

  // ===== SETTINGS OPERATIONS =====

  async setSetting(key, value) {
    if (!this.db) {
      localStorage.setItem(`setting_${key}`, JSON.stringify(value))
      return value
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.SETTINGS], 'readwrite')
      const store = transaction.objectStore(STORES.SETTINGS)
      const request = store.put({ key, value, updatedAt: new Date().toISOString() })

      request.onsuccess = () => resolve(value)
      request.onerror = () => reject(request.error)
    })
  }

  async getSetting(key, defaultValue = null) {
    if (!this.db) {
      const item = localStorage.getItem(`setting_${key}`)
      return item ? JSON.parse(item) : defaultValue
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORES.SETTINGS], 'readonly')
      const store = transaction.objectStore(STORES.SETTINGS)
      const request = store.get(key)

      request.onsuccess = () => {
        resolve(request.result?.value ?? defaultValue)
      }
      request.onerror = () => reject(request.error)
    })
  }

  // ===== FALLBACK METHODS (localStorage) =====

  fallbackAdd(storeName, data, key) {
    const store = JSON.parse(localStorage.getItem(storeName) || '[]')
    const existingIndex = store.findIndex(item => 
      item.kode_tiket === key || item.desaId === key
    )
    
    if (existingIndex >= 0) {
      store[existingIndex] = data
    } else {
      store.push(data)
    }
    
    localStorage.setItem(storeName, JSON.stringify(store))
    return data
  }

  fallbackGet(storeName, key) {
    const store = JSON.parse(localStorage.getItem(storeName) || '[]')
    return store.find(item => item.kode_tiket === key || item.desaId === key) || null
  }

  fallbackGetAll(storeName) {
    return JSON.parse(localStorage.getItem(storeName) || '[]')
  }

  fallbackDelete(storeName, key) {
    const store = JSON.parse(localStorage.getItem(storeName) || '[]')
    const filtered = store.filter(item => 
      item.kode_tiket !== key && item.desaId !== key
    )
    localStorage.setItem(storeName, JSON.stringify(filtered))
    return true
  }

  // ===== UTILITY METHODS =====

  async clearAllData() {
    if (this.db) {
      const storeNames = Object.values(STORES)
      const transaction = this.db.transaction(storeNames, 'readwrite')
      
      for (const storeName of storeNames) {
        transaction.objectStore(storeName).clear()
      }
    }
    
    // Clear localStorage too
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('cache_') || key.startsWith('setting_') || 
          key === 'reports' || key === 'favorites') {
        localStorage.removeItem(key)
      }
    })
  }

  async getStorageSize() {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate()
      return {
        usage: estimate.usage,
        quota: estimate.quota,
        percentUsed: ((estimate.usage / estimate.quota) * 100).toFixed(2)
      }
    }
    return null
  }
}

// Export singleton instance
export const storage = new StorageService()
export default storage
