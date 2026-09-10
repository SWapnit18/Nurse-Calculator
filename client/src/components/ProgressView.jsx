import React from 'react';
import { TrendingUp, Award, Calendar, CheckCircle2 } from 'lucide-react';

export default function ProgressView({ stats }) {
  const accuracy = stats?.accuracy ?? 82;
  const total = stats?.totalQuestions ?? 126;
  const correct = stats?.correctAnswers ?? 103;
  const incorrect = stats?.incorrectAnswers ?? 23;

  const weeklyActivity = [
    { day: 'M', value: 65 },
    { day: 'T', value: 85 },
    { day: 'W', value: 40 },
    { day: 'T', value: 90 },
    { day: 'F', value: 75 },
    { day: 'S', value: 100 },
    { day: 'S', value: 50 },
  ];

  const topicAccuracies = [
    { name: 'Unit Conversions', pct: 78 },
    { name: 'Tablet Calculations', pct: 88 },
    { name: 'Liquid Calculations', pct: 92 },
    { name: 'IV Flow Mathematics', pct: 51 },
    { name: 'Weight-Based Calculations', pct: 70 },
  ];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Your Progress</h1>
        <p className="text-sm text-[#666666] mt-0.5">Track your improvement over time.</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-2">
        <div className="nc-card p-3 text-center">
          <span className="text-base font-bold text-[#111111]">{accuracy}%</span>
          <span className="text-[10px] font-medium text-[#666666] block mt-0.5">Accuracy</span>
        </div>
        <div className="nc-card p-3 text-center">
          <span className="text-base font-bold text-[#111111]">{total}</span>
          <span className="text-[10px] font-medium text-[#666666] block mt-0.5">Total</span>
        </div>
        <div className="nc-card p-3 text-center">
          <span className="text-base font-bold text-emerald-700">{correct}</span>
          <span className="text-[10px] font-medium text-[#666666] block mt-0.5">Correct</span>
        </div>
        <div className="nc-card p-3 text-center">
          <span className="text-base font-bold text-red-600">{incorrect}</span>
          <span className="text-[10px] font-medium text-[#666666] block mt-0.5">Incorrect</span>
        </div>
      </div>

      {/* Weekly Activity Monochrome Bar Chart */}
      <div className="nc-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
            Recent Activity
          </h2>
          <span className="text-xs font-medium text-[#666666]">Last 7 days</span>
        </div>

        <div className="flex items-end justify-between h-28 pt-4 px-2">
          {weeklyActivity.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="w-6 bg-[#F0F0F0] rounded-t-md h-full flex items-end">
                <div 
                  className="w-full bg-[#111111] rounded-t-md transition-all duration-500" 
                  style={{ height: `${item.value}%` }}
                />
              </div>
              <span className="text-[11px] font-semibold text-[#888888]">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Accuracy Progress Bars */}
      <div className="nc-card p-4 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
          Topic Accuracy Breakdown
        </h2>

        <div className="space-y-3">
          {topicAccuracies.map((topic, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#111111]">{topic.name}</span>
                <span className="font-semibold text-[#111111]">{topic.pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#EAEAEA] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#111111] rounded-full" 
                  style={{ width: `${topic.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
