<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useNotificationsStore } from '@/stores/notifications'

const userStore = useUserStore()
const notificationsStore = useNotificationsStore()

// Active tab
const activeTab = ref('profil')

// Tabs
const tabs = [
  { id: 'profil', label: 'Profil', icon: '◯' },
  { id: 'notifikasi', label: 'Notifikasi', icon: '◎' },
  { id: 'privasi', label: 'Privasi', icon: '◈' },
  { id: 'favorit', label: 'Favorit', icon: '☆' },
  { id: 'data', label: 'Data Saya', icon: '▤' }
]

// Profile form
const profileForm = ref({
  nama: userStore.profile.nama,
  email: userStore.profile.email,
  telepon: userStore.profile.telepon,
  lokasi: userStore.profile.lokasi
})

// Notification settings
const notifSettings = ref({ ...notificationsStore.settings })

// Privacy settings
const privacySettings = ref({ ...userStore.privacy })

// Favorites (mock data)
const favorites = ref([
  { id: 1, type: 'desa', name: 'Desa Mekar Jaya', location: 'Jawa Barat' },
  { id: 2, type: 'desa', name: 'Desa Sumber Makmur', location: 'Jawa Timur' },
  { id: 3, type: 'proyek', name: 'Pembangunan Jalan Desa', location: 'Desa Mekar Jaya' }
])

// Methods
const saveProfile = () => {
  userStore.updateProfile(profileForm.value)
  alert('Profil berhasil disimpan!')
}

const saveNotifSettings = () => {
  notificationsStore.updateSettings(notifSettings.value)
  alert('Pengaturan notifikasi berhasil disimpan!')
}

const savePrivacy = () => {
  userStore.updatePrivacy(privacySettings.value)
  alert('Pengaturan privasi berhasil disimpan!')
}

const removeFavorite = (id) => {
  favorites.value = favorites.value.filter(f => f.id !== id)
}

const exportData = () => {
  userStore.exportData()
}

const clearHistory = () => {
  if (confirm('Yakin ingin menghapus riwayat pencarian?')) {
    userStore.clearSearchHistory()
    alert('Riwayat pencarian berhasil dihapus!')
  }
}

const deleteAccount = () => {
  if (confirm('PERINGATAN: Ini akan menghapus semua data Anda secara permanen. Lanjutkan?')) {
    userStore.deleteAccount()
    alert('Akun berhasil dihapus!')
  }
}
</script>

