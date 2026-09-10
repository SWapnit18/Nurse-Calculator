import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, ShieldCheck } from 'lucide-react';

const TOPIC_LESSONS = {
  'medication-math-basics': {
    title: 'Medication Math Basics',
    objective: 'Master clinical ratios, dimensional analysis, and ISMP decimal safety rules.',
    concept: 'Clinical calculations require strict adherence to standard units, factor cancellation, and zero-slip decimal formatting. A misplaced decimal can cause a 10-fold or 100-fold overdose.',
    example: 'Order: Digoxin 0.125 mg PO daily. Available: Digoxin 0.25 mg scored tablets.',
    steps: [
      'Formula: Tablets = Desired (D) ÷ Have (H) = 0.125 mg ÷ 0.25 mg',
      'Division: 0.125 ÷ 0.25 = 0.5 tablets (half tablet)',
      'Safety Check: Ensure tablet is scored by manufacturer prior to splitting.'
    ],
    mistakes: 'Writing .5 instead of 0.5 (naked decimal), leading to accidental 5 mg overdoses.',
    keyPoint: 'Always enforce leading zeros (0.5 mg) and prohibit trailing zeros (5 mg, never 5.0 mg).'
  },
  'unit-conversions': {
    title: 'Clinical Unit Conversions',
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
  },
  'tablet-calculations': {
    title: 'Oral & Tablet Calculations',
    objective: 'Calculate whole and partial tablet administration using the Desired over Have formula.',
    concept: 'Oral solid calculations determine the exact number of tablets or capsules to deliver prescribed therapeutic doses safely.',
    example: 'Order: Metoprolol Tartrate 25 mg PO twice daily. Available: 50 mg scored tablets.',
    steps: [
      'Identify Desired (25 mg) and Have (50 mg).',
      'Formula: Tablets = 25 mg ÷ 50 mg = 0.5 tablets.',
      'Clinical Ceiling Check: 0.5 tablets is well below the 4-tablet maximum limit.'
    ],
    mistakes: 'Splitting non-scored tablets or calculating more than 3-4 tablets without re-verifying with pharmacy.',
    keyPoint: 'Only tablets with an engineered manufacturer score line may be divided in half.'
  },
  'liquid-calculations': {
    title: 'Liquid Injections & Syringes',
    objective: 'Calculate parenteral injection volumes and calibrate visual syringe barrel readings.',
    concept: 'Liquid calculations calculate volume in milliliters (mL) based on concentration per mL (D ÷ H × V).',
    example: 'Order: Gentamicin 80 mg IM. Stock vial: 200 mg/mL in 1.0 mL vial.',
    steps: [
      'Desired: 80 mg, Have: 200 mg, Volume vehicle: 1 mL.',
      'Formula: Volume = (80 mg ÷ 200 mg) × 1 mL = 0.4 mL.',
      'Syringe selection: Draw up exactly 0.4 mL in a 1 mL or 3 mL calibrated syringe.'
    ],
    mistakes: 'Overlooking the vehicle volume when concentration is multi-milliliter (e.g. 500 mg in 2 mL).',
    keyPoint: 'Never administer more than 3 mL in a single adult IM site; deltoid maximum is 1 mL.'
  },
  'iv-flow-mathematics': {
    title: 'IV Flow & Infusion Mathematics',
    objective: 'Calculate electronic volumetric pump rates (mL/hr) and gravity drop rates (gtt/min).',
    concept: 'Infusion rate formulas ensure continuous intravenous hydration, electrolyte delivery, and critical care drug stability.',
    example: 'Order: 1,000 mL 0.9% Normal Saline over 8 hours. Tubing drop factor: 15 gtt/mL.',
    steps: [
      'Pump Rate (mL/hr): 1,000 mL ÷ 8 hr = 125 mL/hr.',
      'Gravity Drip (gtt/min): (1,000 mL × 15 gtt/mL) ÷ (8 hr × 60 min) = 15,000 ÷ 480 = 31.25 gtt/min.',
      'Rounding: Gravity drips cannot deliver fractional drops. Round to 31 gtt/min.'
    ],
    mistakes: 'Rounding smart pump electronic infusions to integers or leaving fractional drops in gravity calculations.',
    keyPoint: 'Gravity drip rates must be whole numbers (gtt/min); electronic pumps support decimals (mL/hr).'
  },
  'weight-based-practice': {
    title: 'Weight-Based Calculations',
    objective: 'Calculate mg/kg/dose and pediatric safe range dose ceilings.',
    concept: 'Pediatric, chemotherapy, and ICU dosing is calibrated directly to patient mass in kilograms to avoid acute toxicity.',
    example: 'Order: Amoxicillin 25 mg/kg/day in 2 divided doses for a 44 lb child.',
    steps: [
      'Convert weight: 44 lbs ÷ 2.2 = 20 kg.',
      'Total daily dose: 25 mg/kg × 20 kg = 500 mg/day.',
      'Individual dose: 500 mg ÷ 2 doses = 250 mg per dose.'
    ],
    mistakes: 'Calculating using pounds instead of converting to kilograms, resulting in severe underdosing.',
    keyPoint: 'Always verify weight units on the scale and double check pediatric safe ranges.'
  },
  'reconstitution-exercises': {
    title: 'Reconstitution Exercises',
    objective: 'Reconstitute lyophilized powder vials with diluent and determine final concentration.',
    concept: 'Powdered medications lose potency in solution and must be reconstituted with sterile water or bacteriostatic saline before injection.',
    example: 'Vial contains Ampicillin 1 g powder. Add 3.5 mL sterile water to yield 250 mg/mL.',
    steps: [
      'Identify order: Ampicillin 500 mg IM.',
      'Stock concentration post-reconstitution: 250 mg/mL.',
      'Calculate volume: 500 mg ÷ 250 mg/mL = 2.0 mL.'
    ],
    mistakes: 'Confusing diluent volume added with the resulting solution concentration.',
    keyPoint: 'Inspect vial label for expiration window after reconstitution and refrigeration requirements.'
  },
  'advanced-calculations': {
    title: 'Advanced Clinical Titrations',
    objective: 'Calculate high-alert ICU inotropic and vasopressor titration rates (mcg/kg/min).',
    concept: 'Vasoactive medications (Dopamine, Norepinephrine, Nitroglycerin) require continuous hemodynamic rate calibration.',
    example: 'Order: Dopamine 5 mcg/kg/min for 70 kg patient. Bag: 400 mg in 250 mL D5W (1,600 mcg/mL).',
    steps: [
      'Hourly mcg requirement: 5 mcg/kg/min × 70 kg × 60 min/hr = 21,000 mcg/hr.',
      'Bag concentration: (400 mg × 1,000) ÷ 250 mL = 1,600 mcg/mL.',
      'Pump Rate: 21,000 mcg/hr ÷ 1,600 mcg/mL = 13.13 mL/hr.'
    ],
    mistakes: 'Forgetting the 60 min/hr multiplier when converting from mcg/min to hourly pump rate.',
    keyPoint: 'High-alert infusions require independent two-nurse double verification before starting.'
  }
};

export default function LessonView({ 
  lesson, 
  onBack, 
  onStartPractice 
}) {
  const lessonKey = typeof lesson === 'string' ? lesson : lesson?.id;
  const currentLesson = (lessonKey && TOPIC_LESSONS[lessonKey]) || (typeof lesson === 'object' && lesson?.title ? lesson : TOPIC_LESSONS['medication-math-basics']);

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-xl flex items-center justify-center text-[#111111] hover:bg-[#F7F7F7] active:bg-[#EAEAEA] transition-all"
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
            {currentLesson.steps && currentLesson.steps.map((step, idx) => (
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
