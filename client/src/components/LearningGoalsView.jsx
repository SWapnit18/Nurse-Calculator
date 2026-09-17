import React from 'react';
import { Target, Award, Flame, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LearningGoalsView({ stats, completedLessons = new Set(), onStartPractice, onNavigate }) {
  const accuracy = stats?.accuracy ?? 0;
  const totalSolved = stats?.totalQuestions ?? 0;
  const correctSolved = stats?.correctAnswers ?? 0;
  const streakDays = stats?.streakDays ?? 0;

  const completedCount = completedLessons instanceof Set ? completedLessons.size : (Array.isArray(completedLessons) ? completedLessons.length : 0);

  const goals = [
    {
      id: 'accuracy',
      title: 'Target Clinical Accuracy (≥90%)',
      desc: 'Achieve 90%+ calculation accuracy across all dosage topics to ensure patient medication safety.',
      currentVal: `${accuracy}%`,
      targetVal: '90%',
      progressPct: Math.min(100, Math.round((accuracy / 90) * 100)),
      isMet: accuracy >= 90 && totalSolved >= 10,
      icon: Target,
      color: 'blue'
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
      color: 'indigo'
    },
    {
      id: 'streak',
      title: '7-Day Continuous Study Habit',
      desc: 'Build automated dosage calculation reflex and long-term retention with daily simulation.',
      currentVal: `${streakDays} days`,
      targetVal: '7 days',
      progressPct: Math.min(100, Math.round((streakDays / 7) * 100)),
      isMet: streakDays >= 7,
      icon: Flame,
      color: 'amber'
    },
    {
      id: 'curriculum',
      title: 'Core Curriculum Completion (42 Lessons)',
      desc: 'Master all 42 clinical dosage calculation lessons across 8 accredited modules.',
      currentVal: `${completedCount} completed`,
      targetVal: '42 lessons',
      progressPct: Math.min(100, Math.round((completedCount / 42) * 100)),
      isMet: completedCount >= 42,
      icon: ShieldCheck,
      color: 'emerald'
    }
  ];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Learning Goals</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Real-time tracking towards your NCLEX clinical math competency milestones.</p>
      </div>

      {/* Summary Milestone Card */}
      <div className="nc-card p-4 sm:p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Overall Readiness Metric
            </h2>
          </div>
          <span className="text-xs font-extrabold px-2.5 py-0.5 bg-white/20 rounded-full text-white">
            {accuracy >= 85 && totalSolved >= 20 ? 'Exam Ready' : totalSolved > 0 ? 'In Training' : 'Getting Started'}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black">{accuracy}% Precision</span>
            <span className="text-xs text-slate-300 font-semibold">{correctSolved}/{totalSolved} verified answers</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, accuracy)}%` }} 
            />
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The National Council of State Boards of Nursing (NCSBN) requires 100% calculation safety on critical high-alert medications.
        </p>
      </div>

      {/* Goals List */}
      <div className="space-y-3.5">
        <div className="px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Milestone Targets
          </h2>
        </div>

        {goals.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.id}
              className="nc-card p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-3 rounded-2xl shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {g.desc}
                    </p>
                  </div>
                </div>
                {g.isMet && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Goal Met</span>
                  </span>
                )}
              </div>

              {/* Progress Bar & Status */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Current: <b>{g.currentVal}</b>
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    Target: {g.targetVal} ({g.progressPct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      g.isMet ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-slate-900 dark:bg-white'
                    }`}
                    style={{ width: `${g.progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Practice CTA */}
      <div className="pt-2">
        <button
          onClick={onStartPractice}
          className="nc-btn-primary w-full flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer py-3"
        >
          <span>Continue Practice towards Goals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
