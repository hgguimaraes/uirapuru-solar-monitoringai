import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { chatGPTService } from '../../services/ai/chatgpt';
import { EnergyData, ClimateData, MaintenanceEvent } from '../../types';
import { PerformanceSummary } from './PerformanceSummary';
import { Recommendations } from './Recommendations';
import { AlertsList } from './AlertsList';
import { EfficiencyAnalysis } from './EfficiencyAnalysis';

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
        <PerformanceSummary summary={analysis.summary} />
        <Recommendations recommendations={analysis.recommendations} />
        <AlertsList alerts={analysis.alerts} />
        <EfficiencyAnalysis 
          score={analysis.efficiency.score} 
          factors={analysis.efficiency.factors} 
        />
      </div>
    </div>
  );
}