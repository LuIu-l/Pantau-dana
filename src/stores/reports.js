import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storage } from '@/services/storage.js'
import { generateTicketCode } from '@/data/mockData.js'

export const useReportStore = defineStore('reports', () => {
  // State
  const reports = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const totalReports = computed(() => reports.value.length)
  
  const reportsByStatus = computed(() => {
    return {
      pending: reports.value.filter(r => r.status === 'pending'),
      processing: reports.value.filter(r => r.status === 'processing'),
      resolved: reports.value.filter(r => r.status === 'resolved'),
      rejected: reports.value.filter(r => r.status === 'rejected')
    }
  })

  const getReportByTicket = computed(() => {
    return (ticketCode) => reports.value.find(r => r.ticketCode === ticketCode)
  })

  // Actions
  async function loadReports() {
    isLoading.value = true
    error.value = null
    try {
      const storedReports = await storage.getReports()
      reports.value = storedReports
    } catch (err) {
      error.value = 'Gagal memuat laporan'
      console.error('Failed to load reports:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function addReport(reportData) {
    isLoading.value = true
    error.value = null
    try {
      const newReport = {
        ...reportData,
        id: Date.now().toString(),
        ticketCode: generateTicketCode(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          {
            status: 'pending',
            message: 'Laporan berhasil dikirim',
            timestamp: new Date().toISOString()
          }
        ]
      }
      
      await storage.addReport(newReport)
      reports.value.push(newReport)
      
      return newReport
    } catch (err) {
      error.value = 'Gagal mengirim laporan'
      console.error('Failed to add report:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateReportStatus(ticketCode, status, message) {
    const report = reports.value.find(r => r.ticketCode === ticketCode)
    if (!report) {
      throw new Error('Laporan tidak ditemukan')
    }

    report.status = status
    report.updatedAt = new Date().toISOString()
    report.timeline.push({
      status,
      message,
      timestamp: new Date().toISOString()
    })

    await storage.updateReport(report)
    return report
  }

  async function deleteReport(ticketCode) {
    const index = reports.value.findIndex(r => r.ticketCode === ticketCode)
    if (index === -1) {
      throw new Error('Laporan tidak ditemukan')
    }

    await storage.deleteReport(reports.value[index].id)
    reports.value.splice(index, 1)
  }

  function findReportByTicket(ticketCode) {
    return reports.value.find(r => 
      r.ticketCode.toLowerCase() === ticketCode.toLowerCase()
    )
  }

  return {
    // State
    reports,
    isLoading,
    error,
    // Getters
    totalReports,
    reportsByStatus,
    getReportByTicket,
    // Actions
    loadReports,
    addReport,
    updateReportStatus,
    deleteReport,
    findReportByTicket
  }
})

// Alias untuk backward compatibility
export const useReportsStore = useReportStore
