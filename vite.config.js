import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Base URL untuk GitHub Pages
  // Ganti 'Pantau-dana' dengan nama repository GitHub Anda
  base: process.env.NODE_ENV === 'production' ? '/Pantau-dana/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimasi untuk production
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue']
        }
      }
    }
  }
})
