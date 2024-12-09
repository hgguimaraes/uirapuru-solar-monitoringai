import React from 'react';
import { Brain } from 'lucide-react';
import { AIAnalysisResult } from '../../services/ai/chatgpt';

interface PerformanceSummaryProps {
  summary: string;
}

export function PerformanceSummary({ summary }: PerformanceSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-purple-500" />
        <h3 className="font-semibold">Performance Summary</h3>
      </div>
      <p className="text-gray-700">{summary}</p>
    </div>
  );
}