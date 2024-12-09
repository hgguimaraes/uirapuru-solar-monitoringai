import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export function MetricCard({ icon, title, value }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-3">
        {icon}
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}