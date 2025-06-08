
<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  stationName: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const isVisible = ref(props.isOpen);

watch(() => props.isOpen, (newValue) => {
  isVisible.value = newValue;
});

function confirm() {
  emit('confirm');
}

function cancel() {
  emit('cancel');
}
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <transition name="slide-up">
        <div v-if="isVisible" class="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
          <div class="text-center mb-6">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mt-4">Delete Charging Station</h3>
            <p class="text-sm text-gray-500 mt-2">
              Are you sure you want to delete <strong>{{ stationName }}</strong>? This action cannot be undone.
            </p>
          </div>
          <div class="flex justify-end space-x-3">
            <button 
              @click="cancel"
              class="btn btn-outline"
            >
              Cancel
            </button>
            <button 
              @click="confirm"
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>