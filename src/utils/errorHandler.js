// ===== GLOBAL ERROR HANDLER =====
// Setup error handling untuk aplikasi Vue

/**
 * Initialize global error handler
 * @param {import('vue').App} app - Vue app instance
 */
export function setupErrorHandler(app) {
  // Vue error handler
  app.config.errorHandler = (error, instance, info) => {
    console.error('Vue Error:', error)
    console.error('Component:', instance?.$options?.name || 'Unknown')
    console.error('Info:', info)

    // Log to external service in production (Sentry, LogRocket, etc.)
    if (import.meta.env.PROD) {
      logErrorToService(error, { instance, info })
    }

    // Show user-friendly error message
    showErrorToast(error)
  }

  // Vue warning handler (development only)
  if (import.meta.env.DEV) {
    app.config.warnHandler = (msg, instance, trace) => {
      console.warn('Vue Warning:', msg)
      if (trace) console.warn('Trace:', trace)
    }
  }

  // Global unhandled promise rejection
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason)
    
    if (import.meta.env.PROD) {
      logErrorToService(event.reason, { type: 'unhandledrejection' })
    }

    // Prevent default browser handling
    event.preventDefault()
    
    showErrorToast(event.reason)
  })

  // Global error event
  window.addEventListener('error', (event) => {
    // Ignore script loading errors (CORS, etc.)
    if (event.message === 'Script error.') return

    console.error('Global Error:', event.error || event.message)
    
    if (import.meta.env.PROD) {
      logErrorToService(event.error || event.message, { 
        type: 'global',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    }
  })

  // Network error detection
  window.addEventListener('offline', () => {
    showNetworkToast('Koneksi internet terputus')
  })

  window.addEventListener('online', () => {
    showNetworkToast('Koneksi internet terhubung kembali', 'success')
  })
}

/**
 * Show error toast to user
 * @param {Error|string} error 
 */
function showErrorToast(error) {
  const message = getErrorMessage(error)
  
  // Use global toast if available
  if (window.__TOAST__) {
    window.__TOAST__.error(message, 'Terjadi Kesalahan')
  } else {
    // Fallback to console
    console.error('Error (no toast available):', message)
  }
}

/**
 * Show network status toast
 * @param {string} message 
 * @param {string} type 
 */
function showNetworkToast(message, type = 'warning') {
  if (window.__TOAST__) {
    window.__TOAST__[type](message, 'Status Jaringan')
  }
}

/**
 * Get user-friendly error message
 * @param {Error|string} error 
 * @returns {string}
 */
function getErrorMessage(error) {
  // Custom error messages
  const errorMessages = {
    'NetworkError': 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
    'TimeoutError': 'Waktu permintaan habis. Silakan coba lagi.',
    'QuotaExceededError': 'Penyimpanan browser penuh. Hapus beberapa data.',
    'TypeError': 'Terjadi kesalahan teknis. Silakan muat ulang halaman.',
    'SyntaxError': 'Data tidak valid. Silakan coba lagi.',
    'ReferenceError': 'Terjadi kesalahan sistem. Silakan muat ulang halaman.',
  }

  if (typeof error === 'string') {
    return error
  }

  if (error instanceof Error) {
    // Check for specific error types
    for (const [type, message] of Object.entries(errorMessages)) {
      if (error.name === type || error.message.includes(type)) {
        return message
      }
    }
    
    // Return error message if it's user-friendly
    if (error.message && !error.message.includes('undefined') && error.message.length < 100) {
      return error.message
    }
  }

  // Default message
  return 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.'
}

/**
 * Log error to external service
 * @param {Error|string} error 
 * @param {Object} context 
 */
function logErrorToService(error, context = {}) {
  // Placeholder for external logging service
  // In production, integrate with Sentry, LogRocket, etc.
  
  const errorData = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : null,
    context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  }

  // Store in localStorage for debugging (limited)
  try {
    const errors = JSON.parse(localStorage.getItem('app_errors') || '[]')
    errors.push(errorData)
    
    // Keep only last 20 errors
    if (errors.length > 20) {
      errors.shift()
    }
    
    localStorage.setItem('app_errors', JSON.stringify(errors))
  } catch (e) {
    // localStorage might be full or disabled
    console.warn('Could not save error to localStorage:', e)
  }

  // Example: Send to external service
  // if (window.Sentry) {
  //   window.Sentry.captureException(error, { extra: context })
  // }
}

/**
 * Create a safe async function wrapper
 * @param {Function} fn - Async function to wrap
 * @param {Object} options - Options
 * @returns {Function}
 */
export function safeAsync(fn, options = {}) {
  const { 
    onError = () => {}, 
    onFinally = () => {},
    showToast = true 
  } = options

  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error('Safe async error:', error)
      
      if (showToast) {
        showErrorToast(error)
      }
      
      onError(error)
      return null
    } finally {
      onFinally()
    }
  }
}

/**
 * Try-catch wrapper for sync functions
 * @param {Function} fn 
 * @param {*} fallback 
 * @returns {*}
 */
export function tryCatch(fn, fallback = null) {
  try {
    return fn()
  } catch (error) {
    console.error('TryCatch error:', error)
    return fallback
  }
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {Object} options - Retry options
 * @returns {Promise<*>}
 */
export async function retry(fn, options = {}) {
  const { 
    maxAttempts = 3, 
    delay = 1000, 
    backoff = 2,
    onRetry = () => {}
  } = options

  let lastError
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (attempt < maxAttempts) {
        const waitTime = delay * Math.pow(backoff, attempt - 1)
        onRetry(attempt, waitTime)
        await new Promise(resolve => setTimeout(resolve, waitTime))
      }
    }
  }

  throw lastError
}

export default {
  setupErrorHandler,
  safeAsync,
  tryCatch,
  retry
}
