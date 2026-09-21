import React, { useState } from 'react';
import { Target, Award, Flame, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, BookOpen, Clock, Zap } from 'lucide-react';

export default function LearningGoalsView({ stats, completedLessons = new Set(), onStartPractice, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'in-progress', 'completed'

  const accuracy = stats?.accuracy ?? 0;
  const totalSolved = stats?.totalQuestions ?? 0;
  const correctSolved = stats?.correctAnswers ?? 0;
  const streakDays = stats?.streakDays ?? 0;

  const completedCount = completedLessons instanceof Set ? completedLessons.size : (Array.isArray(completedLessons) ? completedLessons.length : 0);

  const goals = [
    {
      id: 'accuracy',
      title: 'Clinical Accuracy (≥90%)',
      desc: 'Achieve 90%+ calculation accuracy across all dosage topics to ensure patient medication safety.',
      currentVal: `${accuracy}%`,
      targetVal: '90%',
      progressPct: Math.min(100, Math.round((accuracy / 90) * 100)),
      isMet: accuracy >= 90 && totalSolved >= 10,
      icon: Target,
      theme: {
        accent: 'emerald',
        bgLight: 'bg-emerald-500/10',
        borderLight: 'border-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        bar: 'bg-gradient-to-r from-emerald-500 to-teal-400'
      }
    },
    {
      id: 'volume',
      title: 'NCLEX Question Mastery (50 Questions)',
      desc: 'Complete at least 50 verified clinical calculation questions across all curriculum domains.',
      currentVal: `${totalSolved} solved`,
      targetVal: '50 solved',
      progressPct: Math.min(100, Math.round((totalSolved / 50) * 100)),
      isMet: totalSolved >= 50,
      icon: Award,
      theme: {
        accent: 'indigo',
        bgLight: 'bg-indigo-500/10',
        borderLight: 'border-indigo-500/20',
        text: 'text-indigo-600 dark:text-indigo-400',
        bar: 'bg-gradient-to-r from-indigo-500 to-violet-400'
      }
    },
    {
      id: 'streak',
      title: '7-Day Continuous Study Habit',
      desc: 'Build automated dosage calculation reflex and long-term retention with daily clinical simulation.',
      currentVal: `${streakDays} days`,
      targetVal: '7 days',
      progressPct: Math.min(100, Math.round((streakDays / 7) * 100)),
      isMet: streakDays >= 7,
      icon: Flame,
      theme: {
        accent: 'amber',
        bgLight: 'bg-amber-500/10',
        borderLight: 'border-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        bar: 'bg-gradient-to-r from-amber-500 to-orange-400'
      }
    },
    {
      id: 'curriculum',
      title: 'Core Curriculum Completion (42 Lessons)',
      desc: 'Master all 42 clinical dosage calculation lessons across 8 accredited modules.',
      currentVal: `${completedCount} done`,
      targetVal: '42 lessons',
      progressPct: Math.min(100, Math.round((completedCount / 42) * 100)),
      isMet: completedCount >= 42,
      icon: ShieldCheck,
      theme: {
        accent: 'sky',
        bgLight: 'bg-sky-500/10',
        borderLight: 'border-sky-500/20',
        text: 'text-sky-600 dark:text-sky-400',
        bar: 'bg-gradient-to-r from-sky-500 to-cyan-400'
      }
    }
  ];

  const filteredGoals = goals.filter(g => {
    if (activeFilter === 'completed') return g.isMet;
    if (activeFilter === 'in-progress') return !g.isMet;
    return true;
  });

  const completedGoalsCount = goals.filter(g => g.isMet).length;

  return (
    <div className="space-y-4 pb-12 animate-fade-in max-w-xl mx-auto">
      {/* Sleek Sub-Header Pill & Context */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/5 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>NCLEX Milestone Roadmap</span>
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          <b className="text-slate-900 dark:text-white font-bold">{completedGoalsCount}</b> of 4 Achieved
        </span>
      </div>

      {/* Hero Readiness Metric Card (Stunning Glassmorphic Design) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-5 sm:p-6 shadow-xl border border-slate-800/80">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Card Top: Metric Label & Live Status Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                <Target className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                Overall Readiness
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-white tracking-wide">
                {accuracy >= 85 && totalSolved >= 20 ? 'Exam Ready' : totalSolved > 0 ? 'In Training' : 'Getting Started'}
              </span>
            </div>
          </div>

          {/* Main Stat Display */}
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  {accuracy}%
                </span>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Precision
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Target: 90%+ for zero medication error threshold
              </p>
            </div>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 backdrop-blur-sm">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 transition-all duration-700 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                style={{ width: `${Math.max(4, Math.min(100, accuracy))}%` }}
              />
            </div>
          </div>

          {/* 3 Micro Stat Chips */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Streak</span>
              </div>
              <p className="text-sm font-bold text-white mt-0.5">{streakDays} Days</p>
            </div>

            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified</span>
              </div>
              <p className="text-sm font-bold text-white mt-0.5">{correctSolved}/{totalSolved}</p>
            </div>

            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Lessons</span>
              </div>
              <p className="text-sm font-bold text-white mt-0.5">{completedCount}/42</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-800">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          All Goals ({goals.length})
        </button>
        <button
          onClick={() => setActiveFilter('in-progress')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeFilter === 'in-progress'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          In Progress ({goals.length - completedGoalsCount})
        </button>
        <button
          onClick={() => setActiveFilter('completed')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeFilter === 'completed'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Completed ({completedGoalsCount})
        </button>
      </div>

      {/* Milestone Cards List */}
      <div className="space-y-3">
        {filteredGoals.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.id}
              className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border transition-all duration-200 ${
                g.isMet
                  ? 'border-emerald-500/30 dark:border-emerald-500/20 shadow-xs'
                  : 'border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${g.theme.bgLight} ${g.theme.text} border ${g.theme.borderLight}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>

                {g.isMet ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 rounded-full text-[11px] font-bold flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Done</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200/60 dark:border-slate-700/60 flex-shrink-0">
                    {g.progressPct}%
                  </span>
                )}
              </div>

              {/* Progress Track */}
              <div className="space-y-1.5 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Current: <b className="text-slate-800 dark:text-slate-200">{g.currentVal}</b>
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Target: {g.targetVal}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800/90 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-600 ${g.theme.bar}`}
                    style={{ width: `${Math.max(2, g.progressPct)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {filteredGoals.length === 0 && (
          <div className="text-center py-8 px-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              No milestones found in this filter.
            </p>
          </div>
        )}
      </div>

      {/* Clinical Safety Protocol Disclaimer Callout */}
      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
        <ShieldCheck className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5 leading-relaxed">
          <span className="font-bold text-amber-800 dark:text-amber-300">NCSBN Medication Safety Benchmark:</span>
          <p className="text-amber-700/90 dark:text-amber-300/80">
            Clinical licensure exams evaluate candidates for zero-error tolerance on high-alert medications (Heparin, Insulin, and Vasoactive titrations).
          </p>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-1">
        <button
          onClick={onStartPractice}
          className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-emerald-600 dark:via-teal-600 dark:to-emerald-600 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 dark:shadow-emerald-950/30 cursor-pointer"
        >
          <span>Continue NCLEX Practice Towards Goals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
