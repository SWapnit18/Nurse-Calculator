import React from 'react';
import { BookOpen, ChevronRight, CheckCircle2, ShieldCheck, ExternalLink, Globe, Award } from 'lucide-react';

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
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Learn</h1>
        <p className="text-sm text-[#666666] mt-0.5">Master key concepts step by step.</p>
      </div>

      {/* WHO & NCLEX Standards Banner */}
      <div className="nc-card p-4 bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#0284C7]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
            Accredited Clinical Guidelines
          </span>
        </div>
        <p className="text-xs text-[#475569] leading-relaxed">
          NurseCalc curriculum follows World Health Organization (WHO) Patient Safety standards and NCLEX Next-Gen clinical judgment measurement models.
        </p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="https://www.who.int/initiatives/medication-without-harm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs font-medium text-[#1E293B] hover:border-[#0284C7] transition-all"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Globe className="w-4 h-4 text-[#0284C7] flex-shrink-0" />
              <span className="truncate">WHO Med Safety</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
          </a>

          <a
            href="https://www.ncsbn.org/nclex.page"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs font-medium text-[#1E293B] hover:border-[#0284C7] transition-all"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Award className="w-4 h-4 text-[#0284C7] flex-shrink-0" />
              <span className="truncate">NCLEX NCSBN</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
          </a>
        </div>
      </div>

      {/* Curriculum Topic List */}
      <div className="space-y-3">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => onSelectTopic(topic)}
            className="w-full nc-card p-4 text-left hover:border-[#111111] hover:bg-[#FAFAFA] cursor-pointer transition-all active:scale-[0.99] flex items-center justify-between gap-3"
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
          </button>
        ))}
      </div>
    </div>
  );
}
