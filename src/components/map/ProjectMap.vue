<template>
  <div class="container">
    <div class="card map-card">
      <div class="card-header">
        <h2 class="card-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="title-icon">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
            <line x1="8" y1="2" x2="8" y2="18"/>
            <line x1="16" y1="6" x2="16" y2="22"/>
          </svg>
          Peta Lokasi Proyek Pembangunan
        </h2>
        <p class="card-subtitle">Klik pin di peta untuk melihat detail proyek</p>
      </div>

      <div class="map-container">
        <!-- Map placeholder with interactive pins -->
        <div class="map-wrapper" ref="mapWrapper">
          <div class="map-placeholder">
            <!-- OpenStreetMap Attribution -->
            <div class="map-background">
              <img 
                :src="mapImageUrl" 
                alt="Peta lokasi proyek"
                loading="lazy"
                @error="onMapError"
              />
            </div>
            
            <!-- Project Pins -->
            <div 
              v-for="project in projects" 
              :key="project.id"
              class="map-pin"
              :class="{ 'pin-active': selectedProject?.id === project.id }"
              :style="getPinPosition(project)"
              @click="selectProject(project)"
            >
              <div class="pin-marker" :class="'pin-' + getStatusClass(project.status)">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div class="pin-tooltip">{{ project.nama }}</div>
            </div>
          </div>

          <!-- Map Legend -->
          <div class="map-legend">
            <div class="legend-title">Status Proyek:</div>
            <div class="legend-items">
              <div class="legend-item">
                <span class="legend-dot bg-success"></span>
                <span>Selesai</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot bg-warning"></span>
                <span>Sedang Dikerjakan</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot bg-danger"></span>
                <span>Belum Dimulai</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selected Project Detail -->
      <transition name="slide-up">
        <div v-if="selectedProject" class="project-detail">
          <div class="detail-header">
            <div>
              <h3>{{ selectedProject.nama }}</h3>
              <span class="badge" :class="'badge-' + getStatusInfo(selectedProject.status).color">
                {{ getStatusInfo(selectedProject.status).label }}
              </span>
            </div>
            <button class="btn btn-ghost btn-sm" @click="selectedProject = null">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="detail-content">
            <div class="detail-info">
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Nilai Anggaran</span>
                  <span class="info-value highlight">{{ formatRupiah(selectedProject.nilai_anggaran) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Pelaksana/Kontraktor</span>
                  <span class="info-value">{{ selectedProject.kontraktor }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Tanggal Mulai</span>
                  <span class="info-value">{{ formatTanggal(selectedProject.tanggal_mulai) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Target Selesai</span>
                  <span class="info-value">{{ formatTanggal(selectedProject.tanggal_selesai) }}</span>
                </div>
              </div>

              <div class="info-description">
                <span class="info-label">Deskripsi Proyek</span>
                <p>{{ selectedProject.deskripsi }}</p>
              </div>

              <!-- Progress Bar -->
              <div class="detail-progress">
                <div class="progress-header">
                  <span>Progress Pekerjaan</span>
                  <span class="progress-value">{{ selectedProject.progress }}%</span>
                </div>
                <div class="progress-bar-track">
                  <div 
                    class="progress-bar-fill"
                    :class="'bg-' + getStatusInfo(selectedProject.status).color"
                    :style="{ width: selectedProject.progress + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Photos -->
            <div class="detail-photos">
              <h4>Dokumentasi Proyek</h4>
              <div class="photos-grid">
                <div class="photo-card">
                  <div class="photo-label">Kondisi Awal (0%)</div>
                  <div class="photo-frame">
                    <img 
                      v-if="selectedProject.foto_sebelum" 
                      :src="selectedProject.foto_sebelum" 
                      alt="Foto sebelum"
                      loading="lazy"
                    />
                    <div v-else class="photo-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span>Belum ada foto</span>
                    </div>
                  </div>
                </div>
                <div class="photo-card">
                  <div class="photo-label">Kondisi Terkini ({{ selectedProject.progress }}%)</div>
                  <div class="photo-frame">
                    <img 
                      v-if="selectedProject.foto_sesudah" 
                      :src="selectedProject.foto_sesudah" 
                      alt="Foto sesudah"
                      loading="lazy"
                    />
                    <div v-else class="photo-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span>Belum ada foto</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reactions -->
          <div class="detail-reactions">
            <span class="reactions-label">Beri tanggapan:</span>
            <div class="reactions-buttons">
              <button 
                class="reaction-btn"
                :class="{ 'reacted': userReaction === 'like' }"
                @click="react('like')"
              >
                <span class="reaction-emoji">👍</span>
                <span class="reaction-count">{{ selectedProject.reactions?.like || 0 }}</span>
              </button>
              <button 
                class="reaction-btn"
                :class="{ 'reacted': userReaction === 'sad' }"
                @click="react('sad')"
              >
                <span class="reaction-emoji">😔</span>
                <span class="reaction-count">{{ selectedProject.reactions?.sad || 0 }}</span>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatRupiah, formatTanggal, getStatusLabel } from '@/data/mockData.js'

const props = defineProps({
  projects: {
    type: Array,
    default: () => []
  },
  centerCoordinat: {
    type: Object,
    default: () => ({ lat: -7.7956, lng: 110.3254 })
  }
})

const selectedProject = ref(null)
const userReaction = ref(null)
const mapWrapper = ref(null)

const mapImageUrl = computed(() => {
  const { lat, lng } = props.centerCoordinat
  // Using OpenStreetMap static tiles
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=800x400&maptype=mapnik`
})

const onMapError = (e) => {
  e.target.style.display = 'none'
}

const selectProject = (project) => {
  selectedProject.value = project
  userReaction.value = null
}

const getPinPosition = (project) => {
  // Calculate relative position based on coordinates
  // This is a simplified version - in production you'd use proper map projection
  const centerLat = props.centerCoordinat.lat
  const centerLng = props.centerCoordinat.lng
  const latDiff = (project.koordinat.lat - centerLat) * 100000
  const lngDiff = (project.koordinat.lng - centerLng) * 100000
  
  const left = 50 + lngDiff * 0.8
  const top = 50 - latDiff * 0.8
  
  return {
    left: `${Math.min(Math.max(left, 10), 90)}%`,
    top: `${Math.min(Math.max(top, 10), 90)}%`
  }
}

const getStatusClass = (status) => {
  const classMap = {
    selesai: 'success',
    sedang_berjalan: 'warning',
    belum_mulai: 'danger'
  }
  return classMap[status] || 'info'
}

const getStatusInfo = (status) => {
  return getStatusLabel(status)
}

const react = (type) => {
  if (userReaction.value === type) {
    userReaction.value = null
  } else {
    userReaction.value = type
  }
}
</script>

<style scoped>
.map-card {
  margin-bottom: var(--spacing-lg);
}

.title-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: var(--spacing-sm);
  color: var(--color-secondary);
}

.map-container {
  margin-top: var(--spacing-md);
}

.map-wrapper {
  position: relative;
}

.map-placeholder {
  position: relative;
  width: 100%;
  height: 350px;
  background: linear-gradient(135deg, #e8f4ea 0%, #d4e8d6 100%);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

@media (min-width: 768px) {
  .map-placeholder {
    height: 450px;
  }
}

.map-background {
  position: absolute;
  inset: 0;
}

.map-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
}

/* Map Pins */
.map-pin {
  position: absolute;
  transform: translate(-50%, -100%);
  cursor: pointer;
  z-index: 10;
}

.map-pin.pin-active {
  z-index: 20;
}

.pin-marker {
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  transition: transform var(--transition-fast);
}

.map-pin:hover .pin-marker,
.map-pin.pin-active .pin-marker {
  transform: scale(1.2);
}

.pin-marker svg {
  width: 100%;
  height: 100%;
}

.pin-success { color: var(--color-success); }
.pin-warning { color: var(--color-warning); }
.pin-danger { color: var(--color-danger); }

.pin-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-text-primary);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-fast);
  margin-bottom: var(--spacing-xs);
}

.map-pin:hover .pin-tooltip {
  opacity: 1;
  visibility: visible;
}

/* Map Legend */
.map-legend {
  position: absolute;
  bottom: var(--spacing-md);
  right: var(--spacing-md);
  background-color: rgba(255, 255, 255, 0.95);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  font-size: var(--font-size-xs);
}

.legend-title {
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.bg-success { background-color: var(--color-success); }
.bg-warning { background-color: var(--color-warning); }
.bg-danger { background-color: var(--color-danger); }

/* Project Detail */
.project-detail {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.detail-header h3 {
  font-size: var(--font-size-xl);
  margin: 0 0 var(--spacing-sm);
}

.detail-content {
  display: grid;
  gap: var(--spacing-xl);
}

@media (min-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr 1fr;
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.info-item {
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
}

.info-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.info-value {
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.info-value.highlight {
  color: var(--color-secondary);
  font-size: var(--font-size-base);
}

.info-description {
  margin-bottom: var(--spacing-lg);
}

.info-description p {
  margin: var(--spacing-xs) 0 0;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.detail-progress {
  padding: var(--spacing-md);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.progress-value {
  font-weight: 700;
}

.progress-bar-track {
  height: 8px;
  background-color: var(--color-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: var(--radius-full);
  transition: width 0.5s ease;
}

/* Photos */
.detail-photos h4 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-md);
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.photo-card {
  display: flex;
  flex-direction: column;
}

.photo-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.photo-frame {
  aspect-ratio: 4/3;
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-background);
}

.photo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}

.photo-placeholder svg {
  width: 32px;
  height: 32px;
  margin-bottom: var(--spacing-xs);
}

.photo-placeholder span {
  font-size: var(--font-size-xs);
}

/* Reactions */
.detail-reactions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.reactions-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.reactions-buttons {
  display: flex;
  gap: var(--spacing-sm);
}

.reaction-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-background);
  border: 2px solid transparent;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.reaction-btn:hover {
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.reaction-btn.reacted {
  border-color: var(--color-primary);
  background-color: rgba(15, 76, 129, 0.05);
}

.reaction-emoji {
  font-size: var(--font-size-lg);
}

.reaction-count {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
