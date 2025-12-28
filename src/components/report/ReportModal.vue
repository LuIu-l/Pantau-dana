<template>
  <!-- Floating Action Button -->
  <button 
    class="fab"
    @click="openModal"
    :class="{ 'fab-hidden': isModalOpen }"
    aria-label="Lapor Masalah"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
    </svg>
    <span class="fab-text">Lapor Masalah</span>
  </button>

  <!-- Report Modal -->
  <transition name="modal">
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            Lapor Masalah
          </h2>
          <button class="modal-close" @click="closeModal" aria-label="Tutup">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Step Indicator -->
        <div class="step-indicator">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="step"
            :class="{ 
              'step-active': currentStep === index,
              'step-completed': currentStep > index
            }"
          >
            <div class="step-number">
              <svg v-if="currentStep > index" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span class="step-label">{{ step }}</span>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="report-form">
          <!-- Step 1: Category -->
          <div v-show="currentStep === 0" class="form-step">
            <h3>Pilih Kategori Masalah</h3>
            <p class="step-description">Pilih kategori yang paling sesuai dengan masalah yang ingin Anda laporkan</p>
            
            <div class="category-grid">
              <label 
                v-for="kategori in kategoriLaporan" 
                :key="kategori.id"
                class="category-card"
                :class="{ 'category-selected': formData.kategori === kategori.id }"
              >
                <input 
                  type="radio" 
                  :value="kategori.id" 
                  v-model="formData.kategori"
                  class="sr-only"
                />
                <div class="category-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path v-if="kategori.id === 'proyek_fiktif'" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <path v-else-if="kategori.id === 'kualitas_buruk'" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <path v-else-if="kategori.id === 'pungli'" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    <path v-else-if="kategori.id === 'penyimpangan'" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <circle v-else cx="12" cy="12" r="10"/>
                  </svg>
                </div>
                <span class="category-name">{{ kategori.nama }}</span>
                <span class="category-desc">{{ kategori.deskripsi }}</span>
              </label>
            </div>
          </div>

          <!-- Step 2: Details -->
          <div v-show="currentStep === 1" class="form-step">
            <h3>Detail Laporan</h3>
            <p class="step-description">Berikan informasi selengkap mungkin untuk membantu proses verifikasi</p>

            <div class="form-group">
              <label class="form-label" for="lokasi">Lokasi Kejadian *</label>
              <input 
                type="text"
                id="lokasi"
                class="form-input"
                v-model="formData.lokasi"
                placeholder="Contoh: Jalan RT 05 Dusun Ngawen"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="deskripsi">Deskripsi Masalah *</label>
              <textarea 
                id="deskripsi"
                class="form-textarea"
                v-model="formData.deskripsi"
                placeholder="Jelaskan kronologi masalah yang Anda temukan secara detail..."
                rows="5"
                required
              ></textarea>
              <p class="form-hint">Minimal 50 karakter ({{ formData.deskripsi.length }}/50)</p>
            </div>

            <div class="form-group">
              <label class="form-label">Upload Foto Bukti (Opsional)</label>
              <div class="file-upload">
                <input 
                  type="file"
                  id="foto"
                  accept="image/*"
                  multiple
                  @change="handleFileUpload"
                  class="sr-only"
                />
                <label for="foto" class="file-upload-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span>Klik untuk upload foto</span>
                  <span class="file-hint">JPG, PNG (Maks. 5MB per file)</span>
                </label>
              </div>
              
              <div v-if="formData.files.length > 0" class="file-preview">
                <div 
                  v-for="(file, index) in formData.files" 
                  :key="index"
                  class="file-item"
                >
                  <span class="file-name">{{ file.name }}</span>
                  <button type="button" class="file-remove" @click="removeFile(index)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Step 3: Confirmation -->
          <div v-show="currentStep === 2" class="form-step">
            <h3>Konfirmasi & Kirim</h3>
            <p class="step-description">Periksa kembali laporan Anda sebelum mengirim</p>

            <div class="summary-card">
              <div class="summary-row">
                <span class="summary-label">Kategori</span>
                <span class="summary-value">{{ getKategoriName(formData.kategori) }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Lokasi</span>
                <span class="summary-value">{{ formData.lokasi }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Deskripsi</span>
                <span class="summary-value">{{ formData.deskripsi }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Foto Bukti</span>
                <span class="summary-value">{{ formData.files.length }} file</span>
              </div>
            </div>

            <div class="anonymity-notice">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div>
                <h4>Jaminan Keamanan Pelapor</h4>
                <p>
                  Identitas Anda akan <strong>DIENKRIPSI</strong> dan tidak dapat dilihat oleh publik. 
                  Hanya pihak berwenang (Inspektorat/KPK) yang dapat mengakses identitas pelapor jika diperlukan untuk investigasi.
                </p>
              </div>
            </div>

            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="formData.agreement" required />
              <span class="checkmark"></span>
              <span class="checkbox-label">
                Saya menyatakan bahwa laporan ini dibuat dengan itikad baik dan berdasarkan fakta yang saya ketahui.
              </span>
            </label>
          </div>

          <!-- Success State -->
          <div v-show="isSubmitted" class="success-state">
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Laporan Berhasil Terkirim!</h3>
            <p>Terima kasih atas partisipasi Anda dalam mengawasi Dana Desa.</p>
            
            <div class="ticket-card">
              <span class="ticket-label">Kode Tiket Laporan Anda</span>
              <span class="ticket-code">{{ ticketCode }}</span>
              <button type="button" class="btn btn-outline btn-sm" @click="copyTicketCode">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Salin Kode
              </button>
            </div>

            <p class="ticket-info">
              Simpan kode tiket ini untuk melacak status laporan Anda. 
              Anda dapat mengecek status laporan di halaman "Lacak Laporan".
            </p>
          </div>

          <!-- Form Actions -->
          <div v-if="!isSubmitted" class="form-actions">
            <button 
              v-if="currentStep > 0"
              type="button" 
              class="btn btn-ghost"
              @click="prevStep"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Kembali
            </button>
            
            <button 
              v-if="currentStep < 2"
              type="button"
              class="btn btn-primary"
              @click="nextStep"
              :disabled="!canProceed"
            >
              Lanjutkan
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button 
              v-if="currentStep === 2"
              type="submit"
              class="btn btn-alert"
              :disabled="!formData.agreement || isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner"></span>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              {{ isSubmitting ? 'Mengirim...' : 'Kirim Laporan' }}
            </button>
          </div>

          <div v-else class="form-actions">
            <button type="button" class="btn btn-outline" @click="resetForm">
              Buat Laporan Baru
            </button>
            <button type="button" class="btn btn-primary" @click="closeModal">
              Selesai
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { kategoriLaporan, generateTicketCode } from '@/data/mockData.js'

const isModalOpen = ref(false)
const currentStep = ref(0)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const ticketCode = ref('')

const steps = ['Kategori', 'Detail', 'Konfirmasi']

const formData = ref({
  kategori: '',
  lokasi: '',
  deskripsi: '',
  files: [],
  agreement: false
})

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return formData.value.kategori !== ''
  }
  if (currentStep.value === 1) {
    return formData.value.lokasi.trim() !== '' && 
           formData.value.deskripsi.trim().length >= 50
  }
  return true
})

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < 2) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  formData.value.files = [...formData.value.files, ...files].slice(0, 5)
}