<template>
  <div class="settings-page">
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">Pengaturan</h1>
        <p class="page-subtitle">Kelola preferensi dan akun Anda</p>
      </div>
    </section>

    <div class="container">
      <div class="settings-layout">
        <!-- Sidebar -->
        <aside class="settings-sidebar">
          <nav class="settings-nav">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="nav-item"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              <span class="nav-icon">{{ tab.icon }}</span>
              <span class="nav-label">{{ tab.label }}</span>
            </button>
          </nav>
        </aside>

        <!-- Content -->
        <main class="settings-content">
          <!-- Profile Tab -->
          <div v-if="activeTab === 'profil'" class="settings-panel">
            <div class="panel-header">
              <h2>Profil Saya</h2>
              <p>Informasi dasar tentang akun Anda</p>
            </div>
            
            <div class="panel-body">
              <div class="avatar-section">
                <div class="avatar">
                  <span>{{ profileForm.nama.charAt(0).toUpperCase() }}</span>
                </div>
                <button class="btn btn-outline btn-sm">Ubah Foto</button>
              </div>
              
              <form @submit.prevent="saveProfile">
                <div class="form-row">
                  <div class="form-group">
                    <label>Nama Lengkap</label>
                    <input v-model="profileForm.nama" type="text" />
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input v-model="profileForm.email" type="email" />
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label>Nomor Telepon</label>
                    <input v-model="profileForm.telepon" type="tel" />
                  </div>
                  <div class="form-group">
                    <label>Lokasi</label>
                    <input v-model="profileForm.lokasi" type="text" />
                  </div>
                </div>
                
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </div>

          <!-- Notifications Tab -->
          <div v-if="activeTab === 'notifikasi'" class="settings-panel">
            <div class="panel-header">
              <h2>Notifikasi</h2>
              <p>Kelola preferensi notifikasi Anda</p>
            </div>
            
            <div class="panel-body">
              <div class="settings-list">
                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Push Notifications</h4>
                    <p>Terima notifikasi langsung di browser</p>
                  </div>
                  <label class="switch">
                    <input v-model="notifSettings.push" type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Email Notifications</h4>
                    <p>Terima notifikasi melalui email</p>
                  </div>
                  <label class="switch">
                    <input v-model="notifSettings.email" type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Status Laporan</h4>
                    <p>Notifikasi ketika status laporan berubah</p>
                  </div>
                  <label class="switch">
                    <input v-model="notifSettings.statusLaporan" type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Berita & Update</h4>
                    <p>Notifikasi berita dan update terbaru</p>
                  </div>
                  <label class="switch">
                    <input v-model="notifSettings.beritaUpdate" type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              
              <div class="form-actions">
                <button @click="saveNotifSettings" class="btn btn-primary">Simpan</button>
              </div>
            </div>
          </div>

          <!-- Privacy Tab -->
          <div v-if="activeTab === 'privasi'" class="settings-panel">
            <div class="panel-header">
              <h2>Privasi & Keamanan</h2>
              <p>Kontrol siapa yang dapat melihat informasi Anda</p>
            </div>
            
            <div class="panel-body">
              <div class="settings-list">
                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Profil Publik</h4>
                    <p>Izinkan pengguna lain melihat profil Anda</p>
                  </div>
                  <label class="switch">
                    <input v-model="privacySettings.profilPublik" type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Tampilkan Laporan</h4>
                    <p>Tampilkan laporan Anda di profil publik</p>
                  </div>
                  <label class="switch">
                    <input v-model="privacySettings.tampilkanLaporan" type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Izinkan Analytics</h4>
                    <p>Bantu kami meningkatkan layanan dengan data anonim</p>
                  </div>
                  <label class="switch">
                    <input v-model="privacySettings.izinkanAnalytics" type="checkbox" />
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              
              <div class="form-actions">
                <button @click="savePrivacy" class="btn btn-primary">Simpan</button>
              </div>
            </div>
          </div>

          <!-- Favorites Tab -->
          <div v-if="activeTab === 'favorit'" class="settings-panel">
            <div class="panel-header">
              <h2>Desa & Proyek Favorit</h2>
              <p>Kelola daftar desa dan proyek yang Anda simpan</p>
            </div>
            
            <div class="panel-body">
              <div class="favorites-list">
                <div 
                  v-for="fav in favorites"
                  :key="fav.id"
                  class="favorite-item"
                >
                  <div class="favorite-icon">
                    {{ fav.type === 'desa' ? '◇' : '□' }}
                  </div>
                  <div class="favorite-info">
                    <h4>{{ fav.name }}</h4>
                    <p>{{ fav.location }}</p>
                  </div>
                  <button class="btn btn-ghost btn-sm" @click="removeFavorite(fav.id)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
                
                <div v-if="favorites.length === 0" class="empty-state">
                  <span class="empty-icon">☆</span>
                  <p>Belum ada favorit</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Data Tab -->
          <div v-if="activeTab === 'data'" class="settings-panel">
            <div class="panel-header">
              <h2>Data Saya</h2>
              <p>Kelola data dan riwayat pencarian Anda</p>
            </div>
            
            <div class="panel-body">
              <div class="data-actions">
                <div class="data-card">
                  <div class="data-icon">↓</div>
                  <div class="data-info">
                    <h4>Ekspor Data</h4>
                    <p>Unduh semua data Anda dalam format JSON</p>
                  </div>
                  <button class="btn btn-outline" @click="exportData">
                    Ekspor
                  </button>
                </div>
                
                <div class="data-card">
                  <div class="data-icon">□</div>
                  <div class="data-info">
                    <h4>Hapus Riwayat</h4>
                    <p>Hapus riwayat pencarian Anda</p>
                  </div>
                  <button class="btn btn-outline" @click="clearHistory">
                    Hapus
                  </button>
                </div>
                
                <div class="data-card data-card--danger">
                  <div class="data-icon">△</div>
                  <div class="data-info">
                    <h4>Hapus Akun</h4>
                    <p>Hapus akun dan semua data secara permanen</p>
                  </div>
                  <button class="btn btn-danger" @click="deleteAccount">
                    Hapus Akun
                  </button>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  min-height: 100vh;
  padding-top: var(--navbar-height);
  padding-bottom: var(--spacing-2xl);
}

