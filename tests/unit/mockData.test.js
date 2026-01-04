import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  formatRupiah,
  formatTanggal,
  getStatusLabel,
  generateTicketCode,
  maskName,
  searchBansos
} from '@/data/mockData.js'

describe('MockData Helper Functions', () => {
  describe('formatRupiah', () => {
    it('should format number to Indonesian Rupiah', () => {
      const result = formatRupiah(1000000)
      expect(result).toContain('Rp')
      expect(result).toContain('1.000.000')
    })

    it('should handle zero', () => {
      const result = formatRupiah(0)
      expect(result).toContain('Rp')
      expect(result).toContain('0')
    })

    it('should handle large numbers', () => {
      const result = formatRupiah(1500000000)
      expect(result).toContain('1.500.000.000')
    })
  })

  describe('formatTanggal', () => {
    it('should format date to Indonesian format', () => {
      const result = formatTanggal('2024-08-15')
      expect(result).toContain('15')
      expect(result).toContain('2024')
      // Should contain Indonesian month name
      expect(result).toMatch(/Agustus|Agst/i)
    })
  })

  describe('getStatusLabel', () => {
    it('should return correct label for selesai', () => {
      const result = getStatusLabel('selesai')
      expect(result.label).toBe('Selesai')
      expect(result.color).toBe('success')
    })

    it('should return correct label for sedang_berjalan', () => {
      const result = getStatusLabel('sedang_berjalan')
      expect(result.label).toBe('Sedang Dikerjakan')
      expect(result.color).toBe('warning')
    })

    it('should return correct label for belum_mulai', () => {
      const result = getStatusLabel('belum_mulai')
      expect(result.label).toBe('Belum Dimulai')
      expect(result.color).toBe('danger')
    })

    it('should return correct label for aktif', () => {
      const result = getStatusLabel('aktif')
      expect(result.label).toBe('Penerima Aktif')
      expect(result.color).toBe('success')
    })

    it('should return default for unknown status', () => {
      const result = getStatusLabel('unknown_status')
      expect(result.label).toBe('unknown_status')
      expect(result.color).toBe('info')
    })
  })

  describe('generateTicketCode', () => {
    it('should generate ticket code with correct format', () => {
      const code = generateTicketCode()
      expect(code).toMatch(/^LPR-\d{4}-\d{6}$/)
    })

    it('should include current year', () => {
      const code = generateTicketCode()
      const currentYear = new Date().getFullYear().toString()
      expect(code).toContain(currentYear)
    })

    it('should generate unique codes', () => {
      const codes = new Set()
      for (let i = 0; i < 100; i++) {
        codes.add(generateTicketCode())
      }
      // Most codes should be unique (allowing for some random collision)
      expect(codes.size).toBeGreaterThan(95)
    })
  })

  describe('maskName', () => {
    it('should mask name with multiple words', () => {
      const result = maskName('Budi Santoso')
      expect(result).toBe('Budi S****')
    })

    it('should handle single word names', () => {
      const result = maskName('John')
      expect(result).toBe('John****')
    })

    it('should handle short names', () => {
      const result = maskName('AB')
      expect(result).toBe('****')
    })

    it('should handle empty or null names', () => {
      expect(maskName('')).toBe('****')
      expect(maskName(null)).toBe('****')
      expect(maskName(undefined)).toBe('****')
    })
  })

  describe('searchBansos', () => {
    it('should return empty array for empty search', () => {
      const result = searchBansos('', '3404012001')
      expect(result).toEqual([])
    })

    it('should return empty array for invalid desa', () => {
      const result = searchBansos('Budi', 'invalid_desa')
      expect(result).toEqual([])
    })

    it('should find matching names', () => {
      const result = searchBansos('Budi', '3404012001')
      expect(result.length).toBeGreaterThan(0)
      expect(result[0].nama_masked).toContain('Budi')
    })

    it('should perform case-insensitive search', () => {
      const result1 = searchBansos('BUDI', '3404012001')
      const result2 = searchBansos('budi', '3404012001')
      expect(result1.length).toBe(result2.length)
    })
  })
})
