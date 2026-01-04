<script setup>
import { ref, computed } from 'vue'

// State
const activeCategory = ref('dana-desa')
const searchQuery = ref('')
const expandedFaq = ref(null)
const showChatWidget = ref(false)
const chatMessages = ref([
  { from: 'bot', text: 'Halo! 👋 Saya asisten virtual PantauDesa. Ada yang bisa saya bantu?' }
])
const chatInput = ref('')
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// FAQ Categories
const faqCategories = [
  { id: 'dana-desa', label: 'Dana Desa', icon: '💰' },
  { id: 'bansos', label: 'Bansos', icon: '🤝' },
  { id: 'laporan', label: 'Pelaporan', icon: '📝' },
  { id: 'tracking', label: 'Lacak Laporan', icon: '🔍' },
  { id: 'akun', label: 'Akun', icon: '👤' }
]

// FAQ Data
const faqData = {
  'dana-desa': [
    {
      question: 'Apa itu Dana Desa?',
      answer: 'Dana Desa adalah dana yang bersumber dari APBN yang ditransfer melalui APBD Kabupaten/Kota dan diprioritaskan untuk pembangunan dan pemberdayaan masyarakat desa. Dana ini dialokasikan untuk semua desa di Indonesia dengan besaran yang bervariasi.'
    },
    {
      question: 'Bagaimana cara menghitung alokasi Dana Desa?',
      answer: 'Alokasi Dana Desa dihitung berdasarkan formula: 90% Alokasi Dasar + 10% Alokasi Formula. Alokasi formula mempertimbangkan jumlah penduduk, angka kemiskinan, luas wilayah, dan tingkat kesulitan geografis desa.'
    },
    {
      question: 'Untuk apa saja Dana Desa boleh digunakan?',
      answer: 'Dana Desa dapat digunakan untuk: 1) Pembangunan infrastruktur desa (jalan, jembatan, irigasi), 2) Pemberdayaan masyarakat (pelatihan, UMKM), 3) Pembinaan kemasyarakatan, 4) Penanggulangan bencana, dan 5) BLT Dana Desa untuk keluarga miskin.'
    },
    {
      question: 'Kapan Dana Desa disalurkan?',
      answer: 'Dana Desa disalurkan dalam 3 tahap: Tahap I (40%) pada bulan Januari-Maret, Tahap II (40%) pada bulan April-Juni, dan Tahap III (20%) pada bulan Juli-September. Jadwal dapat berubah sesuai kebijakan pemerintah.'
    }
  ],
  'bansos': [
    {
      question: 'Bagaimana cara mengecek apakah saya terdaftar sebagai penerima bansos?',
      answer: 'Anda dapat mengecek status penerima bansos melalui menu "Cek Bansos" di aplikasi ini. Masukkan NIK dan nama lengkap Anda, kemudian pilih desa domisili. Sistem akan menampilkan status kepesertaan Anda di berbagai program bantuan.'
    },
    {
      question: 'Apa yang harus dilakukan jika data penerima bansos tidak sesuai?',
      answer: 'Jika data tidak sesuai, Anda dapat: 1) Mengajukan pengaduan ke kantor desa dengan membawa KTP dan KK, 2) Melaporkan melalui fitur laporan di aplikasi ini, 3) Menghubungi Dinas Sosial setempat, atau 4) Mengadu ke SP4N-LAPOR!'
    },
    {
      question: 'Apa saja jenis bantuan sosial yang tersedia?',
      answer: 'Beberapa jenis bansos: PKH (Program Keluarga Harapan), BPNT/Kartu Sembako, BST (Bantuan Sosial Tunai), BLT Dana Desa, PIP (Program Indonesia Pintar), dan bantuan untuk penyandang disabilitas.'
    }
  ],
  'laporan': [
    {
      question: 'Apakah identitas pelapor akan dijaga kerahasiaannya?',
      answer: 'Ya, identitas pelapor dijamin kerahasiaannya sesuai UU Perlindungan Saksi dan Korban. Data pelapor dienkripsi dan hanya dapat diakses oleh pihak berwenang yang menangani laporan. Anda juga bisa memilih untuk melaporkan secara anonim.'
    },
    {
      question: 'Berapa lama proses penanganan laporan?',
      answer: 'Setiap laporan akan diverifikasi dalam 3-5 hari kerja. Setelah verifikasi, laporan akan ditindaklanjuti dalam 14-30 hari kerja tergantung kompleksitas kasus. Anda dapat memantau status laporan melalui kode tiket yang diberikan.'
    },
    {
      question: 'Bukti apa saja yang perlu dilampirkan saat melapor?',
      answer: 'Bukti yang bisa dilampirkan: foto/video dokumentasi, dokumen pendukung (surat, nota, kuitansi), data saksi, screenshot percakapan jika relevan. Semakin lengkap bukti, semakin cepat proses verifikasi.'
    }
  ],
  'tracking': [
    {
      question: 'Bagaimana cara melacak status laporan saya?',
      answer: 'Buka halaman "Lacak Laporan", masukkan kode tiket yang Anda terima saat membuat laporan (format: LPR-YYYY-XXXXXX). Sistem akan menampilkan status terkini, riwayat penanganan, dan estimasi penyelesaian.'
    },
    {
      question: 'Apa arti status-status laporan?',
      answer: 'Status laporan: "Diterima" (baru masuk), "Verifikasi" (sedang dicek), "Investigasi" (sedang ditindaklanjuti), "Selesai" (sudah ada hasil), "Ditolak" (tidak memenuhi syarat/bukti kurang).'
    }
  ],
  'akun': [
    {
      question: 'Apakah harus membuat akun untuk menggunakan aplikasi ini?',
      answer: 'Tidak wajib. Fitur utama seperti melihat data desa, cek bansos, dan membuat laporan dapat digunakan tanpa akun. Namun, dengan membuat akun, Anda mendapatkan fitur tambahan seperti menyimpan desa favorit, riwayat laporan, dan notifikasi.'
    },
    {
      question: 'Bagaimana cara menghapus akun saya?',
      answer: 'Untuk menghapus akun, buka Pengaturan > Akun > Hapus Akun. Atau hubungi kami melalui email support@pantaudesa.id dengan subjek "Permintaan Hapus Akun" beserta NIK/email terdaftar.'
    }
  ]
}

