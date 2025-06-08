<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useChargersStore } from '../../store/chargers';
import type { ChargingStation } from '../../types/ChargingStation';
import ChargerCard from '../../components/chargers/ChargerCard.vue';
import ChargerFilters from '../../components/chargers/ChargerFilters.vue';
import DeleteConfirmModal from '../../components/chargers/DeleteConfirmModal.vue';
import LoadingSpinner from '../../components/ui/LoadingSpinner.vue';

const router = useRouter();
const chargersStore = useChargersStore();

const isDeleteModalOpen = ref(false);
const chargerToDelete = ref<ChargingStation | null>(null);
const chargers = computed(() => chargersStore.filteredChargers || []);

onMounted(async () => {
  await chargersStore.fetchChargers();
});

// Computed
const isLoading = computed(() => chargersStore.loading);
const connectorTypes = computed(() => chargersStore.connectorTypes);
const filters = computed(() => chargersStore.filters);
const hasChargers = computed(() => chargers.value.length > 0);

// Methods
function handleEdit(id: string) {
  router.push(`/chargers/edit/${id}`);
}

function openDeleteModal(charger: ChargingStation) {
  chargerToDelete.value = charger;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  isDeleteModalOpen.value = false;
  chargerToDelete.value = null;
}

async function confirmDelete() {
  if (chargerToDelete.value) {
    await chargersStore.deleteCharger(chargerToDelete.value.id);
    closeDeleteModal();
  }
}

function handleDelete(id: string) {
  const charger = chargersStore.chargers.find(c => c.id === id);
  if (charger) {
    openDeleteModal(charger);
  }
}

function handleViewOnMap(charger: ChargingStation) {
  router.push({
    name: 'ChargerMap',
    query: { 
      lat: charger.location.latitude.toString(),
      lng: charger.location.longitude.toString(),
      id: charger.id
    }
  });
}

function updateFilters(newFilters: any) {
  chargersStore.setFilters(newFilters);
}

function resetFilters() {
  chargersStore.resetFilters();
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <div>
       <h1 class="text-2xl font-bold text-gray-800">Charging Stations</h1>
        <p class="text-gray-600 mt-1" v-if="hasChargers && !isLoading">
          Showing {{ chargers.length }} station{{ chargers.length !== 1 ? 's' : '' }}
        </p>
      </div>
      <router-link 
        v-if="$route.meta.requiresAdmin"
        to="/chargers/add" 
        class="btn btn-primary whitespace-nowrap"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Add New Station
      </router-link>
    </div>
    
    <!-- Filters Section -->
    <div class="bg-white rounded-xl shadow-sm p-4 mb-2">
      <ChargerFilters 
        :connector-types="connectorTypes"
        :initial-filters="filters"
        @update:filters="updateFilters"
        @reset="resetFilters"
      />
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center my-12">
      <LoadingSpinner message="Loading charging stations..." />
    </div>
    
    <!-- Empty State -->
    <div v-else-if="!hasChargers" class="bg-white rounded-xl shadow-sm p-12 text-center my-8">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-semibold text-gray-900 mb-3">No Charging Stations Found</h3>
      <p class="text-gray-600 max-w-2xl mx-auto mb-6">
        There are no charging stations matching your current filters. Try adjusting your search criteria or reset the filters to view all stations.
      </p>
      <button 
        @click="resetFilters"
        class="btn btn-primary px-6 py-3"
      >
        Reset All Filters
      </button>
    </div>
    
    <!-- Chargers Grid -->
    <transition-group 
      v-else
      name="list" 
      tag="div" 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      <ChargerCard 
        v-for="charger in chargers" 
        :key="charger.id"
        :charger="charger"
        @edit="handleEdit"
        @delete="handleDelete"
        @view-on-map="handleViewOnMap"
      />
    </transition-group>
    
    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      :is-open="isDeleteModalOpen"
      :station-name="chargerToDelete?.name || ''"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive grid adjustments */
@media (min-width: 1536px) {
  .container {
    max-width: 1440px;
  }
}

.btn {
  @apply transition-all duration-200 ease-in-out;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white;
}
</style>