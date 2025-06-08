<template>
  <footer class="bg-gray-800 text-white py-8 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">EV Charging Network</h3>
          <p class="text-gray-400">
            Making electric vehicle charging accessible and convenient for everyone.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white transition-colors">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/chargers" class="text-gray-400 hover:text-white transition-colors">
                Charging Stations
              </router-link>
            </li>
            <li>
              <router-link to="/chargers/map" class="text-gray-400 hover:text-white transition-colors">
                Map View
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-gray-400">
            <li>Email: support@evcharging.com</li>
            <li>Phone: (555) 123-4567</li>
            <li>Address: 123 EV Street, Electric City</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} EV Charging Network. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>