// Video Tutorials
const videoTutorials = [
  {
    id: 1,
    title: 'Cara Mencari Data Desa',
    description: 'Panduan lengkap mencari dan melihat data desa',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
    duration: '5:32'
  },
  {
    id: 2,
    title: 'Cara Membuat Laporan',
    description: 'Langkah-langkah membuat laporan pengaduan',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop',
    duration: '8:15'
  },
  {
    id: 3,
    title: 'Cara Cek Status Bansos',
    description: 'Tutorial mengecek kepesertaan bantuan sosial',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop',
    duration: '4:45'
  }
]

// Chatbot responses
const chatbotKeywords = {
  'dana desa': 'Dana Desa adalah dana dari APBN untuk pembangunan desa. Anda bisa melihat alokasi dan penggunaan dana desa di halaman Jelajahi.',
  'bansos': 'Untuk cek status bansos, buka menu Cek Bansos dan masukkan NIK Anda. Sistem akan menampilkan status kepesertaan berbagai program bantuan.',
  'lapor': 'Untuk membuat laporan, klik tombol "Buat Laporan", pilih jenis pelanggaran, isi detail dan lampirkan bukti. Simpan kode tiket untuk melacak status.',
  'lacak': 'Untuk melacak laporan, buka halaman "Lacak Laporan" dan masukkan kode tiket yang Anda terima (format: LPR-YYYY-XXXXXX).',
  'kontak': 'Anda bisa menghubungi kami via email: help@pantaudesa.id atau WhatsApp: +62 812-3456-7890 (Senin-Jumat, 09:00-17:00 WIB)',
  'default': 'Maaf, saya belum memahami pertanyaan Anda. Coba tanyakan tentang: dana desa, bansos, cara melapor, atau cara melacak laporan. Atau hubungi tim kami untuk bantuan lebih lanjut.'
}

// Computed
const filteredFaq = computed(() => {
  let faqs = faqData[activeCategory.value] || []
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    faqs = faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }
  
  return faqs
})

