<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ChargingStation } from '../../types/ChargingStation';

const props = defineProps<{
  initialData?: Partial<ChargingStation>;
  isEdit?: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', data: Omit<ChargingStation, 'id'>): void;
  (e: 'cancel'): void;
}>();

const connectorTypes = [
  'Type 1',
  'Type 2',
  'CCS',
  'CHAdeMO',
  'Tesla'
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'maintenance', label: 'Maintenance' }
];

const formData = ref({
  name: props.initialData?.name || '',
  latitude: props.initialData?.location?.latitude || null,
  longitude: props.initialData?.location?.longitude || null,
  address: props.initialData?.location?.address || '',
  status: props.initialData?.status || 'active',
  powerOutput: props.initialData?.powerOutput || null,
  connectorType: props.initialData?.connectorType || ''
});

const isFormValid = computed(() => {
  return (
    !!formData.value.name &&
    formData.value.latitude !== null &&
    formData.value.longitude !== null &&
    !!formData.value.status &&
    formData.value.powerOutput !== null &&
    !!formData.value.connectorType
  );
});

function handleSubmit() {
  if (!isFormValid.value) return;
  
  const data: Omit<ChargingStation, 'id'> = {
    name: formData.value.name,
    location: {
      latitude: formData.value.latitude!,
      longitude: formData.value.longitude!,
      address: formData.value.address || undefined
    },
    status: formData.value.status as 'active' | 'inactive' | 'maintenance',
    powerOutput: formData.value.powerOutput!,
    connectorType: formData.value.connectorType
  };
  
  emit('submit', data);
}

function handleCancel() {
  emit('cancel');
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Name -->
      <div class="col-span-1 md:col-span-2">
        <label for="name" class="form-label">Station Name</label>
        <input 
          id="name" 
          type="text" 
          v-model="formData.name"
          class="form-input"
          placeholder="Enter station name"
          required
        />
      </div>
      
      <!-- Location -->
      <div>
        <label for="latitude" class="form-label">Latitude</label>
        <input 
          id="latitude" 
          type="number" 
          v-model.number="formData.latitude"
          class="form-input"
          placeholder="e.g. 51.5074"
          step="any"
          required
        />
      </div>
      
      <div>
        <label for="longitude" class="form-label">Longitude</label>
        <input 
          id="longitude" 
          type="number" 
          v-model.number="formData.longitude"
          class="form-input"
          placeholder="e.g. -0.1278"
          step="any"
          required
        />
      </div>
      
      <div class="col-span-1 md:col-span-2">
        <label for="address" class="form-label">Address (Optional)</label>
        <input 
          id="address" 
          type="text" 
          v-model="formData.address"
          class="form-input"
          placeholder="Enter physical address"
        />
      </div>
      
      <!-- Power & Status -->
      <div>
        <label for="powerOutput" class="form-label">Power Output (kW)</label>
        <input 
          id="powerOutput" 
          type="number" 
          v-model.number="formData.powerOutput"
          class="form-input"
          placeholder="e.g. 50"
          min="0"
          step="0.1"
          required
        />
      </div>
      
      <div>
        <label for="status" class="form-label">Status</label>
        <select 
          id="status" 
          v-model="formData.status"
          class="form-input bg-white"
          required
        >
          <option v-for="option in statusOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      
      <!-- Connector Type -->
      <div class="col-span-1 md:col-span-2">
        <label for="connectorType" class="form-label">Connector Type</label>
        <select 
          id="connectorType" 
          v-model="formData.connectorType"
          class="form-input bg-white"
          required
        >
          <option value="" disabled>Select a connector type</option>
          <option v-for="type in connectorTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>
    
    <div class="flex justify-end space-x-3">
      <button 
        type="button"
        @click="handleCancel"
        class="btn btn-outline"
      >
        Cancel
      </button>
      <button 
        type="submit"
        class="btn btn-primary"
        :disabled="!isFormValid"
      >
        {{ isEdit ? 'Update' : 'Create' }} Charging Station
      </button>
    </div>
  </form>
</template>