const removeFile = (index) => {
  formData.value.files.splice(index, 1)
}

const getKategoriName = (id) => {
  const kategori = kategoriLaporan.find(k => k.id === id)
  return kategori ? kategori.nama : '-'
}

const handleSubmit = async () => {
  if (!formData.value.agreement) return
  
  isSubmitting.value = true
  
  try {
    const data = new FormData()
    data.append('category', formData.value.kategori)
    data.append('location', formData.value.lokasi)
    data.append('description', formData.value.deskripsi)
    
    if (formData.value.files.length > 0) {
      data.append('image', formData.value.files[0])
    }

    const response = await fetch('http://localhost:3000/api/reports', {
      method: 'POST',
      body: data
    })

    if (!response.ok) {
      throw new Error('Gagal mengirim laporan')
    }

    // const result = await response.json() // We can use result.reportId if needed
    
    ticketCode.value = generateTicketCode()
    isSubmitted.value = true
  } catch (error) {
    console.error('Error submitting report:', error)
    alert('Gagal mengirim laporan. Pastikan server backend berjalan dan database terhubung.')
  } finally {
    isSubmitting.value = false
  }
}

const copyTicketCode = async () => {
  try {
    await navigator.clipboard.writeText(ticketCode.value)
    alert('Kode tiket berhasil disalin!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const resetForm = () => {
  formData.value = {
    kategori: '',
    lokasi: '',
    deskripsi: '',
    files: [],
    agreement: false
  }
  currentStep.value = 0
  isSubmitted.value = false
  ticketCode.value = ''
}
</script>

<style scoped>
/* Floating Action Button */
.fab {
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-alert);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  z-index: var(--z-fixed);
  transition: all var(--transition-base);
}

.fab:hover {
  background-color: var(--color-alert-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.fab svg {
  width: 24px;
  height: 24px;
}

.fab-text {
  font-weight: 600;
  display: none;
}

@media (min-width: 640px) {
  .fab-text {
    display: inline;
  }
}

.fab-hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  z-index: var(--z-modal);
  overflow-y: auto;
}

.modal-content {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background-color: var(--color-surface);
  z-index: 1;
}

.modal-header h2 {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  margin: 0;
  color: var(--color-alert);
}

.modal-header h2 svg {
  width: 24px;
  height: 24px;
}

.modal-close {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background-color: var(--color-border);
  color: var(--color-text-primary);
}

.modal-close svg {
  width: 24px;
  height: 24px;
}

/* Step Indicator */
.step-indicator {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--color-background);
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.step-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-border);
  border-radius: 50%;
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.step-number svg {
  width: 16px;
  height: 16px;
}

.step-active .step-number {
  background-color: var(--color-primary);
  color: white;
}

.step-completed .step-number {
  background-color: var(--color-success);
  color: white;
}

.step-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.step-active .step-label {
  color: var(--color-primary);
  font-weight: 500;
}

/* Report Form */
.report-form {
  padding: var(--spacing-lg);
}

.form-step h3 {
  font-size: var(--font-size-lg);
  margin: 0 0 var(--spacing-xs);
}

.step-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);
}

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

