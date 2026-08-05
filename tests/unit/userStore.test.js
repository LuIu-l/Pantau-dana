import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

// ── localStorage mock (sudah ada di tests/setup.js, tapi kita buat lokal
//    agar setiap test dimulai dengan state bersih) ──────────────────────
const storage = {}
const localStorageMock = {
  getItem: vi.fn((key) => storage[key] ?? null),
  setItem: vi.fn((key, value) => { storage[key] = value }),
  removeItem: vi.fn((key) => { delete storage[key] }),
  clear: vi.fn(() => { Object.keys(storage).forEach(k => delete storage[k]) }),
}
Object.defineProperty(global, 'localStorage', { value: localStorageMock, writable: true })

// ── Import store setelah mock siap ────────────────────────────────────
import { useUserStore } from '@/stores/user'

// ─────────────────────────────────────────────────────────────────────

describe('useUserStore — exportData/deleteAccount', () => {
  beforeEach(() => {
    // Reset semua mock dan storage sebelum setiap test
    vi.clearAllMocks()
    Object.keys(storage).forEach(k => delete storage[k])
    localStorageMock.getItem.mockImplementation((key) => storage[key] ?? null)

    // Pinia fresh instance per test
    setActivePinia(createPinia())
  })

  // ── 1. exportData() tidak melempar ReferenceError ────────────────────
  it('exportData() berjalan tanpa ReferenceError', () => {
    const store = useUserStore()
    expect(() => store.exportData()).not.toThrow()
  })

  // ── 2. exportData() menyertakan semua field yang diharapkan ──────────
  it('exportData() mengembalikan JSON valid', () => {
    const store = useUserStore()
    const raw = store.exportData()

    let parsed
    expect(() => { parsed = JSON.parse(raw) }).not.toThrow()

    expect(parsed).toHaveProperty('profile')
    expect(parsed).toHaveProperty('privacy')
    expect(parsed).toHaveProperty('recentSearches')
  })

  // ── 3. deleteAccount() tidak melempar ReferenceError ────────────────
  it('deleteAccount() berjalan tanpa ReferenceError', () => {
    const store = useUserStore()
    store.updateProfile({ nama: 'Budi', email: 'budi@test.com' })
    expect(() => store.deleteAccount()).not.toThrow()
  })

  // ── 4. deleteAccount() me-reset semua state ────────────────────
  it('deleteAccount() me-reset profile, privacy, dan recentSearches ke default', () => {
    const store = useUserStore()

    store.updateProfile({ nama: 'Sari', email: 'sari@test.com', telepon: '0812' })
    store.addRecentSearch({ id: 'desa-1', nama: 'Desa Maju' })
    store.updatePrivacy({ tampilkanNama: true })

    store.deleteAccount()

    expect(store.profile.nama).toBe('')
    expect(store.profile.email).toBe('')
    expect(store.recentSearches).toHaveLength(0)
    expect(store.privacy.tampilkanNama).toBe(false)
    expect(store.onboardingCompleted).toBe(false)
  })

  // ── 5. deleteAccount() menghapus key dari localStorage ──────────────
  it('deleteAccount() memanggil localStorage.removeItem("user-store")', () => {
    const store = useUserStore()
    store.deleteAccount()
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user-store')
  })
})
