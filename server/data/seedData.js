/**
 * NurseCalc Canonical Educational Curriculum Data
 * 5 Topics, 15 Lessons with worked educational scenarios, and 100+ Reviewed Questions
 */

const topicsData = [
  {
    topicId: 'med_math_basics',
    title: '1. Medication Math Basics',
    description: 'Foundations of clinical numeracy, ratio-proportion, dimensional analysis, and ISMP decimal rules.',
    order: 1,
    lessonCount: 3
  },
  {
    topicId: 'unit_conversions',
    title: '2. Clinical Unit Conversions',
    description: 'Metric-to-metric conversions (mcg, mg, g, kg, mL, L) and exact imperial pound conversions.',
    order: 2,
    lessonCount: 3
  },
  {
    topicId: 'tablet_calculations',
    title: '3. Oral & Tablet Calculations',
    description: 'Desired over Have formula (D/H × V), scored tablet split safety, and 4-tablet ceiling rules.',
    order: 3,
    lessonCount: 3
  },
  {
    topicId: 'liquid_calculations',
    title: '4. Liquid Injections & Syringes',
    description: 'Parenteral liquid injection volumes, reconstitution concentration, and visual syringe barrel calibrations.',
    order: 4,
    lessonCount: 3
  },
  {
    topicId: 'iv_flow_mathematics',
    title: '5. IV Flow & Infusion Mathematics',
    description: 'Gravity drip rates (gtt/min), volumetric electronic infusion pumps (mL/hr), and ICU titrations.',
    order: 5,
    lessonCount: 3
  }
];

