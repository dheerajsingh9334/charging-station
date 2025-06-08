import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { ChargingStationService } from '../services/ChargingStationService';
import type { ChargingStation, ChargingStationFilters } from '../types/ChargingStation';

export const useChargersStore = defineStore('chargers', () => {
  const toast = useToast();
  
  // State
const chargers = ref<ChargingStation[]>([]);
  const selectedCharger = ref<ChargingStation | null>(null);
  const loading = ref(false);
  const filters = ref<ChargingStationFilters>({
    status: '',
    connectorType: '',
    minPower: null,
    maxPower: null,
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  
  // Getters
  const filteredChargers = computed(() => {
    // Ensure chargers.value is always an array
    return (chargers.value || []).filter(charger => {
      let matches = true;

      // Apply search filter
      if (filters.value.searchQuery) {
        const query = filters.value.searchQuery.toLowerCase();
        matches = charger.name.toLowerCase().includes(query) || 
                  (typeof charger.location.address === 'string' && charger.location.address.toLowerCase().includes(query));
      }
      
      // Filter by status
      if (matches && filters.value.status) {
        matches = charger.status === filters.value.status;
      }
      
      // Filter by connector type
      if (matches && filters.value.connectorType) {
        matches = charger.connectorType === filters.value.connectorType;
      }
      
      // Filter by power range
      if (matches && filters.value.minPower !== null) {
        matches = charger.powerOutput >= filters.value.minPower!;
      }
      
      if (matches && filters.value.maxPower !== null) {
        matches = charger.powerOutput <= filters.value.maxPower!;
      }

      return matches;
    });
  });
  
  const connectorTypes = computed(() => {
    const types = new Set<string>();
    (chargers.value || []).forEach(charger => {
      types.add(charger.connectorType);
    });
    return Array.from(types);
  });
  
  // Actions
async function fetchChargers() {
  try {
    loading.value = true;
    const response = await ChargingStationService.getAll();
    if (Array.isArray(response)) {
      chargers.value = response.map((c: any) => ({
        ...c,
        id: c._id,
      }));
    } else {
      chargers.value = [];
      toast.error('No chargers data received from server');
    }
  } catch (error: any) {
    toast.error(error.message || 'Failed to fetch charging stations');
    chargers.value = [];
  } finally {
    loading.value = false;
  }
}
async function fetchChargerById(id: string) {
  try {
    loading.value = true;
    const response = await ChargingStationService.getById(id);
    selectedCharger.value = response; // FIXED
    return response; // FIXED
  } catch (error: any) {
    toast.error(error.message || 'Failed to fetch charging station details');
    return null;
  } finally {
    loading.value = false;
  }
}
  async function createCharger(chargerData: Omit<ChargingStation, 'id'>) {
    try {
      loading.value = true;
      const response = await ChargingStationService.create(chargerData);
      const newCharger = response;
chargers.value.push(newCharger);
      toast.success('Charging station added successfully');
      return newCharger;
    } catch (error: any) {
      toast.error(error.message || 'Failed to add charging station');
      return null;
    } finally {
      loading.value = false;
    }
  }
  
async function updateCharger(id: string, chargerData: Partial<ChargingStation>) {
  try {
    loading.value = true;
    const response = await ChargingStationService.update(id, chargerData);
    const updatedCharger = response;

    // Find the index after getting the updated charger
    const index = chargers.value.findIndex(c => c.id === id);
    if (index !== -1) {
      chargers.value[index] = updatedCharger;
    }
    
    toast.success('Charging station updated successfully');
    return updatedCharger;
  } catch (error: any) {
    toast.error(error.message || 'Failed to update charging station');
    return null;
  } finally {
    loading.value = false;
  }
}

  
  async function deleteCharger(id: string) {
    try {
      loading.value = true;
      await ChargingStationService.remove(id);
      
      // Remove from local array
      chargers.value = chargers.value.filter(c => c.id !== id);
      
      toast.success('Charging station deleted successfully');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete charging station');
      return false;
    } finally {
      loading.value = false;
    }
  }
  
  function setFilters(newFilters: Partial<ChargingStationFilters>) {
    filters.value = { ...filters.value, ...newFilters };
  }
  
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
  }
  
  return {
    // State
    chargers,
    selectedCharger,
    loading,
    filters,
    
    // Getters
    filteredChargers,
    connectorTypes,
    
    // Actions
    fetchChargers,
    fetchChargerById,
    createCharger,
    updateCharger,
    deleteCharger,
    setFilters,
    resetFilters
  };
});