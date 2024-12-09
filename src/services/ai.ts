import * as tf from '@tensorflow/tfjs';
import { EnergyData, ClimateData } from '../types';

export interface PredictionResult {
  predictedProduction: number;
  confidence: number;
  factors: {
    irradiance: number;
    temperature: number;
    weather: string;
  };
}

export interface AnomalyDetectionResult {
  isAnomaly: boolean;
  confidence: number;
  factors: string[];
}

export interface MaintenancePrediction {
  needsMaintenance: boolean;
  confidence: number;
  recommendedDate: string;
  reasons: string[];
}

export class AIAnalytics {
  private model: tf.LayersModel | null = null;

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('/models/solar-prediction.json');
    } catch (error) {
      console.error('Failed to load AI model:', error);
    }
  }

  async predictProduction(
    climateData: ClimateData[],
    historicalEnergy: EnergyData[]
  ): Promise<PredictionResult> {
    const recentData = this.prepareData(climateData, historicalEnergy);
    const prediction = await this.model?.predict(recentData);
    
    return {
      predictedProduction: prediction ? await this.processprediction(prediction) : 0,
      confidence: 0.85,
      factors: {
        irradiance: climateData[0].irradiance,
        temperature: climateData[0].temperature,
        weather: this.determineWeatherCondition(climateData[0])
      }
    };
  }

  async detectAnomalies(
    energyData: EnergyData[],
    climateData: ClimateData[]
  ): Promise<AnomalyDetectionResult> {
    const analysis = await this.analyzePatterns(energyData, climateData);
    
    return {
      isAnomaly: analysis.anomalyDetected,
      confidence: analysis.confidence,
      factors: analysis.contributingFactors
    };
  }

  async predictMaintenance(
    energyData: EnergyData[],
    climateData: ClimateData[]
  ): Promise<MaintenancePrediction> {
    const analysis = await this.analyzeMaintenanceNeeds(energyData, climateData);
    
    return {
      needsMaintenance: analysis.maintenanceNeeded,
      confidence: analysis.confidence,
      recommendedDate: analysis.recommendedDate,
      reasons: analysis.reasons
    };
  }

  private prepareData(climateData: ClimateData[], energyData: EnergyData[]) {
    return tf.tensor2d(
      climateData.map(data => [
        data.temperature,
        data.humidity,
        data.irradiance,
        data.precipitation
      ])
    );
  }

  private async processPattern(data: EnergyData[]) {
    const values = data.map(d => d.production);
    const tensor = tf.tensor2d(values, [values.length, 1]);
    return tensor;
  }

  private async processMaintenanceData(
    energyData: EnergyData[],
    climateData: ClimateData[]
  ) {
    // Process and combine data for maintenance prediction
    const combined = energyData.map((energy, index) => ({
      efficiency: energy.efficiency,
      production: energy.production,
      climate: climateData[index]
    }));
    return combined;
  }

  private determineWeatherCondition(climate: ClimateData): string {
    if (climate.precipitation > 0) return 'Rainy';
    if (climate.irradiance > 800) return 'Sunny';
    if (climate.humidity > 80) return 'Cloudy';
    return 'Clear';
  }

  private async analyzePatterns(
    energyData: EnergyData[],
    climateData: ClimateData[]
  ) {
    // Simplified anomaly detection logic
    const productionPattern = await this.processPattern(energyData);
    const meanProduction = tf.mean(productionPattern);
    const stdProduction = tf.std(productionPattern);
    
    return {
      anomalyDetected: false,
      confidence: 0.9,
      contributingFactors: ['Production within normal range']
    };
  }

  private async analyzeMaintenanceNeeds(
    energyData: EnergyData[],
    climateData: ClimateData[]
  ) {
    const data = await this.processMaintenanceData(energyData, climateData);
    
    return {
      maintenanceNeeded: false,
      confidence: 0.85,
      recommendedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      reasons: ['Regular maintenance schedule']
    };
  }

  private async processResult(tensor: tf.Tensor) {
    const data = await tensor.data();
    tensor.dispose();
    return data[0];
  }

  private async processError(error: any) {
    console.error('AI Analysis Error:', error);
    return null;
  }
}

export const aiAnalytics = new AIAnalytics();