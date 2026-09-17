import React, { useState } from 'react';
import { 
  Sparkles, ShieldAlert, Send, BookOpen, AlertCircle, 
  CheckCircle2, ArrowRight, HelpCircle, RotateCcw 
} from 'lucide-react';

const COMMON_CONCEPTS = [
  {
    title: 'Desired over Have (D/H × V)',
    summary: 'The universal formula for solid oral and liquid parenteral dosage calculation.',
    explanation: 'Dose = (Desired Dose ÷ Stock on Hand) × Vehicle Quantity. Always confirm both doses are in identical units (e.g. mg to mg) before dividing.'
  },
  {
    title: 'Electronic Pump vs Gravity Drip',
    summary: 'Why infusion pump rates allow decimals (mL/hr) but gravity drips require whole integers (gtt/min).',
    explanation: 'Electronic volumetric pumps meter fluid continuously and accept decimal values (such as 62.5 mL/hr). Gravity tubing cannot deliver fractional drops, so drop rate must be rounded to the nearest integer drop.'
  },
  {
    title: 'Metric Conversions & Decimals',
    summary: 'ISMP zero safety rules (leading zero required, trailing zero forbidden).',
    explanation: 'Always write 0.4 mg (never .4 mg) to prevent a 10x overdose error. Never write 4.0 mg (always 4 mg) because an obscured decimal point causes a 40 mg administration.'
  },
  {
    title: 'Weight-Based Titration (mcg/kg/min)',
    summary: 'ICU inotrope and vasopressor flow rate conversion.',
    explanation: 'Step 1: Convert bag to mcg/mL. Step 2: Calculate hourly microgram requirement (mcg/kg/min × weight in kg × 60 min). Step 3: Divide hourly mcg by bag concentration.'
  }
];

export default function AiTutorView({ onStartPractice }) {
  const [selectedConcept, setSelectedConcept] = useState(COMMON_CONCEPTS[0]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = (e) => {
    e?.preventDefault();
    if (!customQuestion.trim() || isLoading) return;

    setIsLoading(true);
    setAiResponse(null);

    fetch('http://localhost:5000/api/ai/explain-mistake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: customQuestion,
        userId: 'demo_student',
        mistakeType: 'CONCEPT_INQUIRY'
      })
    })
      .then(r => r.json())
      .then(res => {
        setIsLoading(false);
        const text = res.data?.pedagogicalExplanation || 
          res.explanation || 
          res.aiExplanation || 
          'In medication mathematics, always ensure your desired dose and stock concentration share the exact same units before dividing. Apply the formula: (Desired ÷ Have) × Vehicle.';
        setAiResponse(text);
      })
      .catch(() => {
        setIsLoading(false);
        const qLower = customQuestion.toLowerCase();
        if (qLower.includes('drip') || qLower.includes('gravity') || qLower.includes('gtt')) {
          setAiResponse('Gravity Drip Formula:\nDrip Rate (gtt/min) = (Total Volume in mL × Drop Factor in gtt/mL) ÷ Total Minutes.\n\nAlways convert hours to minutes by multiplying by 60, and round your final answer to the nearest whole integer drop.');
        } else if (qLower.includes('pump') || qLower.includes('ml/hr') || qLower.includes('flow')) {
          setAiResponse('Infusion Pump Rate Formula:\nRate (mL/hr) = Total Volume to Infuse (mL) ÷ Total Hours.\n\nSmart electronic pumps support tenths of a mL (e.g. 62.5 mL/hr). Do not round to whole numbers unless using gravity tubing.');
        } else if (qLower.includes('tablet') || qLower.includes('oral') || qLower.includes('desired')) {
          setAiResponse('Desired over Have Formula:\nNumber of Tablets = Desired Dose ÷ Stock on Hand.\n\nIf the result exceeds 4 tablets for a single dose, pause and double-check with the prescriber or hospital pharmacy.');
        } else {
          setAiResponse('To solve any nursing calculation:\n1. Identify what is ordered vs what is on hand.\n2. Convert units to match.\n3. Apply the appropriate formula: (D/H) × V.\n4. Verify ISMP leading zero rules (e.g., 0.5 mL, not .5 mL).');
        }
      });
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">AI Concept Tutor</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Educational Concept Guide & Clinical Q&A</p>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/70 dark:border-amber-900/40 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-tight">
          Educational guidance only. AI explains mathematical and clinical concepts and does not calculate patient dosages or authorize medication administration.
        </p>
      </div>

      {/* Interactive Concept Inquiry Box */}
      <div className="nc-card p-4 sm:p-5 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Ask a Clinical Calculation Question
        </label>
        
        <form onSubmit={handleAsk} className="space-y-2.5">
          <div className="relative">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="e.g. How do I calculate drops per minute from mL/hr?"
              className="nc-input pr-12 font-medium"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !customQuestion.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="p-6 text-center space-y-2">
            <div className="w-6 h-6 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Querying clinical tutor model...</p>
          </div>
        )}

        {aiResponse && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-medium animate-fade-in">
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tutor Guidance:</span>
            </div>
            {aiResponse}
          </div>
        )}
      </div>

      {/* Core Topics Quick Browse */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          High-Yield Clinical Concepts
        </h2>

        <div className="space-y-2.5">
          {COMMON_CONCEPTS.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedConcept(concept)}
              className={`nc-card p-4 transition-all cursor-pointer border ${
                selectedConcept?.title === concept.title
                  ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/60 shadow-md'
                  : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {concept.title}
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded">
                  Concept
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {concept.summary}
              </p>
              
              {selectedConcept?.title === concept.title && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium bg-white dark:bg-[#111827] p-3 rounded-lg border">
                  {concept.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}