/* Header */
.page-header {
  background: var(--gradient-hero);
  padding: var(--spacing-2xl) 0;
  color: white;
  text-align: center;
}

.page-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-xs);
}

.page-subtitle {
  opacity: 0.9;
}

/* Layout */
.settings-layout {
  display: grid;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl) 0;
}

@media (min-width: 768px) {
  .settings-layout {
    grid-template-columns: 220px 1fr;
  }
}

/* Sidebar */
.settings-sidebar {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-md);
  height: fit-content;
  position: sticky;
  top: calc(var(--navbar-height) + var(--spacing-xl));
}

.settings-nav {
  display: flex;
  gap: var(--spacing-xs);
  overflow-x: auto;
}

@media (min-width: 768px) {
  .settings-nav {
    flex-direction: column;
    overflow-x: visible;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-base);
  width: 100%;
  text-align: left;
}

.nav-item:hover {
  background: var(--color-background);
}

.nav-item.active {
  background: var(--color-primary);
  color: white;
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-label {
  font-weight: 500;
}

/* Settings Panel */
.settings-panel {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.panel-header {
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
}

.panel-header h2 {
  margin-bottom: var(--spacing-xs);
}

.panel-header p {
  color: var(--color-text-secondary);
  margin: 0;
}

.panel-body {
  padding: var(--spacing-xl);
}

/* Avatar Section */
.avatar-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--gradient-hero);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-2xl);
  font-weight: 700;
}

/* Form Styles */
.form-row {
  display: grid;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

@media (min-width: 768px) {
  .form-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  background: var(--color-background);
}

.form-actions {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
  margin-top: var(--spacing-lg);
}

/* Settings List */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--color-background);
  border-radius: var(--radius-md);
}

.setting-info h4 {
  margin: 0 0 var(--spacing-xs);
}

.setting-info p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* Switch Toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: var(--color-border);
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Favorites List */
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.favorite-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-background);
  border-radius: var(--radius-md);
}

.favorite-icon {
  font-size: 1.5rem;
}

.favorite-info {
  flex: 1;
}

.favorite-info h4 {
  margin: 0 0 var(--spacing-xs);
}

.favorite-info p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.btn-ghost {
  background: transparent;
  padding: var(--spacing-sm);
}

.btn-ghost svg {
  width: 18px;
  height: 18px;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--color-text-muted);
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: var(--spacing-md);
}

/* Data Actions */
.data-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.data-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--color-background);
  border-radius: var(--radius-lg);
}

.data-card--danger {
  border: 1px solid var(--color-danger);
}

.data-icon {
  font-size: 1.5rem;
}

.data-info {
  flex: 1;
}

.data-info h4 {
  margin: 0 0 var(--spacing-xs);
}

.data-info p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.btn-danger {
  background: var(--color-danger);
  color: white;
  border: none;
}

.btn-danger:hover {
  background: #c53030;
}

/* Theme Options */
.theme-options,
.font-size-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.theme-option,
.font-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: var(--color-background);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.theme-option:hover,
.font-option:hover {
  border-color: var(--color-border);
}

.theme-option.active,
.font-option.active {
  border-color: var(--color-primary);
  background: var(--color-primary-50);
}

.theme-icon {
  font-size: 1.5rem;
}
</style>