// Methods
const toggleFaq = (index) => {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const sendChat = () => {
  if (!chatInput.value.trim()) return
  
  const userMessage = chatInput.value.trim()
  chatMessages.value.push({ from: 'user', text: userMessage })
  chatInput.value = ''
  
  setTimeout(() => {
    const response = findBotResponse(userMessage)
    chatMessages.value.push({ from: 'bot', text: response })
  }, 800)
}

const findBotResponse = (query) => {
  const q = query.toLowerCase()
  
  for (const [keyword, response] of Object.entries(chatbotKeywords)) {
    if (keyword !== 'default' && q.includes(keyword)) {
      return response
    }
  }
  
  return chatbotKeywords.default
}

const submitContact = () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    alert('Mohon lengkapi semua field yang wajib diisi.')
    return
  }
  alert('Pesan Anda telah terkirim! Kami akan membalas dalam 1x24 jam.')
  contactForm.value = { name: '', email: '', subject: '', message: '' }
}

const selectChatOption = (option) => {
  chatMessages.value.push({ from: 'user', text: option.text })
  setTimeout(() => {
    chatMessages.value.push({ from: 'bot', text: option.response })
  }, 600)
}

const quickChatOptions = [
  { text: 'Cara cari data desa', response: 'Untuk mencari data desa: 1) Buka halaman Beranda atau Jelajahi, 2) Gunakan kotak pencarian atau pilih provinsi, 3) Telusuri kabupaten > kecamatan > desa, 4) Klik desa untuk melihat detail anggaran dan proyek.' },
  { text: 'Cara membuat laporan', response: 'Untuk membuat laporan: 1) Klik "Buat Laporan" di Beranda, 2) Pilih jenis pelanggaran, 3) Isi kronologi lengkap, 4) Lampirkan bukti foto/dokumen, 5) Submit dan simpan kode tiket untuk tracking.' },
  { text: 'Cara cek bansos', response: 'Untuk cek bansos: 1) Buka menu "Cek Bansos", 2) Masukkan NIK dan nama lengkap, 3) Sistem akan menampilkan status kepesertaan PKH, BPNT, BST, BLT Dana Desa, dan program lainnya.' }
]
</script>

