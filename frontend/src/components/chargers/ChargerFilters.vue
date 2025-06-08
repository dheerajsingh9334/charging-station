<script setup lang="ts">
import { ref, watch } from 'vue';
import type { ChargingStationFilters } from '../../types/ChargingStation';

const props = defineProps<{
  connectorTypes: string[];
  initialFilters: ChargingStationFilters;
}>();

const emit = defineEmits<{
  (e: 'update:filters', filters: ChargingStationFilters): void;
  (e: 'reset'): void;
}>();

const filters = ref<ChargingStationFilters>({
  status: props.initialFilters.status || '',
  connectorType: props.initialFilters.connectorType || '',
  minPower: props.initialFilters.minPower || null,
  maxPower: props.initialFilters.maxPower || null,
  searchQuery: props.initialFilters.searchQuery || '',
  sortBy: props.initialFilters.sortBy || 'name',
  sortOrder: props.initialFilters.sortOrder || 'asc'
});

const isExpanded = ref(false);

watch(filters, (newFilters) => {
  emit('update:filters', newFilters);
}, { deep: true });

function resetFilters() {
  filters.value = {
    status: '',
    connectorType: '',
    minPower: null,
    maxPower: null,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc'
  };
  emit('reset');
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'powerOutput', label: 'Power Output' },
  { value: 'status', label: 'Status' },
  { value: 'connectorType', label: 'Connector Type' }
];
</script>

<template>
  <div class="bg-white rounded-lg shadow-md mb-6 overflow-hidden transition-all duration-300">
    <div class="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer" @click="toggleExpand">
      <div class="flex items-center space-x-4">
        <h3 class="text-lg font-semibold text-gray-800">Filter Charging Stations</h3>
        <div v-if="filters.searchQuery || filters.status || filters.connectorType || filters.minPower || filters.maxPower" 
             class="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm">
          Filters Applied
        </div>
      </div>
      <button class="text-gray-500 hover:text-gray-700 transition-colors duration-200">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 transition-transform duration-300" 
          :class="{ 'transform rotate-180': isExpanded }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
    
    <div 
      class="overflow-hidden transition-all duration-300"
      :class="{ 'h-0': !isExpanded, 'h-auto': isExpanded }"
    >
      <div class="p-4 space-y-4">
        <!-- Search Bar -->
        <div class="mb-4">
          <label for="search" class="form-label">Search</label>
          <div class="relative">
            <input
              id="search"
              type="text"
              v-model="filters.searchQuery"
              class="form-input pl-10"
              placeholder="Search by name or location..."
            />
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Status Filter -->
          <div>
            <label for="status" class="form-label">Status</label>
            <select 
              id="status" 
              v-model="filters.status"
              class="form-input bg-white"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <!-- Connector Type Filter -->
          <div>
            <label for="connectorType" class="form-label">Connector Type</label>
            <select 
              id="connectorType" 
              v-model="filters.connectorType"
              class="form-input bg-white"
            >
              <option value="">All Types</option>
              <option v-for="type in connectorTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
          
          <!-- Power Range Filters -->
          <div>
            <label for="minPower" class="form-label">Min Power (kW)</label>
            <input 
              id="minPower" 
              type="number" 
              v-model.number="filters.minPower"
              class="form-input"
              min="0"
              placeholder="Min Power"
            />
          </div>
          
          <div>
            <label for="maxPower" class="form-label">Max Power (kW)</label>
            <input 
              id="maxPower" 
              type="number" 
              v-model.number="filters.maxPower"
              class="form-input"
              min="0"
              placeholder="Max Power"
            />
          </div>
        </div>

        <!-- Sorting Options -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label for="sortBy" class="form-label">Sort By</label>
            <select 
              id="sortBy" 
              v-model="filters.sortBy"
              class="form-input bg-white"
            >
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          
          <div>
            <label for="sortOrder" class="form-label">Sort Order</label>
            <select 
              id="sortOrder" 
              v-model="filters.sortOrder"
              class="form-input bg-white"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
        <button 
          @click="resetFilters"
          class="btn btn-outline"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>