export interface ChargingStation {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  status: 'active' | 'inactive' | 'maintenance';
  powerOutput: number; // in kW
  connectorType: string; // e.g., "Type 2", "CCS", "CHAdeMO"
  createdAt?: string;
  updatedAt?: string;
}

export interface ChargingStationFilters {
  status: string;
  connectorType: string;
  minPower: number | null;
  maxPower: number | null;
  searchQuery?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}