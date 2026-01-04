<script setup>
defineProps({
  berita: {
    type: Object,
    required: true
  }
})

const formatTanggal = (tanggal) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(tanggal))
}

const kategoriColors = {
  'Penghargaan': 'success',
  'Proyek': 'primary',
  'Pemberdayaan': 'secondary',
  'Laporan': 'warning',
  'Kebijakan': 'info'
}
</script>

<template>
  <article class="news-card">
    <div class="news-image">
      <img :src="berita.thumbnail" :alt="berita.judul" loading="lazy" />
      <span class="news-badge" :class="`badge--${kategoriColors[berita.kategori] || 'default'}`">
        {{ berita.kategori }}
      </span>
    </div>
    <div class="news-content">
      <time class="news-date">{{ formatTanggal(berita.tanggal) }}</time>
      <h3 class="news-title">{{ berita.judul }}</h3>
      <p class="news-summary">{{ berita.ringkasan }}</p>
      <router-link :to="`/berita/${berita.id}`" class="news-link">
        Baca Selengkapnya
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </router-link>
    </div>
  </article>
</template>

<style scoped>
.news-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-base);
}

.news-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.news-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-badge {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.badge--success {
  background: var(--color-success);
  color: white;
}

.badge--primary {
  background: var(--color-primary);
  color: white;
}

.badge--secondary {
  background: var(--color-secondary);
  color: white;
}

.badge--warning {
  background: var(--color-warning);
  color: white;
}

.badge--info {
  background: var(--color-info);
  color: white;
}

.badge--default {
  background: var(--color-text-muted);
  color: white;
}

.news-content {
  padding: var(--spacing-md);
}

.news-date {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-xs);
}

.news-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-summary {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
}

.news-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  transition: gap var(--transition-base);
}

.news-link:hover {
  gap: var(--spacing-sm);
}

.news-link svg {
  width: 16px;
  height: 16px;
}
</style>
