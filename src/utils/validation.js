// ===== VALIDATION UTILITIES =====
// Input validation dan sanitization untuk keamanan

/**
 * Sanitize string untuk mencegah XSS attacks
 * @param {string} input - Input yang akan di-sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Validation rules untuk berbagai field types
 */
export const validationRules = {
  required: (value, fieldName = 'Field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} wajib diisi`
    }
    return null
  },

  minLength: (min) => (value, fieldName = 'Field') => {
    if (value && value.length < min) {
      return `${fieldName} minimal ${min} karakter`
    }
    return null
  },

  maxLength: (max) => (value, fieldName = 'Field') => {
    if (value && value.length > max) {
      return `${fieldName} maksimal ${max} karakter`
    }
    return null
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      return 'Format email tidak valid'
    }
    return null
  },

  phone: (value) => {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/
    if (value && !phoneRegex.test(value.replace(/[\s-]/g, ''))) {
      return 'Format nomor telepon tidak valid'
    }
    return null
  },

  nik: (value) => {
    const nikRegex = /^[0-9]{16}$/
    if (value && !nikRegex.test(value)) {
      return 'NIK harus 16 digit angka'
    }
    return null
  }
}

/**
 * Validate form data dengan multiple rules
 * @param {Object} data - Form data object
 * @param {Object} rules - Validation rules per field
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateForm(data, rules) {
  const errors = {}
  let isValid = true

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field]
    const fieldName = fieldRules.label || field

    for (const rule of fieldRules.rules || []) {
      const error = typeof rule === 'function' 
        ? rule(value, fieldName) 
        : null
      
      if (error) {
        errors[field] = error
        isValid = false
        break
      }
    }
  }

  return { isValid, errors }
}

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @returns {Object} - { isValid: boolean, error: string|null }
 */
export function validateFile(file, options = {}) {
  const {
    allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    maxSize = 5 * 1024 * 1024, // 5MB default
    maxFiles = 5
  } = options

  if (!file) {
    return { isValid: false, error: 'File tidak ditemukan' }
  }

  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      error: `Format file tidak didukung. Gunakan: ${allowedTypes.map(t => t.split('/')[1]).join(', ')}`
    }
  }

  // Check file size
  if (file.size > maxSize) {
    const maxMB = (maxSize / 1024 / 1024).toFixed(0)
    return { 
      isValid: false, 
      error: `Ukuran file terlalu besar. Maksimal ${maxMB}MB`
    }
  }

  // Check file name for suspicious patterns
  const suspiciousPatterns = /\.(exe|js|php|sh|bat|cmd|vbs|ps1)$/i
  if (suspiciousPatterns.test(file.name)) {
    return { isValid: false, error: 'Tipe file tidak diizinkan' }
  }

  return { isValid: true, error: null }
}

/**
 * Validate multiple files
 * @param {FileList|Array} files - Files to validate
 * @param {Object} options - Validation options
 * @returns {Object} - { isValid: boolean, errors: Array, validFiles: Array }
 */
export function validateFiles(files, options = {}) {
  const { maxFiles = 5 } = options
  const errors = []
  const validFiles = []

  if (files.length > maxFiles) {
    return {
      isValid: false,
      errors: [`Maksimal ${maxFiles} file yang dapat diupload`],
      validFiles: []
    }
  }

  for (const file of files) {
    const result = validateFile(file, options)
    if (result.isValid) {
      validFiles.push(file)
    } else {
      errors.push(`${file.name}: ${result.error}`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    validFiles
  }
}

/**
 * Validate ticket code format
 * @param {string} code - Ticket code
 * @returns {boolean}
 */
export function validateTicketCode(code) {
  const ticketRegex = /^LPR-\d{4}-\d{6}$/
  return ticketRegex.test(code)
}

/**
 * Rate limiter untuk mencegah spam
 */
export class RateLimiter {
  constructor(maxRequests = 5, timeWindow = 60000) {
    this.maxRequests = maxRequests
    this.timeWindow = timeWindow
    this.requests = []
  }

  canMakeRequest() {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.timeWindow)
    
    if (this.requests.length >= this.maxRequests) {
      return false
    }
    
    this.requests.push(now)
    return true
  }

  getTimeUntilReset() {
    if (this.requests.length === 0) return 0
    const oldestRequest = Math.min(...this.requests)
    return Math.max(0, this.timeWindow - (Date.now() - oldestRequest))
  }
}

export default {
  sanitizeInput,
  validationRules,
  validateForm,
  validateFile,
  validateFiles,
  validateTicketCode,
  RateLimiter
}
