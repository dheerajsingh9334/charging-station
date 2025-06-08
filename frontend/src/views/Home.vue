<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const authStore = useAuthStore();

function navigateToLogin() {
  router.push('/login');
}

function navigateToRegister() {
  router.push('/register');
}

function navigateToChargers() {
  router.push('/chargers');
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-primary-500 to-primary-700 flex flex-col justify-center">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
          EV Charging Station Management
        </h1>
        <p class="text-xl text-white opacity-90 mb-10 max-w-2xl mx-auto">
          A comprehensive platform to manage your EV charging infrastructure with real-time monitoring and seamless control.
        </p>
        
        <div class="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center mt-8">
          <button 
            v-if="!authStore.isAuthenticated"
            @click="navigateToLogin"
            class="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            Login
          </button>
          <button 
            v-if="!authStore.isAuthenticated"
            @click="navigateToRegister"
            class="btn bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 rounded-md font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg border border-primary-400"
          >
            Register
          </button>
          <button 
            v-if="authStore.isAuthenticated"
            @click="navigateToChargers"
            class="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            View Charging Stations
          </button>
        </div>
      </div>
      
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="bg-white rounded-lg shadow-xl p-6 transform transition-all duration-500 hover:-translate-y-2">
          <div class="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Real-time Monitoring</h3>
          <p class="text-gray-600">Monitor your charging stations in real-time with status updates and power consumption tracking.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-xl p-6 transform transition-all duration-500 hover:-translate-y-2">
          <div class="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Map Visualization</h3>
          <p class="text-gray-600">View all your charging stations on an interactive map for better geographical insights.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-xl p-6 transform transition-all duration-500 hover:-translate-y-2">
          <div class="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Easy Management</h3>
          <p class="text-gray-600">Add, update, and manage your charging stations with an intuitive and user-friendly interface.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>