<template>
  <div class="help-page">
    <!-- Hero Section -->
    <section class="help-hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Pusat Bantuan
          </span>
          <h1>Bagaimana kami bisa <span class="gradient-text">membantu?</span></h1>
          <p>Temukan jawaban, panduan, dan dukungan untuk penggunaan aplikasi PantauDesa</p>
          
          <!-- Search Box -->
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Cari pertanyaan atau topik..."
            />
          </div>
        </div>
      </div>
    </section>

    <div class="container main-content">
      <!-- Category Cards -->
      <section class="categories-section">
        <div class="category-grid">
          <button
            v-for="cat in faqCategories"
            :key="cat.id"
            class="category-card"
            :class="{ active: activeCategory === cat.id }"
            @click="activeCategory = cat.id; expandedFaq = null"
          >
            <span class="category-icon">{{ cat.icon }}</span>
            <span class="category-label">{{ cat.label }}</span>
          </button>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section">
        <div class="section-header">
          <h2>❓ Pertanyaan Umum (FAQ)</h2>
          <p>Kategori: {{ faqCategories.find(c => c.id === activeCategory)?.label }}</p>
        </div>
        
        <div class="faq-list">
          <div 
            v-for="(faq, index) in filteredFaq"
            :key="index"
            class="faq-item"
            :class="{ expanded: expandedFaq === index }"
          >
            <button class="faq-question" @click="toggleFaq(index)">
              <span class="faq-text">{{ faq.question }}</span>
              <span class="faq-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </span>
            </button>
            <transition name="slide-fade">
              <div v-if="expandedFaq === index" class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </transition>
          </div>
          
          <div v-if="filteredFaq.length === 0" class="no-results">
            <span class="no-results-icon">🔍</span>
            <p>Tidak ada hasil yang ditemukan untuk "{{ searchQuery }}"</p>
            <button class="btn-reset" @click="searchQuery = ''">Reset Pencarian</button>
          </div>
        </div>
      </section>

      <!-- Video Tutorials -->
      <section class="videos-section">
        <div class="section-header">
          <h2>🎬 Video Tutorial</h2>
          <p>Panduan visual penggunaan aplikasi</p>
        </div>
        
        <div class="videos-grid">
          <div 
            v-for="video in videoTutorials"
            :key="video.id"
            class="video-card"
          >
            <div class="video-thumbnail">
              <img :src="video.thumbnail" :alt="video.title" loading="lazy" />
              <div class="play-overlay">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span class="video-duration">{{ video.duration }}</span>
            </div>
            <div class="video-info">
              <h3>{{ video.title }}</h3>
              <p>{{ video.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="contact-section">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-card">
            <div class="card-header">
              <h2>📩 Hubungi Kami</h2>
              <p>Masih ada pertanyaan? Kirim pesan dan tim kami akan membantu Anda.</p>
            </div>
            
            <form @submit.prevent="submitContact">
              <div class="form-row">
                <div class="form-group">
                  <label>Nama Lengkap *</label>
                  <input v-model="contactForm.name" type="text" required placeholder="Masukkan nama lengkap" />
                </div>
                <div class="form-group">
                  <label>Email *</label>
                  <input v-model="contactForm.email" type="email" required placeholder="nama@email.com" />
                </div>
              </div>
              
              <div class="form-group">
                <label>Subjek</label>
                <select v-model="contactForm.subject">
                  <option value="">Pilih subjek (opsional)</option>
                  <option value="general">Pertanyaan Umum</option>
                  <option value="bug">Laporkan Bug</option>
                  <option value="feedback">Saran & Masukan</option>
                  <option value="partnership">Kerjasama</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Pesan *</label>
                <textarea v-model="contactForm.message" rows="5" required placeholder="Tuliskan pesan Anda di sini..."></textarea>
              </div>
              
              <button type="submit" class="btn-submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Kirim Pesan
              </button>
            </form>
          </div>
          
          <!-- Quick Contact -->
          <div class="quick-contact">
            <div class="contact-card">
              <div class="contact-icon-wrapper email">
                <span>📧</span>
              </div>
              <div class="contact-info">
                <h3>Email</h3>
                <p>help@pantaudesa.id</p>
              </div>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon-wrapper whatsapp">
                <span>📱</span>
              </div>
              <div class="contact-info">
                <h3>WhatsApp</h3>
                <p>+62 812-3456-7890</p>
              </div>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon-wrapper office">
                <span>🏢</span>
              </div>
              <div class="contact-info">
                <h3>Kantor</h3>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
            
            <div class="contact-card">
              <div class="contact-icon-wrapper time">
                <span>⏰</span>
              </div>
              <div class="contact-info">
                <h3>Jam Operasional</h3>
                <p>Senin - Jumat, 09:00 - 17:00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Chat Widget -->
    <div class="chat-widget" :class="{ open: showChatWidget }">
      <button class="chat-toggle" @click="showChatWidget = !showChatWidget" :aria-label="showChatWidget ? 'Tutup chat' : 'Buka chat'">
        <svg v-if="!showChatWidget" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      
      <transition name="slide-up">
        <div v-if="showChatWidget" class="chat-window">
          <div class="chat-header">
            <div class="chat-avatar">🤖</div>
            <div class="chat-header-info">
              <h4>Asisten Virtual</h4>
              <span class="status">Online</span>
            </div>
            <button class="close-chat" @click="showChatWidget = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div class="chat-messages" ref="chatMessagesRef">
            <div 
              v-for="(msg, index) in chatMessages"
              :key="index"
              class="message"
              :class="msg.from"
            >
              {{ msg.text }}
            </div>
            
            <!-- Quick Options -->
            <div v-if="chatMessages.length === 1" class="quick-options">
              <p>Pilih topik:</p>
              <button 
                v-for="(option, index) in quickChatOptions" 
                :key="index"
                class="quick-option-btn"
                @click="selectChatOption(option)"
              >
                {{ option.text }}
              </button>
            </div>
          </div>
          
          <div class="chat-input">
            <input 
              v-model="chatInput"
              type="text"
              placeholder="Ketik pesan..."
              @keyup.enter="sendChat"
            />
            <button @click="sendChat" :disabled="!chatInput.trim()">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.help-page {
  min-height: 100vh;
  padding-top: var(--navbar-height);
  padding-bottom: var(--spacing-3xl);
  background-color: var(--color-background);
}

/* Hero Section */
.help-hero {
  position: relative;
  padding: var(--spacing-3xl) 0;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: var(--gradient-hero);
}

.hero-shapes {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: -100px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -50px;
}

.shape-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-badge svg {
  width: 18px;
  height: 18px;
}

.help-hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.help-hero p {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  padding: 0.875rem 1.5rem;
  border-radius: 50px;
  max-width: 550px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-box:focus-within {
  transform: translateY(-2px);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
}

.search-box svg {
  width: 22px;
  height: 22px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--color-text-primary);
  background: transparent;
}

/* Main Content */
.main-content {
  margin-top: -30px;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

/* Categories */
.categories-section {
  padding: 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

@media (max-width: 900px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: var(--color-surface);
  border: 2px solid var(--color-border-light);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.category-card.active {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.category-icon {
  font-size: 2rem;
}

.category-label {
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
}

/* Section Headers */
.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.section-header p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

/* FAQ Section */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.faq-item.expanded {
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 1rem;
}

.faq-text {
  font-weight: 600;
  color: var(--color-text-primary);
  font-size: 1rem;
  line-height: 1.5;
}

.faq-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.faq-icon svg {
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
}

.faq-item.expanded .faq-icon {
  transform: rotate(180deg);
}

.faq-item.expanded .faq-icon svg {
  color: var(--color-primary);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
}

.faq-answer p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-light);
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  background: var(--color-surface);
  border-radius: 16px;
  border: 2px dashed var(--color-border);
}

.no-results-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.no-results p {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.btn-reset {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Videos Section */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .videos-grid {
    grid-template-columns: 1fr;
  }
}

.video-card {
  background: var(--color-surface);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border-light);
}

.video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
}

.video-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  background: #1e293b;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.video-card:hover .video-thumbnail img {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-card:hover .play-overlay {
  opacity: 1;
}

.play-overlay svg {
  width: 64px;
  height: 64px;
  color: white;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
}

.video-duration {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
}

.video-info {
  padding: 1.25rem;
}

.video-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.video-info p {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
}

/* Contact Section */
.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-form-card {
  background: var(--color-surface);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--color-border-light);
}

.card-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border-light);
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

