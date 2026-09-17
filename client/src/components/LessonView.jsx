import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, ChevronRight, ChevronLeft, Sparkles, ShieldCheck } from 'lucide-react';

const TOPIC_KEYS = [
  'medication-math-basics',
  'unit-conversions',
  'tablet-calculations',
  'liquid-calculations',
  'iv-flow-mathematics',
  'weight-based-practice',
  'reconstitution-exercises',
  'advanced-calculations'
];

const TOPIC_LESSONS = {
  'medication-math-basics': {
    id: 'medication-math-basics',
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
    id: 'unit-conversions',
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
    id: 'tablet-calculations',
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
    id: 'liquid-calculations',
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
    id: 'iv-flow-mathematics',
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
    id: 'weight-based-practice',
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
    id: 'reconstitution-exercises',
    title: 'Reconstitution Exercises',
    objective: 'Calculate diluent addition and extract active medication concentration per mL.',
    concept: 'Unstable lyophilized antibiotics are packaged as dry powders and require sterile reconstituting diluents.',
    example: 'Order: Ampicillin 250 mg IM. Vial: 1 g powder. Add 3.5 mL sterile water for a concentration of 250 mg/mL.',
    steps: [
      'Read vial label: Dissolved powder yields 250 mg per 1.0 mL.',
      'Calculate volume to administer: 250 mg ordered ÷ 250 mg/mL = 1.0 mL.',
      'Label remainder: Mark date, time, concentration, and initials on reconstituted vial.'
    ],
    mistakes: 'Using the total diluent added (3.5 mL) instead of the final resulting concentration per mL.',
    keyPoint: 'Powder displacement increases final volume; always refer to the label concentration statement.'
  },
  'advanced-calculations': {
    id: 'advanced-calculations',
    title: 'Advanced Clinical Titrations',
    objective: 'Master continuous IV titrations (mcg/kg/min) and dynamic rate adjustment.',
    concept: 'Vasopressors (Norepinephrine, Dopamine) are titrated minute-by-minute based on real-time arterial blood pressure.',
    example: 'Order: Dopamine 5 mcg/kg/min for 70 kg patient. Bag: 400 mg in 250 mL D5W.',
    steps: [
      'Bag concentration: 400 mg × 1,000 = 400,000 mcg ÷ 250 mL = 1,600 mcg/mL.',
      'Hourly mcg requirement: 5 mcg/kg/min × 70 kg × 60 min/hr = 21,000 mcg/hr.',
      'Pump flow rate: 21,000 mcg/hr ÷ 1,600 mcg/mL = 13.1 mL/hr.'
    ],
    mistakes: 'Forgetting the 60 minutes/hour multiplier when calculating continuous microgram titrations.',
    keyPoint: 'Always double-check infusion bag concentrations and program smart pumps using drug guardrails.'
  }
};

export default function LessonView({
  lesson: lessonKey,
  onBack,
  onSelectLesson,
  onStartPractice
}) {
  const currentKey = lessonKey || 'medication-math-basics';
  const lesson = TOPIC_LESSONS[currentKey] || TOPIC_LESSONS['medication-math-basics'];

  const currentIndex = TOPIC_KEYS.indexOf(currentKey);
  const prevKey = currentIndex > 0 ? TOPIC_KEYS[currentIndex - 1] : null;
  const nextKey = currentIndex < TOPIC_KEYS.length - 1 ? TOPIC_KEYS[currentIndex + 1] : null;

  return (
    <div className="space-y-4 pb-8 animate-fade-in">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Topics</span>
        </button>

        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
          Lesson {currentIndex + 1} of {TOPIC_KEYS.length}
        </span>
      </div>

      {/* Lesson Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {lesson.title}
        </h1>
        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Objective: {lesson.objective}</span>
        </p>
      </div>

      {/* Core Clinical Concept */}
      <div className="nc-card p-4 sm:p-5 space-y-2 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-800 dark:text-slate-200" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Core Concept
          </h2>
        </div>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
          {lesson.concept}
        </p>
      </div>

      {/* Step-by-Step Example */}
      <div className="nc-card p-4 sm:p-5 space-y-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Clinical Example & Calculation Steps
          </h2>
        </div>
        
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200">
          <span className="font-bold block text-slate-900 dark:text-white mb-0.5">Scenario:</span>
          {lesson.example}
        </div>

        <div className="space-y-2 pt-1">
          {lesson.steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                {idx + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* High-Alert Clinical Pitfall */}
      <div className="nc-card p-4 sm:p-5 bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40 space-y-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
            Common NCLEX Pitfall
          </h2>
        </div>
        <p className="text-xs text-red-900 dark:text-red-200 leading-relaxed font-medium">
          {lesson.mistakes}
        </p>
      </div>

      {/* Key Safety Rule */}
      <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
          <span className="font-bold">Golden Safety Rule: </span>
          {lesson.keyPoint}
        </div>
      </div>

      {/* Practice CTA */}
      <div className="pt-2">
        <button
          onClick={onStartPractice}
          className="nc-btn-primary w-full flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer"
        >
          <span>Practice {lesson.title} Questions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Lesson Navigation Footer */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => prevKey && onSelectLesson(prevKey)}
          disabled={!prevKey}
          className="nc-btn-secondary flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Topic</span>
        </button>

        <button
          onClick={() => nextKey && onSelectLesson(nextKey)}
          disabled={!nextKey}
          className="nc-btn-secondary flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Next Topic</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
