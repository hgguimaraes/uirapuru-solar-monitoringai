import React from 'react';
import { Brain, AlertTriangle, Tool } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { aiAnalytics } from '../services/ai';
import { EnergyData, ClimateData } from '../types';

interface AIInsightsProps {
  energyData: EnergyData[];
  climateData: ClimateData[];
}

export function AIInsights({ energyData, climateData }: AIInsightsProps) {
  const { data: prediction } = useQuery({
    queryKey: ['production-prediction', energyData, climateData],
    queryFn: () => aiAnalytics.predictProduction(climateData, energyData)
  });

  const { data: anomalies } = useQuery({
    queryKey: ['anomaly-detection', energyData, climateData],
    queryFn: () => aiAnalytics.detectAnomalies(energyData, climateData)
  });

  const { data: maintenance } = useQuery({
    queryKey: ['maintenance-prediction', energyData, climateData],
    queryFn: () => aiAnalytics.predictMaintenance(energyData, climateData)
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">AI Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-purple-500" />
            <h3 className="font-semibold">Production Forecast</h3>
          </div>
          {prediction && (
            <div className="space-y-2">
              <p className="text-2xl font-bold">{prediction.predictedProduction.toFixed(2)} kWh</p>
              <p className="text-sm text-gray-600">
                Confidence: {(prediction.confidence * 100).toFixed(1)}%
              </p>
              <div className="text-sm">
                <p>Weather: {prediction.factors.weather}</p>
                <p>Irradiance: {prediction.factors.irradiance} W/m²</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            <h3 className="font-semibold">Anomaly Detection</h3>
          </div>
          {anomalies && (
            <div className="space-y-2">
              <p className={`text-lg font-semibold ${anomalies.isAnomaly ? 'text-red-500' : 'text-green-500'}`}>
                {anomalies.isAnomaly ? 'Anomaly Detected' : 'Normal Operation'}
              </p>
              <p className="text-sm text-gray-600">
                Confidence: {(anomalies.confidence * 100).toFixed(1)}%
              </p>
              <ul className="text-sm list-disc list-inside">
                {anomalies.factors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Tool className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold">Maintenance Prediction</h3>
          </div>
          {maintenance && (
            <div className="space-y-2">
              <p className={`text-lg font-semibold ${maintenance.needsMaintenance ? 'text-yellow-500' : 'text-green-500'}`}>
                {maintenance.needsMaintenance ? 'Maintenance Needed' : 'No Maintenance Required'}
              </p>
              <p className="text-sm text-gray-600">
                Next Check: {new Date(maintenance.recommendedDate).toLocaleDateString()}
              </p>
              <ul className="text-sm list-disc list-inside">
                {maintenance.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}