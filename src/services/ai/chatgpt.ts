import OpenAI from 'openai';
import { EnergyData, ClimateData, MaintenanceEvent } from '../../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIAnalysisResult {
  summary: string;
  recommendations: string[];
  alerts: string[];
  efficiency: {
    score: number;
    factors: string[];
  };
}

export class ChatGPTService {
  async analyzePerformance(
    energyData: EnergyData[],
    climateData: ClimateData[],
    maintenance: MaintenanceEvent[]
  ): Promise<AIAnalysisResult> {
    const prompt = this.buildAnalysisPrompt(energyData, climateData, maintenance);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4-turbo-preview",
    });

    return this.parseAnalysisResponse(completion.choices[0].message.content || '');
  }

  private buildAnalysisPrompt(
    energyData: EnergyData[],
    climateData: ClimateData[],
    maintenance: MaintenanceEvent[]
  ): string {
    return `Analyze the following solar plant data:

Energy Production Data:
${JSON.stringify(energyData, null, 2)}

Climate Data:
${JSON.stringify(climateData, null, 2)}

Maintenance History:
${JSON.stringify(maintenance, null, 2)}

Please provide:
1. A summary of the plant's performance
2. Recommendations for optimization
3. Any potential alerts or warnings
4. Efficiency analysis with contributing factors

Format the response as JSON with the following structure:
{
  "summary": "string",
  "recommendations": ["string"],
  "alerts": ["string"],
  "efficiency": {
    "score": number,
    "factors": ["string"]
  }
}`;
  }

  private parseAnalysisResponse(response: string): AIAnalysisResult {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse ChatGPT response:', error);
      return {
        summary: 'Analysis unavailable',
        recommendations: [],
        alerts: [],
        efficiency: {
          score: 0,
          factors: [],
        },
      };
    }
  }
}

export const chatGPTService = new ChatGPTService();