import axios from 'axios';
import { EnergyData, ClimateData, Plant, PlantOverview } from '../types';

const API_BASE_URL = '/api';

export async function fetchPlants(): Promise<Plant[]> {
  const response = await axios.get(`${API_BASE_URL}/plants`);
  return response.data;
}

export async function fetchPlantsOverview(): Promise<PlantOverview[]> {
  const response = await axios.get(`${API_BASE_URL}/plants/overview`);
  return response.data;
}

export async function fetchEnergyData(plantId?: string): Promise<{
  currentProduction: number;
  history: EnergyData[];
}> {
  const response = await axios.get(`${API_BASE_URL}/energy${plantId ? `?plantId=${plantId}` : ''}`);
  return response.data;
}

export async function fetchClimateData(plantId?: string): Promise<{
  currentTemperature: number;
  currentIrradiance: number;
  currentPrecipitation: number;
  history: ClimateData[];
}> {
  const response = await axios.get(`${API_BASE_URL}/climate${plantId ? `?plantId=${plantId}` : ''}`);
  return response.data;
}