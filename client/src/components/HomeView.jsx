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
          <h1 className="text-2xl font-bold tracking-tight text-[#111111]">
            Good morning, {user?.name?.split(' ')[0] || 'Nurse'} 👋
          </h1>
        </div>
        <p className="text-sm text-[#666666]">
          Keep learning, you're doing great!
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="nc-card p-3.5 text-center flex flex-col justify-center items-center">
          <span className="text-xl font-bold text-[#111111] tracking-tight">{accuracy}%</span>
          <span className="text-[11px] font-medium text-[#666666] mt-0.5">Accuracy</span>
        </div>
        <div className="nc-card p-3.5 text-center flex flex-col justify-center items-center">
          <span className="text-xl font-bold text-[#111111] tracking-tight">{totalQuestions}</span>
          <span className="text-[11px] font-medium text-[#666666] mt-0.5">Questions</span>
        </div>
        <div className="nc-card p-3.5 text-center flex flex-col justify-center items-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl font-bold text-[#111111] tracking-tight">{streakDays}</span>
            <span className="text-xs">🔥</span>
          </div>
          <span className="text-[11px] font-medium text-[#666666] mt-0.5">Day Streak</span>
        </div>
      </div>

      {/* Primary Action Button */}
      <div>
        <button
          id="btn-start-practice"
          onClick={onStartPractice}
          className="nc-btn-primary w-full flex items-center justify-center gap-2 text-base shadow-sm"
        >
          <span>Start Practice</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Continue Learning Card */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
            Continue Learning
          </h2>
          <button 
            onClick={() => onNavigate('learn')}
            className="text-xs font-medium text-[#111111] hover:underline"
          >
            See all
          </button>
        </div>

        <div 
          onClick={() => onContinueTopic('unit-conversions')}
          className="nc-card p-4 hover:border-[#111111] cursor-pointer transition-all active:scale-[0.99] flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center text-[#111111] flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-[#111111] truncate">Unit Conversions</h3>
              <p className="text-xs text-[#666666] mt-0.5">Lesson 4 of 6</p>
              <div className="w-32 h-1.5 bg-[#EAEAEA] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-[#111111] rounded-full" style={{ width: '67%' }} />
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#888888] flex-shrink-0" />
        </div>
      </div>

      {/* Weak Area Targeted Card */}
      <div className="space-y-2">
        <div className="px-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
            Weak Area
          </h2>
        </div>
        <div className="nc-card p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-[#111111] truncate">{weakTopic.title}</h3>
              <p className="text-xs text-[#666666] mt-0.5">{weakTopic.accuracy}% accuracy</p>
            </div>
          </div>
          <button
            onClick={() => onContinueTopic('iv-mathematics')}
            className="nc-btn-secondary px-3.5 py-2 text-xs font-semibold h-auto flex-shrink-0"
          >
            Practice
          </button>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="space-y-2 pt-1">
        <div className="px-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
            Quick Access
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
                className="nc-card p-3 flex flex-col items-center justify-center text-center hover:border-[#111111] active:scale-95 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F7F7F7] flex items-center justify-center text-[#111111] mb-1.5">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#111111] truncate max-w-full">
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
