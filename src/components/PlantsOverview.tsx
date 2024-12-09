import React from 'react';
import { Battery, AlertTriangle, Wrench } from 'lucide-react';
import { PlantOverview } from '../types';

interface PlantsOverviewProps {
  plants: PlantOverview[];
}

export function PlantsOverview({ plants }: PlantsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {plants.map((plant) => (
        <div key={plant.id} className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">{plant.name}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-green-500" />
                <span>Production</span>
              </div>
              <span className="font-semibold">{plant.currentProduction} kWh</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span>Active Alerts</span>
              </div>
              <span className="font-semibold">{plant.activeAlerts}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-500" />
                <span>Maintenance</span>
              </div>
              <span className="font-semibold">{plant.maintenanceCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}