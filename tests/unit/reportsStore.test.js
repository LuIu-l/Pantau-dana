import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useReportsStore } from '@/stores/reports'
import { storage } from '@/services/storage.js'

// Mock dependencies
vi.mock('@/services/storage.js', () => ({
  storage: {
    getReports: vi.fn(),
    addReport: vi.fn(),
    updateReport: vi.fn(),
    deleteReport: vi.fn()
  }
}))

vi.mock('@/data/mockData.js', () => ({
  generateTicketCode: vi.fn(() => 'LPR-MOCK-123456')
}))

describe('useReportsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('loadReports fetches data from storage', async () => {
    const store = useReportsStore()
    const mockReports = [{ kode_tiket: 'LPR-2024-123456', status: 'pending' }]
    storage.getReports.mockResolvedValueOnce(mockReports)
    
    await store.loadReports()
    
    expect(storage.getReports).toHaveBeenCalled()
    expect(store.reports).toEqual(mockReports)
  })

  it('addReport formats data correctly and calls storage', async () => {
    const store = useReportsStore()
    const reportData = { kategori: 'pungli', lokasi: 'Desa A', deskripsi: 'Pungli' }
    
    await store.addReport(reportData)
    
    expect(storage.addReport).toHaveBeenCalled()
    expect(store.reports.length).toBe(1)
    expect(store.reports[0].kategori).toBe('pungli')
    expect(store.reports[0].kode_tiket).toBe('LPR-MOCK-123456')
    expect(store.reports[0]).toHaveProperty('tanggal')
  })

  it('deleteReport removes from store and calls storage.deleteReport with kode_tiket', async () => {
    const store = useReportsStore()
    // Setup initial state
    store.reports = [{ kode_tiket: 'TKT-123', status: 'pending' }]
    
    await store.deleteReport('TKT-123')
    
    expect(storage.deleteReport).toHaveBeenCalledWith('TKT-123')
    expect(store.reports.length).toBe(0)
  })

  it('findReportByTicket finds report case-insensitively', () => {
    const store = useReportsStore()
    store.reports = [{ kode_tiket: 'TKT-abc', status: 'pending' }]
    
    const found = store.findReportByTicket('tkt-ABC')
    expect(found).toBeTruthy()
    expect(found.kode_tiket).toBe('TKT-abc')
  })
})
