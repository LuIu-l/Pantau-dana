<script setup>
import { ref } from 'vue'

const articles = ref([
  {
    id: 1,
    title: 'Memahami Dana Desa',
    summary: 'Dana Desa adalah dana yang bersumber dari Anggaran Pendapatan dan Belanja Negara yang diperuntukkan bagi Desa.',
    content: 'Dana Desa diprioritaskan untuk pembiayaan pelaksanaan program dan kegiatan berskala lokal desa dengan tujuan untuk meningkatkan kesejahteraan masyarakat desa dan kualitas hidup masyarakat serta penanggulangan kemiskinan. Prioritas penggunaan Dana Desa dipublikasikan kepada masyarakat oleh Pemerintah Desa di ruang publik yang dapat diakses masyarakat desa.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 2,
    title: 'Jenis-Jenis Bantuan Sosial',
    summary: 'Mengenal berbagai jenis bantuan sosial yang disalurkan pemerintah untuk masyarakat.',
    content: 'Pemerintah menyalurkan berbagai jenis bantuan sosial (Bansos) seperti Program Keluarga Harapan (PKH), Bantuan Pangan Non Tunai (BPNT), dan Bantuan Sosial Tunai (BST). Setiap bantuan memiliki kriteria penerima dan tujuan yang berbeda-beda untuk membantu masyarakat yang membutuhkan.',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 3,
    title: 'Cara Melaporkan Penyelewengan',
    summary: 'Panduan bagi masyarakat untuk melaporkan dugaan penyelewengan dana desa atau bansos.',
    content: 'Masyarakat memiliki hak untuk mengawasi penggunaan dana desa dan penyaluran bansos. Jika menemukan indikasi penyelewengan, masyarakat dapat melaporkannya melalui saluran resmi seperti aplikasi LAPOR!, atau langsung ke inspektorat daerah setempat. Sertakan bukti-bukti yang kuat agar laporan dapat ditindaklanjuti.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000'
  }
])

const activeArticle = ref(null)

const openArticle = (article) => {
  activeArticle.value = article
}

const closeArticle = () => {
  activeArticle.value = null
}
</script>

<template>
  <div class="education-page">
    <div class="container">
      <div class="header-section">
        <h1>Edukasi Publik</h1>
        <p>Pelajari hak Anda dan transparansi anggaran pemerintah</p>
      </div>

      <div class="articles-grid">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <div class="article-image" :style="{ backgroundImage: `url(${article.image})` }"></div>
          <div class="article-content">
            <h3>{{ article.title }}</h3>
            <p>{{ article.summary }}</p>
            <button class="read-more-btn" @click="openArticle(article)">Baca Selengkapnya</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Modal -->
    <div v-if="activeArticle" class="modal-overlay" @click="closeArticle">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeArticle">&times;</button>
        <div class="modal-header">
          <h2>{{ activeArticle.title }}</h2>
        </div>
        <div class="modal-body">
          <img :src="activeArticle.image" :alt="activeArticle.title" class="modal-image">
          <p>{{ activeArticle.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.education-page {
  padding: 2rem 0 4rem;
  background-color: #f8fafc;
  min-height: 80vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-section h1 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.header-section p {
  color: #64748b;
  font-size: 1.1rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.article-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.article-content {
  padding: 1.5rem;
}

.article-content h3 {
  font-size: 1.25rem;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

.article-content p {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.read-more-btn:hover {
  background-color: #1d4ed8;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #64748b;
}

.modal-header h2 {
  font-size: 1.75rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.modal-body p {
  color: #334155;
  line-height: 1.8;
  font-size: 1.1rem;
}

@media (max-width: 640px) {
  .header-section h1 {
    font-size: 2rem;
  }
  
  .modal-image {
    height: 200px;
  }
}
</style>
