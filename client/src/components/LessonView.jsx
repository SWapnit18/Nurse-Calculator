import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

export default function LessonView({ 
  lesson, 
  onBack, 
  onStartPractice 
}) {
  const currentLesson = lesson || {
    title: 'Unit Conversions: Grams to Milligrams',
    objective: 'Convert metric doses accurately using the factor-label method.',
    concept: 'In healthcare, medication orders are frequently written in milligrams (mg) while stock packages may be labelled in grams (g) or micrograms (mcg). 1 gram (g) is equal to 1,000 milligrams (mg).',
    example: 'Order: Cefazolin 0.5 g IV. Available: Cefazolin 500 mg per vial.',
    steps: [
      'Identify starting unit and target unit: Convert 0.5 g to mg.',
      'Multiply grams by 1,000 (move decimal 3 places to right): 0.5 × 1,000 = 500 mg.',
      'Compare with available vial: 500 mg ordered matches 500 mg available.'
    ],
    mistakes: 'Moving the decimal point in the wrong direction (dividing instead of multiplying), resulting in a 1,000-fold overdose error.',
    keyPoint: 'Remember: 1 g = 1,000 mg = 1,000,000 mcg. Large unit to small unit = multiply.'
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F7F7F7]"
          aria-label="Back to lessons"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-medium uppercase tracking-wider text-[#888888]">Lesson</span>
          <h1 className="text-lg font-bold text-[#111111] leading-tight">{currentLesson.title}</h1>
        </div>
      </div>

      {/* Learning Objective */}
      <div className="nc-card p-4 bg-[#FAFAFA]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1">
          <BookOpen className="w-4 h-4 text-[#111111]" />
          <span>Learning Objective</span>
        </div>
        <p className="text-sm text-[#444444] leading-relaxed">{currentLesson.objective}</p>
      </div>

      {/* Concept */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888] px-1">
          Core Concept
        </h2>
        <div className="nc-card p-4 text-sm text-[#333333] leading-relaxed">
          {currentLesson.concept}
        </div>
      </div>

      {/* Worked Example */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888] px-1">
          Worked Example
        </h2>
        <div className="nc-card p-4 space-y-3">
          <div className="p-3 bg-[#F7F7F7] rounded-xl font-medium text-xs text-[#111111] border border-[#E5E5E5]">
            {currentLesson.example}
          </div>
          <div className="space-y-2 pt-1">
            <span className="text-xs font-semibold text-[#111111] block">Step-by-Step Breakdown:</span>
            {currentLesson.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#444444]">
                <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="nc-card p-4 border-amber-200 bg-amber-50/50">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
          <AlertTriangle className="w-4 h-4 text-amber-700" />
          <span>Common Pitfalls</span>
        </div>
        <p className="text-xs text-amber-900/90 leading-relaxed">{currentLesson.mistakes}</p>
      </div>

      {/* Key Point */}
      <div className="nc-card p-4 bg-[#F7F7F7]">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1">
          <Lightbulb className="w-4 h-4 text-[#111111]" />
          <span>Key Point</span>
        </div>
        <p className="text-xs text-[#444444] font-medium leading-relaxed">{currentLesson.keyPoint}</p>
      </div>

      {/* Action */}
      <div className="pt-2">
        <button
          onClick={onStartPractice}
          className="nc-btn-primary w-full flex items-center justify-center gap-2"
        >
          <span>Practice These Questions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
