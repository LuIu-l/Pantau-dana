import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { setupErrorHandler } from './utils/errorHandler.js'
import { storage } from './services/storage.js'

// Create Vue app
const app = createApp(App)

// Create Pinia store
const pinia = createPinia()

// Setup global error handling
setupErrorHandler(app)

// Use plugins
app.use(pinia)
app.use(router)

// Initialize storage (IndexedDB)
storage.init().then(() => {
  console.log('Storage initialized')
}).catch((err) => {
  console.warn('Storage initialization failed, using fallback:', err)
})

// Mount app
app.mount('#app')

