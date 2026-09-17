/**
 * NurseCalc - Complete 42 Accredited Clinical Lessons Curriculum
 * Total: 42 Lessons across 8 High-Yield Clinical Modules
 * Every lesson includes: In-Depth Concept, Worked Example, Short Notes, NCLEX Pitfalls, and ISMP Safety Rules.
 */

export const CURRICULUM_MODULES = [
  {
    id: 'medication-math-basics',
    unitNumber: 1,
    unitCode: 'Unit 1',
    title: 'Unit 1: Medication Math Basics & Safety Protocols',
    shortTitle: 'Medication Math Basics',
    desc: 'Foundational calculations, dimensional analysis, ratios, and ISMP decimal safety guidelines.',
    icon: 'Calculator',
    lessonIds: [
      'les_mmb_1',
      'les_mmb_2',
      'les_mmb_3',
      'les_mmb_4',
      'les_mmb_5',
      'les_mmb_6'
    ]
  },
  {
    id: 'unit-conversions',
    unitNumber: 2,
    unitCode: 'Unit 2',
    title: 'Unit 2: Metric & Clinical Unit Conversions',
    shortTitle: 'Metric & Clinical Unit Conversions',
    desc: 'Weight (kg, g, mg, mcg), volumetric (L, mL), household, and milliequivalent conversions.',
    icon: 'Repeat',
    lessonIds: [
      'les_uc_1',
      'les_uc_2',
      'les_uc_3',
      'les_uc_4',
      'les_uc_5',
      'les_uc_6'
    ]
  },
  {
    id: 'tablet-calculations',
    unitNumber: 3,
    unitCode: 'Unit 3',
    title: 'Unit 3: Oral & Enteral Solid Formulations',
    shortTitle: 'Oral & Enteral Solid Formulations',
    desc: 'Desired over Have formula, scored tablet splitting safety, capsules, and dosage limits.',
    icon: 'Pill',
    lessonIds: [
      'les_tab_1',
      'les_tab_2',
      'les_tab_3',
      'les_tab_4',
      'les_tab_5'
    ]
  },
  {
    id: 'liquid-calculations',
    unitNumber: 4,
    unitCode: 'Unit 4',
    title: 'Unit 4: Parenteral Liquids & Syringe Calibrations',
    shortTitle: 'Parenteral Liquids & Syringes',
    desc: 'Syringe calibrations (1 mL TB, 3 mL, 5 mL), IM/SubQ limits, and reconstitution calculations.',
    icon: 'Syringe',
    lessonIds: [
      'les_liq_1',
      'les_liq_2',
      'les_liq_3',
      'les_liq_4',
      'les_liq_5'
    ]
  },
  {
    id: 'iv-flow-mathematics',
    unitNumber: 5,
    unitCode: 'Unit 5',
    title: 'Unit 5: IV Gravity Infusions & Drop Timing',
    shortTitle: 'IV Gravity Infusions & Drop Timing',
    desc: 'Gravity drip formula (gtt/min), macro/micro drip factors, whole-drop rounding, and time math.',
    icon: 'Activity',
    lessonIds: [
      'les_flow_1',
      'les_flow_2',
      'les_flow_3',
      'les_flow_4',
      'les_flow_5'
    ]
  },
  {
    id: 'volumetric-infusion-pumps',
    unitNumber: 6,
    unitCode: 'Unit 6',
    title: 'Unit 6: Volumetric Smart Pumps & Secondary Piggybacks',
    shortTitle: 'Volumetric Smart Infusion Pumps',
    desc: 'Electronic infusion pump rate (mL/hr), IVPB timing, smart pump DERS guardrails, and IV push.',
    icon: 'Zap',
    lessonIds: [
      'les_pump_1',
      'les_pump_2',
      'les_pump_3',
      'les_pump_4',
      'les_pump_5'
    ]
  },
  {
    id: 'weight-based-practice',
    unitNumber: 7,
    unitCode: 'Unit 7',
    title: 'Unit 7: Pediatric & Neonatal Weight-Based Dosing',
    shortTitle: 'Pediatric & Neonatal Weight-Based Dosing',
    desc: 'Weight-based mg/kg/dose, safe therapeutic window verification, and neonatal precision math.',
    icon: 'Baby',
    lessonIds: [
      'les_peds_1',
      'les_peds_2',
      'les_peds_3',
      'les_peds_4',
      'les_peds_5'
    ]
  },
  {
    id: 'critical-care-titrations',
    unitNumber: 8,
    unitCode: 'Unit 8',
    title: 'Unit 8: Critical Care Titrations & Heparin Protocols',
    shortTitle: 'Critical Care Titrations & Heparin Protocols',
    desc: 'Continuous vasopressor titrations (mcg/kg/min), weight-based heparin protocols, and regular insulin drips.',
    icon: 'ShieldAlert',
    lessonIds: [
      'les_crit_1',
      'les_crit_2',
      'les_crit_3',
      'les_crit_4',
      'les_crit_5'
    ]
  }
];

export const CURRICULUM_UNITS = CURRICULUM_MODULES;

