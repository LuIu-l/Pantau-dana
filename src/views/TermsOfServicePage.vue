<script setup>
import TermsOfServiceComponent from '@/components/legal/TermsOfService.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigate = (page) => {
  const routes = {
    'home': '/',
    'terms': '/syarat',
    'privacy': '/privasi'
  }
  router.push(routes[page] || '/')
}
</script>

<template>
  <div class="terms-view">
    <TermsOfServiceComponent @navigate="navigate" />
  </div>
</template>

<style scoped>
.terms-view {
  min-height: 60vh;
}
</style>
