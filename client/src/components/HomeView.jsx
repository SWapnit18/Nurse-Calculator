import React from 'react';
import { 
  ArrowRight, Award, Flame, CheckCircle2, 
  HelpCircle, AlertCircle, BookOpen, Calculator, Sparkles, ChevronRight, Zap
} from 'lucide-react';

export default function HomeView({ 
  user, 
  stats, 
  onStartPractice, 
  onContinueTopic, 
  onNavigate 
}) {
  const accuracy = stats?.accuracy ?? 82;
  const totalQuestions = stats?.totalQuestions ?? 126;
  const streakDays = stats?.streakDays ?? 6;
  const weakTopic = stats?.weakTopic || { title: 'IV Flow Mathematics', accuracy: 51 };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Good morning, {user?.name?.split(' ')[0] || 'Nurse'} 👋
          </h1>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Ready to master your clinical calculations today?
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="nc-card p-3.5 text-center flex flex-col justify-center items-center bg-white dark:bg-[#111827]">
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{accuracy}%</span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Accuracy</span>
        </div>
        <div className="nc-card p-3.5 text-center flex flex-col justify-center items-center bg-white dark:bg-[#111827]">
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{totalQuestions}</span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Solved</span>
        </div>
        <div className="nc-card p-3.5 text-center flex flex-col justify-center items-center bg-white dark:bg-[#111827]">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{streakDays}</span>
            <span className="text-xs">🔥</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">Day Streak</span>
        </div>
      </div>

      {/* Primary Action Button */}
      <div>
        <button
          id="btn-start-practice"
          onClick={onStartPractice}
          className="nc-btn-primary w-full flex items-center justify-center gap-2 text-base shadow-sm cursor-pointer"
        >
          <span>Start Daily Practice</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Continue Learning Card */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Continue Learning
          </h2>
          <button 
            onClick={() => onNavigate('learn')}
            className="text-xs font-semibold text-slate-900 dark:text-slate-200 hover:underline cursor-pointer"
          >
            See all
          </button>
        </div>

        <div 
          onClick={() => onContinueTopic('unit-conversions')}
          className="nc-card p-4 hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer transition-all active:scale-[0.99] flex items-center justify-between gap-3 bg-white dark:bg-[#111827]"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">Unit Conversions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Lesson 4 of 6 · Metric Factor Analysis</p>
              <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-slate-900 dark:bg-white rounded-full" style={{ width: '67%' }} />
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        </div>
      </div>

      {/* Weak Area Targeted Card */}
      <div className="space-y-2">
        <div className="px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Target Focus Area
          </h2>
        </div>
        <div className="nc-card p-4 flex items-center justify-between gap-3 bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{weakTopic.title}</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 font-medium">{weakTopic.accuracy}% accuracy · Low confidence</p>
            </div>
          </div>
          <button
            onClick={() => onContinueTopic('iv-flow-mathematics')}
            className="nc-btn-secondary px-3.5 py-2 text-xs font-bold h-auto flex-shrink-0 cursor-pointer"
          >
            Review
          </button>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="space-y-2 pt-1">
        <div className="px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quick Tools
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'calculator', label: 'Calculator', icon: Calculator },
            { id: 'learn', label: 'Learn', icon: BookOpen },
            { id: 'mistakes', label: 'Mistakes', icon: AlertCircle },
            { id: 'ai-tutor', label: 'AI Tutor', icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="nc-card p-3 flex flex-col items-center justify-center text-center hover:border-slate-400 dark:hover:border-slate-600 active:scale-95 transition-all bg-white dark:bg-[#111827] cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 mb-1.5">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
