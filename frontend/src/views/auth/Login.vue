<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import LoadingSpinner from '../../components/ui/LoadingSpinner.vue';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isSubmitting = ref(false);
const errorMessage = ref('');

async function handleSubmit() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password';
    return;
  }
  
  errorMessage.value = '';
  isSubmitting.value = true;
  
  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      router.push('/chargers');
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to login. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}

function goToRegister() {
  router.push('/register');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <button
            @click="goToRegister"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            create a new account
          </button>
        </p>
      </div>
      <div class="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">
                  {{ errorMessage }}
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="form-label">
              <span class="block">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="form-input"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <button
              type="submit"
              class="w-full btn btn-primary py-3"
              :disabled="isSubmitting"
            >
              <LoadingSpinner v-if="isSubmitting" />
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>