@media (min-width: 480px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-card:hover {
  background-color: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.category-selected {
  border-color: var(--color-primary);
  background-color: rgba(15, 76, 129, 0.05);
}

.category-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(243, 156, 18, 0.1);
  border-radius: var(--radius-md);
  color: var(--color-alert);
  margin-bottom: var(--spacing-sm);
}

.category-icon svg {
  width: 24px;
  height: 24px;
}

.category-name {
  font-weight: 600;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
}

.category-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

/* File Upload */
.file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xl);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.file-upload-label:hover {
  border-color: var(--color-primary);
  background-color: rgba(15, 76, 129, 0.02);
}

.file-upload-label svg {
  width: 32px;
  height: 32px;
  color: var(--color-text-muted);
}

.file-hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.file-preview {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
}

.file-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-remove {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--color-danger);
  cursor: pointer;
}

.file-remove svg {
  width: 16px;
  height: 16px;
}

/* Summary Card */
.summary-card {
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.summary-row {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.summary-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  word-break: break-word;
}

/* Anonymity Notice */
.anonymity-notice {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: rgba(46, 204, 113, 0.1);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(46, 204, 113, 0.2);
  margin-bottom: var(--spacing-lg);
}

.anonymity-notice svg {
  width: 32px;
  height: 32px;
  color: var(--color-success);
  flex-shrink: 0;
}

.anonymity-notice h4 {
  font-size: var(--font-size-sm);
  margin: 0 0 var(--spacing-xs);
  color: var(--color-success);
}

.anonymity-notice p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* Checkbox */
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.checkbox-wrapper input {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  accent-color: var(--color-primary);
}

.checkbox-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Success State */
.success-state {
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(46, 204, 113, 0.1);
  border-radius: 50%;
  color: var(--color-success);
}

.success-icon svg {
  width: 40px;
  height: 40px;
}

.success-state h3 {
  color: var(--color-success);
  margin-bottom: var(--spacing-sm);
}

.success-state > p {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.ticket-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
}

.ticket-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.ticket-code {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 2px;
}

.ticket-info {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  max-width: 400px;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.form-actions .btn {
  flex: 1;
}

.form-actions .btn svg {
  width: 18px;
  height: 18px;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}
</style>
