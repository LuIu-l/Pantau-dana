<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.2"/>
              <path d="M12 24 L18 16 L22 22 L28 12" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Pantau Desa</span>
          </div>
          <p class="footer-tagline">
            Platform transparansi Dana Desa dan Bantuan Sosial untuk Indonesia yang lebih baik.
          </p>
        </div>
        
        <div class="footer-links">
          <div class="footer-section">
            <h4>Navigasi</h4>
            <ul>
              <li><a href="#" @click.prevent="$emit('navigate', 'home')">Beranda</a></li>
              <li><a href="#" @click.prevent="$emit('navigate', 'bansos')">Cek Penerima Bansos</a></li>
              <li><a href="#" @click.prevent="$emit('navigate', 'lacak')">Lacak Laporan</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Informasi</h4>
            <ul>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Cara Penggunaan</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Kontak</h4>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="footer-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@pantaudesa.id
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="footer-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                (021) 1500-123
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Pantau Desa. Dibuat untuk Indonesia 🇮🇩</p>
        <p class="footer-disclaimer">
          Data yang ditampilkan merupakan data simulasi untuk keperluan demonstrasi.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

defineEmits(['navigate'])

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  margin-top: auto;
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
}

.footer-content {
  display: grid;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 1.5fr 2fr;
  }
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.footer-logo svg {
  width: 36px;
  height: 36px;
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-sm);
  line-height: 1.6;
  margin: 0;
}

.footer-links {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.footer-section h4 {
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-md);
  color: rgba(255, 255, 255, 0.6);
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.footer-section a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.footer-section a:hover {
  color: white;
  text-decoration: underline;
}

.footer-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.footer-bottom {
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
}

.footer-disclaimer {
  margin-top: var(--spacing-sm) !important;
  font-size: var(--font-size-xs) !important;
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
