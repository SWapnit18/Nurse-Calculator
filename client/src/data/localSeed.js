export const localTopics = [
  {
    topicId: 'med_math_basics',
    title: 'Medication Calculation Basics',
    description: 'Foundations of clinical numeracy, ratio-proportion, dimensional analysis, and ISMP decimal rules.',
    order: 1,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'tablet_calculations',
    title: 'Tablet Calculations',
    description: 'Desired over Have formula (D/H × V), scored tablet split safety, and 4-tablet ceiling rules.',
    order: 2,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'liquid_calculations',
    title: 'Liquid Calculations',
    description: 'Parenteral liquid injection volumes, reconstitution concentration, and visual syringe barrel calibrations.',
    order: 3,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'unit_conversions',
    title: 'Unit Conversions',
    description: 'Metric-to-metric conversions (mcg, mg, g, kg, mL, L) and exact imperial pound conversions.',
    order: 4,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'ratios_proportions',
    title: 'Ratios and Proportions',
    description: 'Setting up clinical proportions, fraction equivalencies, and rapid proportional dosage solving.',
    order: 5,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'concentration_math',
    title: 'Concentration Mathematics',
    description: 'Percentage concentrations (w/v, v/v), ratio solutions (1:1000, 1:10000), and parts per thousand.',
    order: 6,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'reconstitution',
    title: 'Reconstitution Exercises',
    description: 'Powdered medication reconstitution, diluent selection, displacement factor, and final concentration.',
    order: 7,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'iv_mathematics',
    title: 'IV Mathematics',
    description: 'Gravity drip rates (gtt/min), volumetric electronic infusion pumps (mL/hr), and secondary piggybacks.',
    order: 8,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'weight_based',
    title: 'Weight-Based Practice',
    description: 'Pediatric and adult weight-based dosing (mg/kg/day, mcg/kg/min) and division of divided doses.',
    order: 9,
    lessonCount: 5,
    questionCount: 8
  },
  {
    topicId: 'advanced_calc',
    title: 'Advanced Calculation Practice',
    description: 'Multi-step titrations, insulin sliding scales, body surface area (BSA), and emergency push drugs.',
    order: 10,
    lessonCount: 5,
    questionCount: 8
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
        'Multiply across the numerators and divide across the denominators.'
      ]
    },
    {
      lessonId: 'les_mmb_3',
      topicId: 'med_math_basics',
      title: 'Clinical Decimal Rounding Standards',
      summary: 'Standard clinical rules for rounding numbers greater than or less than 1.0.',
      clinicalKey: 'For doses < 1, round to hundredths (0.01). For doses > 1, round to tenths (0.1). Drops (gtt) always whole numbers.',
      workedExample: {
        scenario: 'A calculation yields 0.746 mL of a pediatric cardiac drug.',
        formula: 'Values < 1 round to nearest 100th (two decimal places)',
        calculation: '0.746 rounds up to 0.75 mL',
        result: '0.75 mL',
        ismpRationale: 'High-risk pediatric liquid doses require 100th precision using tuberculin syringes.'
      },
      content: [
        'Amounts less than 1 mL must be calculated and rounded to the hundredths place.',
        'Amounts greater than 1 mL are typically rounded to the tenths place unless high-potency.',
        'IV gravity drops (gtt/min) can never be divided; round to the nearest whole integer.'
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
        'Inspect syringe markings carefully: lines on 3 mL syringes represent 0.1 mL.',
        'Lines on 1 mL syringes represent 0.01 mL.',
        'Never use an insulin syringe (U-100) for non-insulin medications.'
      ]
    }
  ],
  unit_conversions: [
    {
      lessonId: 'les_uc_1',
      topicId: 'unit_conversions',
      title: 'Metric Mass Conversions (mcg ↔ mg ↔ g ↔ kg)',
      summary: 'Step-by-step thousand-factor scaling between clinical metric mass units.',
      clinicalKey: '1 kg = 1,000 g | 1 g = 1,000 mg | 1 mg = 1,000 mcg.',
      workedExample: {
        scenario: 'Physician orders Levothyroxine 0.125 mg. Pharmacy dispenses 125 mcg tablets.',
        formula: 'mcg = mg × 1,000',
        calculation: '0.125 mg × 1,000 = 125 mcg',
        result: '125 mcg (Exact Match = 1 Tablet)',
        ismpRationale: 'Confirming microgram and milligram conversions prevents severe 1,000-fold thyroid and cardiac dosing crises.'
      },
      content: [
        'To convert from larger to smaller unit (e.g., mg to mcg), multiply by 1,000 (move decimal 3 places right).',
        'To convert from smaller to larger unit (e.g., mcg to mg), divide by 1,000 (move decimal 3 places left).',
        'Always double-check unit abbreviations on the drug label.'
      ]
    },
    {
      lessonId: 'les_uc_2',
      topicId: 'unit_conversions',
      title: 'Imperial to Metric Weight Conversion (lb to kg)',
      summary: 'Accurate clinical conversion of patient weights using standard 2.2 factor.',
      clinicalKey: 'Patient Weight in kg = Weight in lb ÷ 2.2 (Round to tenths).',
      workedExample: {
        scenario: 'Patient weighs 154 lbs. Medication is dosed in mg/kg.',
        formula: 'kg = lb ÷ 2.2',
        calculation: '154 ÷ 2.2 = 70 kg',
        result: '70 kg',
        ismpRationale: 'Always use weight in kg for medication dosing calculations; using pounds directly causes a 220% massive overdose.'
      },
      content: [
        'Weigh pediatric patients directly in kilograms whenever possible.',
        'Never estimate patient weight for weight-based chemotherapy or vasoactive drips.',
        'Double check scale calibration before recording in the electronic health record.'
      ]
    }
  ],
  ratios_proportions: [
    {
      lessonId: 'les_rp_1',
      topicId: 'ratios_proportions',
      title: 'Proportional Dosage Solving',
      summary: 'Setting up Means and Extremes to solve clinical dose fractions.',
      clinicalKey: 'Known Ratio (Have) :: Desired Ratio (Need) -> Product of Means = Product of Extremes.',
      workedExample: {
        scenario: 'Ordered: 250 mg. Stock: 125 mg in 5 mL liquid suspension.',
        formula: '125 mg : 5 mL = 250 mg : X mL',
        calculation: '125X = 5 × 250 = 1,250 -> X = 1,250 ÷ 125 = 10 mL',
        result: '10 mL',
        ismpRationale: 'Proportions verify sanity of calculated dosage volume against bottle stock.'
      },
      content: [
        'Place identical unit positions on both sides of the proportion equation.',
        'Multiply outer numbers (extremes) and inner numbers (means).',
        'Solve for unknown X and check answer against clinical reality.'
      ]
    }
  ],
  concentration_math: [
    {
      lessonId: 'les_cm_1',
      topicId: 'concentration_math',
      title: 'Percentage and Ratio Concentrations',
      summary: 'Understanding 1:1,000 and 1:10,000 epinephrine solutions and % w/v formulations.',
      clinicalKey: '1% solution = 1 g per 100 mL (10 mg/mL). 1:1,000 = 1 mg/mL; 1:10,000 = 0.1 mg/mL.',
      workedExample: {
        scenario: 'Order: 1 mg Epinephrine IV Push in cardiac arrest. Stock vials: 1:1,000 (1 mg/mL) and 1:10,000 (0.1 mg/mL).',
        formula: 'IV cardiac arrest requires 1:10,000 dilution (1 mg / 10 mL)',
        calculation: 'Administer 10 mL of 1:10,000 epinephrine syringe.',
        result: '10 mL of 1:10,000',
        ismpRationale: 'Administering 1:1,000 IV Push instead of IM causes severe tachycardia, hypertension, and fatal arrhythmias.'
      },
      content: [
        'Epinephrine 1:1,000 (1 mg/mL) is for IM anaphylaxis injection.',
        'Epinephrine 1:10,000 (0.1 mg/mL) is for IV cardiac arrest resuscitation.',
        'Always read the full concentration label and route warning.'
      ]
    }
  ],
  reconstitution: [
    {
      lessonId: 'les_rc_1',
      topicId: 'reconstitution',
      title: 'Powder Reconstitution and Displacement',
      summary: 'Adding sterile diluents to powdered vials to create accurate solution concentrations.',
      clinicalKey: 'Final Concentration (mg/mL) = Total Solute (mg) ÷ Total Reconstituted Volume (mL).',
      workedExample: {
        scenario: 'Vial contains 1 g Ceftriaxone powder. Label: Add 9.6 mL sterile water to yield 10 mL of 100 mg/mL.',
        formula: 'Conc = 1,000 mg ÷ 10 mL = 100 mg/mL. Displacement volume of powder = 0.4 mL.',
        calculation: 'If order is 500 mg: Vol = 500 mg ÷ 100 mg/mL = 5 mL',
        result: '5 mL',
        ismpRationale: 'Powder adds volume (displacement). Adding diluent does not equal final volume.'
      },
      content: [
        'Read vial label instructions for exact diluent type (Sterile Water, 0.9% NaCl, Bacteriostatic Water).',
        'Note date, time, and resulting concentration on reconstituted vial label.',
        'Store in refrigerator or room temperature as indicated by manufacturer.'
      ]
    }
  ],
  iv_mathematics: [
    {
      lessonId: 'les_ivm_1',
      topicId: 'iv_mathematics',
      title: 'Gravity Drip Rates & Drop Factors',
      summary: 'Calculating manual IV infusion gravity drip rates in drops per minute (gtt/min).',
      clinicalKey: 'Drip Rate (gtt/min) = (Total Volume in mL × Drop Factor in gtt/mL) ÷ Time in Minutes.',
      workedExample: {
        scenario: 'Order: 1,000 mL 0.9% Normal Saline over 8 hours. Tubing drop factor: 15 gtt/mL.',
        formula: 'Time in minutes = 8 × 60 = 480 min. Rate = (1,000 × 15) ÷ 480',
        calculation: '15,000 ÷ 480 = 31.25 -> Round to 31 gtt/min',
        result: '31 gtt/min',
        ismpRationale: 'Gravity drip rates must always be rounded to the nearest whole integer drop count.'
      },
      content: [
        'Macro-drip sets typically deliver 10, 15, or 20 gtt/mL.',
        'Micro-drip sets deliver 60 gtt/mL (useful for pediatric or critical titration).',
        'Count drops against a watch second hand for one full minute to calibrate roller clamp.'
      ]
    },
    {
      lessonId: 'les_ivm_2',
      topicId: 'iv_mathematics',
      title: 'Volumetric IV Infusion Pump Rates',
      summary: 'Programming volumetric smart pumps for continuous and intermittent infusions in mL/hr.',
      clinicalKey: 'Rate (mL/hr) = Total Volume to Infuse in mL ÷ Infusion Time in Hours.',
      workedExample: {
        scenario: 'Order: Vancomycin 1,000 mg in 200 mL D5W over 90 minutes. Set pump rate.',
        formula: 'Time in hours = 90 min ÷ 60 = 1.5 hr. Rate = 200 mL ÷ 1.5 hr',
        calculation: '200 ÷ 1.5 = 133.33 mL/hr',
        result: '133.3 mL/hr',
        ismpRationale: 'Smart pumps with dose error reduction systems (DERS) provide hard and soft safety stops.'
      },
      content: [
        'Always convert partial hours into decimals (e.g., 30 min = 0.5 hr; 45 min = 0.75 hr).',
        'Standard volumetric infusion pumps have a maximum ceiling of 999 mL/hr.',
        'Check secondary line backcheck valve alignment for piggyback infusions.'
      ]
    }
  ],
  weight_based: [
    {
      lessonId: 'les_wb_1',
      topicId: 'weight_based',
      title: 'Weight-Based Daily Dosing (mg/kg/day in Divided Doses)',
      summary: 'Pediatric dosing protocols split into Q8H or Q12H administrations.',
      clinicalKey: 'Single Dose = (Dose in mg/kg/day × Weight in kg) ÷ Number of Doses per Day.',
      workedExample: {
        scenario: 'Child weighs 20 kg. Order: Amoxicillin 45 mg/kg/day PO divided every 8 hours (3 doses/day).',
        formula: 'Daily Total = 45 × 20 = 900 mg/day. Per Dose = 900 ÷ 3 doses',
        calculation: '900 ÷ 3 = 300 mg per dose',
        result: '300 mg every 8 hours',
        ismpRationale: 'Confusing single-dose orders with total daily dose is a leading cause of pediatric 3x/4x overdoses.'
      },
      content: [
        'Verify whether the ordered number represents the 24-hour total or a single administration.',
        'Divide total 24-hour milligrams by dosing frequency (e.g., BID = 2, TID = 3, QID = 4).',
        'Verify calculated dose against safe recommended manufacturer ranges.'
      ]
    }
  ],
  advanced_calc: [
    {
      lessonId: 'les_ac_1',
      topicId: 'advanced_calc',
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
