import api from './api';
import type { ChargingStation } from '../types/ChargingStation';

export const ChargingStationService = {
  /**
   * Get all charging stations
   * @returns List of charging stations
   */
  async getAll() {
    try {
      return await api.get('charger/allCharger');
    } catch (err) {
      console.error('Error in getAll:', err);
      return [];
    }
  },

  /**
   * Get a charging station by ID
   * @param id
   * @returns Single charging station
   */
  async getById(id: string) {
    return await api.get(`charger/getCharger/${id}`);
  },

  /**
   * Create a new charging station
   * @param data Charging station data
   * @returns Created charging station
   */
  async create(data: Omit<ChargingStation, 'id'>) {
    return await api.post('charger/addCharger', data);
  },

  /**
   * Update a charging station
   * @param id Charging station ID
   * @param data Updated charging station data
   * @returns Updated charging station
   */
  async update(id: string, data: Partial<ChargingStation>) {
    return await api.put(`charger/updateCharger/${id}`, data);
  },

  /**
   * Delete a charging station (your API uses PUT for soft delete)
   * @param id Charging station ID
   * @returns Success message
   */
  async remove(id: string) {
    return await api.put(`charger/deleteCharger/${id}`);
  }
};
