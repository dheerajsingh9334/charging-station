<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useChargersStore } from '../../store/chargers';
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'vue-router';
import LoadingSpinner from '../../components/ui/LoadingSpinner.vue';

const router = useRouter();
const chargersStore = useChargersStore();
const authStore = useAuthStore();

const stats = ref({
  totalChargers: 0,
  activeChargers: 0,
  inactiveChargers: 0,
  maintenanceChargers: 0
});

const isLoading = computed(() => chargersStore.loading);

onMounted(async () => {
  // Remove admin check to allow all logged in users to access the dashboard.
  // if (!authStore.isAdmin) {
  //   router.push('/chargers');
  //   return;
  // }
  
  await chargersStore.fetchChargers();
  updateStats();
});

function updateStats() {
  const chargers = chargersStore.chargers;
  stats.value = {
    totalChargers: chargers.length,
    activeChargers: chargers.filter(c => c.status === 'active').length,
    inactiveChargers: chargers.filter(c => c.status === 'inactive').length,
    maintenanceChargers: chargers.filter(c => c.status === 'maintenance').length
  };
}

function navigateToChargers() {
  router.push('/chargers');
}

function navigateToAddCharger() {
  router.push('/chargers/add');
}

async function handleDelete(chargerId: string) {
  if (!confirm('Are you sure you want to delete this charging station?')) return;
  
  // Call the delete method from the chargersStore (ensure it exists)
  const success = await chargersStore.deleteCharger(chargerId);
  if (success) {
    // Refresh the chargers list and update stats
    await chargersStore.fetchChargers();
    updateStats();
  }
}

// Computed sorted recent chargers
const sortedChargers = computed(() => {
  return [...chargersStore.chargers].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime() || 0;
    const dateB = new Date(b.createdAt).getTime() || 0;
    return dateB - dateA;
  });
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div class="space-x-4">
        <button @click="navigateToChargers" class="btn btn-outline">
          View All Stations
        </button>
        <button @click="navigateToAddCharger" class="btn btn-primary">
          Add New Station
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center my-12">
      <LoadingSpinner message="Loading dashboard data..." />
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Chargers -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 bg-primary-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Total Stations</h2>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalChargers }}</p>
            </div>
          </div>
        </div>

        <!-- Active Chargers -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 bg-success-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Active</h2>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.activeChargers }}</p>
            </div>
          </div>
        </div>

        <!-- Inactive Chargers -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 bg-error-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Inactive</h2>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.inactiveChargers }}</p>
            </div>
          </div>
        </div>

        <!-- Maintenance Chargers -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="p-3 bg-warning-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-sm font-medium text-gray-600">Maintenance</h2>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.maintenanceChargers }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power Output</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connector Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="charger in sortedChargers.slice(0, 5)" :key="charger.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ charger.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'px-2 py-1 text-xs font-medium rounded-full': true,
                    'bg-success-100 text-success-800': charger.status === 'active',
                    'bg-error-100 text-error-800': charger.status === 'inactive',
                    'bg-warning-100 text-warning-800': charger.status === 'maintenance'
                  }">
                    {{ charger.status.charAt(0).toUpperCase() + charger.status.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ charger.powerOutput }} kW</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ charger.connectorType }}</td>
                <td class="px-6 py-4 whitespace-nowrap flex items-center space-x-2">
                  <router-link 
                    :to="`/chargers/edit/${charger.id}`"
                    class="text-secondary-500 border-lime-100 boldhover:text-secondary-900"
                  >
                    Edit
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>