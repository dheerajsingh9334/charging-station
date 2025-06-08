<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const authStore = useAuthStore();
const router = useRouter();
const isMenuOpen = ref(false);

const isAuthenticated = computed(() => authStore.isAuthenticated);
// const isAdmin = computed(() => authStore.isAdmin);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function logout() {
  authStore.logout();
  router.push('/login');
  closeMenu();
}
</script>

<template>
  <nav class="bg-primary-500 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-white font-bold text-xl">
              EV Charging
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              v-if="isAuthenticated"
              to="/chargers" 
              class="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="bg-primary-600"
            >
              Charging Stations
            </router-link>
            <router-link 
              v-if="isAuthenticated"
              to="/chargers/map" 
              class="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="bg-primary-600"
            >
              Map View
            </router-link>
            <router-link 
              v-if="isAuthenticated "
              to="/admin" 
              class="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="bg-primary-600"
            >
              Admin Dashboard
            </router-link>
            <router-link 
              v-if="isAuthenticated"
              to="/chargers/add" 
              class="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="bg-primary-600"
            >
              Add Station
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div v-if="isAuthenticated" class="ml-3 relative">
            <button 
              @click="logout" 
              class="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
          <div v-else class="flex space-x-4">
            <router-link 
              to="/login" 
              class="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="bg-primary-600"
            >
              Login
            </router-link>
            <router-link 
              to="/register" 
              class="text-white hover:text-primary-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              active-class="bg-primary-600"
            >
              Register
            </router-link>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button 
            @click="toggleMenu" 
            class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg 
              v-if="!isMenuOpen" 
              class="block h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Icon when menu is open -->
            <svg 
              v-else 
              class="block h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition 
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isMenuOpen" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link 
            v-if="isAuthenticated"
            to="/chargers" 
            @click="closeMenu"
            class="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="bg-primary-600"
          >
            Charging Stations
          </router-link>
          <router-link 
            v-if="isAuthenticated"
            to="/chargers/map" 
            @click="closeMenu"
            class="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="bg-primary-600"
          >
            Map View
          </router-link>
          <router-link 
            v-if="isAuthenticated"
            to="/admin" 
            @click="closeMenu"
            class="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="bg-primary-600"
          >
            Admin Dashboard
          </router-link>
          <router-link 
            v-if="isAuthenticated "
            to="/chargers/add" 
            @click="closeMenu"
            class="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            active-class="bg-primary-600"
          >
            Add Station
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-primary-600">
          <div class="space-y-1">
            <div v-if="isAuthenticated">
              <button 
                @click="logout" 
                class="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Logout
              </button>
            </div>
            <div v-else class="space-y-1">
              <router-link 
                to="/login" 
                @click="closeMenu"
                class="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                active-class="bg-primary-600"
              >
                Login
              </router-link>
              <router-link 
                to="/register" 
                @click="closeMenu"
                class="text-white hover:bg-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                active-class="bg-primary-600"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>