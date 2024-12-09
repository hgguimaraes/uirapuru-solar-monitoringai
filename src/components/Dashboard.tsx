import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Sun, Droplets, Thermometer, Battery } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchEnergyData, fetchClimateData, fetchPlants, fetchPlantsOverview } from '../api/data';
import { Plant } from '../types';
import { PlantSelector } from './PlantSelector';
import { PlantsOverview } from './PlantsOverview';
import { MetricCard } from './MetricCard';
import { AIInsights } from './AIInsights';

export function Dashboard() {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const { data: plants } = useQuery({
    queryKey: ['plants'],
    queryFn: fetchPlants
  });

  const { data: plantsOverview } = useQuery({
    queryKey: ['plants-overview'],
    queryFn: fetchPlantsOverview
  });

  const { data: energyData } = useQuery({
    queryKey: ['energy', selectedPlant?.id],
    queryFn: () => fetchEnergyData(selectedPlant?.id),
    enabled: !!selectedPlant
  });

  const { data: climateData } = useQuery({
    queryKey: ['climate', selectedPlant?.id],
    queryFn: () => fetchClimateData(selectedPlant?.id),
    enabled: !!selectedPlant
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Solar Plants Monitoring</h1>
        {plants && (
          <PlantSelector
            plants={plants}
            selectedPlant={selectedPlant}
            onSelectPlant={setSelectedPlant}
          />
        )}
      </div>

      {!selectedPlant && plantsOverview && (
        <PlantsOverview plants={plantsOverview} />
      )}

      {selectedPlant && energyData && climateData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={<Battery className="w-6 h-6" />}
              title="Energy Production"
              value={`${energyData.currentProduction} kWh`}
            />
            <MetricCard
              icon={<Sun className="w-6 h-6" />}
              title="Solar Irradiance"
              value={`${climateData.currentIrradiance} W/m²`}
            />
            <MetricCard
              icon={<Thermometer className="w-6 h-6" />}
              title="Temperature"
              value={`${climateData.currentTemperature}°C`}
            />
            <MetricCard
              icon={<Droplets className="w-6 h-6" />}
              title="Precipitation"
              value={`${climateData.currentPrecipitation} mm`}
            />
          </div>

          <AIInsights
            energyData={energyData.history}
            climateData={climateData.history}
          />

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Energy Production Trend</h2>
            <LineChart width={800} height={400} data={energyData.history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="production" stroke="#8884d8" />
              <Line type="monotone" dataKey="efficiency" stroke="#82ca9d" />
            </LineChart>
          </div>
        </>
      )}
    </div>
  );
}