import { describe, it, expect } from 'vitest'
import {
  sanitizeInput,
  validationRules,
  validateForm,
  validateFile,
  validateFiles,
  validateTicketCode,
  RateLimiter
} from '@/utils/validation.js'

describe('Validation Utils', () => {
  describe('sanitizeInput', () => {
    it('should sanitize HTML tags', () => {
      const input = '<script>alert("xss")</script>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('<script>')
      expect(result).toContain('&lt;script&gt;')
    })

    it('should sanitize special characters', () => {
      const input = '"><img src=x onerror=alert(1)>'
      const result = sanitizeInput(input)
      expect(result).not.toContain('">')
      expect(result).toContain('&quot;&gt;')
    })

    it('should trim whitespace', () => {
      const input = '  hello world  '
      const result = sanitizeInput(input)
      expect(result).toBe('hello world')
    })

    it('should handle non-string input', () => {
      expect(sanitizeInput(123)).toBe(123)
      expect(sanitizeInput(null)).toBe(null)
      expect(sanitizeInput(undefined)).toBe(undefined)
    })
  })

  describe('validationRules', () => {
    describe('required', () => {
      it('should return error for empty value', () => {
        expect(validationRules.required('', 'Nama')).toBe('Nama wajib diisi')
        expect(validationRules.required(null, 'Nama')).toBe('Nama wajib diisi')
        expect(validationRules.required('   ', 'Nama')).toBe('Nama wajib diisi')
      })

      it('should return null for valid value', () => {
        expect(validationRules.required('John', 'Nama')).toBeNull()
      })
    })

    describe('minLength', () => {
      it('should return error when value is too short', () => {
        const validator = validationRules.minLength(5)
        expect(validator('abc', 'Deskripsi')).toBe('Deskripsi minimal 5 karakter')
      })

      it('should return null when value meets minimum', () => {
        const validator = validationRules.minLength(5)
        expect(validator('abcdef', 'Deskripsi')).toBeNull()
      })
    })

    describe('maxLength', () => {
      it('should return error when value is too long', () => {
        const validator = validationRules.maxLength(5)
        expect(validator('abcdefgh', 'Nama')).toBe('Nama maksimal 5 karakter')
      })

      it('should return null when value is within limit', () => {
        const validator = validationRules.maxLength(5)
        expect(validator('abc', 'Nama')).toBeNull()
      })
    })

    describe('email', () => {
      it('should return error for invalid email', () => {
        expect(validationRules.email('invalid')).toBe('Format email tidak valid')
        expect(validationRules.email('invalid@')).toBe('Format email tidak valid')
        expect(validationRules.email('@domain.com')).toBe('Format email tidak valid')
      })

      it('should return null for valid email', () => {
        expect(validationRules.email('test@example.com')).toBeNull()
        expect(validationRules.email('user.name@domain.co.id')).toBeNull()
      })
    })

    describe('phone', () => {
      it('should return error for invalid phone', () => {
        expect(validationRules.phone('12345')).toBe('Format nomor telepon tidak valid')
        expect(validationRules.phone('abcdefgh')).toBe('Format nomor telepon tidak valid')
      })

      it('should return null for valid Indonesian phone', () => {
        expect(validationRules.phone('08123456789')).toBeNull()
        expect(validationRules.phone('+6281234567890')).toBeNull()
        expect(validationRules.phone('6281234567890')).toBeNull()
      })
    })

    describe('nik', () => {
      it('should return error for invalid NIK', () => {
        expect(validationRules.nik('123')).toBe('NIK harus 16 digit angka')
        expect(validationRules.nik('12345678901234567')).toBe('NIK harus 16 digit angka')
        expect(validationRules.nik('123456789012345a')).toBe('NIK harus 16 digit angka')
      })

      it('should return null for valid NIK', () => {
        expect(validationRules.nik('1234567890123456')).toBeNull()
      })
    })
  })

  describe('validateForm', () => {
    it('should validate form with multiple rules', () => {
      const data = {
        nama: '',
        email: 'invalid',
        deskripsi: 'abc'
      }

      const rules = {
        nama: {
          label: 'Nama',
          rules: [validationRules.required]
        },
        email: {
          label: 'Email',
          rules: [validationRules.required, validationRules.email]
        },
        deskripsi: {
          label: 'Deskripsi',
          rules: [validationRules.required, validationRules.minLength(10)]
        }
      }

      const result = validateForm(data, rules)
      
      expect(result.isValid).toBe(false)
      expect(result.errors.nama).toBe('Nama wajib diisi')
      expect(result.errors.email).toBe('Format email tidak valid')
      expect(result.errors.deskripsi).toBe('Deskripsi minimal 10 karakter')
    })

    it('should return valid for correct data', () => {
      const data = {
        nama: 'John Doe',
        email: 'john@example.com'
      }

      const rules = {
        nama: {
          label: 'Nama',
          rules: [validationRules.required]
        },
        email: {
          label: 'Email',
          rules: [validationRules.required, validationRules.email]
        }
      }

      const result = validateForm(data, rules)
      
      expect(result.isValid).toBe(true)
      expect(Object.keys(result.errors)).toHaveLength(0)
    })
  })

  describe('validateFile', () => {
    it('should reject invalid file type', () => {
      const file = { type: 'application/pdf', size: 1000, name: 'test.pdf' }
      const result = validateFile(file)
      
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Format file tidak didukung')
    })

    it('should reject file that is too large', () => {
      const file = { type: 'image/jpeg', size: 10 * 1024 * 1024, name: 'large.jpg' }
      const result = validateFile(file)
      
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Ukuran file terlalu besar')
    })

    it('should reject suspicious file names', () => {
      const file = { type: 'image/jpeg', size: 1000, name: 'malware.exe' }
      const result = validateFile(file)
      
      expect(result.isValid).toBe(false)
      expect(result.error).toContain('Tipe file tidak diizinkan')
    })

    it('should accept valid image file', () => {
      const file = { type: 'image/jpeg', size: 1000, name: 'photo.jpg' }
      const result = validateFile(file)
      
      expect(result.isValid).toBe(true)
      expect(result.error).toBeNull()
    })
  })

  describe('validateFiles', () => {
    it('should reject when too many files', () => {
      const files = Array(10).fill({ type: 'image/jpeg', size: 1000, name: 'photo.jpg' })
      const result = validateFiles(files, { maxFiles: 5 })
      
      expect(result.isValid).toBe(false)
      expect(result.errors[0]).toContain('Maksimal 5 file')
    })

    it('should return valid files and errors separately', () => {
      const files = [
        { type: 'image/jpeg', size: 1000, name: 'valid.jpg' },
        { type: 'application/pdf', size: 1000, name: 'invalid.pdf' }
      ]
      const result = validateFiles(files)
      
      expect(result.validFiles).toHaveLength(1)
      expect(result.errors).toHaveLength(1)
    })
  })

  describe('validateTicketCode', () => {
    it('should return false for invalid codes', () => {
      expect(validateTicketCode('LPR-2024')).toBe(false)
      expect(validateTicketCode('LPR-24-123456')).toBe(false)
      expect(validateTicketCode('ABC-2024-123456')).toBe(false)
      expect(validateTicketCode('LPR-2024-12345')).toBe(false)
    })

    it('should return true for valid codes', () => {
      expect(validateTicketCode('LPR-2024-123456')).toBe(true)
      expect(validateTicketCode('LPR-2025-999999')).toBe(true)
    })
  })

  describe('RateLimiter', () => {
    it('should allow requests within limit', () => {
      const limiter = new RateLimiter(3, 1000)
      
      expect(limiter.canMakeRequest()).toBe(true)
      expect(limiter.canMakeRequest()).toBe(true)
      expect(limiter.canMakeRequest()).toBe(true)
    })

    it('should block requests over limit', () => {
      const limiter = new RateLimiter(2, 1000)
      
      limiter.canMakeRequest()
      limiter.canMakeRequest()
      
      expect(limiter.canMakeRequest()).toBe(false)
    })

    it('should return time until reset', () => {
      const limiter = new RateLimiter(1, 1000)
      limiter.canMakeRequest()
      
      const timeUntilReset = limiter.getTimeUntilReset()
      expect(timeUntilReset).toBeGreaterThan(0)
      expect(timeUntilReset).toBeLessThanOrEqual(1000)
    })
  })
})
