export interface Plant {
  id: string;
  name: string;
  location: string;
  capacity: number;
  units: number;
}

export interface EnergyData {
  timestamp: string;
  production: number;
  efficiency: number;
  unit_id: string;
  plant_id: string;
}

export interface ClimateData {
  timestamp: string;
  temperature: number;
  humidity: number;
  irradiance: number;
  precipitation: number;
  unit_id: string;
  plant_id: string;
}

export interface MaintenanceEvent {
  id: string;
  unit_id: string;
  plant_id: string;
  type: string;
  start_date: string;
  end_date: string;
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

export interface PlantOverview {
  id: string;
  name: string;
  currentProduction: number;
  efficiency: number;
  activeAlerts: number;
  maintenanceCount: number;
}