import React from 'react';
import { 
  AlertCircle, ArrowRight, RotateCcw, AlertTriangle, 
  TrendingDown, CheckCircle2, ShieldAlert, Sparkles, BrainCircuit, BookOpen
} from 'lucide-react';

const MISTAKE_CATEGORIES = [
  { 
    id: 'unit-conversion', 
    title: 'Unit Conversion', 
    mistakesCount: 6, 
    tag: 'HIGH PRIORITY',
    tagColor: 'bg-red-50 text-red-700 border-red-200',
    description: 'Metric miscalculations (mcg ↔ mg, grams, lbs ↔ kg). Risk: 1,000-fold overdose.',
    clinicalAdvice: 'Multiply by 1,000 when going from large to small units (g → mg). Divide when going small to large.'
  },
  { 
    id: 'tablet-calculation', 
    title: 'Tablet Calculation', 
    mistakesCount: 3, 
    tag: 'MODERATE',
    tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Desired over Have (D/H × V) & scored pill splitting rules.',
    clinicalAdvice: 'Never split non-scored tablets. If math results in >4 tablets for one dose, pause and recheck with pharmacy.'
  },
  { 
    id: 'flow-rate', 
    title: 'Flow Rate (mL/hr & gtt/min)', 
    mistakesCount: 2, 
    tag: 'REVIEW',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Volumetric smart pump rates and gravity drip timing.',
    clinicalAdvice: 'Gravity drops (gtt/min) must always be rounded to whole drops. Smart pump rates (mL/hr) support decimals.'
  },
  { 
    id: 'decimals-rounding', 
    title: 'Decimals & Rounding Rules', 
    mistakesCount: 2, 
    tag: 'REVIEW',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'ISMP & Joint Commission zero-slip syntax standards.',
    clinicalAdvice: 'Always enforce leading zeros (0.5 mg, NEVER .5 mg). Never use trailing zeros (5 mg, NEVER 5.0 mg).'
  },
  { 
    id: 'reconstitution', 
    title: 'Reconstitution Exercises', 
    mistakesCount: 1, 
    tag: 'STABLE',
    tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Lyophilized powder vials, diluent volumes, and final concentration.',
    clinicalAdvice: 'Focus on the final concentration per mL printed on the label, not the raw diluent volume injected.'
  },
];

export default function MistakesView({ onPracticeCategory }) {
  const totalLoggedMistakes = MISTAKE_CATEGORIES.reduce((acc, c) => acc + c.mistakesCount, 0);

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Title & Subheader */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Mistake Review</h1>
          <p className="text-sm text-[#666666] mt-0.5">Identify knowledge gaps and eliminate high-risk dosage errors.</p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-full">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{totalLoggedMistakes} Errors Tracked</span>
        </div>
      </div>

      {/* Clinical Diagnostic Summary Card */}
      <div className="nc-card p-4 sm:p-5 bg-[#FAFAFA] border border-[#E5E5E5] space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#111111]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
            Error Prevention Diagnostic
          </span>
        </div>
        <p className="text-xs text-[#555555] leading-relaxed">
          The ISMP (Institute for Safe Medication Practices) identifies unit conversion and decimal placement as the #1 causes of 10-fold and 1,000-fold clinical medication incidents. Practice missed topics to build automated safety reflexes.
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => onPracticeCategory('unit-conversion')}
            className="nc-btn-primary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice High-Priority Errors ({MISTAKE_CATEGORIES[0].mistakesCount})</span>
          </button>
        </div>
      </div>

      {/* Mistake Categories List */}
      <div className="space-y-3.5">
        {MISTAKE_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="nc-card p-4 sm:p-5 border border-[#E5E5E5] hover:border-[#111111]/40 transition-all space-y-3 group shadow-sm bg-white"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-base text-[#111111] group-hover:text-black transition-colors">
                    {cat.title}
                  </h2>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${cat.tagColor}`}>
                    {cat.tag}
                  </span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <button
                onClick={() => onPracticeCategory(cat.id)}
                className="nc-btn-secondary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-all shadow-sm"
              >
                <span>Practice Again</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Clinical Rule Box */}
            <div className="p-3 bg-[#F9F9F9] rounded-xl border border-[#EEEEEE] text-xs text-[#444444] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-[#111111]">Safety Rule: </span>
                {cat.clinicalAdvice}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#888888] pt-1">
              <span className="font-medium text-[#666666]">{cat.mistakesCount} logged in history</span>
              <span className="text-[11px] font-semibold text-[#888888]">NCLEX Review</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
