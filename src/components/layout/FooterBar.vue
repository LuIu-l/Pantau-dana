<template>
  <footer class="footer">
    <div class="footer-glow"></div>
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="url(#footerGrad)"/>
                <path d="M12 24 L18 16 L22 22 L28 12" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                  <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#2563EB"/>
                    <stop offset="100%" stop-color="#8B5CF6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>Pantau Desa</span>
          </div>
          <p class="footer-tagline">
            Platform transparansi Dana Desa dan Bantuan Sosial untuk Indonesia yang lebih baik dan lebih transparan.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" class="social-link" title="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" class="social-link" title="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" class="social-link" title="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="footer-section">
            <h4>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z"/>
                <path d="M9 21V12h6v9"/>
              </svg>
              Navigasi
            </h4>
            <ul>
              <li><router-link to="/">Beranda</router-link></li>
              <li><router-link to="/bansos">Cek Penerima Bansos</router-link></li>
              <li><router-link to="/lapor">Lacak Laporan</router-link></li>
              <li><router-link to="/edukasi">Edukasi</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              Informasi
            </h4>
            <ul>
              <li><router-link to="/">Tentang Kami</router-link></li>
              <li><router-link to="/edukasi">Cara Penggunaan</router-link></li>
              <li><router-link to="/edukasi">FAQ</router-link></li>
              <li><router-link to="/privasi">Kebijakan Privasi</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 11a8 8 0 0 1-1 4 8 8 0 0 1-7 4 8 8 0 0 1-4-1L3 21l3-6a8 8 0 0 1-1-4 8 8 0 0 1 4-7 8 8 0 0 1 4-1h1a8 8 0 0 1 7 7v1z"/>
              </svg>
              Kontak
            </h4>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="footer-icon">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <path d="M3 7l9 6 9-6"/>
                </svg>
                info@pantaudesa.id
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="footer-icon">
                  <path d="M22 17v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3"/>
                  <path d="M6 9V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/>
                  <rect x="4" y="9" width="16" height="9" rx="2"/>
                </svg>
                (021) 1500-123
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="footer-icon">
                  <circle cx="12" cy="10" r="3"/>
                  <path d="M12 21c-4 0-7-5-7-11a7 7 0 0 1 14 0c0 6-3 11-7 11z"/>
                </svg>
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>
            &copy; {{ currentYear }} Pantau Desa. Developed by 
            <a href="https://github.com/LuIu-l" target="_blank" rel="noopener noreferrer" class="github-link">
              <svg viewBox="0 0 24 24" fill="currentColor" class="github-icon">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              LuIu-l
            </a>
          </p>
          <div class="footer-bottom-links">
            <a href="#" @click.prevent="$emit('navigate', 'terms')">Syarat & Ketentuan</a>
            <span>•</span>
            <a href="#" @click.prevent="$emit('navigate', 'privacy')">Privasi</a>
            <span>•</span>
            <a href="#" @click.prevent="$emit('navigate', 'home')">Peta Situs</a>
          </div>
        </div>
        <p class="footer-disclaimer">
          △ Data yang ditampilkan merupakan data simulasi untuk keperluan demonstrasi.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  margin-top: auto;
  background: var(--gradient-dark);
  color: white;
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  position: relative;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: var(--gradient-primary);
  box-shadow: 0 0 60px 30px rgba(37, 99, 235, 0.3);
}

.footer-content {
  display: grid;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 1.2fr 2fr;
  }
}

.footer-brand {
  max-width: 350px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
}

.logo-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

.logo-icon svg {
  width: 100%;
  height: 100%;
}

.footer-tagline {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0 0 var(--spacing-lg) 0;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s var(--transition-bounce);
  border: 1px solid rgba(255,255,255,0.1);
}

.social-link:hover {
  background: var(--gradient-primary);
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
}

.social-link svg {
  width: 18px;
  height: 18px;
}

.footer-links {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.footer-section h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--spacing-lg);
  color: white;
}

.footer-section h4 svg {
  width: 18px;
  height: 18px;
  color: var(--color-secondary);
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
  margin-bottom: 0.875rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
}

.footer-section a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  position: relative;
}

.footer-section a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
}

.footer-section a:hover {
  color: white;
}

.footer-section a:hover::after {
  width: 100%;
}

.footer-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-secondary);
}

.footer-bottom {
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

@media (min-width: 768px) {
  .footer-bottom-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-bottom p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.footer-bottom-links a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 600;
  margin-left: 0.25rem;
}

.github-link:hover {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.github-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.github-link:hover .github-icon {
  transform: scale(1.1);
}

.footer-bottom-links a:hover {
  color: white;
}

.footer-bottom-links span {
  color: rgba(255,255,255,0.3);
}

.footer-disclaimer {
  margin-top: var(--spacing-md) !important;
  font-size: 0.8rem !important;
  color: rgba(255, 255, 255, 0.4) !important;
  background: rgba(255,255,255,0.05);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  display: inline-block;
}
</style>
