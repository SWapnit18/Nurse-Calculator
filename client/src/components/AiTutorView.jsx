import React, { useState } from 'react';
import { 
  Sparkles, ShieldAlert, Send, BookOpen, AlertCircle, 
  CheckCircle2, ArrowRight, HelpCircle, RotateCcw, MessageSquare, Zap
} from 'lucide-react';
import { getApiUrl } from '../config/api';

const COMMON_CONCEPTS = [
  {
    topicId: 'tablet_calculations',
    title: 'Desired over Have (D/H × V)',
    summary: 'The universal formula for solid oral and liquid parenteral dosage calculation.',
    explanation: 'Dose = (Desired Dose ÷ Stock on Hand) × Vehicle Quantity. Always confirm both doses are in identical units (e.g. mg to mg) before dividing.'
  },
  {
    topicId: 'iv_flow_mathematics',
    title: 'Electronic Pump vs Gravity Drip',
    summary: 'Why infusion pump rates allow decimals (mL/hr) but gravity drips require whole integers (gtt/min).',
    explanation: 'Electronic volumetric pumps meter fluid continuously and accept decimal values (such as 62.5 mL/hr). Gravity tubing cannot deliver fractional drops, so drop rate must be rounded to the nearest integer drop.'
  },
  {
    topicId: 'unit_conversions',
    title: 'Metric Conversions & Decimals',
    summary: 'ISMP zero safety rules (leading zero required, trailing zero forbidden).',
    explanation: 'Always write 0.4 mg (never .4 mg) to prevent a 10x overdose error. Never write 4.0 mg (always 4 mg) because an obscured decimal point causes a 40 mg administration.'
  },
  {
    topicId: 'iv_flow_mathematics',
    title: 'Weight-Based Titration (mcg/kg/min)',
    summary: 'ICU inotrope and vasopressor flow rate conversion.',
    explanation: 'Step 1: Convert bag to mcg/mL. Step 2: Calculate hourly microgram requirement (mcg/kg/min × weight in kg × 60 min). Step 3: Divide hourly mcg by bag concentration to find pump mL/hr.'
  },
  {
    topicId: 'med_math_basics',
    title: 'Pediatric Weight-Based Dosing',
    summary: 'Calculating safe single and daily doses based on patient mass in kg.',
    explanation: 'Always convert lbs to kg first (lbs ÷ 2.2). Multiply weight in kg by prescribed mg/kg rate. If divided (e.g. TID / q8h), divide total daily dose by frequency.'
  },
  {
    topicId: 'liquid_calculations',
    title: 'Liquid Syringe Selection & Site Limits',
    summary: 'Calibrations for 1 mL vs 3 mL syringes and anatomic injection limits.',
    explanation: 'Use 1.0 mL tuberculin syringe for doses <1.0 mL (0.01 mL accuracy). Use 3.0 mL syringe for 1.0-3.0 mL. Deltoid max volume is 1.0 mL; ventrogluteal max volume is 3.0 mL.'
  }
];

const SUGGESTED_QUESTIONS = [
  'How do I calculate gravity drops per min?',
  'What is the Desired over Have formula?',
  'How do I calculate pediatric mg/kg dose?',
  'What are the ISMP leading zero rules?',
  'How do I convert pounds (lbs) to kg?',
  'How do I calculate IV pump rate in mL/hr?'
];

