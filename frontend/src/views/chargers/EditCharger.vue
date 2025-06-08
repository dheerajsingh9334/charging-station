<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useChargersStore } from '../../store/chargers';
import ChargerForm from '../../components/chargers/ChargerForm.vue';
import LoadingSpinner from '../../components/ui/LoadingSpinner.vue';
import type { ChargingStation } from '../../types/ChargingStation';

const router = useRouter();
const route = useRoute();
const chargersStore = useChargersStore();

const chargerId = route.params.id as string;
const charger = ref<ChargingStation | null>(null);
const isLoading = ref(true);
const notFound = ref(false);

onMounted(async () => {
  try {
    console.log('Fetching charger with id:', chargerId);
    const data = await chargersStore.fetchChargerById(chargerId);
    console.log('Fetched charger data:', data);
    
    if (!data) {
      console.error('No data returned from API');
      notFound.value = true;
      return;
    }

    // Check for both id formats (MongoDB typically uses _id)
    if (data.id || data._id) {
      charger.value = data;
    } else {
      console.error('Invalid data structure:', data);
      notFound.value = true;
    }
  } catch (error) {
    console.error('Failed to fetch charger:', error);
    notFound.value = true;
  } finally {
    isLoading.value = false;
  }
});

async function handleSubmit(data: Omit<ChargingStation, 'id'>) {
  const updatedCharger = await chargersStore.updateCharger(chargerId, data);
  if (updatedCharger) {
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
        <h1 class="text-2xl font-bold text-gray-800">Edit Charging Station</h1>
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
      
      <div v-if="isLoading" class="bg-white rounded-lg shadow-md p-6 flex justify-center py-12">
        <LoadingSpinner message="Loading charging station data..." />
      </div>
      
      <div v-else-if="notFound" class="bg-white rounded-lg shadow-md p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Charging Station Not Found</h3>
        <p class="text-gray-600 mb-6">
          The charging station you're trying to edit could not be found or has been deleted.
        </p>
        <router-link 
          to="/chargers" 
          class="btn btn-primary"
        >
          Return to Charging Stations
        </router-link>
      </div>
      
      <div v-else class="bg-white rounded-lg shadow-md p-6">
        <ChargerForm 
          :initial-data="charger"
          :is-edit="true"
          @submit="handleSubmit" 
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>