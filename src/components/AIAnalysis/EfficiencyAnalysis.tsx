import React from 'react';
import { Brain } from 'lucide-react';

interface EfficiencyAnalysisProps {
  score: number;
  factors: string[];
}

export function EfficiencyAnalysis({ score, factors }: EfficiencyAnalysisProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-blue-500" />
        <h3 className="font-semibold">Efficiency Analysis</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Score:</span>
          <span className="text-2xl font-bold">{score}%</span>
        </div>
        <div>
          <h4 className="font-medium mb-2">Contributing Factors:</h4>
          <ul className="list-disc list-inside">
            {factors.map((factor, index) => (
              <li key={index} className="text-gray-700">{factor}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}