const lessonsData = [
  // Topic 1
  {
    lessonId: 'les_mmb_1',
    topicId: 'med_math_basics',
    title: 'ISMP Leading & Trailing Zero Safety Rules',
    summary: 'Preventing 10-fold and 100-fold medication overdose through strict decimal syntax standards.',
    clinicalKey: 'Always lead with zero (0.5 mg, never .5 mg). Never end with zero (5 mg, never 5.0 mg).',
    workedExample: {
      scenario: 'A physician prescribes 0.5 mg of clonazepam. If written as .5 mg, a nurse could misread as 5 mg (10-fold overdose).',
      formula: 'Decimal Safety Check',
      calculation: 'Leading zero enforced: 0.5 mg. Trailing zero stripped: 5 mg.',
      result: '0.5 mg (Compliant)',
      ismpRationale: 'The Joint Commission and ISMP officially place naked decimals and trailing zeros on the "Do Not Use" list.'
    },
    content: [
      'Naked decimal points (such as .4 mL) are easily overlooked, leading to catastrophic 10x overdoses.',
      'Trailing zeros (such as 4.0 mL) can have the decimal point obscured by folds or poor printing, reading as 40 mL.',
      'Always double-check calculation outputs before recording in the MAR.'
    ],
    order: 1
  },
  {
    lessonId: 'les_mmb_2',
    topicId: 'med_math_basics',
    title: 'Dimensional Analysis in Nursing Practice',
    summary: 'Using conversion factors and unit cancellation to solve complex clinical problems in a single line.',
    clinicalKey: 'Set up given units on the denominator to cancel out opposing units until desired unit remains.',
    workedExample: {
      scenario: 'Order: 1,500 mg ampicillin. Stock available: 500 mg / 2 mL solution.',
      formula: 'Dose = 1,500 mg × (2 mL / 500 mg)',
      calculation: '(1,500 ÷ 500) × 2 mL = 3 × 2 mL = 6 mL',
      result: '6 mL',
      ismpRationale: 'Dimensional analysis reduces intermediate rounding errors by maintaining exact fractions until the final step.'
    },
    content: [
      'Identify what unit is needed in the final answer (e.g., mL).',
      'Start the equation with the equivalent containing that unit in the numerator.',
      'Multiply by successive conversion factors until only the desired unit remains.'
    ],
    order: 2
  },
  {
    lessonId: 'les_mmb_3',
    topicId: 'med_math_basics',
    title: 'Independent Double-Check Protocols',
    summary: 'The critical role of two independent licensed clinicians in verifying high-alert calculations.',
    clinicalKey: 'High-alert meds (Insulin, Heparin, Chemotherapy, Opioids) require independent recalculation without seeing the first result.',
    workedExample: {
      scenario: 'Nurse A prepares an IV Heparin infusion. Nurse B recalculates from scratch using raw orders and bag concentration.',
      formula: 'Independent Recalculation',
      calculation: 'Nurse A gets 18 mL/hr. Nurse B independently verifies: (1000 units/hr ÷ 50 units/mL) = 20 mL/hr. Discrepancy caught prior to connection.',
      result: 'Discrepancy caught prior to administration',
      ismpRationale: 'Confirmation bias occurs when a nurse looks at a pre-filled calculation rather than starting from raw clinical data.'
    },
    content: [
      'Independent double checks catch up to 95% of math errors.',
      'Never show your math or pump screen to the verifying nurse prior to their calculation.',
      'Verify patient identity, drug vial, concentration, and pump programming simultaneously.'
    ],
    order: 3
  },

  // Topic 2
  {
    lessonId: 'les_uc_1',
    topicId: 'unit_conversions',
    title: 'Metric Mass Conversions: Micrograms to Grams',
    summary: 'Seamless shifting across orders of magnitude: 1 g = 1,000 mg = 1,000,000 mcg.',
    clinicalKey: 'To convert mcg to mg, divide by 1,000 (shift decimal 3 places left).',
    workedExample: {
      scenario: 'Physician prescribes Levothyroxine 125 mcg. Stock available is 0.05 mg tablets.',
      formula: '125 mcg ÷ 1,000 = 0.125 mg. Tablets = 0.125 mg ÷ 0.05 mg',
      calculation: '0.125 ÷ 0.05 = 2.5 tablets',
      result: '2.5 tablets',
      ismpRationale: 'Always convert both values to the same unit of measure before attempting division.'
    },
    content: [
      'Always align units: convert the physician order to match the stock label.',
      'Never divide milligrams by micrograms without converting.',
      'Ensure standard abbreviations (mcg for microgram, not the outdated Greek letter µg).'
    ],
    order: 1
  },
  {
    lessonId: 'les_uc_2',
    topicId: 'unit_conversions',
    title: 'Exact Imperial Weight Normalization (lbs to kg)',
    summary: 'Weight-based pharmacology requires accurate metric patient weights.',
    clinicalKey: 'Divide lbs by 2.2 or multiply by 0.45359237. Round to nearest tenth or hundredth depending on protocol.',
    workedExample: {
      scenario: 'Pediatric patient weighs 44 lbs. Order requires dosing in mg/kg.',
      formula: '44 lbs × 0.45359237 = 19.958 kg (≈ 20 kg)',
      calculation: '44 ÷ 2.2 = 20 kg',
      result: '20 kg',
      ismpRationale: 'In neonatal and pediatric care, weight errors directly scale toxicity or subtherapeutic underdosing.'
    },
    content: [
      'In emergency triage, 2.2 is acceptable; in clinical trials or high-potency chemotherapy, exact conversion constants apply.',
      'Always verify whether the scale is set to pounds or kilograms before recording baseline intake.',
      'Watch for physiological boundary outliers (<0.3 kg or >400 kg).'
    ],
    order: 2
  },
  {
    lessonId: 'les_uc_3',
    topicId: 'unit_conversions',
    title: 'Liquid Volume Conversions: Household to Metric',
    summary: 'Translating teaspoons, tablespoons, ounces, and milliliters for patient discharge instructions.',
    clinicalKey: '1 tsp = 5 mL | 1 tbsp = 15 mL | 1 fl oz = 30 mL | 1 cup = 240 mL.',
    workedExample: {
      scenario: 'Patient is discharged with instructions to take 10 mL of cough syrup at home. How many teaspoons should they take?',
      formula: '10 mL ÷ (5 mL / 1 tsp)',
      calculation: '10 ÷ 5 = 2 tsp',
      result: '2 teaspoons',
      ismpRationale: 'Always provide calibrated oral syringes rather than household kitchen spoons, which vary by up to 100% in volume.'
    },
    content: [
      'Never recommend household kitchen spoons for pediatric liquid dosing.',
      'Clearly demarcate measuring syringes in metric milliliters.',
      'Teach parents the danger of confusing teaspoons (5 mL) with tablespoons (15 mL).'
    ],
    order: 3
  },

  // Topic 3
  {
    lessonId: 'les_tab_1',
    topicId: 'tablet_calculations',
    title: 'The Desired Over Have (D/H × V) Formula',
    summary: 'The universal foundational calculation for solid oral medications and oral solutions.',
    clinicalKey: 'Dose = (Desired Dose ÷ Stock on Hand) × Vehicle Quantity.',
    workedExample: {
      scenario: 'Order: Furosemide 80 mg PO. Available: Furosemide 40 mg scored tablets.',
      formula: 'Tabs = (D ÷ H) × V = (80 mg ÷ 40 mg) × 1 tablet',
      calculation: '80 ÷ 40 = 2 tablets',
      result: '2 tablets',
      ismpRationale: 'A standard dose should rarely exceed 3-4 tablets. Any calculation resulting in >4 tablets indicates a likely order or math error.'
    },
    content: [
      'Ensure Desired (D) and Have (H) are in the identical unit of measurement.',
      'Multiply by the Vehicle (V), usually 1 tablet or capsule.',
      'Never crush enteric-coated or sustained-release (ER/XR) oral tablets.'
    ],
    order: 1
  },
  {
    lessonId: 'les_tab_2',
    topicId: 'tablet_calculations',
    title: 'Scored Tablet Safety and Half-Tablet Rules',
    summary: 'Guidelines for safely administering partial tablets and identifying non-scorable formulations.',
    clinicalKey: 'Only tablets with an engineered manufacturer score line may be split.',
    workedExample: {
      scenario: 'Order: Metoprolol Tartrate 12.5 mg PO. Available: Metoprolol 25 mg scored tablets.',
      formula: 'Tabs = 12.5 ÷ 25 = 0.5 tablets',
      calculation: 'Half of one scored 25 mg tablet.',
      result: '0.5 tablet',
      ismpRationale: 'Splitting unscored tablets leads to unpredictable active ingredient distribution across fragments.'
    },
    content: [
      'Unscored tablets should never be cut in half.',
      'Capsules and gel-caps can never be split.',
      'Use an approved clean pill-splitter device to prevent fragment loss.'
    ],
    order: 2
  },
  {
    lessonId: 'les_tab_3',
    topicId: 'tablet_calculations',
    title: 'Clinical Ceiling Checks (4-Tablet Maximum Rule)',
    summary: 'Using instinctive clinical sanity checks to catch catastrophic dosing calculation slips.',
    clinicalKey: 'If your math yields more than 3-4 tablets for a single dose, STOP and verify.',
    workedExample: {
      scenario: 'A student calculates 20 tablets of Atenolol for a single morning dose due to a decimal error.',
      formula: 'Ceiling Verification Guardrail',
      calculation: 'Calculated 20 tablets > 4-tablet ceiling. Re-evaluated: order was 25 mg, stock was 50 mg. Actual dose = 0.5 tablet.',
      result: '0.5 tablet (Catastrophe prevented)',
      ismpRationale: 'Clinical instincts prevent real-world patient fatalities when mechanical math slips occur.'
    },
    content: [
      'Always pause when holding a handful of pills for one patient.',
      'Review whether the unit ordered was grams instead of milligrams.',
      'Call the hospital pharmacy when in doubt.'
    ],
    order: 3
  },

  // Topic 4
  {
    lessonId: 'les_liq_1',
    topicId: 'liquid_calculations',
    title: 'Parenteral Liquid Injection Math',
    summary: 'Calculating exact injectable liquid doses for intramuscular (IM) and subcutaneous (SC) routes.',
    clinicalKey: 'Volume (mL) = (Dose Ordered in mg ÷ Concentration in mg) × Vehicle Volume in mL.',
    workedExample: {
      scenario: 'Order: Morphine Sulfate 4 mg IM. Stock: Morphine 10 mg/mL vial.',
      formula: 'Vol = (4 mg ÷ 10 mg) × 1 mL',
      calculation: '4 ÷ 10 = 0.4 mL',
      result: '0.4 mL',
      ismpRationale: 'Always record as 0.4 mL, never .4 mL.'
    },
    content: [
      'Double check route: IM, SC, or IV Push.',
      'Check standard injection site volume limits: max 3.0 mL in large adult gluteal muscle; max 1.0 mL in deltoid or SC.',
      'Inspect liquid vial for clarity, color, and precipitates before drawing.'
    ],
    order: 1
  },
  {
    lessonId: 'les_liq_2',
    topicId: 'liquid_calculations',
    title: 'Syringe Selection and Calibration Reading',
    summary: 'Selecting between 1 mL tuberculin syringes, 3 mL standard syringes, and insulin syringes.',
    clinicalKey: 'For volumes < 1.0 mL, use a 1 mL tuberculin syringe calibrated to hundredths (0.01 mL).',
    workedExample: {
      scenario: 'Calculating 0.38 mL of pediatric digoxin. A 3 mL syringe is calibrated in 0.1 mL intervals.',
      formula: 'Syringe Calibration Match',
      calculation: 'Select 1 mL tuberculin syringe. Draw until front ring of rubber stopper rests at 0.38 mL mark.',
      result: '1 mL Syringe (Calibrated in 0.01 increments)',
      ismpRationale: 'Using a 3 mL syringe for doses under 1 mL forces visual estimation and introduces dangerous dosing variance.'
    },
    content: [
      'The front edge of the black rubber plunger head determines the volume, not the cone or middle.',
      'Insulin must only be measured in dedicated U-100 insulin syringes (units, never mL).',
      'Discard air bubbles which artificially distort drawn medication volume.'
    ],
    order: 2
  },
  {
    lessonId: 'les_liq_3',
    topicId: 'liquid_calculations',
    title: 'Powder Reconstitution Mathematics',
    summary: 'Reconstituting lyophilized powder vials with diluent to achieve exact target concentration.',
    clinicalKey: 'Resulting concentration = Total Drug (mg) ÷ Final Volume with powder displacement (mL).',
    workedExample: {
      scenario: 'Vial of Ceftriaxone 1 g powder. Add 3.6 mL sterile water for injection to produce a final concentration of 250 mg/mL.',
      formula: 'Dose Volume = Order ÷ Final Concentration',
      calculation: 'Order is 500 mg. Vol = 500 mg ÷ 250 mg/mL = 2.0 mL',
      result: '2.0 mL',
      ismpRationale: 'Powder displacement volume expands the liquid beyond the added diluent volume; always consult the manufacturer vial insert.'
    },
    content: [
      'Read vial label carefully for specific diluent: Sterile Water vs. Normal Saline vs. 1% Lidocaine.',
      'Clearly label the reconstituted vial with Date, Time, Concentration, and Nurse Initials.',
      'Store in refrigerator if required by stability guidelines.'
    ],
    order: 3
  },

  // Topic 5
  {
    lessonId: 'les_iv_1',
    topicId: 'iv_flow_mathematics',
    title: 'IV Gravity Drip Rate Calculations (gtt/min)',
    summary: 'Calculating manual gravity infusion drip rates using drop factors (10, 15, 20, or 60 gtt/mL).',
    clinicalKey: 'Drip Rate (gtt/min) = (Total Volume in mL × Drop Factor in gtt/mL) ÷ Total Minutes.',
    workedExample: {
      scenario: 'Order: 1,000 mL Lactated Ringer over 8 hours. Tubing drop factor: 15 gtt/mL.',
      formula: 'gtt/min = (1,000 mL × 15 gtt/mL) ÷ (8 hr × 60 min)',
      calculation: '15,000 ÷ 480 min = 31.25 gtt/min',
      result: '31 gtt/min (Whole drops)',
      ismpRationale: 'Gravity drips cannot administer fractional drops. Round mathematically to the nearest whole integer.'
    },
    content: [
      'Convert all infusion times to minutes (hours × 60).',
      'Microdrip tubing always has a drop factor of 60 gtt/mL (where mL/hr = gtt/min).',
      'Count drops with a watch for a full 60 seconds when establishing or adjusting rate.'
    ],
    order: 1
  },
  {
    lessonId: 'les_iv_2',
    topicId: 'iv_flow_mathematics',
    title: 'Electronic Infusion Pump Flow Rate (mL/hr)',
    summary: 'Programming volumetric smart pumps for continuous and intermittent infusions.',
    clinicalKey: 'Rate (mL/hr) = Total Volume to Infuse in mL ÷ Infusion Time in Hours.',
    workedExample: {
      scenario: 'Order: Vancomycin 1,000 mg in 200 mL D5W over 90 minutes. Set pump rate.',
      formula: 'Time in hours = 90 min ÷ 60 = 1.5 hr. Rate = 200 mL ÷ 1.5 hr',
      calculation: '200 ÷ 1.5 = 133.33 mL/hr',
      result: '133.3 mL/hr (or 133 mL/hr depending on pump capability)',
      ismpRationale: 'Smart pumps with dose error reduction systems (DERS) provide hard and soft dosing safety stops.'
    },
    content: [
      'Always convert partial hours into decimals (e.g., 30 min = 0.5 hr; 45 min = 0.75 hr).',
      'Standard volumetric infusion pumps have a maximum ceiling of 999 mL/hr.',
      'Check secondary line backcheck valve alignment for piggyback infusions.'
    ],
    order: 2
  },
  {
    lessonId: 'les_iv_3',
    topicId: 'iv_flow_mathematics',
    title: 'High-Alert ICU Vasoactive Titrations (mcg/kg/min)',
    summary: 'Calculating high-risk inotropic and vasopressor infusions (Dopamine, Dobutamine, Norepinephrine).',
    clinicalKey: 'mL/hr = (Prescribed mcg/kg/min × Patient kg × 60 min/hr) ÷ Bag Concentration (mcg/mL).',
    workedExample: {
      scenario: 'Order: Dopamine 5 mcg/kg/min for a 70 kg patient. Bag: 400 mg Dopamine in 250 mL D5W.',
      formula: 'Conc = (400 mg × 1,000) ÷ 250 mL = 1,600 mcg/mL. Desired = 5 × 70 × 60 = 21,000 mcg/hr. Rate = 21,000 ÷ 1,600',
      calculation: '21,000 ÷ 1,600 = 13.125 mL/hr',
      result: '13.13 mL/hr',
      ismpRationale: 'Vasoactive medications have narrow therapeutic windows; calculate pump rates to two decimal places.'
    },
    content: [
      'Calculate bag concentration in mcg/mL first.',
      'Calculate hourly microgram requirements (dose × weight in kg × 60).',
      'Divide hourly micrograms by bag concentration to yield pump mL/hr.'
    ],
    order: 3
  }
];

