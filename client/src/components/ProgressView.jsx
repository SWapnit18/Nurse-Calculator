import React from 'react';
import { TrendingUp, Award, Calendar, CheckCircle2, BookOpen } from 'lucide-react';

const TOPIC_CONFIG = [
  { id: 'unit_conversions', name: 'Unit Conversions' },
  { id: 'tablet_calculations', name: 'Tablet Calculations' },
  { id: 'liquid_calculations', name: 'Liquid Calculations' },
  { id: 'iv_flow_mathematics', name: 'IV Flow Mathematics' },
  { id: 'med_math_basics', name: 'Med Math Basics' },
];

export default function ProgressView({ stats }) {
  const accuracy = stats?.accuracy ?? 0;
  const total = stats?.totalQuestions ?? 0;
  const correct = stats?.correctAnswers ?? 0;
  const incorrect = stats?.incorrectAnswers ?? 0;

  const defaultWeekly = [
    { day: 'Mon', value: 0, count: 0 },
    { day: 'Tue', value: 0, count: 0 },
    { day: 'Wed', value: 0, count: 0 },
    { day: 'Thu', value: 0, count: 0 },
    { day: 'Fri', value: 0, count: 0 },
    { day: 'Sat', value: 0, count: 0 },
    { day: 'Sun', value: 0, count: 0 },
  ];

  const weeklyActivity = (stats?.weeklyActivity && stats.weeklyActivity.length > 0)
    ? stats.weeklyActivity
    : defaultWeekly;

  const topicAccuracies = TOPIC_CONFIG.map(t => {
    const topicStat = stats?.topicStats?.[t.id];
    const hasAttempts = topicStat && topicStat.total > 0;
    const pct = hasAttempts ? Math.round((topicStat.correct / topicStat.total) * 100) : null;
    return {
      name: t.name,
      id: t.id,
      pct: pct,
      total: topicStat?.total || 0,
      correct: topicStat?.correct || 0,
      hasAttempts
    };
  });

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Your Progress</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Real-time tracking of your calculation mastery, attempts, and score trends.</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-2">
        <div className="nc-card p-3 text-center bg-white dark:bg-[#111827]">
          <span className="text-base font-extrabold text-slate-900 dark:text-white">{accuracy}%</span>
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">Accuracy</span>
        </div>
        <div className="nc-card p-3 text-center bg-white dark:bg-[#111827]">
          <span className="text-base font-extrabold text-slate-900 dark:text-white">{total}</span>
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">Solved</span>
        </div>
        <div className="nc-card p-3 text-center bg-white dark:bg-[#111827]">
          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">{correct}</span>
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">Correct</span>
        </div>
        <div className="nc-card p-3 text-center bg-white dark:bg-[#111827]">
          <span className="text-base font-extrabold text-red-500 dark:text-red-400">{incorrect}</span>
          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">Missed</span>
        </div>
      </div>

      {/* Weekly Activity Bar Chart */}
      <div className="nc-card p-4 sm:p-5 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Weekly Study Activity
          </h2>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Past 7 Days</span>
        </div>

        <div className="flex items-end justify-between h-36 pt-4 px-2">
          {weeklyActivity.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1 h-full">
              <div className="w-7 bg-slate-100 dark:bg-slate-800 rounded-t-lg flex-1 w-full max-w-[28px] flex items-end overflow-hidden">
                <div 
                  className={`w-full bg-slate-900 dark:bg-white rounded-t-lg transition-all duration-500 ${item.count > 0 ? 'opacity-100' : 'opacity-20'}`} 
                  style={{ height: item.count > 0 ? `${Math.max(item.value || 0, 16)}%` : '6px' }}
                />
              </div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Accuracy Progress Bars */}
      <div className="nc-card p-4 sm:p-5 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Accuracy by Clinical Area
        </h2>

        <div className="space-y-3.5">
          {topicAccuracies.map((topic, idx) => {
            const isLow = topic.hasAttempts && topic.pct < 60;
            const displayPct = topic.hasAttempts ? `${topic.pct}%` : 'Not attempted';
            const barWidth = topic.hasAttempts ? `${topic.pct}%` : '0%';

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{topic.name}</span>
                  <span className={`font-extrabold ${isLow ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                    {displayPct} {topic.hasAttempts ? `(${topic.correct}/${topic.total})` : ''}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLow ? 'bg-amber-500' : 'bg-slate-900 dark:bg-white'
                    }`}
                    style={{ width: barWidth }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
