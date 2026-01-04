<script setup>
import PrivacyPolicyComponent from '@/components/legal/PrivacyPolicy.vue'
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
  <div class="privacy-view">
    <PrivacyPolicyComponent @navigate="navigate" />
  </div>
</template>

<style scoped>
.privacy-view {
  min-height: 60vh;
}
</style>
