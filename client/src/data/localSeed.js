export const localTopics = [
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

export const localLessons = {
  med_math_basics: [
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
      ]
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
      ]
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
      ]
    }
  ],
  unit_conversions: [
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
      ]
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
      ]
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
      ]
    }
  ],
  tablet_calculations: [
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
      ]
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
      ]
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
      ]
    }
  ],
  liquid_calculations: [
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
      ]
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
      ]
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
      ]
    }
  ],
  iv_flow_mathematics: [
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
      ]
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
      ]
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
      ]
    }
  ]
};
