import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { safeAsync, tryCatch, retry } from '@/utils/errorHandler.js'

describe('Error Handler Utils', () => {
  describe('safeAsync', () => {
    it('should return result for successful async function', async () => {
      const successFn = async () => 'success'
      const safeFn = safeAsync(successFn, { showToast: false })
      
      const result = await safeFn()
      expect(result).toBe('success')
    })

    it('should return null and call onError for failed async function', async () => {
      const error = new Error('Test error')
      const failFn = async () => { throw error }
      const onError = vi.fn()
      
      const safeFn = safeAsync(failFn, { onError, showToast: false })
      const result = await safeFn()
      
      expect(result).toBeNull()
      expect(onError).toHaveBeenCalledWith(error)
    })

    it('should call onFinally after execution', async () => {
      const onFinally = vi.fn()
      const successFn = async () => 'success'
      
      const safeFn = safeAsync(successFn, { onFinally, showToast: false })
      await safeFn()
      
      expect(onFinally).toHaveBeenCalled()
    })

    it('should call onFinally even on error', async () => {
      const onFinally = vi.fn()
      const failFn = async () => { throw new Error('fail') }
      
      const safeFn = safeAsync(failFn, { onFinally, showToast: false })
      await safeFn()
      
      expect(onFinally).toHaveBeenCalled()
    })
  })

  describe('tryCatch', () => {
    it('should return result for successful function', () => {
      const result = tryCatch(() => 'success')
      expect(result).toBe('success')
    })

    it('should return fallback for failed function', () => {
      const result = tryCatch(() => { throw new Error('fail') }, 'fallback')
      expect(result).toBe('fallback')
    })

    it('should return null as default fallback', () => {
      const result = tryCatch(() => { throw new Error('fail') })
      expect(result).toBeNull()
    })
  })

  describe('retry', () => {
    it('should return result on first success', async () => {
      const fn = vi.fn().mockResolvedValue('success')
      
      const result = await retry(fn, { maxAttempts: 3, delay: 10 })
      
      expect(result).toBe('success')
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should retry on failure', async () => {
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockRejectedValueOnce(new Error('fail 2'))
        .mockResolvedValue('success')
      
      const result = await retry(fn, { maxAttempts: 3, delay: 10 })
      
      expect(result).toBe('success')
      expect(fn).toHaveBeenCalledTimes(3)
    })

    it('should throw after max attempts', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('always fail'))
      
      await expect(retry(fn, { maxAttempts: 3, delay: 10 }))
        .rejects.toThrow('always fail')
      
      expect(fn).toHaveBeenCalledTimes(3)
    })

    it('should call onRetry for each retry', async () => {
      const onRetry = vi.fn()
      const fn = vi.fn()
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValue('success')
      
      await retry(fn, { maxAttempts: 3, delay: 10, onRetry })
      
      expect(onRetry).toHaveBeenCalledTimes(1)
      expect(onRetry).toHaveBeenCalledWith(1, expect.any(Number))
    })
  })
})
