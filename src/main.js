import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupErrorHandler } from './utils/errorHandler.js'
import { storage } from './services/storage.js'

// Create Vue app
const app = createApp(App)

// Setup global error handling
setupErrorHandler(app)

// Initialize storage (IndexedDB)
storage.init().then(() => {
  console.log('Storage initialized')
}).catch((err) => {
  console.warn('Storage initialization failed, using fallback:', err)
})

// Mount app
app.mount('#app')

