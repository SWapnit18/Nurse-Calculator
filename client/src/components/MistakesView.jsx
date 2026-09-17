import React from 'react';
import { 
  AlertCircle, ArrowRight, RotateCcw, ShieldAlert, Sparkles, CheckCircle2, History
} from 'lucide-react';

const CATEGORY_METADATA = {
  'unit_conversions': {
    id: 'unit_conversions',
    title: 'Unit Conversion',
    tag: 'HIGH PRIORITY',
    tagColor: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900',
    description: 'Metric miscalculations (mcg ↔ mg, grams, lbs ↔ kg). Risk: 1,000-fold overdose.',
    clinicalAdvice: 'Multiply by 1,000 when going from large to small units (g → mg). Divide when going small to large.'
  },
  'tablet_calculations': {
    id: 'tablet_calculations',
    title: 'Tablet Calculation',
    tag: 'MODERATE',
    tagColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900',
    description: 'Desired over Have (D/H × V) & scored pill splitting rules.',
    clinicalAdvice: 'Never split non-scored tablets. If math results in >4 tablets for one dose, pause and recheck with pharmacy.'
  },
  'iv_flow_mathematics': {
    id: 'iv_flow_mathematics',
    title: 'Flow Rate (mL/hr & gtt/min)',
    tag: 'REVIEW',
    tagColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900',
    description: 'Volumetric smart pump rates and gravity drip timing.',
    clinicalAdvice: 'Gravity drops (gtt/min) must always be rounded to whole drops. Smart pump rates (mL/hr) support decimals.'
  },
  'med_math_basics': {
    id: 'med_math_basics',
    title: 'Decimals & Rounding Rules',
    tag: 'HIGH ALERT',
    tagColor: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900',
    description: 'ISMP & Joint Commission zero-slip syntax standards.',
    clinicalAdvice: 'Always enforce leading zeros (0.5 mg, NEVER .5 mg). Never use trailing zeros (5 mg, NEVER 5.0 mg).'
  },
  'liquid_calculations': {
    id: 'liquid_calculations',
    title: 'Liquid & Reconstitution Exercises',
    tag: 'STABLE',
    tagColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
    description: 'Lyophilized powder vials, diluent volumes, and final concentration.',
    clinicalAdvice: 'Focus on the final concentration per mL printed on the label, not the raw diluent volume injected.'
  },
};

export default function MistakesView({ mistakesData = [], onPracticeCategory }) {
  // Aggregate real mistakes by category
  const mistakesList = Array.isArray(mistakesData) ? mistakesData : [];
  const totalLoggedMistakes = mistakesList.length;

  const categoryCounts = {};
  mistakesList.forEach(m => {
    const key = m.topicId || (m.mistakeType === 'UNIT_CONVERSION_ERROR' ? 'unit_conversions' : (m.mistakeType === 'DECIMAL_SLIP_10X' ? 'med_math_basics' : 'tablet_calculations'));
    categoryCounts[key] = (categoryCounts[key] || 0) + 1;
  });

  const categories = Object.keys(CATEGORY_METADATA).map(catKey => {
    const meta = CATEGORY_METADATA[catKey];
    const count = categoryCounts[catKey] || 0;
    return {
      ...meta,
      mistakesCount: count
    };
  });

  const topCategory = categories.slice().sort((a, b) => b.mistakesCount - a.mistakesCount)[0];

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Title & Subheader */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Mistake Review</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">Real-time tracking of clinical calculation divergence and safety remediation.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-bold rounded-full">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{totalLoggedMistakes} Errors Tracked</span>
        </div>
      </div>

      {/* Clinical Diagnostic Summary Card */}
      <div className="nc-card p-4 sm:p-5 bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-900 dark:text-white" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
            Real-Time Error Diagnostic
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {totalLoggedMistakes > 0
            ? `You have ${totalLoggedMistakes} active error records in your study log. The ISMP identifies decimal slips and unit conversion as the highest risk factors for acute overdosing.`
            : `No calculation errors logged yet! Every mistake you make during practice will be automatically classified and logged here in real time.`}
        </p>
        {totalLoggedMistakes > 0 && topCategory && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => onPracticeCategory(topCategory.id)}
              className="nc-btn-primary px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Top Missed Topic: {topCategory.title} ({topCategory.mistakesCount})</span>
            </button>
          </div>
        )}
      </div>

      {/* Recent Real Mistakes Stream */}
      {mistakesList.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 px-1">
            <History className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Recent Logged Calculation Errors ({mistakesList.length})
            </h2>
          </div>
          <div className="space-y-2.5">
            {mistakesList.slice(0, 5).map((m, idx) => (
              <div key={idx} className="nc-card p-3.5 bg-white dark:bg-[#111827] border border-red-200 dark:border-red-900/40 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-red-600 dark:text-red-400">
                    {m.mistakeType?.replace(/_/g, ' ') || 'CALCULATION ERROR'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {m.timestamp ? new Date(m.timestamp).toLocaleDateString() : 'Today'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {m.questionTitle || m.prompt || 'Clinical Calculation Practice'}
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-red-600 dark:text-red-400 font-medium">Entered: <b>{m.studentAnswer}</b></span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Correct: <b>{m.correctAnswer}</b></span>
                </div>
                {m.aiExplanation && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg leading-relaxed">
                    💡 {m.aiExplanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mistake Categories List */}
      <div className="space-y-3.5">
        <div className="px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Error Category Breakdown
          </h2>
        </div>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="nc-card p-4 sm:p-5 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all space-y-3 group shadow-sm bg-white dark:bg-[#111827]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cat.title}
                  </h3>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${cat.tagColor}`}>
                    {cat.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <button
                onClick={() => onPracticeCategory(cat.id)}
                className="nc-btn-secondary px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
              >
                <span>Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Clinical Rule Box */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-slate-900 dark:text-white flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-white">Safety Rule: </span>
                {cat.clinicalAdvice}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 font-semibold">
              <span className="text-slate-700 dark:text-slate-300 font-bold">{cat.mistakesCount} logged in history</span>
              <span className="text-[11px] uppercase tracking-wider">NCLEX Focus</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
