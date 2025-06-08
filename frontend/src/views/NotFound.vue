<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary-500">404</h1>
      <p class="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</p>
      <p class="text-gray-600 mt-2">The page you are looking for doesn't exist or has been moved.</p>
      <router-link 
        to="/" 
        class="mt-8 inline-block px-6 py-3 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors duration-200"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>