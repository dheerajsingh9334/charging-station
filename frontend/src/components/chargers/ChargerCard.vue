<script setup lang="ts">
import { computed } from 'vue';
import type { ChargingStation } from '../../types/ChargingStation';
import { useAuthStore } from '../../store/auth';

const props = defineProps<{
  charger: ChargingStation;
}>();

const emit = defineEmits<{
  (e: 'edit', id: string): void;
  (e: 'delete', id: string): void;
  (e: 'view-on-map', charger: ChargingStation): void;
}>();

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.isAdmin);

const statusColor = computed(() => {
  switch (props.charger.status) {
    case 'active':
      return 'bg-success-500';
    case 'inactive':
      return 'bg-error-500';
    case 'maintenance':
      return 'bg-warning-500';
    default:
      return 'bg-gray-500';
  }
});

const formattedStatus = computed(() => {
  return props.charger.status.charAt(0).toUpperCase() + props.charger.status.slice(1);
});

function handleEdit() {
  emit('edit', props.charger.id);
}

function handleDelete() {
  emit('delete', props.charger.id);
}

function handleViewOnMap() {
  emit('view-on-map', props.charger);
}
</script>

<template>
  <div class="card hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
    <div class="p-4">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{{ charger.name }}</h3>
          <div class="flex items-center mt-1">
            <div :class="[statusColor, 'h-3 w-3 rounded-full mr-2']"></div>
            <span class="text-sm text-gray-600">{{ formattedStatus }}</span>
          </div>
        </div>
        <div class="bg-primary-100 text-primary-800 px-2 py-1 rounded-md text-sm font-medium">
          {{ charger.powerOutput }} kW
        </div>
      </div>
      
      <div class="mt-3">
        <div class="text-sm text-gray-600">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {{ charger.location.address || `${charger.location.latitude.toFixed(6)}, ${charger.location.longitude.toFixed(6)}` }}
            </span>
          </div>
        </div>
        <div class="mt-2 text-sm">
          <span class="bg-secondary-100 text-secondary-800 px-2 py-1 rounded-md">
            {{ charger.connectorType }}
          </span>
        </div>
      </div>
      
      <div class="mt-4 flex justify-between">
        <button 
          @click="handleViewOnMap" 
          class="text-secondary-600 hover:text-secondary-800 text-sm font-medium flex items-center transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          View on Map
        </button>
        <!-- < v-if="isAdmin" class="flex space-x-2"> -->
          <button 
            @click="handleEdit" 
            class="text-secondary-600 hover:text-secondary-800 text-sm font-medium flex items-center transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button 
            @click="handleDelete" 
            class="text-error-600 hover:text-error-800 text-sm font-medium flex items-center transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        
      </div>
    </div>
  </div>
</template>