export const LESSONS_DATABASE = {
  // ==========================================
  // MODULE 1: MEDICATION MATH BASICS (6 Lessons)
  // ==========================================
  'les_mmb_1': {
    id: 'les_mmb_1',
    moduleId: 'medication-math-basics',
    moduleTitle: 'Medication Math Basics & Safety Protocols',
    lessonNumber: 1,
    title: 'Fractions, Decimals & Percentages in Clinical Practice',
    objective: 'Convert seamlessly between fractions, decimals, and percentage strengths for medication compounding.',
    concept: 'Clinical calculations require instantaneous and error-free transitions between fractions (e.g., 1/2 tab), decimals (0.5 tab), and percentage solutions (e.g., 0.9% Normal Saline = 0.9 g per 100 mL). Misinterpreting a decimal fraction is one of the leading causes of 10-fold and 100-fold medication errors in hospitals.',
    shortNotes: [
      'Fractions to Decimals: Divide the numerator by the denominator (e.g., 1/4 = 0.25).',
      'Decimals to Percentages: Multiply by 100 and add "%" symbol (e.g., 0.05 = 5%).',
      'Percentage Solutions: Represents grams of solute per 100 mL of solution (e.g., 5% Dextrose = 5 g / 100 mL = 50 mg/mL).',
      'Ratios: 1:1,000 means 1 g in 1,000 mL (1 mg/mL); 1:10,000 means 1 g in 10,000 mL (0.1 mg/mL).'
    ],
    workedExample: {
      scenario: 'Order: 500 mL of 0.45% Sodium Chloride (Half-Normal Saline). Calculate how many total grams of sodium chloride are contained in the entire 500 mL infusion bag.',
      formula: 'Grams = (Percentage Concentration ÷ 100) × Total Volume (mL)',
      steps: [
        'Recognize 0.45% means 0.45 g of NaCl per 100 mL of solution.',
        'Set up the proportion or multiplication: (0.45 g / 100 mL) × 500 mL.',
        'Calculate: 0.45 × 5 = 2.25 grams of NaCl.'
      ],
      result: '2.25 g Sodium Chloride',
      rationale: 'Converting percentage to grams per 100 mL confirms the patient receives exactly 2.25 g of electrolyte over the prescribed duration.'
    },
    mistakes: 'Confusing 0.45% with 45%, or forgetting that percentage concentration in pharmacology is always measured as grams per 100 mL.',
    keyPoint: 'Always interpret % solution strength as grams of drug per 100 mL of total fluid.'
  },

  'les_mmb_2': {
    id: 'les_mmb_2',
    moduleId: 'medication-math-basics',
    moduleTitle: 'Medication Math Basics & Safety Protocols',
    lessonNumber: 2,
    title: 'Dimensional Analysis & Factor-Label Cancellation',
    objective: 'Apply dimensional analysis to solve complex, multi-step clinical equations in a single cancellation grid.',
    concept: 'Dimensional analysis (factor-label method) organizes all given factors, conversion factors, and medication stock strengths into a sequential equation where unwanted units cancel diagonally, leaving only the desired clinical outcome unit.',
    shortNotes: [
      'Identify Target Unit: Place the desired final unit on the left side of the equation (e.g., mL/hr = ?).',
      'First Fraction: Start with the given order or available stock that contains the target numerator unit.',
      'Diagonal Unit Cancellation: Position matching units diagonally so they cancel out completely.',
      'Multiply numerators, multiply denominators, then divide: (Numerator Product) ÷ (Denominator Product).'
    ],
    workedExample: {
      scenario: 'Order: Ampicillin 750 mg IV. Available stock: Ampicillin 1 g in 10 mL vial. How many mL should be administered?',
      formula: 'Target (mL) = Order (mg) × Conversion Factor (1 g / 1,000 mg) × Stock Ratio (10 mL / 1 g)',
      steps: [
        'Set up dimensional grid: [750 mg] × [1 g / 1,000 mg] × [10 mL / 1 g].',
        'Cancel out mg and g diagonally: (750 × 1 × 10) ÷ (1,000 × 1).',
        'Simplify: 7,500 ÷ 1,000 = 7.5 mL.'
      ],
      result: '7.5 mL',
      rationale: 'Units cancel out systematically, eliminating unit confusion and preventing arithmetic oversight.'
    },
    mistakes: 'Placing unit conversion factors upside down (e.g. writing 1,000 mg / 1 g in the wrong spot) which multiplies instead of divides.',
    keyPoint: 'Verify that every intermediate unit cancels diagonally until only your desired outcome unit remains.'
  },

  'les_mmb_3': {
    id: 'les_mmb_3',
    moduleId: 'medication-math-basics',
    moduleTitle: 'Medication Math Basics & Safety Protocols',
    lessonNumber: 3,
    title: 'Ratio & Proportion Method for Drug Dosages',
    objective: 'Solve clinical dosage equations using the classic ratio and proportion framework.',
    concept: 'Ratio and proportion establishes equivalence between the known supply ratio (What You Have) and the unknown dose requirement (What You Desire). Formula: Known Have Dose : Known Have Volume :: Desired Dose : Unknown Volume (x).',
    shortNotes: [
      'Ratio Setup: Dose On Hand : Volume On Hand = Desired Dose : Unknown Volume (X).',
      'Extremes and Means: The product of the extremes equals the product of the means (A × D = B × C).',
      'Unit Matching: Both sides of the colon must share identical measurement units before calculating.',
      'Solve for X: Isolate X by dividing the product of the means by the known extreme.'
    ],
    workedExample: {
      scenario: 'Order: Furosemide 30 mg IV Push. Stock: Furosemide 40 mg in 4 mL vial. Find the volume to administer.',
      formula: 'Have Dose : Have Volume = Desired Dose : x Volume  ==>  40 mg : 4 mL = 30 mg : x mL',
      steps: [
        'Multiply extremes and means: 40 × x = 4 × 30.',
        'Multiply right side: 40x = 120.',
        'Divide both sides by 40: x = 120 ÷ 40 = 3 mL.'
      ],
      result: '3.0 mL',
      rationale: 'Delivering 3 mL of the 10 mg/mL concentration provides the exact 30 mg required dose.'
    },
    mistakes: 'Failing to convert units before setting up the proportion (e.g., pairing grams with milligrams directly).',
    keyPoint: 'Always align units identically on both sides of the proportion before computing.'
  },

  'les_mmb_4': {
    id: 'les_mmb_4',
    moduleId: 'medication-math-basics',
    moduleTitle: 'Medication Math Basics & Safety Protocols',
    lessonNumber: 4,
    title: 'ISMP Decimal Safety: Leading Zeros vs. Trailing Zeros',
    objective: 'Enforce ISMP and The Joint Commission do-not-use formatting rules for leading and trailing decimals.',
    concept: 'Decimal point misinterpretations represent the single most catastrophic source of fatal overdoses in nursing. The Institute for Safe Medication Practices (ISMP) and The Joint Commission strictly mandate: ALWAYS use a leading zero before a decimal (e.g., 0.5 mg), and NEVER use a trailing zero after a decimal (e.g., 5 mg, NEVER 5.0 mg).',
    shortNotes: [
      'ALWAYS USE A LEADING ZERO: Write "0.25 mg", never ".25 mg". A missing leading zero makes ".25" look like "25 mg" (100-fold overdose!).',
      'NEVER USE A TRAILING ZERO: Write "5 mg", never "5.0 mg". A trailing zero makes "5.0" look like "50 mg" (10-fold overdose!).',
      'Decimal Placement: Ensure decimals are distinct, bold, and clear on medication administration records (MAR).',
      'The Joint Commission Official "Do Not Use" List strictly bans trailing zeros across all clinical charting.'
    ],
    workedExample: {
      scenario: 'A prescription order is written as "Levothyroxine .1 mg PO". Identify the safety hazard, correct the notation, and state the microgram equivalent.',
      formula: 'Metric conversion: 0.1 mg × 1,000 = 100 mcg',
      steps: [
        'Identify hazard: The naked decimal ".1 mg" risks being misread as "1 mg" (a 10-fold overdose).',
        'Add required leading zero: Write strictly as "0.1 mg".',
        'Calculate microgram equivalent: 0.1 × 1,000 = 100 mcg.'
      ],
      result: '0.1 mg (100 mcg) with mandatory leading zero',
      rationale: 'Enforcing leading zero protocol safeguards the patient against lethal 10x thyroid hormone toxicity.'
    },
    mistakes: 'Writing "2.0 mg" or omitting the zero in ".5 mL" on medication cup labels or transfer notes.',
    keyPoint: 'Zero before the point always (0.X); zero after the whole number NEVER (X, not X.0).'
  },

  'les_mmb_5': {
    id: 'les_mmb_5',
    moduleId: 'medication-math-basics',
    moduleTitle: 'Medication Math Basics & Safety Protocols',
    lessonNumber: 5,
    title: 'High-Alert Medications & Independent Double-Check Protocol',
    objective: 'Implement the independent double-check workflow for High-Alert PINCH medications.',
    concept: 'High-alert medications bear a heightened risk of causing catastrophic patient harm when used in error. The APINCH mnemonic (Anti-infectives, Potassium/Electrolytes, Insulin, Narcotics/Opioids, Chemotherapy, Heparin/Anticoagulants) designates agents that mandate an independent second nurse verification before administration.',
    shortNotes: [
      'APINCH High-Alert Mnemonic: Antibiotics/Anti-infectives, Potassium, Insulin, Narcotics, Chemotherapy, Heparin.',
      'Independent Double-Check: Two licensed nurses calculate the dose independently from the raw order without sharing work beforehand.',
      'Comparison: Nurses cross-verify patient ID, vial concentration, math calculation, syringe measurement, and pump settings.',
      'Smart Pump Guardrails: Never bypass "Hard Limit" alerts in hospital drug libraries.'
    ],
    workedExample: {
      scenario: 'Order: Regular Insulin 8 units SubQ with breakfast. Nurse A draws up insulin in a U-100 syringe. What is the required independent check protocol?',
      formula: 'Independent verification: Order check + Vial verification + Syringe calibration double-check',
      steps: [
        'Nurse A verifies blood glucose level and reads the physician order: 8 units Regular Insulin.',
        'Nurse A draws up 8 units using an orange-capped U-100 insulin syringe.',
        'Nurse B inspects the original order, confirms the vial is U-100 Regular Insulin, and independently confirms the plunger sits at exactly the 8-unit mark.'
      ],
      result: 'Independent 2-Nurse Sign-off Recorded',
      rationale: 'Prevents fatal hypoglycemic coma from accidental U-500 misread or syringe scale error.'
    },
    mistakes: 'Nurse A telling Nurse B "I have 8 units here, can you sign?", which causes cognitive confirmation bias.',
    keyPoint: 'Independent double-checks require the second nurse to calculate and inspect from scratch without hints.'
  },

  'les_mmb_6': {
    id: 'les_mmb_6',
    moduleId: 'medication-math-basics',
    moduleTitle: 'Medication Math Basics & Safety Protocols',
    lessonNumber: 6,
    title: 'Clinical Rounding Guidelines: Drops, Liquids, Tablets & Ceilings',
    objective: 'Execute hospital and NCLEX rounding standards for drops, oral liquids, tablets, and safe dose ceilings.',
    concept: 'Standard clinical rounding rules prevent medication administration discrepancies: 1) Gravity drops (gtt/min) are always rounded to the nearest whole number. 2) Liquid volumes > 1 mL round to the tenths place (0.1 mL). 3) Liquid volumes < 1 mL round to the hundredths place (0.01 mL). 4) Tablets round to half-tablets (0.5) only if scored. 5) Critical medications (e.g. pediatric oncology) round DOWN to prevent toxicity.',
    shortNotes: [
      'Gravity Drops (gtt/min): MUST always be whole integers (e.g., 31.25 gtt/min -> 31 gtt/min).',
      'Syringe Volumes > 1 mL: Round to the nearest tenth (e.g., 2.46 mL -> 2.5 mL).',
      'Syringe Volumes < 1 mL: Round to the nearest hundredth (e.g., 0.375 mL -> 0.38 mL using 1 mL TB syringe).',
      'Tablets: Only score-line engineered tablets can be halved (0.5). Never round to thirds or quarters.',
      'Dose Ceiling Check: If a calculation yields > 3 tablets or > 3 mL for a single IM injection, STOP and verify.'
    ],
    workedExample: {
      scenario: 'A gravity IV infusion calculates to 37.6 gtt/min. A pediatric oral suspension calculates to 1.48 mL. State the rounded administration values.',
      formula: 'Drops = Round to whole number; Oral Liquid > 1 mL = Round to tenths',
      steps: [
        'Gravity drops: 37.6 has .6 in tenths place -> round UP to 38 gtt/min.',
        'Oral Liquid: 1.48 has 8 in hundredths place -> round UP to 1.5 mL.'
      ],
      result: '38 gtt/min and 1.5 mL',
      rationale: 'Gravity tubing cannot deliver 0.6 of a physical drop; standard oral syringes measure in tenths.'
    },
    mistakes: 'Leaving a decimal on gravity IV drops or rounding non-scored tablets into impossible fractions.',
    keyPoint: 'Drops are always whole integers; volumes > 1 mL round to tenths; volumes < 1 mL round to hundredths.'
  },

  // ==========================================
  // MODULE 2: UNIT CONVERSIONS (6 Lessons)
  // ==========================================
  'les_uc_1': {
    id: 'les_uc_1',
    moduleId: 'unit-conversions',
    moduleTitle: 'Metric & Clinical Unit Conversions',
    lessonNumber: 7,
    title: 'Metric Weight Hierarchy: Kilograms (kg) to Grams (g)',
    objective: 'Convert metric masses between kilograms, grams, and foundational SI units.',
    concept: 'The metric system operates on base-10 multiples. 1 kilogram (kg) is equivalent to 1,000 grams (g). When converting from a larger unit (kg) to a smaller unit (g), multiply by 1,000 (shift decimal 3 places right). When converting from a smaller unit (g) to a larger unit (kg), divide by 1,000 (shift decimal 3 places left).',
    shortNotes: [
      '1 kilogram (kg) = 1,000 grams (g).',
      '1 gram (g) = 0.001 kilograms (kg).',
      'Large to Small: Multiply by 1,000 (Shift decimal 3 places to the RIGHT).',
      'Small to Large: Divide by 1,000 (Shift decimal 3 places to the LEFT).'
    ],
    workedExample: {
      scenario: 'Order: Potassium Citrate 1.5 g PO. Available packaging is labelled in kilograms for bulk compounding: 0.0015 kg. Confirm the equivalence.',
      formula: 'Grams = Kilograms × 1,000',
      steps: [
        'Take 0.0015 kg.',
        'Multiply by 1,000 (move decimal 3 places right): 0.0015 × 1,000 = 1.5 g.',
        'Compare to prescribed order: 1.5 g ordered matches 1.5 g in package.'
      ],
      result: '1.5 g (Equivalence Confirmed)',
      rationale: 'Correct unit conversion validates that the bulk preparation precisely matches the clinical prescription.'
    },
    mistakes: 'Moving the decimal point in the wrong direction, resulting in a 1,000x underdose or overdose.',
    keyPoint: 'Kilogram to Gram = Multiply by 1,000; Gram to Kilogram = Divide by 1,000.'
  },

  'les_uc_2': {
    id: 'les_uc_2',
    moduleId: 'unit-conversions',
    moduleTitle: 'Metric & Clinical Unit Conversions',
    lessonNumber: 8,
    title: 'Metric Micro-Dosing: Milligrams (mg) to Micrograms (mcg)',
    objective: 'Convert micro-doses between milligrams (mg) and micrograms (mcg) for potent cardiac and respiratory agents.',
    concept: '1 gram = 1,000 milligrams = 1,000,000 micrograms. Therefore, 1 milligram (mg) = 1,000 micrograms (mcg). Potent medications like Digoxin, Fentanyl, Levothyroxine, and Nitroglycerin are ordered in mcg. Converting between mg and mcg requires moving the decimal point exactly 3 places.',
    shortNotes: [
      '1 milligram (mg) = 1,000 micrograms (mcg or μg).',
      '1 microgram (mcg) = 0.001 milligrams (mg).',
      'mg to mcg: Multiply by 1,000 (e.g., 0.125 mg = 125 mcg).',
      'mcg to mg: Divide by 1,000 (e.g., 50 mcg = 0.05 mg).'
    ],
    workedExample: {
      scenario: 'Order: Levothyroxine 0.075 mg PO daily. Available: Levothyroxine 25 mcg scored tablets. How many tablets are required?',
      formula: '1) Convert mg to mcg: mg × 1,000.  2) Calculate Tablets = Desired ÷ Have',
      steps: [
        'Convert order to mcg: 0.075 mg × 1,000 = 75 mcg.',
        'Apply Desired over Have formula: 75 mcg ÷ 25 mcg/tablet.',
        'Compute: 75 ÷ 25 = 3 tablets.'
      ],
      result: '3 Tablets',
      rationale: 'Converting units to identical terms (75 mcg / 25 mcg) enables accurate tablet computation.'
    },
    mistakes: 'Dividing by 1,000 instead of multiplying when converting mg to mcg, causing an impossible fractional answer.',
    keyPoint: 'Always convert doses to identical units (both mg or both mcg) before performing division.'
  },

  'les_uc_3': {
    id: 'les_uc_3',
    moduleId: 'unit-conversions',
    moduleTitle: 'Metric & Clinical Unit Conversions',
    lessonNumber: 9,
    title: 'Household to Metric Volumetric Conversions (tsp, tbsp, oz to mL)',
    objective: 'Convert household liquid volumes into standardized milliliters (mL) for patient discharge education.',
    concept: 'Patients at home use household spoons and measuring cups. Hospital standards mandate all orders and charting in metric milliliters (mL). Essential conversion factors: 1 teaspoon (tsp) = 5 mL, 1 tablespoon (tbsp) = 15 mL (3 tsp), 1 fluid ounce (fl oz) = 30 mL (or 2 tbsp), 1 cup = 8 oz = 240 mL, 1 pint = 16 oz = 480 mL, 1 quart = 32 oz = 960 mL (~1,000 mL).',
    shortNotes: [
      '1 teaspoon (tsp) = 5 mL.',
      '1 tablespoon (tbsp) = 15 mL (3 teaspoons).',
      '1 fluid ounce (fl oz) = 30 mL (2 tablespoons).',
      '1 standard measuring cup = 8 oz = 240 mL.',
      '1 pint = 16 oz = 480 mL; 1 quart = 32 oz = 960 mL (~1 L).'
    ],
    workedExample: {
      scenario: 'A patient drinks 1 standard cup of broth (8 oz), 4 oz of apple juice, and 2 tablespoons of liquid antacid. Calculate the total metric intake in mL.',
      formula: 'Total Intake (mL) = (Broth oz × 30) + (Juice oz × 30) + (Antacid tbsp × 15)',
      steps: [
        'Broth: 8 oz × 30 mL/oz = 240 mL.',
        'Apple juice: 4 oz × 30 mL/oz = 120 mL.',
        'Antacid: 2 tbsp × 15 mL/tbsp = 30 mL.',
        'Sum all items: 240 + 120 + 30 = 390 mL.'
      ],
      result: '390 mL Total Intake',
      rationale: 'Converting all dietary intake components to mL gives exact fluid balance charting.'
    },
    mistakes: 'Using kitchen tableware spoons instead of calibrated medicine spoons; kitchen spoons vary from 3 mL to 10 mL.',
    keyPoint: '1 tsp = 5 mL, 1 tbsp = 15 mL, 1 oz = 30 mL, 1 cup = 240 mL. Always instruct patients to use calibrated oral syringes.'
  },

  'les_uc_4': {
    id: 'les_uc_4',
    moduleId: 'unit-conversions',
    moduleTitle: 'Metric & Clinical Unit Conversions',
    lessonNumber: 10,
    title: 'Body Mass Conversions: Pounds (lbs) to Kilograms (kg)',
    objective: 'Convert patient body weights accurately between pounds and kilograms using the 2.2 lb/kg constant.',
    concept: 'Clinical drug dosing formulas strictly require patient weight in kilograms (kg). 1 kilogram is equal to 2.2 pounds (lbs). To convert pounds to kilograms, divide by 2.2. To convert kilograms to pounds, multiply by 2.2. In clinical practice, always round adult weights in kilograms to the nearest tenth (0.1 kg), and neonatal weights to the nearest hundredth (0.01 kg).',
    shortNotes: [
      '1 kilogram (kg) = 2.2 pounds (lbs).',
      'Pounds (lbs) to Kilograms (kg): Divide weight in lbs by 2.2.',
      'Kilograms (kg) to Pounds (lbs): Multiply weight in kg by 2.2.',
      'Adult weight rounding: Round to the tenths place (e.g. 154 lbs ÷ 2.2 = 70.0 kg).',
      'Neonatal weight rounding: Weigh on gram scale and round to hundredths/grams.'
    ],
    workedExample: {
      scenario: 'A patient weighs 187 lbs. Calculate the patient mass in kilograms for a weight-based antibiotic calculation.',
      formula: 'Mass (kg) = Weight (lbs) ÷ 2.2',
      steps: [
        'Set up equation: 187 ÷ 2.2.',
        'Perform division: 187 ÷ 2.2 = 85.0 kg.',
        'Verify: 85 × 2.2 = 187 lbs.'
      ],
      result: '85.0 kg',
      rationale: 'Correct body mass conversion is mandatory before calculating any mg/kg or mcg/kg/min order.'
    },
    mistakes: 'Multiplying by 2.2 instead of dividing when given a weight in pounds, making a 100 lb patient calculate as 220 kg (fatal overdose!).',
    keyPoint: 'Always DIVIDE pounds by 2.2 to find kilograms. A patient in kg will always be a smaller number than in lbs.'
  },

  'les_uc_5': {
    id: 'les_uc_5',
    moduleId: 'unit-conversions',
    moduleTitle: 'Metric & Clinical Unit Conversions',
    lessonNumber: 11,
    title: 'Milliequivalents (mEq) & International Units (IU) Principles',
    objective: 'Calculate electrolyte doses in milliequivalents (mEq) and biological products in International Units (IU).',
    concept: 'Milliequivalents (mEq) measure the chemical reacting power of electrolytes (e.g., Potassium Chloride, Sodium Bicarbonate). International Units (IU or Units) measure the biological activity of medications (e.g., Heparin, Insulin, Nystatin, Vitamin D). These units CANNOT be converted into milligrams or grams using standard metric multipliers—they must be dosed directly from the manufacturer labeled concentration.',
    shortNotes: [
      'Milliequivalents (mEq): Used for ionic electrolyte solutions (K+, Na+, Ca2+, Mg2+).',
      'International Units (Units / IU): Measures biological potency (Insulin, Heparin, Penicillin G).',
      'Direct Ratio: Calculate volume using: (Desired mEq or Units ÷ Have mEq or Units) × Volume (mL).',
      'Never convert mEq or Units into grams or milligrams; use the labeled vial concentration.'
    ],
    workedExample: {
      scenario: 'Order: Potassium Chloride 30 mEq IV piggyback in 250 mL D5W. Stock: Potassium Chloride 2 mEq/mL in 30 mL vial. How many mL of KCl concentrate must be added to the IV bag?',
      formula: 'Volume (mL) = Desired (mEq) ÷ Have (mEq/mL)',
      steps: [
        'Identify Desired: 30 mEq.',
        'Identify Have: 2 mEq/mL.',
        'Compute: 30 mEq ÷ 2 mEq/mL = 15 mL.'
      ],
      result: '15.0 mL',
      rationale: 'Adding 15 mL of 2 mEq/mL KCl delivers exactly 30 mEq of potassium for infusion.'
    },
    mistakes: 'Attempting to convert mEq into milligrams using molecular weight on a busy nursing floor instead of using the vial mEq/mL label.',
    keyPoint: 'Treat mEq and Units as standard dosage units: Volume = (Desired mEq / Available mEq) × Volume on hand.'
  },

  'les_uc_6': {
    id: 'les_uc_6',
    moduleId: 'unit-conversions',
    moduleTitle: 'Metric & Clinical Unit Conversions',
    lessonNumber: 12,
    title: 'Temperature Conversions: Celsius (°C) and Fahrenheit (°F)',
    objective: 'Convert clinical patient temperatures between Celsius and Fahrenheit scales accurately.',
    concept: 'Modern electronic hospital monitors and research protocols often record core temperature in degrees Celsius (°C), while patients and home thermometers use Fahrenheit (°F). Standard clinical formulas: °C = (°F - 32) ÷ 1.8 and °F = (°C × 1.8) + 32.',
    shortNotes: [
      'Fahrenheit to Celsius: °C = (°F - 32) ÷ 1.8',
      'Celsius to Fahrenheit: °F = (°C × 1.8) + 32',
      'Key Reference Points: Normal Body Temp = 37.0°C (98.6°F); Fever Threshold = 38.0°C (100.4°F); Hypothermia = < 35.0°C (95.0°F).'
    ],
    workedExample: {
      scenario: 'A pediatric patient has an axillary temperature of 39.5°C. Calculate the temperature in degrees Fahrenheit to communicate with the parents.',
      formula: '°F = (°C × 1.8) + 32',
      steps: [
        'Multiply Celsius by 1.8: 39.5 × 1.8 = 71.1.',
        'Add 32: 71.1 + 32 = 103.1°F.'
      ],
      result: '103.1°F (High Fever)',
      rationale: 'Converting 39.5°C to 103.1°F helps explain the urgency of antipyretic administration to caregivers.'
    },
    mistakes: 'Adding 32 before multiplying by 1.8 when converting Celsius to Fahrenheit (order of operations error).',
    keyPoint: 'Remember: Always subtract 32 first when going to °C; always multiply by 1.8 first when going to °F.'
  },

  // ==========================================
  // MODULE 3: TABLET CALCULATIONS (5 Lessons)
  // ==========================================
  'les_tab_1': {
    id: 'les_tab_1',
    moduleId: 'tablet-calculations',
    moduleTitle: 'Oral & Enteral Solid Formulations',
    lessonNumber: 13,
    title: 'Desired Over Have (D/H) Basic Formula for Tablets',
    objective: 'Calculate oral tablet quantities using the fundamental Desired over Have (D/H) equation.',
    concept: 'The Desired over Have formula is the cornerstone of solid oral medication administration. Formula: Number of Tablets = Desired Dose (D) ÷ Have Dose On Hand (H). Both Desired and Have values must be expressed in identical metric units before division.',
    shortNotes: [
      'Basic Formula: Tablets = Desired (D) ÷ Have (H).',
      'Rule 1: Ensure Desired and Have are in the same unit of measure (e.g. both in mg).',
      'Rule 2: Whole tablets require whole integer results or 0.5 for scored tablets.',
      'Check: If calculated answer is > 3 tablets, re-verify with pharmacy or provider.'
    ],
    workedExample: {
      scenario: 'Order: Atenolol 50 mg PO daily. Available: Atenolol 25 mg tablets. Calculate the number of tablets to administer.',
      formula: 'Tablets = Desired ÷ Have',
      steps: [
        'Desired (D) = 50 mg.',
        'Have (H) = 25 mg.',
        'Calculate: 50 mg ÷ 25 mg = 2 tablets.'
      ],
      result: '2 Tablets',
      rationale: 'Two 25 mg tablets provide the ordered 50 mg dose safely.'
    },
    mistakes: 'Inverting the formula to Have ÷ Desired (e.g., 25 ÷ 50 = 0.5 tablets, causing a 50% underdose).',
    keyPoint: 'Formula is always Desired (What Doctor Wants) divided by Have (What Pharmacy Supplied).'
  },

  'les_tab_2': {
    id: 'les_tab_2',
    moduleId: 'tablet-calculations',
    moduleTitle: 'Oral & Enteral Solid Formulations',
    lessonNumber: 14,
    title: 'Scored Tablets vs. Non-Scored Tablet Safety Constraints',
    objective: 'Differentiate scored vs. non-scored tablets and recognize legal/safety restrictions on tablet splitting.',
    concept: 'Only tablets with an FDA-approved manufacturer score line may be split in half. Non-scored tablets, enteric-coated (EC) tablets, sustained-release (SR/ER/XL/CR) capsules, and sublingual formulations must NEVER be cut, crushed, or divided, as doing so destroys the drug release mechanism and can cause fatal dose dumping.',
    shortNotes: [
      'Scored Tablets: Feature an engineered groove that guarantees equal active drug distribution in each half (0.5 tab).',
      'Non-Scored Tablets: Lack uniform active ingredient distribution; splitting causes unequal, unpredictable dosing.',
      'NEVER CRUSH / NEVER SPLIT: Enteric-Coated (EC), Extended-Release (ER/XR/XL/SR), Controlled-Release (CR), Sublingual (SL).',
      'NCLEX Rule: Never administer a fraction of a tablet other than 0.5 (never 0.25, 0.33, or 0.75 tablets).'
    ],
    workedExample: {
      scenario: 'Order: Metoprolol Succinate ER 25 mg PO daily. Available: Metoprolol Succinate ER 50 mg non-scored film-coated extended release tablets. What is the nurse’s appropriate action?',
      formula: 'Clinical Evaluation: ER formulation + Non-scored tablet = DO NOT SPLIT',
      steps: [
        'Evaluate medication form: Metoprolol Succinate is an Extended-Release (ER) formulation.',
        'Check tablet scoring: Tablet is non-scored and film-coated.',
        'Recognize hazard: Cutting an ER tablet causes immediate dose dumping, resulting in acute severe bradycardia/hypotension.',
        'Clinical Action: Withhold tablet and contact pharmacy to dispense 25 mg strength tablets or appropriate formulation.'
      ],
      result: 'Do Not Split - Request 25 mg ER Tablets from Pharmacy',
      rationale: 'Preserves extended-release mechanism and protects patient from rapid toxicity.'
    },
    mistakes: 'Cutting extended-release or non-scored tablets with a kitchen knife, resulting in toxic drug surge.',
    keyPoint: 'Never split, crush, or chew extended-release (ER/XR) or enteric-coated (EC) solid formulations.'
  },

  'les_tab_3': {
    id: 'les_tab_3',
    moduleId: 'tablet-calculations',
    moduleTitle: 'Oral & Enteral Solid Formulations',
    lessonNumber: 15,
    title: 'Multi-Tablet Dosing & Daily Divided Dose Schedules',
    objective: 'Calculate individual doses and total daily tablet counts for divided frequency administration schedules.',
    concept: 'Prescriptions are frequently written as total daily doses to be administered in divided intervals throughout the 24-hour cycle (e.g. BID = twice daily / every 12 hrs; TID = three times daily / every 8 hrs; QID = four times daily / every 6 hrs). Nurses must calculate the exact dose per administration as well as verify the 24-hour cumulative ceiling.',
    shortNotes: [
      'Frequency Abbreviations: Daily = q24h; BID = 2 times/day (q12h); TID = 3 times/day (q8h); QID = 4 times/day (q6h); Q4H = 6 times/day.',
      'Per-Dose Calculation: Total Daily Dose ÷ Number of Doses per Day.',
      'Per-Administration Tablets: (Dose per administration) ÷ (Have per tablet).',
      'Cumulative Verification: (Tablets per dose) × (Number of doses) = Total tablets dispensed daily.'
    ],
    workedExample: {
      scenario: 'Order: Cephalexin 1 g PO daily in 4 equally divided doses. Available: Cephalexin 250 mg capsules. Calculate: 1) mg per single dose, 2) capsules per single dose, 3) total capsules taken daily.',
      formula: 'Dose per admin = Total Dose ÷ 4; Capsules per admin = Single Dose ÷ 250 mg',
      steps: [
        'Convert 1 g to mg: 1 g = 1,000 mg total daily.',
        'Divide into 4 doses: 1,000 mg ÷ 4 = 250 mg per dose (administered QID / every 6 hours).',
        'Calculate capsules per dose: 250 mg desired ÷ 250 mg available = 1 capsule per dose.',
        'Calculate total daily capsules: 1 capsule × 4 times/day = 4 capsules daily.'
      ],
      result: '1 Capsule per dose (4 Capsules total daily)',
      rationale: 'Evenly distributes therapeutic antimicrobial blood levels across the 24-hour period.'
    },
    mistakes: 'Giving the entire 1,000 mg (4 capsules) in a single dose instead of dividing it into 4 separate scheduled administrations.',
    keyPoint: 'Carefully distinguish between "Total Daily Dose" and "Single Administered Dose".'
  },

  'les_tab_4': {
    id: 'les_tab_4',
    moduleId: 'tablet-calculations',
    moduleTitle: 'Oral & Enteral Solid Formulations',
    lessonNumber: 16,
    title: 'Capsule Administration & Enteric-Coated/Sustained-Release Rules',
    objective: 'Manage capsule formulations, enteral tube administration, and special coatings safely.',
    concept: 'Gelatin capsules encase powdered or bead medications. Standard gelatin capsules containing immediate-release powder may be opened and mixed with water or applesauce for enteral feeding tube administration if approved by pharmacy. However, capsules containing micro-encapsulated extended-release beads must never be crushed.',
    shortNotes: [
      'Capsules: Must always be administered as WHOLE numbers (1, 2, 3 capsules). You can never give 0.5 capsule.',
      'Enteric Coating (EC): Protects the stomach from irritation and prevents stomach acid from degrading the drug. Never crush.',
      'Enteral Feeding Tubes: Confirm with pharmacy before opening capsules. Flush tube with 15-30 mL water before and after.',
      'If a calculation for capsules results in a decimal (e.g. 1.5 capsules), the dosage calculation is either wrong or the pharmacy must provide a different formulation.'
    ],
    workedExample: {
      scenario: 'Order: Doxycycline 100 mg PO BID. Available: Doxycycline 50 mg capsules. How many capsules do you administer per dose?',
      formula: 'Capsules = Desired Dose ÷ Have Dose',
      steps: [
        'Desired: 100 mg.',
        'Have: 50 mg per capsule.',
        'Calculate: 100 ÷ 50 = 2 capsules.'
      ],
      result: '2 Capsules',
      rationale: 'Administering two whole 50 mg capsules delivers the 100 mg dose without opening or tampering with the gelatin shell.'
    },
    mistakes: 'Attempting to divide or split a capsule into fractional parts.',
    keyPoint: 'Capsules can only be administered as whole units (1, 2, 3). Never calculate or administer partial capsules.'
  },

  'les_tab_5': {
    id: 'les_tab_5',
    moduleId: 'tablet-calculations',
    moduleTitle: 'Oral & Enteral Solid Formulations',
    lessonNumber: 17,
    title: 'Clinical Dose Ceiling Checks & Maximum Tablet Safeguards',
    objective: 'Apply clinical ceiling rules to catch prescription and transcription calculation errors before administration.',
    concept: 'In standard clinical nursing practice, single oral medication doses rarely exceed 3 to 4 tablets or capsules. If a mathematical calculation yields 5 or more tablets for a single medication dose, it serves as a major red flag indicating an incorrect calculation, unit conversion error, or prescribing overdose.',
    shortNotes: [
      'Rule of Thumb: Single doses should rarely exceed 3 tablets (maximum 4 in exceptional cases).',
      'If calculation yields ≥ 4-5 tablets: STOP. Re-check math, verify units (mg vs mcg), and contact hospital pharmacy.',
      'Common Cause: Unit error (e.g. ordering 500 mg and using 0.5 mg tablets instead of 500 mg tablets).',
      'Safety Step: Check maximum recommended single dose in clinical drug guide (e.g. Acetaminophen max single dose = 1,000 mg).'
    ],
    workedExample: {
      scenario: 'Order: Levothyroxine 0.1 mg PO. Available: Levothyroxine 25 mcg tablets. A student nurse calculates 40 tablets. Identify the calculation error and determine the correct dose.',
      formula: 'Step 1: Convert 0.1 mg to mcg = 100 mcg. Step 2: Tablets = 100 mcg ÷ 25 mcg',
      steps: [
        'Identify student error: Student did not convert 0.1 mg to mcg, or divided 1,000 incorrectly.',
        'Correct unit conversion: 0.1 mg × 1,000 = 100 mcg.',
        'Calculate correct tablets: 100 mcg ÷ 25 mcg/tablet = 4 tablets.',
        'Evaluate against ceiling: 4 tablets of 25 mcg is verified as standard clinical replacement when 100 mcg tab is unavailable.'
      ],
      result: '4 Tablets (Corrected from 40 tablet error)',
      rationale: 'Recognizing that 40 tablets is clinically absurd catches a fatal 10x overdose before harm occurs.'
    },
    mistakes: 'Blithely administering large fistfuls of tablets (> 5) without questioning the calculation.',
    keyPoint: 'Any calculation exceeding 3-4 tablets warrants an immediate complete recalculation and pharmacy verification.'
  },

  // ==========================================
  // MODULE 4: LIQUID CALCULATIONS (5 Lessons)
  // ==========================================
  'les_liq_1': {
    id: 'les_liq_1',
    moduleId: 'liquid-calculations',
    moduleTitle: 'Parenteral Liquids & Syringe Calibrations',
    lessonNumber: 18,
    title: 'Liquid Formula: (Desired ÷ Have) × Vehicle (mL)',
    objective: 'Calculate oral and injectable liquid volumes using the universal liquid dosage equation.',
    concept: 'Liquid medications (oral suspensions, elixirs, ampules, and vials) specify concentration as drug mass dissolved in a specific volume vehicle. Universal Liquid Formula: Amount to Administer (mL) = (Desired Dose ÷ Have Dose) × Vehicle Volume (V).',
    shortNotes: [
      'Universal Formula: Volume to Administer = (Desired [D] ÷ Have [H]) × Vehicle [V].',
      'Desired (D): Ordered dose from provider (e.g., 250 mg).',
      'Have (H): Drug strength stated on label (e.g., 125 mg).',
      'Vehicle (V): Volume in which Have dose is dissolved (e.g., 5 mL or 1 mL).',
      'Ensure Desired and Have are in identical units before dividing.'
    ],
    workedExample: {
      scenario: 'Order: Amoxicillin oral suspension 375 mg PO every 8 hours. Available bottle label: Amoxicillin 250 mg / 5 mL. Calculate the volume in mL to measure.',
      formula: 'Volume (mL) = (Desired ÷ Have) × Vehicle = (375 mg ÷ 250 mg) × 5 mL',
      steps: [
        'Desired (D) = 375 mg.',
        'Have (H) = 250 mg.',
        'Vehicle (V) = 5 mL.',
        'Calculate: (375 ÷ 250) × 5 = 1.5 × 5 = 7.5 mL.'
      ],
      result: '7.5 mL',
      rationale: 'Delivering 7.5 mL of the 250 mg/5 mL suspension administers exactly 375 mg of active antibiotic.'
    },
    mistakes: 'Forgetting to multiply by the vehicle volume (V) when the vehicle is greater than 1 mL (e.g., in 5 mL suspensions).',
    keyPoint: 'Always multiply the (D ÷ H) quotient by the vehicle volume (mL) stated on the manufacturer label.'
  },

  'les_liq_2': {
    id: 'les_liq_2',
    moduleId: 'liquid-calculations',
    moduleTitle: 'Parenteral Liquids & Syringe Calibrations',
    lessonNumber: 19,
    title: 'Calibrated Syringe Selection (1 mL Tuberculin, 3 mL, 5 mL, 10 mL)',
    objective: 'Select the clinically appropriate syringe size and read syringe calibration barrel markings accurately.',
    concept: 'Syringe selection directly impacts dosage precision: 1) 1 mL Tuberculin (TB) Syringe: Calibrated in hundredths of a mL (0.01 mL). Used for doses < 1 mL, pediatric meds, heparin, and tuberculin skin tests. 2) 3 mL Syringe: Calibrated in tenths of a mL (0.1 mL). Used for doses between 1 mL and 3 mL. 3) 5 mL & 10 mL Syringes: Calibrated in 0.2 mL or 0.5 mL increments. 4) Insulin Syringe (U-100): Calibrated ONLY in insulin units (never mL!).',
    shortNotes: [
      'Volume < 1 mL: Use 1 mL Tuberculin (TB) Syringe (calibrated in 0.01 mL increments; round to hundredths).',
      'Volume 1 to 3 mL: Use 3 mL Syringe (calibrated in 0.1 mL increments; round to tenths).',
      'Volume > 3 mL: Use 5 mL or 10 mL Syringe (for IV bolus or oral enteral measuring).',
      'Insulin Syringe: Orange cap, calibrated strictly in UNITS (U-100 = 100 units/mL). NEVER use for non-insulin medications.',
      'Plunger Reading: Always read syringe volume at the forward leading edge of the black plunger seal.'
    ],
    workedExample: {
      scenario: 'Order: Morphine Sulfate 3.5 mg SubQ. Available: Morphine Sulfate 10 mg/mL in 1 mL ampule. 1) Calculate volume. 2) Choose the appropriate syringe.',
      formula: 'Volume (mL) = (Desired ÷ Have) × 1 mL',
      steps: [
        'Calculate volume: (3.5 mg ÷ 10 mg) × 1 mL = 0.35 mL.',
        'Evaluate syringe options: 0.35 mL is less than 1.0 mL and requires hundredth-place precision.',
        'Select 1 mL Tuberculin (TB) syringe with 0.01 mL graduation marks.'
      ],
      result: '0.35 mL drawn in a 1 mL Tuberculin Syringe',
      rationale: 'A 3 mL syringe only has 0.1 mL tick marks and cannot accurately measure 0.35 mL.'
    },
    mistakes: 'Using a 3 mL syringe to measure 0.35 mL or drawing non-insulin medications into an insulin unit syringe.',
    keyPoint: 'Use a 1 mL TB syringe for any injection volume under 1.0 mL to ensure hundredth-milliliter precision.'
  },

  'les_liq_3': {
    id: 'les_liq_3',
    moduleId: 'liquid-calculations',
    moduleTitle: 'Parenteral Liquids & Syringe Calibrations',
    lessonNumber: 20,
    title: 'Intramuscular (IM) & Subcutaneous (SubQ) Volume Injection Limits',
    objective: 'Apply anatomical volume injection limits for deltoid, vastus lateralis, ventrogluteal, and SubQ sites.',
    concept: 'Injecting excessive volume into muscle or subcutaneous tissue causes localized tissue necrosis, severe pain, and erratic drug absorption. Standard anatomical volume limits: 1) Deltoid (Adult): Max 1.0 mL (preferred 0.5-1 mL). 2) Ventrogluteal (Adult): Max 3.0 mL (well-developed muscle). 3) Vastus Lateralis (Infant/Pediatric): Max 1.0 mL in infants; up to 2 mL in children. 4) Subcutaneous (SubQ): Max 1.0 mL (preferred 0.5 mL).',
    shortNotes: [
      'Adult Deltoid IM: Maximum 1.0 mL.',
      'Adult Ventrogluteal IM: Maximum 3.0 mL (safest adult deep IM site).',
      'Infant Vastus Lateralis IM: Maximum 1.0 mL (preferred infant injection site).',
      'Subcutaneous (SubQ): Maximum 1.0 mL.',
      'If calculated IM dose > site limit: Split the dose into two separate syringes and inject into two distinct anatomical sites.'
    ],
    workedExample: {
      scenario: 'Order: Ceftriaxone 1 g IM. Available: Reconstituted concentration of 250 mg/mL. 1) Calculate volume. 2) Determine anatomical site management for an adult.',
      formula: 'Volume (mL) = Desired ÷ Have = 1,000 mg ÷ 250 mg/mL',
      steps: [
        'Calculate total volume: 1,000 mg ÷ 250 mg/mL = 4.0 mL.',
        'Evaluate anatomical site limit: Adult ventrogluteal maximum is 3.0 mL; 4.0 mL exceeds single site capacity.',
        'Clinical decision: Split 4.0 mL into two 2.0 mL injections and administer in two separate anatomical sites (e.g. left and right ventrogluteal muscles).'
      ],
      result: '4.0 mL total -> Administer as two separate 2.0 mL IM injections',
      rationale: 'Prevents tissue trauma, sterile abscess formation, and unbearable patient pain.'
    },
    mistakes: 'Injecting 4 mL of medication into a single deltoid muscle.',
    keyPoint: 'Never exceed 1 mL in the deltoid, 3 mL in the ventrogluteal, or 1 mL in subcutaneous tissue.'
  },

  'les_liq_4': {
    id: 'les_liq_4',
    moduleId: 'liquid-calculations',
    moduleTitle: 'Parenteral Liquids & Syringe Calibrations',
    lessonNumber: 21,
    title: 'Lyophilized Powder Reconstitution & Displacement Volume',
    objective: 'Calculate reconstituting diluent additions, understand powder displacement volume, and extract final concentration.',
    concept: 'Unstable parenteral medications (e.g., IV/IM Penicillin, Ampicillin, Vancomycin) are manufactured as dry lyophilized powders. Reconstituting instructions on the vial label specify: 1) Type of diluent (Sterile Water for Injection vs. 0.9% NaCl), 2) Volume of diluent to add, 3) Resulting final drug concentration per mL. Dissolving powder occupies physical volume (powder displacement), meaning total final volume exceeds the amount of liquid added.',
    shortNotes: [
      'Diluent: Sterile fluid added to dissolve dry powder (e.g. Bacteriostatic Water or Normal Saline).',
      'Powder Displacement: The physical volume occupied by the dry solute (Final Volume = Diluent Added + Powder Displacement).',
      'Label Reading: Always use the RESULTING CONCENTRATION (e.g., "yields 250 mg/mL") to calculate dose volume.',
      'Vial Labeling: Immediately write: Date, Time, Concentration per mL, Expiration Date, and Nurse Initials.'
    ],
    workedExample: {
      scenario: 'Order: Oxacillin 500 mg IM. Vial instructions: "For IM use, add 2.8 mL of Sterile Water for Injection to yield 3.0 mL of solution containing 250 mg/mL." Calculate the volume to draw up.',
      formula: 'Volume (mL) = Desired Dose ÷ Resulting Concentration per mL',
      steps: [
        'Identify Desired Dose: 500 mg.',
        'Identify Resulting Concentration from label: 250 mg/mL (DO NOT divide by 2.8 mL).',
        'Calculate volume: 500 mg ÷ 250 mg/mL = 2.0 mL.',
        'Note displacement: 2.8 mL diluent + 0.2 mL powder = 3.0 mL total vial volume.'
      ],
      result: '2.0 mL',
      rationale: 'Using the label resulting concentration (250 mg/mL) accounts for powder displacement.'
    },
    mistakes: 'Dividing the dose by the diluent added (2.8 mL) rather than the resulting concentration per mL.',
    keyPoint: 'Always base dosage calculations on the final resulting concentration statement on the manufacturer label.'
  },

  'les_liq_5': {
    id: 'les_liq_5',
    moduleId: 'liquid-calculations',
    moduleTitle: 'Parenteral Liquids & Syringe Calibrations',
    lessonNumber: 22,
    title: 'Multi-Dose Vial Stability, Storage, Expiration & Labeling',
    objective: 'Apply CDC safe injection standards for multi-dose vials, sterility maintenance, and BUD (Beyond-Use Date) tracking.',
    concept: 'Multi-dose vials contain antimicrobial preservatives allowing repeated entries. CDC guidelines mandate that once punctured, multi-dose vials must be dated and discarded within 28 days unless the manufacturer specifies a shorter beyond-use date. Single-dose vials contain no preservatives and must be used immediately for a single patient and discarded.',
    shortNotes: [
      'Multi-Dose Vial Rule: CDC 28-day rule unless manufacturer specifies shorter stability (e.g. reconstituted antibiotics = 24-48 hrs).',
      'Mandatory Labeling: Date Opened, Time Opened, Beyond-Use Expiration Date/Time, Prepared Concentration, Nurse Initials.',
      'Sterile Technique: Disinfect rubber septum with 70% alcohol friction scrub for at least 10-15 seconds before each access.',
      'Single-Dose Vials (SDV): Single patient, single procedure only; never store open SDVs.'
    ],
    workedExample: {
      scenario: 'A multi-dose vial of regular insulin is opened on October 1st at 08:00. The manufacturer specifies 28 days stability at room temperature. What expiration date and time must the nurse write on the vial?',
      formula: 'Beyond-Use Date = Date Opened + 28 Calendar Days',
      steps: [
        'Date opened: October 1.',
        'Add 28 calendar days: October 1 + 28 days = October 29.',
        'Apply time: 08:00.',
        'Write label: "Opened: 10/01 08:00 | Exp: 10/29 08:00 | Initials: RN"'
      ],
      result: 'Expires October 29 at 08:00',
      rationale: 'Ensures insulin potency and prevents patient administration of contaminated medication.'
    },
    mistakes: 'Returning an opened multi-dose vial to the medication cart without an open date label.',
    keyPoint: 'Always label opened multi-dose vials with date, time, beyond-use expiration, and initials.'
  },

  // ==========================================
  // MODULE 5: IV GRAVITY INFUSIONS (5 Lessons)
  // ==========================================
  'les_flow_1': {
    id: 'les_flow_1',
    moduleId: 'iv-flow-mathematics',
    moduleTitle: 'IV Gravity Infusions & Drop Timing',
    lessonNumber: 23,
    title: 'Gravity Infusion Drop Rate Formula (gtt/min Calculation)',
    objective: 'Calculate manual gravity IV drop rates in drops per minute (gtt/min) using standard drip equations.',
    concept: 'When volumetric smart infusion pumps are unavailable (e.g., during power failure, field medicine, or basic fluid hydration), intravenous infusions run by gravity. Gravity flow rate is measured in drops per minute (gtt/min). Formula: Drip Rate (gtt/min) = [Total Volume (mL) × Drop Factor (gtt/mL)] ÷ Total Time in Minutes.',
    shortNotes: [
      'Universal Gravity Formula: gtt/min = (Volume in mL × Drop Factor in gtt/mL) ÷ Time in Minutes.',
      'Time in Minutes: If time is ordered in hours, multiply hours by 60 (e.g., 4 hours = 240 minutes).',
      'Drop Factor: Number of drops per mL delivered by the specific IV tubing (found on tubing packaging).',
      'Whole Number Rule: Drops per minute MUST ALWAYS be rounded to the nearest whole integer.'
    ],
    workedExample: {
      scenario: 'Order: 1,000 mL 0.9% Normal Saline IV to infuse over 8 hours by gravity. Tubing drop factor: 15 gtt/mL. Calculate the required drops per minute.',
      formula: 'gtt/min = (Total Volume [mL] × Drop Factor [gtt/mL]) ÷ (Hours × 60 min)',
      steps: [
        'Total Volume = 1,000 mL.',
        'Drop Factor = 15 gtt/mL.',
        'Total Time in Minutes = 8 hours × 60 min/hr = 480 minutes.',
        'Numerator = 1,000 × 15 = 15,000 drops.',
        'Divide: 15,000 ÷ 480 = 31.25 gtt/min.',
        'Round to nearest whole drop: 31.25 rounds to 31 gtt/min.'
      ],
      result: '31 gtt/min',
      rationale: 'Manual IV drip chambers cannot deliver fractions of a drop; 31 drops/min delivers the 1,000 mL over 8 hrs.'
    },
    mistakes: 'Dividing by hours instead of minutes (e.g. dividing by 8 instead of 480), yielding an impossible 1,875 gtt/min.',
    keyPoint: 'Always convert infusion time to MINUTES in the denominator: Time (hours) × 60.'
  },

  'les_flow_2': {
    id: 'les_flow_2',
    moduleId: 'iv-flow-mathematics',
    moduleTitle: 'IV Gravity Infusions & Drop Timing',
    lessonNumber: 24,
    title: 'Macro-Drip Tubing (10, 15, 20 gtt/mL) vs. Micro-Drip Tubing (60 gtt/mL)',
    objective: 'Select and differentiate macro-drip vs. micro-drip IV infusion sets based on patient clinical needs.',
    concept: 'IV administration sets are classified by their engineered drip chamber orifice: 1) Macro-Drip Sets: Deliver large drops (10, 15, or 20 gtt/mL). Used for adult fluid resuscitation, surgical hydration, and rapid infusions (> 100 mL/hr). 2) Micro-Drip Sets (Pediatric / Minidrip): Deliver 60 small drops per mL (60 gtt/mL). Features a metal needle in the chamber. In micro-drip tubing, the flow rate in mL/hr EXACTLY EQUALS the drop rate in gtt/min (1 mL/hr = 1 gtt/min).',
    shortNotes: [
      'Macro-Drip: 10, 15, or 20 gtt/mL (Used for routine adult infusions and rapid hydration).',
      'Micro-Drip: ALWAYS 60 gtt/mL (Identifiable by the thin metal needle inside drip chamber).',
      'Micro-Drip Golden Shortcut: Rate in mL/hr = Rate in gtt/min (e.g., 50 mL/hr on micro-drip = 50 gtt/min).',
      'Pediatric / Renal / Cardiac: Always use micro-drip to prevent accidental fluid overload.'
    ],
    workedExample: {
      scenario: 'Order: D5W at 45 mL/hr IV to keep vein open (KVO) in an elderly cardiac patient. 1) What tubing should be selected? 2) Calculate gtt/min using 60 gtt/mL micro-drip tubing.',
      formula: 'gtt/min = (45 mL × 60 gtt/mL) ÷ 60 minutes = 45 gtt/min',
      steps: [
        'Select micro-drip (60 gtt/mL) set to guard against sudden fluid bolus.',
        'Calculate: (45 mL × 60 gtt/mL) ÷ 60 min = 45 gtt/min.',
        'Shortcut verification: 45 mL/hr on 60 gtt/mL set = 45 gtt/min.'
      ],
      result: '45 gtt/min on Micro-Drip Tubing',
      rationale: 'Micro-drip allows minute drop adjustment and provides a direct 1:1 ratio between mL/hr and gtt/min.'
    },
    mistakes: 'Using 10 gtt/mL macro tubing for a slow pediatric infusion where a single drop difference drastically alters the hourly dose.',
    keyPoint: 'When drop factor is 60 gtt/mL (micro-drip), the gtt/min drop rate is identical to the mL/hr rate.'
  },

  'les_flow_3': {
    id: 'les_flow_3',
    moduleId: 'iv-flow-mathematics',
    moduleTitle: 'IV Gravity Infusions & Drop Timing',
    lessonNumber: 25,
    title: 'Drop Rate Timing, Manual Roller Clamp Adjustment & Rate Verification',
    objective: 'Regulate manual roller clamps and calibrate drops per 15-second count using a clinical watch.',
    concept: 'To adjust a gravity infusion at the bedside, the nurse counts drops falling in the drip chamber over a timed interval using a second hand on a clinical watch. To save time, nurses calculate the 15-second drop count: Drops in 15 seconds = (Drops per minute) ÷ 4.',
    shortNotes: [
      '15-Second Count Method: Count drops for 15 seconds, then multiply by 4 to get drops per minute.',
      'Target Drops per 15 sec = Target gtt/min ÷ 4.',
      'Bedside Technique: Rest watch next to drip chamber; adjust roller clamp until drop count matches target in 15 seconds.',
      'Positional Changes: Gravity flow changes with patient arm position, coughing, or bag height. Check flow rate every hour.'
    ],
    workedExample: {
      scenario: 'A gravity IV infusion is calculated to run at 28 gtt/min. How many drops must the nurse count in 15 seconds while adjusting the roller clamp?',
      formula: 'Drops in 15 seconds = gtt/min ÷ 4',
      steps: [
        'Target gtt/min = 28 drops/minute.',
        'Divide by 4: 28 ÷ 4 = 7 drops.',
        'Bedside adjustment: Regulate roller clamp until exactly 7 drops fall in 15 seconds.'
      ],
      result: '7 drops every 15 seconds',
      rationale: 'Counting 7 drops in 15 seconds provides rapid, accurate calibration without waiting a full minute.'
    },
    mistakes: 'Counting drops for only 5 seconds, which creates large timing errors due to clamp fluctuations.',
    keyPoint: 'Divide the total gtt/min by 4 to determine the 15-second count for bedside roller clamp regulation.'
  },

  'les_flow_4': {
    id: 'les_flow_4',
    moduleId: 'iv-flow-mathematics',
    moduleTitle: 'IV Gravity Infusions & Drop Timing',
    lessonNumber: 26,
    title: 'Whole Number Drop Rounding Rules (Fractional Drops Danger)',
    objective: 'Execute whole-number rounding protocols for all manual gravity infusion drop calculations.',
    concept: 'Physical drops of fluid exiting a drip orifice cannot be divided into fractional units (e.g. you cannot count 0.3 or 0.7 of a falling liquid droplet). Therefore, gravity drip rates in gtt/min MUST ALWAYS be rounded to the nearest whole integer. Standard math rounding applies: ≥ 0.5 rounds UP, < 0.5 rounds DOWN.',
    shortNotes: [
      'Gravity Drip Rounding: ALWAYS round to nearest WHOLE number (e.g., 20.8 gtt/min -> 21 gtt/min; 16.4 gtt/min -> 16 gtt/min).',
      'Electronic Pump Rounding: Electronic smart pumps can deliver tenths (e.g., 12.5 mL/hr); gravity drip sets CANNOT.',
      'NCLEX Rule: If the question asks for "gtt/min", provide a whole integer with NO decimals.',
      'Safety: Never record 33.3 gtt/min on an IV gravity flow sheet.'
    ],
    workedExample: {
      scenario: 'Order: 500 mL Lactated Ringer’s IV over 3 hours. Tubing drop factor: 20 gtt/mL. Calculate gtt/min and apply proper rounding.',
      formula: 'gtt/min = (500 mL × 20 gtt/mL) ÷ (3 × 60 min)',
      steps: [
        'Numerator = 500 × 20 = 10,000 drops.',
        'Denominator = 3 × 60 = 180 minutes.',
        'Divide: 10,000 ÷ 180 = 55.555... gtt/min.',
        'Round to nearest whole drop: 55.55 rounds UP to 56 gtt/min.'
      ],
      result: '56 gtt/min',
      rationale: 'Rounding 55.55 to 56 whole drops delivers the required fluid volume accurately.'
    },
    mistakes: 'Leaving the answer as 55.5 or 55.6 gtt/min on an exam or clinical chart.',
    keyPoint: 'Drops (gtt/min) are indivisible physical units: always round to the nearest whole integer.'
  },

  'les_flow_5': {
    id: 'les_flow_5',
    moduleId: 'iv-flow-mathematics',
    moduleTitle: 'IV Gravity Infusions & Drop Timing',
    lessonNumber: 27,
    title: 'Infusion Time & Remaining Volume Calculations (Hours & Minutes)',
    objective: 'Calculate total infusion duration, completion time, and remaining bag volume at any point during therapy.',
    concept: 'Nurses must predict when an IV bag will run empty to prepare replacement bags, prevent air emboli, and maintain line patency. Formula for Total Infusion Time: Total Hours = Total Volume (mL) ÷ Flow Rate (mL/hr). If the hour quotient contains a decimal, multiply the decimal fraction by 60 to find remaining minutes.',
    shortNotes: [
      'Infusion Time (Hours) = Total Volume (mL) ÷ Rate (mL/hr).',
      'Decimal to Minutes: Multiply the decimal remainder by 60 (e.g., 0.25 hrs × 60 = 15 minutes; 4.25 hrs = 4 hours 15 min).',
      'Completion Time = Start Time + Total Infusion Duration.',
      'Remaining Volume = Total Starting Volume - (Rate in mL/hr × Elapsed Hours).'
    ],
    workedExample: {
      scenario: 'An IV bag containing 1,000 mL 0.9% NS is started at 09:00 at a rate of 125 mL/hr. 1) How long will the bag last? 2) At what exact time will the infusion finish?',
      formula: 'Duration (hrs) = 1,000 mL ÷ 125 mL/hr',
      steps: [
        'Calculate duration: 1,000 ÷ 125 = 8.0 hours.',
        'Calculate completion time: 09:00 + 8 hours = 17:00 (5:00 PM).'
      ],
      result: '8 Hours (Finishes at 17:00)',
      rationale: 'Knowing the bag completes at 17:00 allows the nurse to spike the next ordered bag without interrupting hydration.'
    },
    mistakes: 'Treating a decimal hour like 4.5 hours as "4 hours and 5 minutes" instead of 4 hours and 30 minutes (0.5 × 60).',
    keyPoint: 'Always multiply decimal hour fractions by 60 to convert to clock minutes (0.5 hr = 30 min, 0.75 hr = 45 min).'
  },

  // ==========================================
  // MODULE 6: VOLUMETRIC PUMPS (5 Lessons)
  // ==========================================
  'les_pump_1': {
    id: 'les_pump_1',
    moduleId: 'volumetric-infusion-pumps',
    moduleTitle: 'Volumetric Smart Pumps & Secondary Piggybacks',
    lessonNumber: 28,
    title: 'Electronic Volumetric Pump Flow Rate (mL/hr Calculation)',
    objective: 'Program volumetric smart infusion pumps by calculating exact hourly infusion rates (mL/hr).',
    concept: 'Volumetric electronic smart pumps deliver intravenous fluid under positive pressure calibrated in milliliters per hour (mL/hr). Universal Pump Formula: Flow Rate (mL/hr) = Total Volume to Infuse (mL) ÷ Total Infusion Time in Hours. If the ordered time is in minutes, convert minutes to hours by dividing by 60: Rate (mL/hr) = [Volume (mL) ÷ Time (min)] × 60.',
    shortNotes: [
      'Basic Pump Formula: Rate (mL/hr) = Volume (mL) ÷ Time (hours).',
      'Minutes Formula: Rate (mL/hr) = (Volume in mL ÷ Time in minutes) × 60 min/hr.',
      'Decimal Precision: Modern smart pumps support tenths (e.g. 83.3 mL/hr).',
      'VTBI (Volume To Be Infused): Program the exact volume to infuse so the pump alarms before the line runs dry.'
    ],
    workedExample: {
      scenario: 'Order: 250 mL Ciprofloxacin IVPB to infuse over 90 minutes via smart pump. Calculate the pump flow rate in mL/hr.',
      formula: 'Rate (mL/hr) = (Volume [mL] ÷ Time [min]) × 60',
      steps: [
        'Volume = 250 mL.',
        'Time in minutes = 90 min (which is 1.5 hours).',
        'Method A: 250 mL ÷ 1.5 hours = 166.66... mL/hr.',
        'Method B: (250 ÷ 90) × 60 = 2.777 × 60 = 166.7 mL/hr.',
        'Round to tenths place: 166.7 mL/hr.'
      ],
      result: '166.7 mL/hr (VTBI: 250 mL)',
      rationale: 'Programming the pump at 166.7 mL/hr delivers the entire 250 mL dose in exactly 90 minutes.'
    },
    mistakes: 'Entering 90 into the pump rate field instead of converting 90 minutes to the hourly rate of 166.7 mL/hr.',
    keyPoint: 'Smart infusion pumps are always programmed in mL/hr: Rate = (mL ÷ Minutes) × 60.'
  },

  'les_pump_2': {
    id: 'les_pump_2',
    moduleId: 'volumetric-infusion-pumps',
    moduleTitle: 'Volumetric Smart Pumps & Secondary Piggybacks',
    lessonNumber: 29,
    title: 'Intermittent IV Piggyback (IVPB) Infusions (30, 45, 60 Minute Infusions)',
    objective: 'Calculate and administer secondary IV Piggyback (IVPB) medications on electronic smart pump systems.',
    concept: 'Secondary IV Piggybacks (IVPB) deliver intermittent medications (antibiotics, H2 blockers, antiemetics) into an existing primary line. The secondary bag must be hung physically higher than the primary fluid bag using an extension hook so hydrostatic pressure causes the secondary solution to infuse first.',
    shortNotes: [
      'Physical Setup: Secondary bag MUST hang higher than primary bag on the IV pole extension hook.',
      '30-Minute Infusion Shortcut: Rate (mL/hr) = Volume (mL) × 2 (e.g. 50 mL in 30 min = 100 mL/hr).',
      '60-Minute Infusion Shortcut: Rate (mL/hr) = Volume (mL) (e.g. 100 mL in 60 min = 100 mL/hr).',
      'Clamp Check: Ensure the secondary roller clamp is wide OPEN and primary back-check valve is functioning.'
    ],
    workedExample: {
      scenario: 'Order: Vancomycin 1 g IVPB in 200 mL Normal Saline to infuse over 120 minutes. Calculate the pump rate in mL/hr.',
      formula: 'Rate (mL/hr) = Volume (mL) ÷ Time (hrs)',
      steps: [
        'Volume = 200 mL.',
        'Time = 120 minutes ÷ 60 = 2.0 hours.',
        'Calculate: 200 mL ÷ 2.0 hrs = 100 mL/hr.'
      ],
      result: '100 mL/hr',
      rationale: 'Infusing 1 g Vancomycin over 2 hours at 100 mL/hr prevents Red Man Syndrome histamine release.'
    },
    mistakes: 'Leaving the secondary tubing roller clamp closed, causing the primary hydration fluid to infuse instead of the antibiotic.',
    keyPoint: 'Hang secondary bag higher than primary bag, open secondary clamp, and program in mL/hr.'
  },

  'les_pump_3': {
    id: 'les_pump_3',
    moduleId: 'volumetric-infusion-pumps',
    moduleTitle: 'Volumetric Smart Pumps & Secondary Piggybacks',
    lessonNumber: 30,
    title: 'Dose Error Reduction Systems (DERS) & Smart Pump Hard/Soft Guardrails',
    objective: 'Navigate Dose Error Reduction Systems (DERS), Soft Limits, and Hard Limits in hospital smart pump drug libraries.',
    concept: 'Smart infusion pumps feature internal DERS drug libraries with pre-programmed safety guardrails: 1) Soft Limit (Advisory Alert): Prompts the nurse that a programmed dose or rate falls outside standard clinical range; can be overridden if clinically justified. 2) Hard Limit (Ceiling/Floor): An absolute safety barrier that CANNOT be overridden; prevents fatal programming errors (e.g. 10x overdoses).',
    shortNotes: [
      'DERS: Dose Error Reduction System built into smart infusion pumps.',
      'Soft Limit: Warning alert that can be overridden with documented clinical reason.',
      'Hard Limit: Absolute safety stop that CANNOT be overridden under any circumstance.',
      'Golden Rule: Never bypass the drug library by programming in "Basic mL/hr Mode" for high-alert medications.'
    ],
    workedExample: {
      scenario: 'A nurse attempts to program a Potassium Chloride IVPB infusion at 40 mEq/hr. The smart pump triggers a "Hard Limit Alert: Maximum Rate Exceeded (Max 20 mEq/hr)". What is the mandatory clinical action?',
      formula: 'Safety Protocol: Hard Limit = DO NOT OVERRIDE. Reprogram to safe infusion rate.',
      steps: [
        'Recognize the hard limit: KCl infused faster than 20 mEq/hr causes fatal cardiac arrest / ventricular fibrillation.',
        'Acknowledge pump warning: Smart pump blocks rate entry.',
        'Verify order and reprogram: Infuse 40 mEq over at least 2 to 4 hours (≤ 10-20 mEq/hr) via central line with continuous ECG monitoring.'
      ],
      result: 'Reprogram Rate within Safe DERS Limits (≤ 20 mEq/hr)',
      rationale: 'DERS hard limits provide engineered protection against lethal infusion rates.'
    },
    mistakes: 'Switching the pump out of drug library mode into "Basic Infusion" to bypass a safety alert.',
    keyPoint: 'Hard limits protect against fatal errors—never attempt to bypass smart pump drug library guardrails.'
  },

  'les_pump_4': {
    id: 'les_pump_4',
    moduleId: 'volumetric-infusion-pumps',
    moduleTitle: 'Volumetric Smart Pumps & Secondary Piggybacks',
    lessonNumber: 31,
    title: 'IV Bolus & Direct IV Push (IVP) Administration Timing (min/dose)',
    objective: 'Calculate direct IV Push (IVP) medication administration speed and calibrate incremental push timing.',
    concept: 'Intravenous Push (IVP) medications are injected directly into a venous access port using a syringe. Every IV push medication has a manufacturer-mandated minimum administration time (e.g. "administer over at least 2 minutes") to avoid vein damage, speed shock, respiratory arrest, or acute hypotension.',
    shortNotes: [
      'Speed Shock: Systemic reaction caused by rapid IV push injection of a drug into the circulation.',
      'Incremental Push Technique: Divide syringe volume into equal fractions and inject at measured intervals (e.g., 2 mL over 2 min = 0.5 mL every 30 seconds).',
      'Flush Timing: The post-medication saline flush must be injected at the SAME slow speed as the medication itself.',
      'Reference: Always look up minimum IV push rate in an authoritative drug guide before bedside administration.'
    ],
    workedExample: {
      scenario: 'Order: Furosemide 40 mg IV Push now. Drug guide: "Administer 40 mg undiluted at a rate not to exceed 20 mg/min." Available: Furosemide 10 mg/mL (4 mL vial). 1) What is the minimum administration time? 2) How much volume should be pushed every 30 seconds?',
      formula: 'Min Time = 40 mg ÷ 20 mg/min = 2 minutes. Volume per 30 sec = Total Volume (4 mL) ÷ 4 intervals',
      steps: [
        'Calculate minimum push time: 40 mg ÷ 20 mg/min = 2 minutes (120 seconds).',
        'Identify total syringe volume: 40 mg ÷ 10 mg/mL = 4.0 mL.',
        'Divide into 30-second increments: 2 minutes = four 30-second intervals.',
        'Calculate incremental volume: 4.0 mL ÷ 4 = 1.0 mL every 30 seconds.'
      ],
      result: 'Inject 1.0 mL every 30 seconds over a full 2 minutes',
      rationale: 'Slow injection prevents ototoxicity, permanent hearing loss, and acute circulatory collapse.'
    },
    mistakes: 'Pushing Furosemide in 5 seconds or slamming the post-medication flush rapidly, which forces residual drug into the bloodstream instantly.',
    keyPoint: 'Slow IV push over the full recommended minutes is vital; flush post-injection at the exact same slow speed.'
  },

  'les_pump_5': {
    id: 'les_pump_5',
    moduleId: 'volumetric-infusion-pumps',
    moduleTitle: 'Volumetric Smart Pumps & Secondary Piggybacks',
    lessonNumber: 32,
    title: 'Flush Volumes, Line Priming & Dead Space Considerations',
    objective: 'Account for tubing dead space, primary line priming volumes, and post-infusion saline flush clears.',
    concept: 'IV tubing sets retain a fixed fluid volume known as "dead space" (primary tubing holds 15-25 mL; secondary tubing holds 10-15 mL; microbore extension sets hold 0.3-0.5 mL). In low-volume pediatric or high-cost biologic infusions, failing to flush secondary tubing means the patient never receives the final 10-15 mL of medication remaining trapped in the line.',
    shortNotes: [
      'Dead Space: Volume of fluid remaining inside the IV tubing and filter after the infusion bag empties.',
      'Secondary Line Clearing: Run a 20-25 mL flush through the secondary line at the same rate to deliver residual medication.',
      'Priming Volume: Volume required to purge all air bubbles from dry IV tubing before connecting to patient.',
      'Pediatric Microbore Tubing: Use low-volume microbore tubing (< 0.5 mL dead space) for pediatric medication lines.'
    ],
    workedExample: {
      scenario: 'An oncology patient is prescribed 50 mL of a monoclonal antibody IVPB over 1 hour. The secondary tubing dead space is 15 mL. What happens if no flush is programmed after the bag empties?',
      formula: 'Dose Received = Total Volume - Trapped Dead Space Volume',
      steps: [
        'Total bag volume = 50 mL.',
        'Trapped fluid in tubing = 15 mL.',
        'Fluid delivered to patient = 50 mL - 15 mL = 35 mL (only 70% of dose!).',
        'Clinical solution: Program a 20 mL normal saline secondary flush at 50 mL/hr to deliver the remaining 15 mL of drug.'
      ],
      result: 'Program 20 mL Post-Infusion Secondary Flush',
      rationale: 'Guarantees the patient receives 100% of the prescribed therapeutic dose.'
    },
    mistakes: 'Disconnecting the secondary line as soon as the bag empties without flushing, leaving 20-30% of the drug in the trash.',
    keyPoint: 'Always flush secondary IV lines to ensure the full dose trapped in tubing dead space reaches the patient.'
  },

  // ==========================================
  // MODULE 7: PEDIATRIC DOSING (5 Lessons)
  // ==========================================
  'les_peds_1': {
    id: 'les_peds_1',
    moduleId: 'weight-based-practice',
    moduleTitle: 'Pediatric & Neonatal Weight-Based Dosing',
    lessonNumber: 33,
    title: 'Pediatric Weight-Based Dose Determination (mg/kg/dose & mg/kg/day)',
    objective: 'Calculate individualized pediatric doses in mg/kg/dose and mg/kg/day from child body mass.',
    concept: 'Children metabolize and excrete medications differently than adults. Pediatric pharmacology is calculated strictly based on body weight in kilograms (mg/kg). Formula: Single Dose = Weight (kg) × Dose per kg. If prescribed as mg/kg/day in divided doses: 1) Calculate Total Daily Dose = Weight (kg) × mg/kg/day. 2) Divide by the number of scheduled daily doses.',
    shortNotes: [
      'Step 1: Convert patient weight from pounds (lbs) to kilograms (kg) by dividing by 2.2.',
      'mg/kg/dose: Dose = Child Weight (kg) × mg/kg.',
      'mg/kg/day: Total Daily Dose = Child Weight (kg) × mg/kg/day.',
      'Divided Doses: Single Dose = Total Daily Dose ÷ Number of Doses per Day (e.g., q8h = 3 doses).'
    ],
    workedExample: {
      scenario: 'Order: Amoxicillin 40 mg/kg/day PO in 2 divided doses (q12h) for a child weighing 33 lbs. Available: Amoxicillin 250 mg / 5 mL suspension. Calculate the mL per individual dose.',
      formula: '1) kg = lbs ÷ 2.2.  2) Total mg/day = kg × 40 mg.  3) Single dose = Total ÷ 2.  4) mL = (Dose ÷ 250) × 5 mL',
      steps: [
        'Convert weight: 33 lbs ÷ 2.2 = 15.0 kg.',
        'Calculate total daily dose: 15.0 kg × 40 mg/kg/day = 600 mg/day.',
        'Calculate single dose: 600 mg ÷ 2 doses = 300 mg per dose.',
        'Calculate liquid volume: (300 mg ÷ 250 mg) × 5 mL = 1.2 × 5 = 6.0 mL.'
      ],
      result: '6.0 mL per dose (given twice daily)',
      rationale: 'Accurately translates body weight into volume of oral antibiotic suspension.'
    },
    mistakes: 'Giving the entire daily dose (600 mg / 12 mL) in a single administration instead of dividing into two doses.',
    keyPoint: 'Always distinguish between mg/kg/DOSE (give this amount each time) and mg/kg/DAY (divide this total across the day).'
  },

  'les_peds_2': {
    id: 'les_peds_2',
    moduleId: 'weight-based-practice',
    moduleTitle: 'Pediatric & Neonatal Weight-Based Dosing',
    lessonNumber: 34,
    title: 'Safe Therapeutic Range Verification (Minimum vs. Maximum mg/kg Limits)',
    objective: 'Verify whether a prescribed pediatric dose falls safely within established minimum and maximum therapeutic limits.',
    concept: 'Before administering any pediatric drug, the nurse must consult a pediatric drug reference to determine the safe therapeutic range: Minimum Safe Dose = Weight (kg) × Min Recommended mg/kg; Maximum Safe Dose = Weight (kg) × Max Recommended mg/kg. If the ordered dose falls below the minimum, it is subtherapeutic; if it exceeds the maximum, it is toxic.',
    shortNotes: [
      'Safe Range Calculation: Calculate Low End (kg × Min mg/kg) and High End (kg × Max mg/kg).',
      'Clinical Decision: If Ordered Dose is between Min and Max -> SAFE to administer.',
      'Above Maximum: WITHHOLD medication and immediately notify prescribing provider.',
      'Below Minimum: Subtherapeutic; verify indication with provider before administration.'
    ],
    workedExample: {
      scenario: 'Order: Ceftriaxone 750 mg IV daily for a child weighing 22 lbs. Drug handbook safe range: 50 to 75 mg/kg/day. Is this order safe?',
      formula: 'Low End = kg × 50 mg; High End = kg × 75 mg',
      steps: [
        'Convert weight: 22 lbs ÷ 2.2 = 10.0 kg.',
        'Calculate minimum safe dose: 10 kg × 50 mg/kg/day = 500 mg/day.',
        'Calculate maximum safe dose: 10 kg × 75 mg/kg/day = 750 mg/day.',
        'Compare ordered dose: Ordered 750 mg matches the upper safe ceiling exactly.'
      ],
      result: 'Safe (Ordered 750 mg is within 500 - 750 mg range)',
      rationale: 'Validating against drug reference limits guarantees the child is protected from antibiotic toxicity.'
    },
    mistakes: 'Administering a prescribed dose without verifying the safe mg/kg range in a pediatric handbook.',
    keyPoint: 'Always calculate both the minimum and maximum safe dosage limits before administering pediatric medications.'
  },

  'les_peds_3': {
    id: 'les_peds_3',
    moduleId: 'weight-based-practice',
    moduleTitle: 'Pediatric & Neonatal Weight-Based Dosing',
    lessonNumber: 35,
    title: 'Neonatal Micro-Dosing (mcg/kg/min & Tuberculin Precision)',
    objective: 'Calculate ultra-low volume neonatal medications with hundredth-milliliter and microgram precision.',
    concept: 'Neonates and premature infants (weighing 500 g to 3 kg) require micro-doses where an error of 0.05 mL can represent a 50% overdose. Neonatal calculations require high-precision volumetric syringes (1 mL TB syringes or 0.5 mL insulin-style micro syringes) and microgram-level compounding.',
    shortNotes: [
      'Neonatal Weight: Weigh in grams; convert to kg by dividing by 1,000 (e.g., 1,500 g = 1.5 kg).',
      'Micro-Volumes: Round volumes to the hundredths place (e.g., 0.18 mL).',
      'Syringe: Never use a syringe larger than 1 mL for neonatal parenteral injections.',
      'Dead Space: Account for syringe hub dead space when compounding neonatal IV medications.'
    ],
    workedExample: {
      scenario: 'Order: Caffeine Citrate 5 mg/kg IV loading dose for a premature infant weighing 1,200 grams. Available: Caffeine Citrate 20 mg/mL. Calculate the exact volume in mL.',
      formula: '1) kg = grams ÷ 1,000.  2) Dose (mg) = kg × 5 mg.  3) Volume (mL) = Dose ÷ 20 mg/mL',
      steps: [
        'Convert infant mass: 1,200 g ÷ 1,000 = 1.20 kg.',
        'Calculate dose: 1.20 kg × 5 mg/kg = 6.0 mg.',
        'Calculate volume: 6.0 mg ÷ 20 mg/mL = 0.30 mL.'
      ],
      result: '0.30 mL in a 1 mL Tuberculin Syringe',
      rationale: 'Delivers the precise neuro-stimulant dose to treat neonatal apnea of prematurity.'
    },
    mistakes: 'Rounding neonatal volumes to the tenths place (e.g. rounding 0.14 mL to 0.1 mL, causing a 28% underdose).',
    keyPoint: 'Weigh neonates in grams, convert to kg (divide by 1,000), and measure in hundredths of a mL.'
  },

  'les_peds_4': {
    id: 'les_peds_4',
    moduleId: 'weight-based-practice',
    moduleTitle: 'Pediatric & Neonatal Weight-Based Dosing',
    lessonNumber: 36,
    title: 'Pediatric Fluid Maintenance Requirements (Holliday-Segar 100/50/20 Rule)',
    objective: 'Calculate 24-hour maintenance fluid volumes and hourly IV rates using the Holliday-Segar 100/50/20 rule.',
    concept: 'The Holliday-Segar 100/50/20 formula calculates baseline 24-hour pediatric maintenance fluid requirements: 1) First 10 kg of weight: 100 mL/kg/day. 2) Second 10 kg (11 to 20 kg): 50 mL/kg/day. 3) Each additional kg over 20 kg: 20 mL/kg/day. Hourly IV Rate = 24-hour total fluid ÷ 24 hours (or apply the 4/2/1 mL/hr rule).',
    shortNotes: [
      'First 10 kg: 100 mL/kg/day (10 kg = 1,000 mL/day or 40 mL/hr).',
      'Next 10 kg (11-20 kg): 50 mL/kg/day (Additional 10 kg = 500 mL/day or 20 mL/hr).',
      'Each kg > 20 kg: 20 mL/kg/day (Each kg = 20 mL/day or 1 mL/hr).',
      'Hourly 4/2/1 Rule: 4 mL/hr for first 10 kg + 2 mL/hr for next 10 kg + 1 mL/hr for each kg over 20 kg.'
    ],
    workedExample: {
      scenario: 'Calculate the 24-hour maintenance fluid volume and hourly smart pump rate for a child weighing 24 kg.',
      formula: '24-hr Fluid = (10 kg × 100) + (10 kg × 50) + (4 kg × 20)',
      steps: [
        'First 10 kg: 10 × 100 mL = 1,000 mL.',
        'Second 10 kg: 10 × 50 mL = 500 mL.',
        'Remaining 4 kg: 4 × 20 mL = 80 mL.',
        'Total 24-hour volume: 1,000 + 500 + 80 = 1,580 mL/day.',
        'Calculate hourly pump rate: 1,580 mL ÷ 24 hrs = 65.8 mL/hr (or 40 + 20 + 4 = 64 mL/hr via 4/2/1 rule).'
      ],
      result: '1,580 mL/day (65.8 mL/hr on smart pump)',
      rationale: 'Provides physiological hydration without precipitating cerebral edema or fluid overload.'
    },
    mistakes: 'Multiplying the child’s entire 24 kg weight by 100 mL/kg (which equals 2,400 mL/day, causing acute fluid overload).',
    keyPoint: 'Tier the weight: 100 mL/kg for first 10 kg, 50 mL/kg for next 10 kg, and 20 mL/kg for every kg above 20.'
  },

  'les_peds_5': {
    id: 'les_peds_5',
    moduleId: 'weight-based-practice',
    moduleTitle: 'Pediatric & Neonatal Weight-Based Dosing',
    lessonNumber: 37,
    title: 'Body Surface Area (BSA / Mosteller Formula in m²) Calculations',
    objective: 'Calculate Body Surface Area (BSA) in m² using the Mosteller formula for pediatric oncology protocols.',
    concept: 'Chemotherapy agents and critical pediatric medications correlate more closely with metabolic rate and Body Surface Area (BSA in m²) than body weight alone. Mosteller Formula: BSA (m²) = Square Root of [ (Height in cm × Weight in kg) ÷ 3,600 ]. Dose = Prescribed Dose per m² × Patient BSA.',
    shortNotes: [
      'Mosteller Formula: BSA (m²) = √ [ (Height [cm] × Weight [kg]) ÷ 3,600 ].',
      'Inches/Lbs Formula: BSA (m²) = √ [ (Height [in] × Weight [lbs]) ÷ 3,131 ].',
      'Average Adult BSA: Approximately 1.73 m².',
      'High-Alert Chemotherapy: Always requires independent two-nurse double verification of height, weight, and BSA calculation.'
    ],
    workedExample: {
      scenario: 'A pediatric oncology patient has a BSA of 0.85 m². The oncologist orders Methotrexate 15 mg/m² IV. Calculate the total dose.',
      formula: 'Dose = BSA (m²) × Dose per m²',
      steps: [
        'Identify BSA: 0.85 m².',
        'Identify ordered dose per m²: 15 mg/m².',
        'Calculate total dose: 0.85 m² × 15 mg/m² = 12.75 mg.'
      ],
      result: '12.75 mg Methotrexate',
      rationale: 'Calibrating antineoplastic therapy to BSA maximizes cytotoxicity while sparing normal organ tissues.'
    },
    mistakes: 'Forgetting to take the square root when computing BSA manually from height and weight.',
    keyPoint: 'BSA accounts for height and weight in m²; multiply patient BSA by the ordered mg/m² dose.'
  },

  // ==========================================
  // MODULE 8: CRITICAL CARE TITRATIONS (5 Lessons)
  // ==========================================
  'les_crit_1': {
    id: 'les_crit_1',
    moduleId: 'critical-care-titrations',
    moduleTitle: 'Critical Care Titrations & Heparin Protocols',
    lessonNumber: 38,
    title: 'Vasopressor & Inotrope Continuous Titration (mcg/kg/min to mL/hr)',
    objective: 'Convert continuous critical care medication titrations from mcg/kg/min into electronic pump rates in mL/hr.',
    concept: 'In Intensive Care Units, continuous vasoactive infusions (Norepinephrine, Dopamine, Dobutamine, Epinephrine) are titrated minute-by-minute based on Mean Arterial Pressure (MAP) and Cardiac Output. Continuous Titration Formula: 1) Desired mcg/min = Dose (mcg/kg/min) × Weight (kg). 2) Desired mcg/hr = mcg/min × 60 min/hr. 3) Pump Rate (mL/hr) = Desired mcg/hr ÷ Bag Concentration (mcg/mL).',
    shortNotes: [
      'Step 1: Calculate Bag Concentration in mcg/mL (Total mg × 1,000 ÷ Total mL).',
      'Step 2: Calculate mcg/min = Prescribed mcg/kg/min × Patient Weight in kg.',
      'Step 3: Convert to hourly mcg = mcg/min × 60 min/hr.',
      'Step 4: Flow Rate (mL/hr) = mcg/hr ÷ Concentration (mcg/mL).'
    ],
    workedExample: {
      scenario: 'Order: Dopamine 5 mcg/kg/min IV titration for a 70 kg patient with septic shock. Available IV Bag: Dopamine 400 mg in 250 mL D5W. Calculate the smart pump infusion rate in mL/hr.',
      formula: 'Rate (mL/hr) = [Dose (mcg/kg/min) × Weight (kg) × 60 min/hr] ÷ Concentration (mcg/mL)',
      steps: [
        'Calculate bag concentration: 400 mg × 1,000 = 400,000 mcg ÷ 250 mL = 1,600 mcg/mL.',
        'Calculate minute requirement: 5 mcg/kg/min × 70 kg = 350 mcg/min.',
        'Calculate hourly requirement: 350 mcg/min × 60 min/hr = 21,000 mcg/hr.',
        'Calculate pump rate: 21,000 mcg/hr ÷ 1,600 mcg/mL = 13.125 mL/hr.',
        'Round to tenths: 13.1 mL/hr.'
      ],
      result: '13.1 mL/hr',
      rationale: 'Delivers exact adrenergic stimulation to maintain cerebral and renal vascular perfusion.'
    },
    mistakes: 'Omitting the 60 min/hr factor, which results in a 60-fold underdose (0.22 mL/hr instead of 13.1 mL/hr).',
    keyPoint: 'Always multiply mcg/min by 60 to obtain hourly requirements before dividing by bag concentration.'
  },

  'les_crit_2': {
    id: 'les_crit_2',
    moduleId: 'critical-care-titrations',
    moduleTitle: 'Critical Care Titrations & Heparin Protocols',
    lessonNumber: 39,
    title: 'Weight-Based Heparin Protocol: Loading Bolus & Infusion Rate (units/kg/hr)',
    objective: 'Calculate initial weight-based Heparin IV loading bolus units and continuous infusion maintenance rate.',
    concept: 'Standard hospital weight-based Heparin protocols for DVT, PE, and Acute Coronary Syndrome (ACS) initiate anticoagulation with: 1) Initial IV Loading Bolus: Typically 80 units/kg IV push. 2) Initial Continuous Maintenance Infusion: Typically 18 units/kg/hr. Standard Heparin premixed bag concentration is 25,000 units in 250 mL D5W (100 units/mL).',
    shortNotes: [
      'Standard Concentration: 25,000 units in 250 mL = 100 units/mL.',
      'Initial Bolus Dose: Units = Patient Weight (kg) × Protocol Bolus (e.g. 80 units/kg).',
      'Bolus Volume: Bolus Units ÷ Bolus Vial Concentration (e.g., 1,000 units/mL).',
      'Continuous Hourly Rate: Units/hr = Patient Weight (kg) × 18 units/kg/hr.',
      'Pump Rate (mL/hr) = (Units/hr) ÷ (100 units/mL).'
    ],
    workedExample: {
      scenario: 'Order: Initiate weight-based Heparin protocol for a patient weighing 176 lbs with a pulmonary embolism. Protocol: 1) Bolus with 80 units/kg IVP. 2) Start maintenance infusion at 18 units/kg/hr. Premixed bag: 25,000 units in 250 mL (100 units/mL). Calculate: A) Bolus units, B) Starting pump rate in mL/hr.',
      formula: 'Weight = lbs ÷ 2.2; Bolus = kg × 80; Infusion Units/hr = kg × 18; Pump mL/hr = Units/hr ÷ 100',
      steps: [
        'Convert weight: 176 lbs ÷ 2.2 = 80.0 kg.',
        'Calculate IV Bolus: 80 kg × 80 units/kg = 6,400 units.',
        'Calculate hourly units: 80 kg × 18 units/kg/hr = 1,440 units/hr.',
        'Calculate pump rate: 1,440 units/hr ÷ 100 units/mL = 14.4 mL/hr.'
      ],
      result: 'Bolus: 6,400 units | Maintenance: 14.4 mL/hr',
      rationale: 'Rapidly achieves therapeutic anticoagulation to arrest thrombus extension.'
    },
    mistakes: 'Using the patient weight in pounds instead of kilograms, resulting in a severe heparin overdose.',
    keyPoint: 'Heparin is dosed in units/kg; divide hourly units by bag concentration (typically 100 units/mL) for mL/hr.'
  },

  'les_crit_3': {
    id: 'les_crit_3',
    moduleId: 'critical-care-titrations',
    moduleTitle: 'Critical Care Titrations & Heparin Protocols',
    lessonNumber: 40,
    title: 'aPTT Monitoring & Dynamic Heparin Titration Dose Adjustment',
    objective: 'Adjust continuous Heparin infusion rates based on activated partial thromboplastin time (aPTT) protocol scales.',
    concept: 'During continuous heparin therapy, aPTT or Anti-Xa levels are drawn every 6 hours to titrate the infusion into the therapeutic range (target aPTT typically 60-80 seconds): 1) If subtherapeutic (< 50 sec): Re-bolus and increase rate (e.g. +2 units/kg/hr). 2) If therapeutic: Maintain rate. 3) If supratherapeutic (> 100 sec): Stop infusion for 1 hour, decrease rate (e.g. -2 units/kg/hr), and monitor for bleeding.',
    shortNotes: [
      'Target aPTT: Typically 1.5 to 2.5 times control (60 to 80 seconds).',
      'Subtherapeutic (< 60s): Give protocol bolus (e.g. 40 units/kg) and increase pump rate (e.g. +2 units/kg/hr).',
      'Supratherapeutic (> 90-100s): Hold infusion for 60 min, decrease rate (e.g. -2 units/kg/hr), monitor for bleeding.',
      'Re-check aPTT exactly 6 hours after any rate change or bolus.'
    ],
    workedExample: {
      scenario: 'An 80 kg patient receiving Heparin at 14.4 mL/hr (1,440 units/hr) has an aPTT of 48 seconds (subtherapeutic). Protocol states: "Re-bolus with 40 units/kg and increase rate by 2 units/kg/hr." Bag concentration is 100 units/mL. Calculate new bolus and new pump rate.',
      formula: 'New Bolus = 80 kg × 40 units/kg. New Rate = (Current Units/hr + [80 kg × 2]) ÷ 100',
      steps: [
        'Calculate re-bolus: 80 kg × 40 units/kg = 3,200 units IV push.',
        'Calculate rate increase: 80 kg × 2 units/kg/hr = +160 units/hr.',
        'New hourly dose: 1,440 units/hr + 160 units/hr = 1,600 units/hr.',
        'New pump flow rate: 1,600 units/hr ÷ 100 units/mL = 16.0 mL/hr.'
      ],
      result: 'Re-bolus: 3,200 units | New Rate: 16.0 mL/hr',
      rationale: 'Titrating upward returns the patient into the target therapeutic anticoagulation window.'
    },
    mistakes: 'Increasing the rate without administering the protocol re-bolus, delaying therapeutic protection for hours.',
    keyPoint: 'Follow protocol tables strictly: calculate bolus adjustment, rate change, and redraw aPTT in 6 hours.'
  },

  'les_crit_4': {
    id: 'les_crit_4',
    moduleId: 'critical-care-titrations',
    moduleTitle: 'Critical Care Titrations & Heparin Protocols',
    lessonNumber: 41,
    title: 'Continuous Regular Insulin IV Infusions & Glucose Target Scales',
    objective: 'Manage continuous intravenous Regular Insulin infusions for Diabetic Ketoacidosis (DKA) and glycemic control.',
    concept: 'In DKA and Hyperosmolar Hyperglycemic State (HHS), ONLY Regular Insulin (Short-Acting) is administered intravenously. Standard IV Insulin concentration is 100 units in 100 mL 0.9% Normal Saline (1 unit/mL). Because concentration is 1:1, the ordered units/hr EQUALS the pump rate in mL/hr (e.g., 5 units/hr = 5 mL/hr). Standard DKA starting rate is 0.1 units/kg/hr.',
    shortNotes: [
      'ONLY Regular Insulin can be given IV (Never NPH, Glargine, or Detemir IV!).',
      'Standard Bag: 100 units Regular Insulin in 100 mL Normal Saline = 1 unit/mL.',
      '1:1 Ratio Shortcut: Rate in units/hr = Rate in mL/hr (e.g. 7 units/hr = 7 mL/hr).',
      'Line Priming: Waste 20-50 mL of insulin solution through tubing before connecting because insulin binds to plastic tubing walls.',
      'Blood Glucose Monitoring: Check capillary glucose every 1 hour while on active insulin titration.'
    ],
    workedExample: {
      scenario: 'Order: Initiate DKA Regular Insulin protocol at 0.1 units/kg/hr for a 60 kg patient with a blood glucose of 480 mg/dL. Bag concentration: 100 units in 100 mL NS (1 unit/mL). Calculate the pump rate in mL/hr.',
      formula: 'Units/hr = Weight (kg) × 0.1 units/kg/hr; Pump Rate (mL/hr) = Units/hr ÷ 1 unit/mL',
      steps: [
        'Calculate hourly units: 60 kg × 0.1 units/kg/hr = 6.0 units/hr.',
        'Convert to mL/hr using 1 unit/mL concentration: 6.0 units/hr ÷ 1 unit/mL = 6.0 mL/hr.'
      ],
      result: '6.0 mL/hr (6.0 units/hr)',
      rationale: 'Provides controlled insulin delivery to clear ketoacidosis while allowing hourly glucose monitoring.'
    },
    mistakes: 'Administering long-acting insulin (e.g. Glargine) intravenously or forgetting to prime tubing with insulin.',
    keyPoint: 'Only Regular Insulin is IV compatible; with 1 unit/mL bags, ordered units/hr directly equals pump mL/hr.'
  },

  'les_crit_5': {
    id: 'les_crit_5',
    moduleId: 'critical-care-titrations',
    moduleTitle: 'Critical Care Titrations & Heparin Protocols',
    lessonNumber: 42,
    title: 'Emergency Drug Resuscitation Calculations (Epinephrine & Amiodarone)',
    objective: 'Calculate ACLS and PALS emergency resuscitation medication dosages and bolus volumes under code conditions.',
    concept: 'During cardiopulmonary resuscitation (ACLS/PALS), high-stress calculation errors must be prevented: 1) Epinephrine: Adult ACLS dose is 1 mg (10 mL of 1:10,000 solution) IV/IO every 3-5 minutes. Pediatric PALS dose is 0.01 mg/kg (0.1 mL/kg of 1:10,000). 2) Amiodarone: Cardiac arrest pulseless VT/VF dose is 300 mg IV push rapid bolus, followed by 150 mg second dose if needed.',
    shortNotes: [
      'Adult Epinephrine ACLS: 1 mg IV/IO every 3-5 minutes (10 mL of 1:10,000 prefilled syringe).',
      'Pediatric Epinephrine PALS: 0.01 mg/kg (0.1 mL/kg of 1:10,000 solution).',
      'Epinephrine Ratio: 1:10,000 = 0.1 mg/mL (ACLS IV push); 1:1,000 = 1.0 mg/mL (Anaphylaxis IM only!).',
      'Amiodarone Arrest: 300 mg IV push initial bolus; 150 mg second dose for refractory VF/pulseless VT.'
    ],
    workedExample: {
      scenario: 'During a pediatric cardiac arrest code, the team leader orders Epinephrine 0.01 mg/kg IV for a child weighing 20 kg. Stock on the crash cart is Epinephrine 1:10,000 (0.1 mg/mL). Calculate the volume in mL to administer.',
      formula: '1) Dose (mg) = kg × 0.01 mg. 2) Volume (mL) = Dose (mg) ÷ 0.1 mg/mL (or Shortcut: kg × 0.1 mL/kg)',
      steps: [
        'Calculate dose: 20 kg × 0.01 mg/kg = 0.20 mg.',
        'Calculate volume: 0.20 mg ÷ 0.1 mg/mL = 2.0 mL.',
        'Shortcut check: 20 kg × 0.1 mL/kg = 2.0 mL.'
      ],
      result: '2.0 mL of Epinephrine 1:10,000 IV Push',
      rationale: 'Provides instantaneous adrenergic resuscitation to restore spontaneous coronary perfusion.'
    },
    mistakes: 'Giving Epinephrine 1:1,000 (1 mg/mL) intravenously during a code, causing a 10-fold lethal catecholamine surge.',
    keyPoint: 'For IV code arrest, ALWAYS use Epinephrine 1:10,000 (0.1 mg/mL); 1:1,000 is reserved strictly for IM anaphylaxis.'
  }
};

export const ALL_LESSON_KEYS = Object.keys(LESSONS_DATABASE);

export const TOPIC_ID_TO_FIRST_LESSON = {
  'medication-math-basics': 'les_mmb_1',
  'unit-conversions': 'les_uc_1',
  'tablet-calculations': 'les_tab_1',
  'liquid-calculations': 'les_liq_1',
  'iv-flow-mathematics': 'les_flow_1',
  'volumetric-infusion-pumps': 'les_pump_1',
  'weight-based-practice': 'les_peds_1',
  'critical-care-titrations': 'les_crit_1'
};
