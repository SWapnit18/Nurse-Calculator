import React from 'react';
import { BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';

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
    desc: 'Critical care inotrope and sedative rate adjustments.',
    lessonsCompleted: 0,
    totalLessons: 4,
    progress: 0
  }
];

export default function LearnView({ onSelectTopic }) {
  return (
    <div className="space-y-4 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Learn</h1>
        <p className="text-sm text-[#666666] mt-0.5">Master key concepts step by step.</p>
      </div>

      <div className="space-y-3">
        {TOPICS.map((topic) => (
          <div
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className="nc-card p-4 hover:border-[#111111] cursor-pointer transition-all active:scale-[0.99] flex items-center justify-between gap-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-sm text-[#111111] truncate">{topic.title}</h2>
                <span className="text-xs text-[#666666] flex-shrink-0">
                  {topic.lessonsCompleted} / {topic.totalLessons} lessons
                </span>
              </div>
              <p className="text-xs text-[#666666] mt-1 line-clamp-1">{topic.desc}</p>
              
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-[#EAEAEA] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#111111] rounded-full transition-all duration-300"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-[#111111] w-8 text-right">
                  {topic.progress}%
                </span>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-[#888888] flex-shrink-0 ml-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