.card-header p {
  color: var(--color-text-secondary);
  margin: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text-primary);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.95rem;
  background: var(--color-background);
  transition: all 0.2s ease;
  color: var(--color-text-primary);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  background: white;
}

.form-group select {
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 18px;
  padding-right: 3rem;
}

.btn-submit {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35);
}

.btn-submit svg {
  width: 20px;
  height: 20px;
}

/* Quick Contact */
.quick-contact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-card {
  background: var(--color-surface);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--color-border-light);
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateX(4px);
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.contact-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.contact-icon-wrapper.email {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
}

.contact-icon-wrapper.whatsapp {
  background: linear-gradient(135deg, #22c55e, #10b981);
}

.contact-icon-wrapper.office {
  background: linear-gradient(135deg, #f59e0b, #f97316);
}

.contact-icon-wrapper.time {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
}

.contact-info h3 {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.contact-info p {
  color: var(--color-text-primary);
  font-weight: 500;
  margin: 0;
}

/* Chat Widget */
.chat-widget {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chat-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
}

.chat-toggle svg {
  width: 28px;
  height: 28px;
}

.chat-window {
  position: absolute;
  bottom: 75px;
  right: 0;
  width: 380px;
  max-width: calc(100vw - 2rem);
  height: 480px;
  background: var(--color-surface);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border-light);
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
}

.chat-avatar {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.chat-header-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.chat-header .status {
  font-size: 0.8rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 6px;
}

.chat-header .status::before {
  content: '';
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
}

.close-chat {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-chat:hover {
  background: rgba(255, 255, 255, 0.25);
}

.close-chat svg {
  width: 18px;
  height: 18px;
}

.chat-messages {
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--color-background);
}

.message {
  max-width: 85%;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.message.bot {
  background: var(--color-surface);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-light);
}

.message.user {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.quick-options {
  margin-top: 0.5rem;
}

.quick-options p {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.quick-option-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.625rem 0.875rem;
  margin-bottom: 0.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--color-primary);
  font-weight: 500;
  transition: all 0.2s ease;
}

.quick-option-btn:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary);
}

.chat-input {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border-light);
}

.chat-input input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  outline: none;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.chat-input input:focus {
  border-color: var(--color-primary);
}

.chat-input button {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}

.chat-input button:disabled {
  background: var(--color-border);
  cursor: not-allowed;
}

.chat-input button:not(:disabled):hover {
  transform: scale(1.05);
}

.chat-input button svg {
  width: 20px;
  height: 20px;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
</style>
