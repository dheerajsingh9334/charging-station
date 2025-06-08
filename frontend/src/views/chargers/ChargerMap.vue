<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useChargersStore } from '../../store/chargers';
import type { ChargingStation } from '../../types/ChargingStation';
import LoadingSpinner from '../../components/ui/LoadingSpinner.vue';
import 'leaflet/dist/leaflet.css';

// Import Leaflet dynamically to avoid SSR issues
let L: any;

const route = useRoute();
const router = useRouter();
const chargersStore = useChargersStore();

// Refs
const mapContainer = ref<HTMLElement | null>(null);
const map = ref<any>(null);
const markers = ref<any[]>([]);
const selectedMarker = ref<any | null>(null);
const isLoading = ref(true);

// Parse query parameters for centering the map
const initialLat = parseFloat(route.query.lat as string) || 51.505;
const initialLng = parseFloat(route.query.lng as string) || -0.09;
const initialZoom = 13;
const selectedChargerId = route.query.id as string | undefined;

// Create the map after the component is mounted
onMounted(async () => {
  // Dynamically import Leaflet
  const leaflet = await import('leaflet');
  L = leaflet.default;
  
  // Load charging stations data
  await chargersStore.fetchChargers();
  
  // Initialize map only if container exists
  if (mapContainer.value) {
    initMap();
    addChargerMarkers();
    
    // Select a specific marker if ID is provided
    if (selectedChargerId) {
      selectChargerById(selectedChargerId);
    }
    
    isLoading.value = false;
  }
});

// Clean up on component unmount
onUnmounted(() => {
  if (map.value) {
    map.value.remove();
  }
});

// Watch for store data changes
watch(() => chargersStore.chargers, () => {
  if (map.value) {
    clearMarkers();
    addChargerMarkers();
  }
}, { deep: true });

// Initialize the map
function initMap() {
  // Create map instance
  map.value = L.map(mapContainer.value).setView([initialLat, initialLng], initialZoom);
  
  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);
}

// Add markers for all charging stations
function addChargerMarkers() {
  chargersStore.chargers.forEach(charger => {
    const { latitude, longitude } = charger.location;
    
    // Create marker
    const marker = L.marker([latitude, longitude], {
      title: charger.name
    }).addTo(map.value);
    
    // Create custom popup
    const popupContent = createPopupContent(charger);
    const popup = L.popup({
      className: 'custom-popup',
      closeButton: false,
      maxWidth: 300
    }).setContent(popupContent);
    
    // Bind popup to marker
    marker.bindPopup(popup);
    
    // Store marker reference with charger ID for later use
    markers.value.push({
      id: charger.id,
      marker,
      charger
    });
    
    // Add click event
    marker.on('click', () => {
      selectMarker(marker, charger);
      
      // Update URL query parameters without navigating
      router.replace({
        query: { 
          ...route.query,
          lat: charger.location.latitude.toString(),
          lng: charger.location.longitude.toString(),
          id: charger.id
        }
      });
    });
  });
}

// Clear all markers from the map
function clearMarkers() {
  markers.value.forEach(({ marker }) => {
    marker.remove();
  });
  markers.value = [];
}

// Select a marker and open its popup
function selectMarker(marker: any, charger: ChargingStation) {
  // Close previously selected marker's popup
  if (selectedMarker.value && selectedMarker.value !== marker) {
    selectedMarker.value.closePopup();
  }
  
  // Set selected marker
  selectedMarker.value = marker;
  
  // Open popup
  marker.openPopup();
  
  // Pan to marker
  map.value.panTo([charger.location.latitude, charger.location.longitude]);
}

// Select a charger by ID
function selectChargerById(id: string) {
  const markerData = markers.value.find(m => m.id === id);
  if (markerData) {
    selectMarker(markerData.marker, markerData.charger);
  }
}

// Create popup content for a charging station
function createPopupContent(charger: ChargingStation) {
  const statusColorClass = charger.status === 'active' 
    ? 'bg-success-500' 
    : charger.status === 'inactive' 
    ? 'bg-error-500' 
    : 'bg-warning-500';
  
  const html = `
    <div class="p-3">
      <h3 class="font-semibold text-gray-800 text-lg">${charger.name}</h3>
      <div class="flex items-center mt-1">
        <div class="${statusColorClass} h-3 w-3 rounded-full mr-2"></div>
        <span class="text-sm text-gray-600 capitalize">${charger.status}</span>
      </div>
      <div class="mt-2">
        <div class="text-sm text-gray-600">
          <strong>Power:</strong> ${charger.powerOutput} kW
        </div>
        <div class="text-sm text-gray-600">
          <strong>Connector:</strong> ${charger.connectorType}
        </div>
        ${charger.location.address ? `
          <div class="text-sm text-gray-600 mt-1">
            <strong>Address:</strong> ${charger.location.address}
          </div>
        ` : ''}
      </div>
    </div>
  `;
  
  return html;
}
</script>

<template>
  <div class="relative">
    <div v-if="isLoading" class="absolute inset-0 bg-white bg-opacity-80 z-20 flex items-center justify-center">
      <LoadingSpinner message="Loading map..." />
    </div>
    
    <div ref="mapContainer" class="map-container w-full"></div>
  </div>
</template>