export default function AiTutorView({ onStartPractice }) {
  const [selectedConcept, setSelectedConcept] = useState(COMMON_CONCEPTS[0]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = (queryText) => {
    const q = (queryText || customQuestion).trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setActivePrompt(q);
    setAiResponse(null);

    fetch(getApiUrl('/api/ai/explain-mistake'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: q,
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
        const qLower = q.toLowerCase();
        if (qLower.includes('drip') || qLower.includes('gravity') || qLower.includes('gtt')) {
          setAiResponse('Gravity Drip Formula:\n\n• Drip Rate (gtt/min) = (Total Volume in mL × Tubing Drop Factor in gtt/mL) ÷ Total Minutes.\n\nAlways convert hours to minutes by multiplying by 60, and round your final answer to the nearest whole integer drop.');
        } else if (qLower.includes('pump') || qLower.includes('ml/hr') || qLower.includes('flow')) {
          setAiResponse('Infusion Pump Rate Formula:\n\n• Rate (mL/hr) = Total Volume to Infuse (mL) ÷ Total Hours.\n\nSmart electronic pumps support tenths of a mL (e.g. 62.5 mL/hr). Do not round to whole numbers unless using gravity tubing.');
        } else if (qLower.includes('tablet') || qLower.includes('oral') || qLower.includes('desired')) {
          setAiResponse('Desired over Have Formula:\n\n• Number of Tablets = (Desired Dose ÷ Stock on Hand) × 1 Tablet.\n\nIf the result exceeds 4 tablets for a single dose, pause and double-check with the prescriber or hospital pharmacy.');
        } else if (qLower.includes('weight') || qLower.includes('pediatric') || qLower.includes('child')) {
          setAiResponse('Weight-Based Dosing:\n\n• Dose (mg) = Patient Weight (kg) × Prescribed Rate (mg/kg).\n\nAlways convert pounds to kilograms first (lbs ÷ 2.2). Compare calculated dose against standard pediatric safe range.');
        } else {
          setAiResponse('Clinical Calculation Strategy:\n\n1. Identify what is ordered vs what is on hand.\n2. Convert units so both quantities match.\n3. Apply the appropriate formula: (D/H) × V.\n4. Verify ISMP leading zero rules (e.g., 0.5 mL, not .5 mL).');
        }
      });
  };

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    askQuestion(customQuestion);
  };

  const handleChipClick = (text) => {
    setCustomQuestion(text);
    askQuestion(text);
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-400 dark:text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">AI Concept Tutor</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pedagogical Clinical Guidance & Calculation Concepts</p>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-tight font-medium">
          Educational guidance only. AI explains mathematical formulas, rounding standards, and clinical concepts. It does not calculate patient-specific doses or authorize medication administration.
        </p>
      </div>

      {/* Interactive Concept Inquiry Box */}
      <div className="nc-card p-4 sm:p-5 space-y-3.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Ask a Clinical Math Question</span>
          </label>
          {aiResponse && (
            <button
              onClick={() => { setAiResponse(null); setActivePrompt(null); }}
              className="text-[11px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
        
        <form onSubmit={handleFormSubmit} className="space-y-2.5">
          <div className="relative">
            <input
              id="ai-tutor-input"
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="e.g. How do I calculate drops per minute from mL/hr?"
              className="nc-input pr-12 font-medium"
              disabled={isLoading}
            />
            <button
              id="ai-tutor-submit-btn"
              type="submit"
              disabled={isLoading || !customQuestion.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all cursor-pointer shadow-sm"
              title="Ask AI Tutor"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Suggested Quick Prompt Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Suggested Prompts
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUESTIONS.map((qText, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(qText)}
                className="text-[11px] font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors cursor-pointer text-left border border-slate-200/60 dark:border-slate-700/60"
              >
                {qText}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="p-6 text-center space-y-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="w-6 h-6 border-2 border-slate-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Analyzing question & generating clinical breakdown...</p>
          </div>
        )}

        {/* AI Answer Card */}
        {aiResponse && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-blue-200 dark:border-blue-900/40 text-xs text-slate-800 dark:text-slate-200 leading-relaxed space-y-3 font-medium animate-fade-in shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700 pb-2">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-extrabold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Tutor Explanation:</span>
              </div>
              {activePrompt && (
                <span className="text-[10px] text-slate-500 dark:text-slate-400 max-w-[200px] truncate">
                  "{activePrompt}"
                </span>
              )}
            </div>
            
            <div className="whitespace-pre-line text-slate-800 dark:text-slate-200 text-xs leading-relaxed font-sans">
              {aiResponse}
            </div>

            {onStartPractice && (
              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700 flex justify-end">
                <button
                  onClick={() => onStartPractice()}
                  className="nc-btn-primary px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Practice Questions on this Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Core Topics Quick Browse */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            High-Yield Clinical Concepts
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">Click to expand</span>
        </div>

        <div className="space-y-2">
          {COMMON_CONCEPTS.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedConcept(selectedConcept?.title === concept.title ? null : concept)}
              className={`nc-card p-3.5 sm:p-4 transition-all cursor-pointer border ${
                selectedConcept?.title === concept.title
                  ? 'border-slate-900 dark:border-white bg-slate-50/80 dark:bg-slate-800/80 shadow-sm'
                  : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {concept.title}
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded flex-shrink-0">
                  Concept
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                {concept.summary}
              </p>
              
              {selectedConcept?.title === concept.title && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium bg-white dark:bg-[#111827] p-3 rounded-lg border border-slate-200/80 dark:border-slate-700 space-y-2.5">
                  <p>{concept.explanation}</p>
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChipClick(`Explain ${concept.title}`);
                      }}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Ask AI Tutor for more details</span>
                    </button>
                    {onStartPractice && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartPractice(concept.topicId);
                        }}
                        className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Practice Topic</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}