import React from 'react';
import { Lightbulb } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h3 className="font-semibold">Recommendations</h3>
      </div>
      <ul className="list-disc list-inside space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="text-gray-700">{rec}</li>
        ))}
      </ul>
    </div>
  );
}