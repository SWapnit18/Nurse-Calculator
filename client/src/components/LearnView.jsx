import React from 'react';
import { BookOpen, ChevronRight, CheckCircle2, ShieldCheck, ExternalLink, Globe, Award, Sparkles } from 'lucide-react';

const TOPICS = [
  {
    id: 'medication-math-basics',
    title: 'Medication Math Basics',
    desc: 'Understanding orders, fractions, decimals, and ratios.',
    lessonsCompleted: 4,
    totalLessons: 6,
    progress: 67
  },
  {
    id: 'unit-conversions',
    title: 'Unit Conversions',
    desc: 'Metric (g, mg, mcg, kg) and household volumetric conversions.',
    lessonsCompleted: 3,
    totalLessons: 5,
    progress: 60
  },
  {
    id: 'tablet-calculations',
    title: 'Tablet Calculations',
    desc: 'Desired over have formula for scored and standard solid doses.',
    lessonsCompleted: 2,
    totalLessons: 5,
    progress: 40
  },
  {
    id: 'liquid-calculations',
    title: 'Liquid Calculations',
    desc: 'Syringe volume determination for oral & parenteral liquids.',
    lessonsCompleted: 1,
    totalLessons: 5,
    progress: 20
  },
  {
    id: 'iv-flow-mathematics',
    title: 'IV Flow Mathematics',
    desc: 'Infusion pump rates (mL/hr) and gravity drop factors (gtt/min).',
    lessonsCompleted: 3,
    totalLessons: 6,
    progress: 50
  },
  {
    id: 'weight-based-practice',
    title: 'Weight-Based Calculations',
    desc: 'Safe mg/kg/dose and mcg/kg/min pediatric & ICU titration.',
    lessonsCompleted: 0,
    totalLessons: 5,
    progress: 0
  },
  {
    id: 'reconstitution-exercises',
    title: 'Reconstitution Exercises',
    desc: 'Powdered medications, diluent volumes, and final yield.',
    lessonsCompleted: 1,
    totalLessons: 4,
    progress: 25
  },
  {
    id: 'advanced-calculations',
    title: 'Advanced Clinical Titrations',
    desc: 'Heparin weight-based protocols, insulin scale, and critical care drips.',
    lessonsCompleted: 0,
    totalLessons: 6,
    progress: 0
  }
];

export default function LearnView({ onSelectTopic }) {
  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Learn & Review</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">High-yield clinical calculation curricula and formula breakdowns.</p>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {TOPICS.map((topic) => (
          <div
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="nc-card p-4 hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer transition-all active:scale-[0.99] flex items-center justify-between gap-3 group bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {topic.title}
                  </h2>
                  {topic.progress === 100 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{topic.desc}</p>
                
                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-28 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-300" 
                      style={{ width: `${topic.progress}%` }} 
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                    {topic.lessonsCompleted}/{topic.totalLessons} lessons
                  </span>
                </div>
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </div>
        ))}
      </div>
    </div>
  );
}