// Helper to generate 100+ high quality educational questions across the 5 topics
const generate100Questions = () => {
  const qList = [];
  let idCounter = 1;

  // 1. Liquid Injection Questions (25 Questions)
  const injectionCases = [
    { d: 80, h: 200, v: 1, drug: "Gentamicin", unit: "mL" },
    { d: 50, h: 100, v: 1, drug: "Meperidine", unit: "mL" },
    { d: 4, h: 10, v: 1, drug: "Morphine", unit: "mL" },
    { d: 25, h: 50, v: 1, drug: "Diphenhydramine", unit: "mL" },
    { d: 0.25, h: 0.5, v: 2, drug: "Digoxin", unit: "mL" },
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
    { d: 0.5, h: 1, v: 1, drug: "Atropine", unit: "mL" },
    { d: 1, h: 2, v: 1, drug: "Hydromorphone", unit: "mL" },
    { d: 40, h: 80, v: 1, drug: "Enoxaparin", unit: "mL" },
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
      questionId: `q_${idCounter++}`,
      topicId: 'liquid_calculations',
      difficulty: 'medium',
      title: `${item.drug} Liquid Injection Dose`,
      prompt: `Order: ${item.drug} ${item.d} mg IM. Available: ${item.h} mg in ${item.v} mL vial. How many mL should the nurse draw into the syringe?`,
      correctAnswer: ans,
      tolerance: 0.05,
      questionType: 'injection',
      unit: item.unit,
      inputLabel: "Enter Volume (mL):",
      steps: [
        `Formula: (Desired ÷ Have) × Vehicle Volume`,
        `Calculation: (${item.d} mg ÷ ${item.h} mg) × ${item.v} mL = ${ans} mL`,
        `ISMP Safety: Verify leading zero (${ans} mL, never trailing zero).`
      ],
      clinicalPearls: `Select 1 mL tuberculin syringe if dose is <1 mL for maximum precision.`
    });
  });

  // 2. Oral Solid & Liquid Calculations (25 Questions)
  const oralCases = [
    { d: 250, h: 125, v: 1, drug: "Digoxin", unit: "tablets" },
    { d: 500, h: 250, v: 1, drug: "Ciprofloxacin", unit: "tablets" },
    { d: 20, h: 10, v: 1, drug: "Lisinopril", unit: "tablets" },
    { d: 80, h: 40, v: 1, drug: "Furosemide", unit: "tablets" },
    { d: 12.5, h: 25, v: 1, drug: "Metoprolol", unit: "tablets" },
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
    { d: 60, h: 30, v: 1, drug: "Codeine", unit: "tablets" },
    { d: 2, h: 1, v: 1, drug: "Warfarin", unit: "tablets" },
    { d: 7.5, h: 15, v: 1, drug: "Meloxicam", unit: "tablets" },
    { d: 400, h: 200, v: 1, drug: "Ibuprofen", unit: "tablets" },
    { d: 15, h: 30, v: 1, drug: "Morphine ER", unit: "tablets" },
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
      questionId: `q_${idCounter++}`,
      topicId: 'tablet_calculations',
      difficulty: 'easy',
      title: `${item.drug} Oral Dose`,
      prompt: `Physician orders ${item.drug} ${item.d} mg PO. Available on hand: ${item.h} mg per ${item.v} ${item.unit}. How many ${item.unit} should the nurse administer?`,
      correctAnswer: ans,
      tolerance: 0.1,
      questionType: 'oral',
      unit: item.unit,
      inputLabel: `Enter Number of ${item.unit}:`,
      steps: [
        `Formula: (Desired ÷ Have) × Vehicle`,
        `Calculation: (${item.d} mg ÷ ${item.h} mg) × ${item.v} ${item.unit} = ${ans} ${item.unit}`,
        `Ceiling Check: Verified within standard single-dose limit (≤ 4 tablets).`
      ],
      clinicalPearls: `Ensure patient can swallow solid medications prior to administration.`
    });
  });

  // 3. IV Flow & Pump Rates (25 Questions)
  const ivCases = [
    { v: 1000, hr: 8, df: 15, isGravity: true, drug: "0.9% Normal Saline" },
    { v: 500, hr: 4, df: 10, isGravity: true, drug: "D5W" },
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
        questionId: `q_${idCounter++}`,
        topicId: 'iv_flow_mathematics',
        difficulty: 'medium',
        title: `${item.drug} Gravity Drip Rate`,
        prompt: `An IV infusion of ${item.v} mL ${item.drug} is ordered to infuse over ${item.hr} hours using tubing with a drop factor of ${item.df} gtt/mL. Calculate the rate in gtt/min.`,
        correctAnswer: ans,
        tolerance: 0.5,
        questionType: 'gravity_drip',
        unit: "gtt/min",
        inputLabel: "Enter Rate (gtt/min):",
        steps: [
          `Time in minutes: ${item.hr} hr × 60 = ${mins} min`,
          `Formula: (${item.v} mL × ${item.df} gtt/mL) ÷ ${mins} min`,
          `Result: Rounded to whole drops = ${ans} gtt/min`
        ],
        clinicalPearls: `Manual gravity drips must always be rounded to the nearest integer drop.`
      });
    } else {
      const ans = Math.round((item.v / item.hr) * 10) / 10;
      qList.push({
        questionId: `q_${idCounter++}`,
        topicId: 'iv_flow_mathematics',
        difficulty: 'easy',
        title: `${item.drug} Volumetric Pump Flow Rate`,
        prompt: `An electronic infusion pump is ordered to deliver ${item.v} mL of ${item.drug} over ${item.hr} hours. Set the pump rate in mL/hr.`,
        correctAnswer: ans,
        tolerance: 0.2,
        questionType: 'pump_rate',
        unit: "mL/hr",
        inputLabel: "Enter Pump Rate (mL/hr):",
        steps: [
          `Formula: Total Volume (mL) ÷ Hours`,
          `Calculation: ${item.v} mL ÷ ${item.hr} hr = ${ans} mL/hr`,
          `Safety Guard: Ensure rate does not exceed electronic pump limit (999 mL/hr).`
        ],
        clinicalPearls: `Smart pumps require setting both the Rate (mL/hr) and Volume to be Infused (VTBI).`
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
      questionId: `q_${idCounter++}`,
      topicId: 'med_math_basics',
      difficulty: 'hard',
      title: `${item.drug} Pediatric Weight Dose`,
      prompt: `A child weighing ${item.wt} kg is prescribed ${item.drug} ${item.rate} mg/kg for a single dose. How many mg should the nurse administer?`,
      correctAnswer: ans,
      tolerance: 0.5,
      questionType: 'weight_based',
      unit: "mg",
      inputLabel: "Enter Dose (mg):",
      steps: [
        `Formula: Dose Rate (mg/kg) × Patient Weight (kg)`,
        `Calculation: ${item.rate} mg/kg × ${item.wt} kg = ${ans} mg`,
        `Safety Check: Verify child weight against pediatric growth chart.`
      ],
      clinicalPearls: `Confirm safe daily dosing range in pediatric drug reference guide before administration.`
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
    // ICU Titration math
    { mcg: 5, wt: 70, conc: 1600, ans: 13.13, unit: "mL/hr", title: "Dopamine 5 mcg/kg/min ICU Titration" },
    { mcg: 10, wt: 80, conc: 1600, ans: 30, unit: "mL/hr", title: "Dobutamine 10 mcg/kg/min ICU Titration" },
    { mcg: 2, wt: 60, conc: 1600, ans: 4.5, unit: "mL/hr", title: "Dopamine Low Dose Renal Titration" },
    { mcg: 0.05, wt: 70, conc: 16, ans: 13.13, unit: "mL/hr", title: "Norepinephrine Vasopressor Titration" },
    { mcg: 0.5, wt: 80, conc: 50, ans: 48, unit: "mL/hr", title: "Nitroglycerin High-Risk Titration" }
  ];

  unitCases.forEach((item) => {
    if (item.mcg) {
      qList.push({
        questionId: `q_${idCounter++}`,
        topicId: 'unit_conversions',
        difficulty: 'hard',
        title: item.title,
        prompt: `Order: Infuse titration at ${item.mcg} mcg/kg/min for a ${item.wt} kg patient. Drug concentration in bag is ${item.conc} mcg/mL. Calculate pump rate in mL/hr.`,
        correctAnswer: item.ans,
        unit: item.unit,
        inputLabel: "Enter Pump Setting (mL/hr):",
        steps: [
          `1. Hourly mcg: ${item.mcg} × ${item.wt} kg × 60 = ${item.mcg * item.wt * 60} mcg/hr`,
          `2. Pump Rate: (${item.mcg * item.wt * 60} mcg/hr) ÷ ${item.conc} mcg/mL = ${item.ans} mL/hr`,
          `ISMP Check: High-alert vasoactive infusion requires dual-nurse signoff.`
        ],
        clinicalPearls: `Continuously monitor blood pressure and titrate per approved ICU standing order protocol.`
      });
    } else {
      qList.push({
        questionId: `q_${idCounter++}`,
        topicId: 'unit_conversions',
        difficulty: 'easy',
        title: `Metric Conversion: ${item.title}`,
        prompt: `Convert ${item.val} ${item.from} into ${item.to}. Record numerical result in ${item.unit}.`,
        correctAnswer: item.ans,
        unit: item.unit,
        inputLabel: `Enter Value (${item.unit}):`,
        steps: [
          `Metric conversion factor between ${item.from} and ${item.to}`,
          `Calculated result: ${item.ans} ${item.unit}`,
          `ISMP Rule: Maintain leading zero if value is less than 1.`
        ],
        clinicalPearls: `Always write metric abbreviations correctly (e.g. mcg, never µg).`
      });
    }
  });

  return qList;
};

const questionsData = generate100Questions();

module.exports = {
  topicsData,
  lessonsData,
  questionsData
};
