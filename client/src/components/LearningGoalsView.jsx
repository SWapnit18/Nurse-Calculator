import React, { useState } from 'react';
import { Target, Award, Flame, CheckCircle2, ShieldCheck, ArrowRight, BookOpen, Zap } from 'lucide-react';

export default function LearningGoalsView({ stats, completedLessons = new Set(), onStartPractice }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'active', 'done'

  const accuracy = stats?.accuracy ?? 0;
  const totalSolved = stats?.totalQuestions ?? 0;
  const correctSolved = stats?.correctAnswers ?? 0;
  const streakDays = stats?.streakDays ?? 0;

  const completedCount = completedLessons instanceof Set 
    ? completedLessons.size 
    : (Array.isArray(completedLessons) ? completedLessons.length : 0);

  const goals = [
    {
      id: 'accuracy',
      title: 'Clinical Accuracy',
      currentVal: `${accuracy}%`,
      targetVal: '90%',
      progressPct: Math.min(100, Math.round((accuracy / 90) * 100)),
      isMet: accuracy >= 90 && totalSolved >= 10,
      icon: Target,
      accent: 'emerald',
      color: 'text-emerald-500',
      bar: 'bg-emerald-500',
      bgLight: 'bg-emerald-500/10'
    },
    {
      id: 'volume',
      title: 'Question Mastery',
      currentVal: `${totalSolved}`,
      targetVal: '50 questions',
      progressPct: Math.min(100, Math.round((totalSolved / 50) * 100)),
      isMet: totalSolved >= 50,
      icon: Award,
      accent: 'indigo',
      color: 'text-indigo-500',
      bar: 'bg-indigo-500',
      bgLight: 'bg-indigo-500/10'
    },
    {
      id: 'streak',
      title: '7-Day Streak',
      currentVal: `${streakDays}d`,
      targetVal: '7 days',
      progressPct: Math.min(100, Math.round((streakDays / 7) * 100)),
      isMet: streakDays >= 7,
      icon: Flame,
      accent: 'amber',
      color: 'text-amber-500',
      bar: 'bg-amber-500',
      bgLight: 'bg-amber-500/10'
    },
    {
      id: 'curriculum',
      title: 'Core Curriculum',
      currentVal: `${completedCount}`,
      targetVal: '42 lessons',
      progressPct: Math.min(100, Math.round((completedCount / 42) * 100)),
      isMet: completedCount >= 42,
      icon: ShieldCheck,
      accent: 'sky',
      color: 'text-sky-500',
      bar: 'bg-sky-500',
      bgLight: 'bg-sky-500/10'
    }
  ];

  const filteredGoals = goals.filter(g => {
    if (activeFilter === 'done') return g.isMet;
    if (activeFilter === 'active') return !g.isMet;
    return true;
  });

  const completedGoalsCount = goals.filter(g => g.isMet).length;

  return (
    <div className="space-y-4 pb-12 animate-fade-in max-w-lg mx-auto">
      {/* Minimal Hero Readiness Card */}
      <div className="rounded-3xl bg-[#0B0F19] text-white p-5 shadow-lg border border-slate-800">
        {/* Top: Status & Target */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Readiness Score</span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {accuracy >= 85 && totalSolved >= 20 ? 'Exam Ready' : totalSolved > 0 ? 'In Training' : 'New'}
          </span>
        </div>

        {/* Big Number & Progress */}
        <div className="mt-3 mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-white">{accuracy}%</span>
            <span className="text-xs text-slate-400 font-medium">/ 90% Target</span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500"
              style={{ width: `${Math.max(4, Math.min(100, accuracy))}%` }}
            />
          </div>
        </div>

        {/* Minimal 3-Column Metrics (No heavy box clutter) */}
        <div className="grid grid-cols-3 pt-3 border-t border-white/10 text-center">
          <div>
            <span className="text-[11px] text-slate-400 block">Streak</span>
            <span className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {streakDays}d
            </span>
          </div>
          <div className="border-x border-white/10">
            <span className="text-[11px] text-slate-400 block">Verified</span>
            <span className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              {correctSolved}/{totalSolved}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Lessons</span>
            <span className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              {completedCount}/42
            </span>
          </div>
        </div>
      </div>

      {/* Filter Chips & Counter */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              activeFilter === 'active'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveFilter('done')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              activeFilter === 'done'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Done
          </button>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          <b>{completedGoalsCount}</b> of 4 achieved
        </span>
      </div>

      {/* Minimal & Punchy Milestone Cards */}
      <div className="space-y-2.5">
        {filteredGoals.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${g.bgLight} ${g.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{g.title}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {g.currentVal} <span className="text-slate-400">/ {g.targetVal}</span>
                    </p>
                  </div>
                </div>

                {g.isMet ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                    <CheckCircle2 className="w-3 h-3" />
                    Done
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    {g.progressPct}%
                  </span>
                )}
              </div>

              {/* Clean Slim Progress Track */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${g.bar}`}
                  style={{ width: `${Math.max(3, g.progressPct)}%` }}
                />
              </div>
            </div>
          );
        })}

        {filteredGoals.length === 0 && (
          <div className="text-center py-6 text-xs text-slate-400 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            No milestones in this tab.
          </div>
        )}
      </div>

      {/* Subtle Clinical Standard Footer */}
      <div className="text-center pt-1">
        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Aligned with NCSBN & ISMP medication safety standards</span>
        </p>
      </div>

      {/* Compact Primary CTA */}
      <div className="pt-1">
        <button
          onClick={onStartPractice}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 dark:bg-emerald-600 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
        >
          <span>Practice Next Goal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
