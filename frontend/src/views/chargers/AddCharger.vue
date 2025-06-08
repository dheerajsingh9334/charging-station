<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useChargersStore } from '../../store/chargers';
import ChargerForm from '../../components/chargers/ChargerForm.vue';
import type { ChargingStation } from '../../types/ChargingStation';

const router = useRouter();
const chargersStore = useChargersStore();

async function handleSubmit(data: Omit<ChargingStation, 'id'>) {
  const newCharger = await chargersStore.createCharger(data);
  if (newCharger) {
    router.push('/chargers');
  }
}

function handleCancel() {
  router.push('/chargers');
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Add New Charging Station</h1>
        <router-link 
          to="/chargers" 
          class="text-secondary-600 hover:text-secondary-800 flex items-center transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to List
        </router-link>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <ChargerForm 
          @submit="handleSubmit" 
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>