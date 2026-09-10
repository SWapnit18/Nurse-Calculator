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
          <div className="w-8 h-8 rounded-xl bg-[#111111] text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111111]">AI Concept Tutor</h1>
            <p className="text-xs text-[#666666]">Educational Concept Guide & Clinical Q&A</p>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-3 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#888888] flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#666666] leading-tight">
          Educational guidance only. AI explains mathematical and clinical concepts and does not calculate patient dosages or authorize medication administration.
        </p>
      </div>

      {/* Interactive Concept Inquiry Box */}
      <div className="nc-card p-4 space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666]">
          Ask a Nursing Math Concept
        </label>
        <form onSubmit={handleAsk} className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="e.g. How do I calculate drops per minute?"
              className="nc-input pr-12 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !customQuestion.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black active:scale-95 transition-all"
              aria-label="Ask AI Tutor"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* AI Answer Card */}
        {isLoading && (
          <div className="p-6 text-center space-y-2">
            <div className="w-6 h-6 border-2 border-[#111111] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#666666]">Formulating educational explanation...</p>
          </div>
        )}

        {aiResponse && (
          <div className="p-4 bg-[#F7F7F7] rounded-xl border border-[#E5E5E5] space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#111111] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
              <span>AI Pedagogical Guidance</span>
            </div>
            <p className="text-sm text-[#333333] leading-relaxed whitespace-pre-line">
              {aiResponse}
            </p>
          </div>
        )}
      </div>

      {/* Core Nursing Math Concepts Breakdown */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#888888] px-1">
          Essential Calculation Guides
        </h2>

        <div className="space-y-2.5">
          {COMMON_CONCEPTS.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedConcept(concept)}
              className={`nc-card p-4 cursor-pointer transition-all active:scale-[0.99] ${
                selectedConcept.title === concept.title 
                  ? 'border-[#111111] bg-[#FAFAFA]' 
                  : 'hover:border-[#999999]'
              }`}
            >
              <h3 className="font-bold text-sm text-[#111111]">{concept.title}</h3>
              <p className="text-xs text-[#666666] mt-0.5">{concept.summary}</p>
              
              {selectedConcept.title === concept.title && (
                <div className="mt-3 pt-3 border-t border-[#E5E5E5] text-xs text-[#333333] leading-relaxed animate-fade-in">
                  <strong className="text-[#111111] block mb-1">Concept Rule:</strong>
                  {concept.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Practice CTA */}
      <div className="pt-2">
        <button
          onClick={onStartPractice}
          className="nc-btn-primary w-full flex items-center justify-center gap-2"
        >
          <span>Practice Calculations Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}