import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AlertsListProps {
  alerts: string[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <h3 className="font-semibold">Alerts</h3>
      </div>
      <ul className="list-disc list-inside space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="text-gray-700">{alert}</li>
        ))}
      </ul>
    </div>
  );
}