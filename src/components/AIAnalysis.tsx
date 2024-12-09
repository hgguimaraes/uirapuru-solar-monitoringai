import React from 'react';
import { Brain, AlertTriangle, Lightbulb } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { chatGPTService } from '../services/ai/chatgpt';
import { EnergyData, ClimateData, MaintenanceEvent } from '../types';

interface AIAnalysisProps {
  energyData: EnergyData[];
  climateData: ClimateData[];
  maintenance: MaintenanceEvent[];
}

export function AIAnalysis({ energyData, climateData, maintenance }: AIAnalysisProps) {
  const { data: analysis } = useQuery({
    queryKey: ['ai-analysis', energyData, climateData, maintenance],
    queryFn: () => chatGPTService.analyzePerformance(energyData, climateData, maintenance),
  });

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">AI Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-purple-500" />
            <h3 className="font-semibold">Performance Summary</h3>
          </div>
          <p className="text-gray-700">{analysis.summary}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="font-semibold">Recommendations</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="text-gray-700">{rec}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="font-semibold">Alerts</h3>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {analysis.alerts.map((alert, index) => (
              <li key={index} className="text-gray-700">{alert}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold">Efficiency Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Score:</span>
              <span className="text-2xl font-bold">{analysis.efficiency.score}%</span>
            </div>
            <div>
              <h4 className="font-medium mb-2">Contributing Factors:</h4>
              <ul className="list-disc list-inside">
                {analysis.efficiency.factors.map((factor, index) => (
                  <li key={index} className="text-gray-700">{factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}