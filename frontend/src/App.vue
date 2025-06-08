<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './store/auth';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  // Check if token exists in localStorage and validate it
  authStore.checkAuth();
});

// Watch for auth state changes
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (!isAuthenticated && !router.currentRoute.value.meta.public) {
    router.push('/login');
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>