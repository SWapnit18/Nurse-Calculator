import React from 'react';
import { 
  AlertCircle, ArrowRight, RotateCcw, ShieldAlert, History, CheckCircle2, ChevronRight
} from 'lucide-react';

const CATEGORY_METADATA = {
  'med_math_basics': {
    id: 'med_math_basics',
    title: 'Decimals & Rounding',
    tag: 'High Alert',
    tagColor: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-900/50',
    rule: 'Always use leading zero (0.5). Never use trailing zero (5).'
  },
  'unit_conversions': {
    id: 'unit_conversions',
    title: 'Unit Conversions',
    tag: 'Priority',
    tagColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-900/50',
    rule: 'Multiply by 1,000 going large to small (g → mg). Divide small to large.'
  },
  'tablet_calculations': {
    id: 'tablet_calculations',
    title: 'Oral Tablets',
    tag: 'Moderate',
    tagColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
    rule: 'D/H × V. Only score tablets with break lines. Check doses >4 tablets.'
  },
  'iv_flow_mathematics': {
    id: 'iv_flow_mathematics',
    title: 'IV Flow Rates',
    tag: 'Review',
    tagColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    rule: 'Gravity drops (gtt/min) round to whole numbers; pumps (mL/hr) use decimals.'
  },
  'liquid_calculations': {
    id: 'liquid_calculations',
    title: 'Liquids & Reconstitution',
    tag: 'Standard',
    tagColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50',
    rule: 'Use concentration on vial label, not total diluent volume.'
  },
};

export default function MistakesView({ mistakesData = [], onPracticeCategory }) {
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
    <div className="space-y-4 pb-12 animate-fade-in max-w-lg mx-auto">
      {/* Minimal Top Subheader */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{totalLoggedMistakes} Logged Mistakes</span>
          </span>
        </div>
        {topCategory && topCategory.mistakesCount > 0 && (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Main focus: <b className="text-slate-900 dark:text-white">{topCategory.title}</b>
          </span>
        )}
      </div>

      {/* Actionable Practice Focus Card */}
      {totalLoggedMistakes > 0 && topCategory && (
        <div className="p-4 rounded-2xl bg-slate-900 text-white dark:bg-[#111827] dark:border dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block">
              High-Risk Topic
            </span>
            <h3 className="font-bold text-sm text-white truncate mt-0.5">
              {topCategory.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {topCategory.mistakesCount} errors recorded in recent practice
            </p>
          </div>

          <button
            onClick={() => onPracticeCategory(topCategory.id)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400 transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Practice</span>
          </button>
        </div>
      )}

      {/* Recent Mistake Stream (Minimal & Punchy) */}
      {mistakesList.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Recent Errors
            </h2>
            <span className="text-xs text-slate-400">Latest 5</span>
          </div>

          <div className="space-y-2">
            {mistakesList.slice(0, 5).map((m, idx) => {
              const typeLabel = m.mistakeType === 'DECIMAL_SLIP_10X'
                ? '10x Decimal Slip'
                : m.mistakeType === 'UNIT_CONVERSION_ERROR'
                ? 'Unit Conversion'
                : m.mistakeType === 'ROUNDING_MISMATCH'
                ? 'Rounding Mismatch'
                : 'Formula Error';

              return (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white truncate">
                      {m.questionTitle || 'Clinical Calculation'}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40 flex-shrink-0">
                      {typeLabel}
                    </span>
                  </div>

                  {/* Answers Comparison */}
                  <div className="flex items-center gap-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">
                      Entered: <b className="text-rose-600 dark:text-rose-400 line-through">{m.studentAnswer}</b>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Correct: <b className="text-emerald-600 dark:text-emerald-400">{m.correctAnswer}</b>
                    </span>
                  </div>

                  {/* Concise One-Line Takeaway */}
                  {m.aiExplanation && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
                      💡 {m.aiExplanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Breakdown (Clean List) */}
      <div className="space-y-2.5 pt-1">
        <div className="px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Error Category Breakdown
          </h2>
        </div>

        <div className="nc-card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xs">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onPracticeCategory(cat.id)}
              className="p-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {cat.title}
                  </h3>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${cat.tagColor}`}>
                    {cat.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {cat.rule}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {cat.mistakesCount > 0 ? (
                  <span className="text-xs font-bold px-2 py-0.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-full border border-rose-200 dark:border-rose-900/60">
                    {cat.mistakesCount}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">0</span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
