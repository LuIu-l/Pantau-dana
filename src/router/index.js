import { createRouter, createWebHistory } from 'vue-router'

// Lazy load all page components for better performance
const HomePage = () => import('@/views/HomePage.vue')
const BansosPage = () => import('@/views/BansosPage.vue')
const EducationPage = () => import('@/views/EducationPage.vue')
const ReportPage = () => import('@/views/ReportPage.vue')
const PrivacyPolicyPage = () => import('@/views/PrivacyPolicyPage.vue')
const TermsOfServicePage = () => import('@/views/TermsOfServicePage.vue')
const NotFoundPage = () => import('@/views/NotFoundPage.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Pantau Dana Desa - Transparansi Anggaran Desa',
      description: 'Platform transparansi untuk memantau penggunaan dana desa'
    }
  },
  {
    path: '/desa/:id',
    name: 'desa-detail',
    component: HomePage,
    meta: {
      title: 'Detail Desa - Pantau Dana Desa'
    }
  },
  {
    path: '/bansos',
    name: 'bansos',
    component: BansosPage,
    meta: {
      title: 'Cek Bansos - Pantau Dana Desa',
      description: 'Cek status penerima bantuan sosial di desa Anda'
    }
  },
  {
    path: '/edukasi',
    name: 'education',
    component: EducationPage,
    meta: {
      title: 'Edukasi - Pantau Dana Desa',
      description: 'Pelajari tentang pengelolaan dana desa dan hak masyarakat'
    }
  },
  {
    path: '/lapor',
    name: 'report',
    component: ReportPage,
    meta: {
      title: 'Lapor - Pantau Dana Desa',
      description: 'Laporkan dugaan penyimpangan penggunaan dana desa'
    }
  },
  {
    path: '/privasi',
    name: 'privacy',
    component: PrivacyPolicyPage,
    meta: {
      title: 'Kebijakan Privasi - Pantau Dana Desa'
    }
  },
  {
    path: '/syarat',
    name: 'terms',
    component: TermsOfServicePage,
    meta: {
      title: 'Syarat & Ketentuan - Pantau Dana Desa'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: {
      title: 'Halaman Tidak Ditemukan - Pantau Dana Desa'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Update document title on navigation
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Pantau Dana Desa'
  
  // Update meta description
  const descriptionMeta = document.querySelector('meta[name="description"]')
  if (descriptionMeta && to.meta.description) {
    descriptionMeta.setAttribute('content', to.meta.description)
  }
  
  next()
})

export default router
