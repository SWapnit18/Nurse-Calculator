/**
 * Full 105+ NCLEX Canonical Clinical Calculation Question Bank
 * Spans:
 * - Liquid Injections & Syringe Math (25)
 * - Oral Solid & Liquid Calculations (25)
 * - IV Flow & Smart Pump Infusions (25)
 * - Weight-Based Pediatric & Adult Math (15)
 * - Unit Conversions & ICU Titrations (15)
 */

export const generate100Questions = () => {
  const qList = [];
  let idCounter = 1;

  // 1. Liquid Injection Questions (25 Questions)
  const injectionCases = [
    { d: 80, h: 200, v: 1, drug: "Gentamicin", unit: "mL" },
    { d: 50, h: 100, v: 1, drug: "Meperidine", unit: "mL" },
    { d: 4, h: 10, v: 1, drug: "Morphine Sulfate", unit: "mL" },
    { d: 25, h: 50, v: 1, drug: "Diphenhydramine", unit: "mL" },
    { d: 0.25, h: 0.5, v: 2, drug: "Digoxin Pediatric", unit: "mL" },
    { d: 15, h: 30, v: 1, drug: "Ketorolac", unit: "mL" },
    { d: 60, h: 80, v: 2, drug: "Tobramycin", unit: "mL" },
    { d: 500, h: 1000, v: 2, drug: "Ampicillin", unit: "mL" },
    { d: 75, h: 150, v: 1, drug: "Clindamycin", unit: "mL" },
    { d: 100, h: 250, v: 2, drug: "Amikacin", unit: "mL" },
    { d: 2, h: 4, v: 1, drug: "Lorazepam", unit: "mL" },
    { d: 10, h: 20, v: 1, drug: "Haloperidol", unit: "mL" },
    { d: 20, h: 40, v: 1, drug: "Famotidine", unit: "mL" },
    { d: 30, h: 60, v: 1.5, drug: "Furosemide", unit: "mL" },
    { d: 125, h: 250, v: 1, drug: "Methylprednisolone", unit: "mL" },
    { d: 300, h: 600, v: 4, drug: "Cimetidine", unit: "mL" },
    { d: 0.5, h: 1, v: 1, drug: "Atropine Sulfate", unit: "mL" },
    { d: 1, h: 2, v: 1, drug: "Hydromorphone", unit: "mL" },
    { d: 40, h: 80, v: 1, drug: "Enoxaparin Sodium", unit: "mL" },
    { d: 7.5, h: 15, v: 1, drug: "Midazolam", unit: "mL" },
    { d: 250, h: 500, v: 2, drug: "Cefotaxime", unit: "mL" },
    { d: 150, h: 300, v: 2, drug: "Ranitidine", unit: "mL" },
    { d: 35, h: 70, v: 1, drug: "Promethazine", unit: "mL" },
    { d: 5, h: 10, v: 1, drug: "Prochlorperazine", unit: "mL" },
    { d: 200, h: 400, v: 2, drug: "Metronidazole", unit: "mL" }
  ];

  injectionCases.forEach((item) => {
    const raw = (item.d / item.h) * item.v;
    const ans = Math.round(raw * 100) / 100;
    qList.push({
      questionId: `q_liq_${idCounter++}`,
      topicId: 'liquid_calculations',
      difficulty: 'medium',
      title: `${item.drug} Liquid Injection Dose`,
      scenario: `Order: ${item.drug} ${item.d} mg IM. Available: ${item.h} mg in ${item.v} mL vial. How many mL should the nurse draw up in the syringe?`,
      correctAnswer: ans,
      tolerance: 0.05,
      unit: item.unit,
      steps: [
        `Formula: Volume (mL) = (Desired ÷ Have) × Vehicle Volume`,
        `Calculation: (${item.d} mg ÷ ${item.h} mg) × ${item.v} mL = ${ans} mL`,
        `ISMP Rule: Always lead with zero (${ans} mL, never trailing zero).`
      ],
      keyPoint: `Select 1 mL tuberculin syringe if dose is <1 mL for maximum precision.`
    });
  });

  // 2. Oral Solid & Liquid Calculations (25 Questions)
  const oralCases = [
    { d: 250, h: 125, v: 1, drug: "Digoxin", unit: "tablets" },
    { d: 500, h: 250, v: 1, drug: "Ciprofloxacin", unit: "tablets" },
    { d: 20, h: 10, v: 1, drug: "Lisinopril", unit: "tablets" },
    { d: 80, h: 40, v: 1, drug: "Furosemide", unit: "tablets" },
    { d: 12.5, h: 25, v: 1, drug: "Metoprolol Tartrate", unit: "tablets" },
    { d: 0.5, h: 0.25, v: 1, drug: "Clonazepam", unit: "tablets" },
    { d: 100, h: 50, v: 1, drug: "Sertraline", unit: "tablets" },
    { d: 300, h: 150, v: 1, drug: "Ranitidine", unit: "tablets" },
    { d: 75, h: 25, v: 1, drug: "Levothyroxine", unit: "tablets" },
    { d: 10, h: 5, v: 1, drug: "Amlodipine", unit: "tablets" },
    { d: 40, h: 20, v: 1, drug: "Omeprazole", unit: "tablets" },
    { d: 1000, h: 500, v: 1, drug: "Metformin", unit: "tablets" },
    { d: 50, h: 25, v: 1, drug: "Hydrochlorothiazide", unit: "tablets" },
    { d: 150, h: 300, v: 1, drug: "Bupropion", unit: "tablets" },
    { d: 25, h: 50, v: 1, drug: "Atenolol", unit: "tablets" },
    { d: 60, h: 30, v: 1, drug: "Codeine Sulfate", unit: "tablets" },
    { d: 2, h: 1, v: 1, drug: "Warfarin Sodium", unit: "tablets" },
    { d: 7.5, h: 15, v: 1, drug: "Meloxicam", unit: "tablets" },
    { d: 400, h: 200, v: 1, drug: "Ibuprofen", unit: "tablets" },
    { d: 15, h: 30, v: 1, drug: "Morphine Sulfate ER", unit: "tablets" },
    { d: 500, h: 125, v: 5, drug: "Amoxicillin Suspension", unit: "mL" },
    { d: 250, h: 125, v: 5, drug: "Cephalexin Liquid", unit: "mL" },
    { d: 10, h: 5, v: 5, drug: "Diphenhydramine Elixir", unit: "mL" },
    { d: 160, h: 80, v: 2.5, drug: "Acetaminophen Liquid", unit: "mL" },
    { d: 15, h: 10, v: 5, drug: "Lactulose Syrup", unit: "mL" }
  ];

  oralCases.forEach((item) => {
    const raw = (item.d / item.h) * item.v;
    const ans = Math.round(raw * 100) / 100;
    qList.push({
      questionId: `q_tab_${idCounter++}`,
      topicId: 'tablet_calculations',
      difficulty: 'easy',
      title: `${item.drug} Oral Dose`,
      scenario: `Physician orders ${item.drug} ${item.d} mg PO. Available on hand: ${item.h} mg per ${item.v} ${item.unit}. How many ${item.unit} should the nurse administer?`,
      correctAnswer: ans,
      tolerance: 0.1,
      unit: item.unit,
      steps: [
        `Formula: (Desired ÷ Have) × Vehicle`,
        `Calculation: (${item.d} mg ÷ ${item.h} mg) × ${item.v} ${item.unit} = ${ans} ${item.unit}`,
        `Ceiling Check: Verified within standard single-dose limit (≤ 4 tablets).`
      ],
      keyPoint: `Ensure patient can swallow solid medications prior to administration.`
    });
  });

  // 3. IV Flow & Pump Rates (25 Questions)
  const ivCases = [
    { v: 1000, hr: 8, df: 15, isGravity: true, drug: "0.9% Normal Saline" },
    { v: 500, hr: 4, df: 10, isGravity: true, drug: "D5W Hydration" },
    { v: 1000, hr: 10, df: 20, isGravity: true, drug: "Lactated Ringer" },
    { v: 250, hr: 2, df: 15, isGravity: true, drug: "Cefazolin Piggyback" },
    { v: 100, hr: 1, df: 60, isGravity: true, drug: "Potassium Chloride Microdrip" },
    { v: 500, hr: 6, df: 15, isGravity: true, drug: "0.45% Saline" },
    { v: 1000, hr: 12, df: 10, isGravity: true, drug: "D5NS" },
    { v: 150, hr: 1, df: 15, isGravity: true, drug: "Ampicillin IVPB" },
    { v: 50, hr: 0.5, df: 60, isGravity: true, drug: "Vancomycin Microdrip" },
    { v: 1000, hr: 6, df: 15, isGravity: true, drug: "Plasma-Lyte" },
    { v: 500, hr: 4, isPump: true, drug: "D5W Continuous Pump" },
    { v: 1000, hr: 8, isPump: true, drug: "Normal Saline Pump" },
    { v: 250, hr: 1.5, isPump: true, drug: "Azithromycin Pump" },
    { v: 100, hr: 0.5, isPump: true, drug: "Metronidazole IVPB Pump" },
    { v: 1200, hr: 10, isPump: true, drug: "Maintenance TPN Pump" },
    { v: 750, hr: 6, isPump: true, drug: "Hydration Fluid Pump" },
    { v: 300, hr: 2, isPump: true, drug: "Packed Red Blood Cells (PRBC)" },
    { v: 50, hr: 0.75, isPump: true, drug: "Ceftriaxone IVPB" },
    { v: 1000, hr: 16, isPump: true, drug: "Slow KVO Infusion" },
    { v: 250, hr: 3, isPump: true, drug: "Albumin 5% Infusion" },
    { v: 500, hr: 5, isPump: true, drug: "Post-Op Saline Flush" },
    { v: 100, hr: 1, isPump: true, drug: "Ciprofloxacin Piggyback" },
    { v: 800, hr: 8, isPump: true, drug: "Electrolyte Replacement" },
    { v: 200, hr: 1, isPump: true, drug: "Piperacillin-Tazobactam" },
    { v: 1500, hr: 12, isPump: true, drug: "24-hr Fluid Replacement" }
  ];

  ivCases.forEach((item) => {
    if (item.isGravity) {
      const mins = item.hr * 60;
      const ans = Math.round((item.v * item.df) / mins);
      qList.push({
        questionId: `q_iv_${idCounter++}`,
        topicId: 'iv_flow_mathematics',
        difficulty: 'medium',
        title: `${item.drug} Gravity Drip Rate`,
        scenario: `An IV infusion of ${item.v} mL ${item.drug} is ordered to infuse over ${item.hr} hours using tubing with a drop factor of ${item.df} gtt/mL. Calculate the rate in gtt/min.`,
        correctAnswer: ans,
        tolerance: 0.5,
        unit: "gtt/min",
        steps: [
          `Time in minutes: ${item.hr} hr × 60 = ${mins} min`,
          `Formula: (${item.v} mL × ${item.df} gtt/mL) ÷ ${mins} min`,
          `Result: Rounded to whole drops = ${ans} gtt/min`
        ],
        keyPoint: `Manual gravity drips must always be rounded to the nearest integer drop.`
      });
    } else {
      const ans = Math.round((item.v / item.hr) * 10) / 10;
      qList.push({
        questionId: `q_iv_${idCounter++}`,
        topicId: 'iv_flow_mathematics',
        difficulty: 'easy',
        title: `${item.drug} Volumetric Pump Flow Rate`,
        scenario: `An electronic infusion pump is ordered to deliver ${item.v} mL of ${item.drug} over ${item.hr} hours. Set the pump rate in mL/hr.`,
        correctAnswer: ans,
        tolerance: 0.2,
        unit: "mL/hr",
        steps: [
          `Formula: Total Volume (mL) ÷ Hours`,
          `Calculation: ${item.v} mL ÷ ${item.hr} hr = ${ans} mL/hr`,
          `Safety Guard: Ensure rate does not exceed electronic pump limit (999 mL/hr).`
        ],
        keyPoint: `Smart pumps require setting both the Rate (mL/hr) and Volume to be Infused (VTBI).`
      });
    }
  });

  // 4. Weight-Based Pediatric & Adult Calculations (15 Questions)
  const weightCases = [
    { wt: 20, rate: 15, drug: "Cefuroxime", unit: "mg" },
    { wt: 12, rate: 10, drug: "Amoxicillin", unit: "mg" },
    { wt: 15, rate: 5, drug: "Acetaminophen", unit: "mg" },
    { wt: 30, rate: 2, drug: "Morphine Pediatric", unit: "mg" },
    { wt: 10, rate: 20, drug: "Cephalexin", unit: "mg" },
    { wt: 25, rate: 4, drug: "Ondansetron", unit: "mg" },
    { wt: 18, rate: 7.5, drug: "Clindamycin", unit: "mg" },
    { wt: 8, rate: 15, drug: "Ibuprofen Pediatric", unit: "mg" },
    { wt: 40, rate: 1, drug: "Prednisone", unit: "mg" },
    { wt: 5, rate: 2, drug: "Phenobarbital Neonatal", unit: "mg" },
    { wt: 14, rate: 25, drug: "Ampicillin Pediatric", unit: "mg" },
    { wt: 22, rate: 3, drug: "Gentamicin Daily", unit: "mg" },
    { wt: 35, rate: 10, drug: "Tobramycin Pediatric", unit: "mg" },
    { wt: 16, rate: 5, drug: "Diazepam", unit: "mg" },
    { wt: 28, rate: 8, drug: "Methylprednisolone", unit: "mg" }
  ];

  weightCases.forEach((item) => {
    const ans = Math.round(item.rate * item.wt * 10) / 10;
    qList.push({
      questionId: `q_wt_${idCounter++}`,
      topicId: 'med_math_basics',
      difficulty: 'hard',
      title: `${item.drug} Pediatric Weight Dose`,
      scenario: `A child weighing ${item.wt} kg is prescribed ${item.drug} ${item.rate} mg/kg for a single dose. How many mg should the nurse administer?`,
      correctAnswer: ans,
      tolerance: 0.5,
      unit: "mg",
      steps: [
        `Formula: Dose Rate (mg/kg) × Patient Weight (kg)`,
        `Calculation: ${item.rate} mg/kg × ${item.wt} kg = ${ans} mg`,
        `Safety Check: Verify child weight against pediatric growth chart.`
      ],
      keyPoint: `Confirm safe daily dosing range in pediatric drug reference guide before administration.`
    });
  });

  // 5. Unit Conversions & ICU Titrations (15 Questions)
  const unitCases = [
    { val: 500, from: "mcg", to: "mg", ans: 0.5, unit: "mg", title: "Micrograms to Milligrams" },
    { val: 2.5, from: "g", to: "mg", ans: 2500, unit: "mg", title: "Grams to Milligrams" },
    { val: 176, from: "lbs", to: "kg", ans: 80, unit: "kg", title: "Pounds to Kilograms" },
    { val: 1500, from: "mL", to: "L", ans: 1.5, unit: "L", title: "Milliliters to Liters" },
    { val: 0.125, from: "mg", to: "mcg", ans: 125, unit: "mcg", title: "Milligrams to Micrograms" },
    { val: 66, from: "lbs", to: "kg", ans: 30, unit: "kg", title: "Pediatric Lbs to Kg" },
    { val: 4, from: "tbsp", to: "mL", ans: 60, unit: "mL", title: "Tablespoons to Milliliters" },
    { val: 3, from: "tsp", to: "mL", ans: 15, unit: "mL", title: "Teaspoons to Milliliters" },
    { val: 8, from: "fl oz", to: "mL", ans: 240, unit: "mL", title: "Fluid Ounces to Milliliters" },
    { val: 120, from: "min", to: "hr", ans: 2, unit: "hr", title: "Minutes to Hours" },
    { mcg: 5, wt: 70, conc: 1600, ans: 13.13, unit: "mL/hr", title: "Dopamine 5 mcg/kg/min ICU Titration" },
    { mcg: 10, wt: 80, conc: 1600, ans: 30, unit: "mL/hr", title: "Dobutamine 10 mcg/kg/min ICU Titration" },
    { mcg: 2, wt: 60, conc: 1600, ans: 4.5, unit: "mL/hr", title: "Dopamine Low Dose Renal Titration" },
    { mcg: 0.05, wt: 70, conc: 16, ans: 13.13, unit: "mL/hr", title: "Norepinephrine Vasopressor Titration" },
    { mcg: 0.5, wt: 80, conc: 50, ans: 48, unit: "mL/hr", title: "Nitroglycerin High-Risk Titration" }
  ];

  unitCases.forEach((item) => {
    if (item.mcg) {
      qList.push({
        questionId: `q_uc_${idCounter++}`,
        topicId: 'unit_conversions',
        difficulty: 'hard',
        title: item.title,
        scenario: `Order: Infuse titration at ${item.mcg} mcg/kg/min for a ${item.wt} kg patient. Drug concentration in bag is ${item.conc} mcg/mL. Calculate pump rate in mL/hr.`,
        correctAnswer: item.ans,
        unit: item.unit,
        steps: [
          `1. Hourly mcg: ${item.mcg} × ${item.wt} kg × 60 = ${item.mcg * item.wt * 60} mcg/hr`,
          `2. Pump Rate: (${item.mcg * item.wt * 60} mcg/hr) ÷ ${item.conc} mcg/mL = ${item.ans} mL/hr`,
          `ISMP Check: High-alert vasoactive infusion requires dual-nurse signoff.`
        ],
        keyPoint: `Continuously monitor blood pressure and titrate per approved ICU standing order protocol.`
      });
    } else {
      qList.push({
        questionId: `q_uc_${idCounter++}`,
        topicId: 'unit_conversions',
        difficulty: 'easy',
        title: `Metric Conversion: ${item.title}`,
        scenario: `Convert ${item.val} ${item.from} into ${item.to}. Record numerical result in ${item.unit}.`,
        correctAnswer: item.ans,
        unit: item.unit,
        steps: [
          `Metric conversion factor between ${item.from} and ${item.to}`,
          `Calculated result: ${item.ans} ${item.unit}`,
          `ISMP Rule: Maintain leading zero if value is less than 1.`
        ],
        keyPoint: `Always write metric abbreviations correctly (e.g. mcg, never µg).`
      });
    }
  });

  return qList;
};

export const INITIAL_QUESTION_BANK = generate100Questions();
