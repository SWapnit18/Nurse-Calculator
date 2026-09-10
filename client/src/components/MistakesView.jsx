import React from 'react';
import { AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

const MISTAKE_CATEGORIES = [
  { id: 'unit-conversion', title: 'Unit Conversion', mistakesCount: 6, tag: 'HIGH PRIORITY' },
  { id: 'tablet-calculation', title: 'Tablet Calculation', mistakesCount: 3, tag: 'MODERATE' },
  { id: 'flow-rate', title: 'Flow Rate (mL/hr)', mistakesCount: 2, tag: 'REVIEW' },
  { id: 'decimals-rounding', title: 'Decimals & Rounding', mistakesCount: 2, tag: 'REVIEW' },
  { id: 'reconstitution', title: 'Reconstitution', mistakesCount: 1, tag: 'STABLE' },
];

export default function MistakesView({ onPracticeCategory }) {
  return (
    <div className="space-y-4 pb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">Mistake Review</h1>
        <p className="text-sm text-[#666666] mt-0.5">Learn from the questions you missed.</p>
      </div>

      <div className="space-y-3">
        {MISTAKE_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="nc-card p-4 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm text-[#111111] truncate">{cat.title}</h2>
              </div>
              <p className="text-xs text-[#666666] mt-0.5">{cat.mistakesCount} mistakes logged</p>
            </div>

            <button
              onClick={() => onPracticeCategory(cat.id)}
              className="nc-btn-secondary px-3.5 py-2 text-xs font-semibold h-auto flex-shrink-0"
            >
              Practice Again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
