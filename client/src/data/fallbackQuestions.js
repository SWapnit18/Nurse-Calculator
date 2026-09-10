/**
 * Comprehensive NCLEX Clinical Calculation Question Bank (100+ Questions)
 * Topics:
 * - Liquid Calculations (liquid_calculations)
 * - Tablet & Oral Calculations (tablet_calculations)
 * - IV Flow & Smart Pump Rates (iv_flow_mathematics)
 * - Unit Conversions (unit_conversions)
 * - Weight-Based & Pediatric Math (med_math_basics / weight_based)
 * - Reconstitution Exercises (reconstitution)
 */

export const INITIAL_QUESTION_BANK = [
  // 1. LIQUID INJECTIONS & SYRINGES
  {
    questionId: 'q_liq_1',
    topicId: 'liquid_calculations',
    title: 'Gentamicin IM Injection',
    scenario: 'Order: Gentamicin 80 mg IM. Available: 200 mg/mL in a 1.0 mL single-dose vial. How many mL should the nurse draw up in the syringe?',
    correctAnswer: 0.4,
    unit: 'mL',
    steps: [
      'Formula: Volume (mL) = Desired ÷ Have = 80 mg ÷ 200 mg/mL',
      'Calculation: 80 ÷ 200 = 0.4 mL',
      'ISMP Rule: Always lead with zero (0.4 mL). Use a 1 mL tuberculin syringe for accuracy.'
    ],
    keyPoint: 'Volumes <1 mL require precise tuberculin syringes calibrated in hundredths.'
  },
  {
    questionId: 'q_liq_2',
    topicId: 'liquid_calculations',
    title: 'Morphine Sulfate IV Push',
    scenario: 'Order: Morphine Sulfate 4 mg IV push. Available: 10 mg/mL in 1 mL ampule. Calculate volume to administer.',
    correctAnswer: 0.4,
    unit: 'mL',
    steps: [
      'Formula: 4 mg ÷ 10 mg/mL = 0.4 mL',
      'Administer slowly over 4-5 minutes per IV push safety standards.'
    ],
    keyPoint: 'Enforce leading zero to prevent accidental 4 mL (40 mg) fatal overdose.'
  },
  {
    questionId: 'q_liq_3',
    topicId: 'liquid_calculations',
    title: 'Diphenhydramine IM Dose',
    scenario: 'Order: Diphenhydramine 25 mg deep IM for acute allergic reaction. Stock: 50 mg/mL vial. How many mL are needed?',
    correctAnswer: 0.5,
    unit: 'mL',
    steps: [
      'Formula: Desired ÷ Have = 25 mg ÷ 50 mg/mL',
      'Calculation: 25 ÷ 50 = 0.5 mL',
      'Verify: 0.5 mL is well within the 1 mL maximum deltoid volume.'
    ],
    keyPoint: 'Administer deep IM in large muscle mass to prevent local tissue irritation.'
  },
  {
    questionId: 'q_liq_4',
    topicId: 'liquid_calculations',
    title: 'Ketorolac Post-Op Analgesia',
    scenario: 'Order: Ketorolac 15 mg IM q6h PRN pain. Available: 30 mg/mL in 1 mL prefilled syringe. How many mL to deliver?',
    correctAnswer: 0.5,
    unit: 'mL',
    steps: [
      'Formula: 15 mg ÷ 30 mg/mL = 0.5 mL',
      'Discard remaining 0.5 mL unneeded medication according to hospital policy.'
    ],
    keyPoint: 'Do not exceed 5 consecutive days of Ketorolac therapy due to renal and GI bleeding risks.'
  },
  {
    questionId: 'q_liq_5',
    topicId: 'liquid_calculations',
    title: 'Furosemide Acute Diuresis',
    scenario: 'Order: Furosemide 30 mg IV Push stat for pulmonary congestion. Available: 40 mg in 4 mL vial (10 mg/mL). Calculate volume in mL.',
    correctAnswer: 3.0,
    unit: 'mL',
    steps: [
      'Stock concentration: 40 mg ÷ 4 mL = 10 mg/mL',
      'Formula: 30 mg ÷ 10 mg/mL = 3.0 mL',
      'Push rate: Administer slowly at max rate of 20 mg/min (push over 2 minutes) to prevent ototoxicity.'
    ],
    keyPoint: 'Rapid IV push furosemide can cause transient or permanent tinnitus and hearing loss.'
  },
  {
    questionId: 'q_liq_6',
    topicId: 'liquid_calculations',
    title: 'Haloperidol IM Agitation Dose',
    scenario: 'Order: Haloperidol 5 mg IM for acute delirium. Available: 10 mg in 2 mL vial. How many mL should the nurse draw up?',
    correctAnswer: 1.0,
    unit: 'mL',
    steps: [
      'Stock concentration: 10 mg ÷ 2 mL = 5 mg/mL',
      'Formula: 5 mg ÷ 5 mg/mL = 1.0 mL'
    ],
    keyPoint: 'Monitor QT interval and baseline ECG on patients receiving parenteral haloperidol.'
  },
  {
    questionId: 'q_liq_7',
    topicId: 'liquid_calculations',
    title: 'Enoxaparin DVT Prophylaxis',
    scenario: 'Order: Enoxaparin 40 mg SubQ daily. Available: 80 mg in 0.8 mL prefilled syringe (100 mg/mL). Calculate volume in mL.',
    correctAnswer: 0.4,
    unit: 'mL',
    steps: [
      'Formula: 40 mg ÷ 100 mg/mL = 0.4 mL',
      'Inject subcutaneous in the abdomen, at least 2 inches away from umbilicus.'
    ],
    keyPoint: 'Do not expel the air bubble from prefilled enoxaparin syringes before injection.'
  },

  // 2. ORAL & TABLET CALCULATIONS
  {
    questionId: 'q_tab_1',
    topicId: 'tablet_calculations',
    title: 'Metoprolol Tartrate Twice Daily',
    scenario: 'Order: Metoprolol Tartrate 25 mg PO twice daily. Available: 50 mg scored tablets. How many tablets should be administered per dose?',
    correctAnswer: 0.5,
    unit: 'tablets',
    steps: [
      'Formula: Tablets = Desired ÷ Have = 25 mg ÷ 50 mg',
      'Calculation: 25 ÷ 50 = 0.5 tablets (half tablet)',
      'Safety Check: Confirm tablet is engineered with a manufacturer score mark.'
    ],
    keyPoint: 'Never crush or split enteric-coated or extended-release (ER/XL) formulations.'
  },
  {
    questionId: 'q_tab_2',
    topicId: 'tablet_calculations',
    title: 'Digoxin Cardiac Glycoside',
    scenario: 'Order: Digoxin 0.125 mg PO daily. Available: 0.25 mg scored tablets. How many tablets should the nurse administer?',
    correctAnswer: 0.5,
    unit: 'tablets',
    steps: [
      'Formula: 0.125 mg ÷ 0.25 mg = 0.5 tablets',
      'Assess apical pulse for a full 60 seconds. Hold dose if HR < 60 bpm in adults.'
    ],
    keyPoint: 'Therapeutic serum digoxin range is narrow (0.5 - 2.0 ng/mL).'
  },
  {
    questionId: 'q_tab_3',
    topicId: 'tablet_calculations',
    title: 'Ciprofloxacin Oral Antibiotic',
    scenario: 'Order: Ciprofloxacin 500 mg PO every 12 hours. Available: 250 mg tablets. Calculate number of tablets.',
    correctAnswer: 2.0,
    unit: 'tablets',
    steps: [
      'Formula: 500 mg ÷ 250 mg = 2 tablets',
      'Ceiling check: 2 tablets is within standard clinical range (≤4 tablets).'
    ],
    keyPoint: 'Do not administer fluoroquinolones concurrently with calcium or iron supplements.'
  },
  {
    questionId: 'q_tab_4',
    topicId: 'tablet_calculations',
    title: 'Furosemide Oral Diuretic',
    scenario: 'Order: Furosemide 80 mg PO once every morning. Available: 40 mg scored tablets. How many tablets should the nurse give?',
    correctAnswer: 2.0,
    unit: 'tablets',
    steps: [
      'Formula: 80 mg ÷ 40 mg = 2 tablets',
      'Schedule morning dose to prevent nighttime nocturia and sleep disruption.'
    ],
    keyPoint: 'Monitor serum potassium levels before administering loop diuretics.'
  },
  {
    questionId: 'q_tab_5',
    topicId: 'tablet_calculations',
    title: 'Amlodipine Hypertension Dose',
    scenario: 'Order: Amlodipine 10 mg PO daily. Available: 5 mg tablets. Calculate the number of tablets to administer.',
    correctAnswer: 2.0,
    unit: 'tablets',
    steps: [
      'Formula: 10 mg ÷ 5 mg = 2 tablets'
    ],
    keyPoint: 'Calcium channel blockers: monitor for peripheral edema and orthostatic hypotension.'
  },
  {
    questionId: 'q_tab_6',
    topicId: 'tablet_calculations',
    title: 'Metformin Type 2 Diabetes',
    scenario: 'Order: Metformin 1,000 mg PO twice daily with meals. Available: 500 mg tablets. How many tablets per dose?',
    correctAnswer: 2.0,
    unit: 'tablets',
    steps: [
      'Formula: 1,000 mg ÷ 500 mg = 2 tablets'
    ],
    keyPoint: 'Hold metformin 48 hours before and after IV iodinated radiocontrast procedures.'
  },
  {
    questionId: 'q_tab_7',
    topicId: 'tablet_calculations',
    title: 'Amoxicillin Oral Suspension',
    scenario: 'Order: Amoxicillin 500 mg PO q8h. Available: 125 mg/5 mL oral suspension. Calculate the volume in mL to administer.',
    correctAnswer: 20.0,
    unit: 'mL',
    steps: [
      'Formula: (Desired ÷ Have) × Vehicle = (500 mg ÷ 125 mg) × 5 mL',
      'Calculation: 4 × 5 mL = 20 mL'
    ],
    keyPoint: 'Always provide a calibrated metric oral dispenser; avoid household kitchen spoons.'
  },

  // 3. IV FLOW MATHEMATICS & SMART PUMP INFUSIONS
  {
    questionId: 'q_iv_1',
    topicId: 'iv_flow_mathematics',
    title: 'Normal Saline Electronic Infusion Pump',
    scenario: 'Order: 1,000 mL 0.9% Normal Saline over 16 hours via electronic infusion pump. Calculate the pump rate in mL/hr.',
    correctAnswer: 62.5,
    unit: 'mL/hr',
    steps: [
      'Formula: Rate (mL/hr) = Total Volume (mL) ÷ Time (hr)',
      'Calculation: 1,000 mL ÷ 16 hr = 62.5 mL/hr',
      'Safety: Maintain 62.5 mL/hr decimal on electronic infusion pump. Do not round to integer.'
    ],
    keyPoint: 'Electronic pumps support decimal rates (62.5 mL/hr), unlike gravity drips.'
  },
  {
    questionId: 'q_iv_2',
    topicId: 'iv_flow_mathematics',
    title: 'Lactated Ringer 8-Hour Hydration Pump',
    scenario: 'Order: 1,000 mL Lactated Ringer IV over 8 hours. Calculate the electronic pump rate in mL/hr.',
    correctAnswer: 125.0,
    unit: 'mL/hr',
    steps: [
      'Formula: 1,000 mL ÷ 8 hr = 125 mL/hr'
    ],
    keyPoint: 'Smart pump programming requires setting both Rate (125 mL/hr) and VTBI (1,000 mL).'
  },
  {
    questionId: 'q_iv_3',
    topicId: 'iv_flow_mathematics',
    title: 'Gravity Drip Infusion Rate',
    scenario: 'Order: 1,000 mL 0.9% Normal Saline over 8 hours using gravity IV tubing with a drop factor of 15 gtt/mL. Calculate rate in gtt/min.',
    correctAnswer: 31.0,
    unit: 'gtt/min',
    steps: [
      'Time in minutes: 8 hr × 60 min = 480 min',
      'Formula: (1,000 mL × 15 gtt/mL) ÷ 480 min = 15,000 ÷ 480 = 31.25 gtt/min',
      'Rounding rule: Gravity drips cannot deliver fractional drops. Round to nearest whole integer: 31 gtt/min.'
    ],
    keyPoint: 'Manual gravity drips must always be whole integers (gtt/min).'
  },
  {
    questionId: 'q_iv_4',
    topicId: 'iv_flow_mathematics',
    title: 'Vancomycin Intermittent IV Piggyback',
    scenario: 'Order: Vancomycin 1 g in 200 mL D5W over 90 minutes. Set the volumetric electronic infusion pump rate in mL/hr.',
    correctAnswer: 133.3,
    unit: 'mL/hr',
    steps: [
      'Convert 90 minutes to hours: 90 ÷ 60 = 1.5 hr',
      'Formula: 200 mL ÷ 1.5 hr = 133.33 mL/hr (round to 133.3 mL/hr)'
    ],
    keyPoint: 'Infuse vancomycin slowly over at least 60-90 minutes to prevent Red Man Syndrome.'
  },
  {
    questionId: 'q_iv_5',
    topicId: 'iv_flow_mathematics',
    title: 'Pediatric Microdrip Gravity Infusion',
    scenario: 'Order: 100 mL D5 0.45% NS over 2 hours via pediatric microdrip tubing (60 gtt/mL). Calculate drip rate in gtt/min.',
    correctAnswer: 50.0,
    unit: 'gtt/min',
    steps: [
      'Minutes: 2 hr × 60 = 120 min',
      'Formula: (100 mL × 60 gtt/mL) ÷ 120 min = 6,000 ÷ 120 = 50 gtt/min',
      'Microdrip shortcut: With 60 gtt/mL tubing, mL/hr = gtt/min (100 mL ÷ 2 hr = 50 mL/hr = 50 gtt/min).'
    ],
    keyPoint: 'Microdrip tubing drop factor is always 60 gtt/mL.'
  },
  {
    questionId: 'q_iv_6',
    topicId: 'iv_flow_mathematics',
    title: 'Packed Red Blood Cells (PRBC) Transfusion',
    scenario: 'Order: 300 mL Packed Red Blood Cells (PRBC) over 3 hours. Set electronic blood infusion pump in mL/hr.',
    correctAnswer: 100.0,
    unit: 'mL/hr',
    steps: [
      'Formula: 300 mL ÷ 3 hr = 100 mL/hr',
      'Run first 15 minutes slowly (e.g. 25-50 mL/hr) and monitor vital signs closely for acute transfusion reactions.'
    ],
    keyPoint: 'PRBC must finish infusing within 4 hours of leaving the blood bank refrigerator.'
  },

  // 4. CLINICAL UNIT CONVERSIONS & ICU TITRATIONS
  {
    questionId: 'q_uc_1',
    topicId: 'unit_conversions',
    title: 'Micrograms to Milligrams Conversion',
    scenario: 'Order: Levothyroxine 125 mcg PO daily. Available in pharmacy system in milligrams (mg). Convert 125 mcg to mg.',
    correctAnswer: 0.125,
    unit: 'mg',
    steps: [
      'Divide by 1,000 (move decimal 3 places to the left): 125 ÷ 1,000 = 0.125 mg',
      'ISMP Rule: Lead with zero (0.125 mg).'
    ],
    keyPoint: '1 mg = 1,000 mcg. Small unit to large unit = divide by 1,000.'
  },
  {
    questionId: 'q_uc_2',
    topicId: 'unit_conversions',
    title: 'Grams to Milligrams Conversion',
    scenario: 'Order: Cefazolin 0.5 g IV push. Vial is labeled in mg. Convert 0.5 g to mg.',
    correctAnswer: 500.0,
    unit: 'mg',
    steps: [
      'Multiply by 1,000: 0.5 g × 1,000 = 500 mg'
    ],
    keyPoint: '1 g = 1,000 mg. Large unit to small unit = multiply by 1,000.'
  },
  {
    questionId: 'q_uc_3',
    topicId: 'unit_conversions',
    title: 'Pounds to Kilograms Adult Conversion',
    scenario: 'An adult patient weighs 176 lbs on triage intake scale. Calculate weight in kilograms (kg).',
    correctAnswer: 80.0,
    unit: 'kg',
    steps: [
      'Conversion constant: 1 kg = 2.2 lbs',
      'Calculation: 176 lbs ÷ 2.2 = 80 kg'
    ],
    keyPoint: 'All weight-based medications must be calculated in kg, never lbs.'
  },
  {
    questionId: 'q_uc_4',
    topicId: 'unit_conversions',
    title: 'Liquid Metric Conversion (mL to L)',
    scenario: 'A patient drinks 1,500 mL of oral hydration fluid during a shift. Record intake in Liters (L).',
    correctAnswer: 1.5,
    unit: 'L',
    steps: [
      '1,500 mL ÷ 1,000 = 1.5 L'
    ],
    keyPoint: '1 Liter = 1,000 mL.'
  },
  {
    questionId: 'q_uc_5',
    topicId: 'unit_conversions',
    title: 'Dopamine ICU Inotropic Titration',
    scenario: 'Order: Dopamine 5 mcg/kg/min for 70 kg patient. Bag contains 400 mg Dopamine in 250 mL D5W (1,600 mcg/mL). Calculate pump rate in mL/hr.',
    correctAnswer: 13.13,
    unit: 'mL/hr',
    steps: [
      '1. Calculate hourly mcg: 5 mcg/kg/min × 70 kg × 60 min/hr = 21,000 mcg/hr',
      '2. Calculate bag concentration: 400,000 mcg ÷ 250 mL = 1,600 mcg/mL',
      '3. Calculate pump rate: 21,000 mcg/hr ÷ 1,600 mcg/mL = 13.125 mL/hr (round to 13.13 mL/hr)'
    ],
    keyPoint: 'High-alert ICU inotropic infusions require independent dual-nurse verification.'
  },
  {
    questionId: 'q_uc_6',
    topicId: 'unit_conversions',
    title: 'Norepinephrine Septic Shock Titration',
    scenario: 'Order: Norepinephrine 0.05 mcg/kg/min for 80 kg septic shock patient. Bag: 4 mg in 250 mL D5W (16 mcg/mL). Calculate pump mL/hr.',
    correctAnswer: 15.0,
    unit: 'mL/hr',
    steps: [
      '1. Hourly mcg: 0.05 × 80 kg × 60 min = 240 mcg/hr',
      '2. Bag concentration: 4,000 mcg ÷ 250 mL = 16 mcg/mL',
      '3. Rate: 240 mcg/hr ÷ 16 mcg/mL = 15.0 mL/hr'
    ],
    keyPoint: 'Titrate to maintain Mean Arterial Pressure (MAP) ≥ 65 mmHg.'
  },

  // 5. WEIGHT-BASED PEDIATRIC & ADULT CALCULATIONS
  {
    questionId: 'q_wt_1',
    topicId: 'med_math_basics',
    title: 'Pediatric Cefuroxime Weight Dose',
    scenario: 'A child weighing 20 kg is prescribed Cefuroxime 15 mg/kg for a single dose. How many mg should the nurse administer?',
    correctAnswer: 300.0,
    unit: 'mg',
    steps: [
      'Formula: Dose (mg) = Dose Rate (mg/kg) × Weight (kg)',
      'Calculation: 15 mg/kg × 20 kg = 300 mg'
    ],
    keyPoint: 'Always verify weight against growth chart before administering pediatric doses.'
  },
  {
    questionId: 'q_wt_2',
    topicId: 'med_math_basics',
    title: 'Pediatric Amoxicillin Suspension',
    scenario: 'Order: Amoxicillin 25 mg/kg/day divided into 2 equal doses for a child weighing 44 lbs. Stock: 250 mg/5 mL. How many mL per dose?',
    correctAnswer: 5.0,
    unit: 'mL',
    steps: [
      '1. Convert lbs to kg: 44 lbs ÷ 2.2 = 20 kg',
      '2. Total daily dose: 25 mg/kg × 20 kg = 500 mg/day',
      '3. Dose per administration: 500 mg ÷ 2 = 250 mg',
      '4. Volume: (250 mg ÷ 250 mg) × 5 mL = 5.0 mL'
    ],
    keyPoint: 'Double-check if order is "per day" or "per dose" before calculating.'
  },
  {
    questionId: 'q_wt_3',
    topicId: 'med_math_basics',
    title: 'Pediatric Acetaminophen Antipyretic',
    scenario: 'Order: Acetaminophen 15 mg/kg for a child weighing 12 kg with fever. Available: 160 mg/5 mL liquid. Calculate volume in mL.',
    correctAnswer: 5.6,
    unit: 'mL',
    steps: [
      '1. Desired dose: 15 mg/kg × 12 kg = 180 mg',
      '2. Volume: (180 mg ÷ 160 mg) × 5 mL = 5.625 mL (round to 5.6 mL)'
    ],
    keyPoint: 'Do not exceed 5 doses (or 75 mg/kg) in a 24-hour period to avoid hepatotoxicity.'
  },

  // 6. RECONSTITUTION EXERCISES
  {
    questionId: 'q_rec_1',
    topicId: 'reconstitution',
    title: 'Ampicillin IM Reconstitution',
    scenario: 'Vial contains 1 g Ampicillin powder. Label directions: Add 3.5 mL sterile water to yield a concentration of 250 mg/mL. Order: 500 mg IM. Calculate volume in mL.',
    correctAnswer: 2.0,
    unit: 'mL',
    steps: [
      'Concentration post-reconstitution: 250 mg/mL',
      'Formula: 500 mg ÷ 250 mg/mL = 2.0 mL'
    ],
    keyPoint: 'Calculate using the resulting concentration (250 mg/mL), not the added diluent volume.'
  },
  {
    questionId: 'q_rec_2',
    topicId: 'reconstitution',
    title: 'Ceftriaxone Deep IM Reconstitution',
    scenario: 'Vial contains 500 mg Ceftriaxone powder. Add 1.8 mL 1% Lidocaine diluent to yield 250 mg/mL. Order: 250 mg IM for gonorrhea. How many mL to inject?',
    correctAnswer: 1.0,
    unit: 'mL',
    steps: [
      'Formula: 250 mg ÷ 250 mg/mL = 1.0 mL'
    ],
    keyPoint: 'Reconstituting with 1% Lidocaine reduces injection pain during deep IM administration.'
  }
];
