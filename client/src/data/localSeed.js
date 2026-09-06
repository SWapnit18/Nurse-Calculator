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
        formula: 'Decimal Safety Check: Lead with 0, drop trailing zeros.',
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
        'Multiply across numerators and divide across denominators.'
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
    },
    {
      lessonId: 'les_mmb_4',
      topicId: 'med_math_basics',
      title: 'Fractions to Decimals & Clinical Percentages',
      summary: 'Converting mathematical fraction ratios to metric clinical decimals for pump programming.',
      clinicalKey: 'Divide numerator by denominator. Example: 1/4 tablet = 0.25; 1/2 tablet = 0.5.',
      workedExample: {
        scenario: 'An order calls for 3/4 of a scored tablet.',
        formula: 'Fraction = 3 ÷ 4 = 0.75',
        calculation: '3 ÷ 4 = 0.75 tablet',
        result: '0.75 tablet',
        ismpRationale: 'Expressing fractional oral doses as decimals clarifies documentation in the Electronic Health Record.'
      },
      content: [
        'Electronic MAR systems require decimal input (0.5 tab, not 1/2 tab).',
        'Always verify if tablet is scored before dispensing partial doses.'
      ]
    },
    {
      lessonId: 'les_mmb_5',
      topicId: 'med_math_basics',
      title: 'Clinical Calculation Double-Check Protocol',
      summary: 'The independent dual-nurse verification methodology for high-alert medications.',
      clinicalKey: 'Both nurses must perform the math independently from scratch without viewing each other’s answers first.',
      workedExample: {
        scenario: 'High-risk IV heparin infusion calculation requires independent nurse double-check.',
        formula: 'Nurse 1 calc: 18 units/kg/hr × 80 kg = 1,440 units/hr. Bag: 25,000 units/250 mL (100 u/mL) -> 14.4 mL/hr.',
        calculation: 'Nurse 2 performs identical math separately: 14.4 mL/hr confirmed.',
        result: '14.4 mL/hr (Double Verified)',
        ismpRationale: 'Independent double checks catch up to 95% of math and programming slips before drug reaches the patient.'
      },
      content: [
        'Never tell the second nurse your answer before they calculate.',
        'Check patient weight, concentration on the bag, and final pump programming.'
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
    },
    {
      lessonId: 'les_tab_4',
      topicId: 'tablet_calculations',
      title: 'Extended Release & Enteric-Coated Guardrails',
      summary: 'Identifying non-crushable solid oral dosage forms and DO NOT CRUSH list standard.',
      clinicalKey: 'Never split, chew, or crush medications with suffixes XL, XR, SR, CR, LA, or EC.',
      workedExample: {
        scenario: 'Patient has a nasogastric tube. Order: Morphine Sulfate ER (MS Contin) 30 mg PO.',
        formula: 'Crushing ER causes immediate dose dumping of 12-hour narcotic into systemic circulation.',
        calculation: 'Contact prescriber to switch to immediate-release oral liquid solution.',
        result: 'Hold and clarify formulation',
        ismpRationale: 'Dose dumping from crushed sustained release formulations can cause fatal respiratory depression.'
      },
      content: [
        'Enteric coatings protect stomach mucosa or protect drug from gastric acid.',
        'Extended-release beads release drug over 12 to 24 hours.'
      ]
    },
    {
      lessonId: 'les_tab_5',
      topicId: 'tablet_calculations',
      title: 'Multi-Strength Oral Tablet Combinations',
      summary: 'Formulating exact prescribed doses using available stock strengths safely.',
      clinicalKey: 'Use the minimal number of tablets to achieve the exact required therapeutic dose.',
      workedExample: {
        scenario: 'Order: Levothyroxine 175 mcg PO. Available: 100 mcg and 75 mcg tablets.',
        formula: '175 mcg = 1 × 100 mcg tablet + 1 × 75 mcg tablet',
        calculation: '100 + 75 = 175 mcg total',
        result: '2 tablets (1 of each strength)',
        ismpRationale: 'Clearly label both tablet strengths to ensure clarity for the patient and MAR.'
      },
      content: [
        'Double-check each blister pack label carefully when combining different strengths.',
        'Ensure both packages contain the same active chemical entity.'
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
    },
    {
      lessonId: 'les_liq_3',
      topicId: 'liquid_calculations',
      title: 'Oral Liquid Solutions & Suspensions',
      summary: 'Accurately measuring oral liquid medications using calibrated oral syringes.',
      clinicalKey: 'Never use household spoons (teaspoon/tablespoon). Always measure oral liquids in metric milliliters (mL).',
      workedExample: {
        scenario: 'Order: Amoxicillin oral suspension 250 mg PO. Stock: 125 mg / 5 mL.',
        formula: 'mL = (250 mg ÷ 125 mg) × 5 mL',
        calculation: '2 × 5 mL = 10 mL',
        result: '10 mL',
        ismpRationale: 'Oral syringes prevent accidental attachment to IV ports, protecting against fatal enteral route misconnections.'
      },
      content: [
        'Shake suspensions thoroughly before measuring.',
        'Read liquid meniscus at eye level on a flat surface.'
      ]
    },
    {
      lessonId: 'les_liq_4',
      topicId: 'liquid_calculations',
      title: 'Insulin Syringe Calibration (U-100 Units)',
      summary: 'Specialized unit measurement for regular and intermediate insulins.',
      clinicalKey: 'Insulin is measured strictly in USP Units using calibrated U-100 insulin syringes (100 units = 1 mL).',
      workedExample: {
        scenario: 'Order: Regular Insulin 14 Units SubQ before meals.',
        formula: 'Use U-100 insulin syringe; align stopper directly with 14 unit marking.',
        calculation: '14 Units = 0.14 mL of U-100 solution.',
        result: '14 Units',
        ismpRationale: 'Never calculate insulin doses in milliliters with standard syringes; 10x dosing errors with insulin can be lethal.'
      },
      content: [
        'Clear before cloudy: draw Regular (clear) before NPH (cloudy) when combining in one syringe.',
        'Have a second nurse independently verify insulin dose in the syringe.'
      ]
    },
    {
      lessonId: 'les_liq_5',
      topicId: 'liquid_calculations',
      title: 'Heparin Subcutaneous Dosing Protocols',
      summary: 'Calculating concentrated heparin injection units without decimal errors.',
      clinicalKey: 'Check vial strength: Heparin vials range from 100 units/mL (flushes) to 10,000 units/mL (therapeutic).',
      workedExample: {
        scenario: 'Order: Heparin 5,000 units SubQ Q12H. Available: Heparin 10,000 units/mL vial.',
        formula: 'mL = (5,000 units ÷ 10,000 units) × 1 mL',
        calculation: '5,000 ÷ 10,000 = 0.5 mL',
        result: '0.5 mL',
        ismpRationale: 'Administering 10,000 u/mL instead of 100 u/mL flush has caused multiple catastrophic pediatric fatalities.'
      },
      content: [
        'Confirm concentration in bold lettering on vial label.',
        'Use a 1 mL tuberculin syringe to draw exact subcutaneous volume.'
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
    },
    {
      lessonId: 'les_uc_3',
      topicId: 'unit_conversions',
      title: 'Liquid Volume Conversions (Liters to Milliliters)',
      summary: 'Converting IV infusion bags and daily intake totals from Liters to mL.',
      clinicalKey: '1 Liter (L) = 1,000 Milliliters (mL).',
      workedExample: {
        scenario: 'Prescription: Infuse 1.5 L of 0.9% Normal Saline over 12 hours.',
        formula: 'mL = 1.5 L × 1,000',
        calculation: '1.5 × 1,000 = 1,500 mL',
        result: '1,500 mL',
        ismpRationale: 'IV infusion pumps are programmed in mL/hr; convert liters to milliliters before calculating rate.'
      },
      content: [
        'Multiply liters by 1,000 to get milliliters.',
        'Divide milliliters by 1,000 to get liters.'
      ]
    },
    {
      lessonId: 'les_uc_4',
      topicId: 'unit_conversions',
      title: 'Household to Metric Fluid Equivalencies',
      summary: 'Calculating fluid intake and output (I&O) from cups, ounces, and teaspoons.',
      clinicalKey: '1 oz = 30 mL | 1 cup (8 oz) = 240 mL | 1 tsp = 5 mL | 1 tbsp = 15 mL.',
      workedExample: {
        scenario: 'Patient drinks 6 oz of apple juice and 1 cup of coffee. Record total fluid intake in mL.',
        formula: 'Total mL = (6 oz × 30 mL) + (240 mL)',
        calculation: '180 mL + 240 mL = 420 mL',
        result: '420 mL',
        ismpRationale: 'Accurate intake calculation is essential for managing congestive heart failure and renal failure patients.'
      },
      content: [
        'Ice chips melt to half their volume in liquid (100 mL ice = 50 mL water).',
        'Record all hospital fluid balance sheets in metric milliliters.'
      ]
    },
    {
      lessonId: 'les_uc_5',
      topicId: 'unit_conversions',
      title: 'Temperature Conversions (Celsius ↔ Fahrenheit)',
      summary: 'Clinical temperature conversions for vital sign recording.',
      clinicalKey: '°C = (°F - 32) ÷ 1.8 | °F = (°C × 1.8) + 32.',
      workedExample: {
        scenario: 'Patient temperature reads 101.4 °F on thermometer.',
        formula: '°C = (101.4 - 32) ÷ 1.8',
        calculation: '69.4 ÷ 1.8 = 38.55 °C -> 38.6 °C',
        result: '38.6 °C (Febrile)',
        ismpRationale: 'Recognizing 38.0 °C (100.4 °F) as the clinical sepsis threshold triggers rapid blood culture protocols.'
      },
      content: [
        'Normal adult core temperature is 36.5 °C to 37.5 °C (97.7 °F to 99.5 °F).'
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
    },
    {
      lessonId: 'les_rp_2',
      topicId: 'ratios_proportions',
      title: 'Ratio Strengths in Emergency Meds (1:1,000 vs 1:10,000)',
      summary: 'Solving ratio concentrations expressed as 1:X parts.',
      clinicalKey: '1:1,000 means 1 gram in 1,000 mL (1 mg/mL). 1:10,000 means 1 gram in 10,000 mL (0.1 mg/mL).',
      workedExample: {
        scenario: 'Order: Epinephrine 0.3 mg IM for severe anaphylaxis. Stock: 1:1,000 ampule (1 mg/mL).',
        formula: 'mL = 0.3 mg ÷ 1 mg/mL',
        calculation: '0.3 ÷ 1 = 0.3 mL',
        result: '0.3 mL IM',
        ismpRationale: 'Always use 1:1,000 for IM injection and 1:10,000 for IV cardiac resuscitation.'
      },
      content: [
        '1:1,000 = 1 mg in 1 mL',
        '1:10,000 = 1 mg in 10 mL (0.1 mg/mL)',
        '1:100,000 = 1 mg in 100 mL'
      ]
    },
    {
      lessonId: 'les_rp_3',
      topicId: 'ratios_proportions',
      title: 'Fractional Dosage Proportions',
      summary: 'Solving fractional medication doses using proportional ratios.',
      clinicalKey: 'Keep units constant on both sides of the colon: mg : mL = mg : mL.',
      workedExample: {
        scenario: 'Order: 0.125 mg Digoxin. Stock: 0.25 mg per 2 mL ampule.',
        formula: '0.25 mg : 2 mL = 0.125 mg : X mL',
        calculation: '0.25X = 2 × 0.125 = 0.25 -> X = 1 mL',
        result: '1.0 mL',
        ismpRationale: 'Using cross multiplication prevents numerator/denominator inversion errors.'
      },
      content: [
        'Cross-multiply diagonal values to isolate X.',
        'Perform sanity check: half the dose requires half the volume.'
      ]
    },
    {
      lessonId: 'les_rp_4',
      topicId: 'ratios_proportions',
      title: 'Scaling Pediatric Suspension Volumes',
      summary: 'Calculating proportional multi-dose bottles for home discharge.',
      clinicalKey: 'Daily Volume = (Single Dose Volume) × (Doses Per Day).',
      workedExample: {
        scenario: 'Single dose is 7.5 mL TID (3 times daily) for a 10-day course. Calculate total bottle size in mL.',
        formula: 'Total = 7.5 mL × 3 doses/day × 10 days',
        calculation: '22.5 mL/day × 10 days = 225 mL',
        result: '225 mL bottle',
        ismpRationale: 'Dispensing accurate course volumes prevents under-treatment and antibiotic resistance.'
      },
      content: [
        'Calculate single dose first, then multiply by daily frequency, then by duration.'
      ]
    },
    {
      lessonId: 'les_rp_5',
      topicId: 'ratios_proportions',
      title: 'Direct vs Inverse Proportional Logic in Nursing',
      summary: 'Understanding relationship between concentration and required volume.',
      clinicalKey: 'As drug concentration increases (doubles), the required injection volume decreases (halves).',
      workedExample: {
        scenario: 'Order: 50 mg Demerol. Case A stock: 50 mg/mL (1 mL). Case B stock: 100 mg/mL (0.5 mL).',
        formula: 'Volume is inversely proportional to stock concentration.',
        calculation: 'Case A = 1 mL; Case B = 0.5 mL.',
        result: '0.5 mL vs 1 mL',
        ismpRationale: 'Recognizing inverse relationships prevents giving double volume when high concentration stock is supplied.'
      },
      content: [
        'Always check the concentration on the vial label, not just the drug name.'
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
    },
    {
      lessonId: 'les_cm_2',
      topicId: 'concentration_math',
      title: 'Weight-in-Volume (w/v) Percentage Rules',
      summary: 'Calculating milligrams per milliliter from percentage solutions.',
      clinicalKey: 'To find mg/mL from percentage: Multiply percent number by 10 (e.g., 2% Lidocaine = 20 mg/mL; 0.9% NaCl = 9 mg/mL).',
      workedExample: {
        scenario: 'Order: Lidocaine 100 mg IV Bolus. Stock: 2% Lidocaine solution.',
        formula: 'Concentration = 2% × 10 = 20 mg/mL. Volume = 100 mg ÷ 20 mg/mL',
        calculation: '100 ÷ 20 = 5 mL',
        result: '5 mL',
        ismpRationale: 'Rapid percent-to-mg conversion prevents severe antiarrhythmic under-dosing and local anesthetic toxicity.'
      },
      content: [
        '1% = 10 mg/mL',
        '2% = 20 mg/mL',
        '50% Dextrose = 500 mg/mL (0.5 g/mL)'
      ]
    },
    {
      lessonId: 'les_cm_3',
      topicId: 'concentration_math',
      title: 'Dextrose & Electrolyte Solution Math',
      summary: 'Calculating grams of solute delivered in IV maintenance bags.',
      clinicalKey: 'D5W = 5% Dextrose in Water = 5 g Dextrose per 100 mL (50 g per Liter).',
      workedExample: {
        scenario: 'Patient receives 1,000 mL of D5W over 8 hours. How many grams of dextrose are delivered?',
        formula: 'Grams = 5 g / 100 mL × 1,000 mL = 50 g Dextrose',
        calculation: '50 grams total',
        result: '50 grams',
        ismpRationale: 'Tracking IV carbohydrate and electrolyte calories is vital for diabetic and NPO patients.'
      },
      content: [
        'D10W = 10 g per 100 mL (100 g/L)',
        '0.45% NaCl = 4.5 g NaCl per Liter (Half Normal Saline)'
      ]
    },
    {
      lessonId: 'les_cm_4',
      topicId: 'concentration_math',
      title: 'Potassium Chloride (KCl) Additive Limits',
      summary: 'High-alert electrolyte concentration limits in peripheral and central IV lines.',
      clinicalKey: 'Peripheral IV max concentration: 40 mEq/L. Max infusion rate: 10 mEq/hr (never give IV Push).',
      workedExample: {
        scenario: 'Order: 20 mEq KCl in 100 mL IV piggyback over 2 hours.',
        formula: 'Infusion rate = 20 mEq ÷ 2 hr = 10 mEq/hr (Within safe peripheral limit)',
        calculation: '10 mEq/hr',
        result: '10 mEq/hr (Safe limit)',
        ismpRationale: 'KCl IV Push causes immediate fatal cardiac arrest. Never administer undiluted KCl.'
      },
      content: [
        'Always use an electronic infusion pump for potassium infusions.',
        'Check renal function (creatinine/urine output) before administering potassium.'
      ]
    },
    {
      lessonId: 'les_cm_5',
      topicId: 'concentration_math',
      title: 'Parts-Per-Million and Topical Ratios',
      summary: 'Calculating antiseptic wound wash and soak dilutions.',
      clinicalKey: 'Dilution Volume Formula: C1 × V1 = C2 × V2.',
      workedExample: {
        scenario: 'Prepare 500 mL of 0.25% Dakin solution using 5% stock bleach solution.',
        formula: 'V1 = (C2 × V2) ÷ C1 = (0.25% × 500 mL) ÷ 5%',
        calculation: '125 ÷ 5 = 25 mL of 5% stock bleach diluted to 500 mL',
        result: '25 mL stock + 475 mL water',
        ismpRationale: 'Accurate antiseptic dilution prevents severe tissue chemical burns on open surgical wounds.'
      },
      content: [
        'Always label compounded topical washes with date, time, and nurse initials.'
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
    },
    {
      lessonId: 'les_rc_2',
      topicId: 'reconstitution',
      title: 'Multiple Concentration Reconstitution Tables',
      summary: 'Selecting the appropriate diluent volume from manufacturer reconstitution charts.',
      clinicalKey: 'Select diluent volume that produces the highest concentration for IM to minimize tissue pain.',
      workedExample: {
        scenario: 'Order: Ampicillin 500 mg IM. Reconstitution chart: Add 1.8 mL diluent -> 250 mg/mL; Add 0.9 mL diluent -> 500 mg/mL.',
        formula: 'For IM injection, choose 500 mg/mL to administer only 1.0 mL volume.',
        calculation: '500 mg ÷ 500 mg/mL = 1.0 mL IM',
        result: '1.0 mL IM',
        ismpRationale: 'Minimizing IM volume reduces muscular trauma and patient discomfort.'
      },
      content: [
        'Check whether order is IM or IV before choosing diluent amount on chart.'
      ]
    },
    {
      lessonId: 'les_rc_3',
      topicId: 'reconstitution',
      title: 'Determining Powder Displacement Volume',
      summary: 'Calculating the exact volume occupied by solid dry medication powder.',
      clinicalKey: 'Powder Displacement Volume = (Total Reconstituted Volume) - (Diluent Volume Added).',
      workedExample: {
        scenario: 'Adding 8.2 mL diluent yields 10 mL final solution. What is powder displacement?',
        formula: 'Displacement = 10 mL - 8.2 mL',
        calculation: '10 - 8.2 = 1.8 mL',
        result: '1.8 mL',
        ismpRationale: 'Displacement calculations ensure students understand why concentration is based on final volume, not diluent added.'
      },
      content: [
        'Dry powder always expands the liquid volume.'
      ]
    },
    {
      lessonId: 'les_rc_4',
      topicId: 'reconstitution',
      title: 'Reconstituted Stability & Multi-Dose Labeling',
      summary: 'Labeling reconstituted vials per JCAHO and hospital pharmacy guidelines.',
      clinicalKey: 'Every reconstituted vial must be labeled with: Date, Time, Concentration, Expiration, and Nurse Initials.',
      workedExample: {
        scenario: 'A nurse reconstitutes a 2 g vial of Cefazolin at 0800 on Sept 6. Label states stable for 24 hours at room temp.',
        formula: 'Expiration = Sept 7 at 0800.',
        calculation: 'Document: 100 mg/mL | Exp: 09/07 08:00 | Initials: RN',
        result: 'Fully labeled vial',
        ismpRationale: 'Unlabeled medication vials in clinical refrigerators are a primary cause of accidental expired drug administration.'
      },
      content: [
        'Discard unlabelled reconstituted vials immediately.'
      ]
    },
    {
      lessonId: 'les_rc_5',
      topicId: 'reconstitution',
      title: 'Pediatric Reconstitution Dosage Precision',
      summary: 'Measuring micro-volume reconstituted antibiotic doses with tuberculin syringes.',
      clinicalKey: 'For pediatric reconstituted doses < 1 mL, always calculate to hundredths and use 1 mL syringe.',
      workedExample: {
        scenario: 'Infant order: Vancomycin 65 mg IV. Reconstituted stock concentration: 50 mg/mL.',
        formula: 'mL = 65 mg ÷ 50 mg/mL',
        calculation: '65 ÷ 50 = 1.30 mL',
        result: '1.30 mL',
        ismpRationale: 'High-potency antibiotics in neonates require exact volume measurement to prevent nephrotoxicity and ototoxicity.'
      },
      content: [
        'Always verify with pediatric dosing guides before administration.'
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
    },
    {
      lessonId: 'les_ivm_3',
      topicId: 'iv_mathematics',
      title: 'IV Piggyback (IVPB) Intermittent Dosing',
      summary: 'Setting up intermittent secondary bags over 30 to 60 minute intervals.',
      clinicalKey: 'When infusing over 30 minutes, pump mL/hr is double the bag volume (Volume ÷ 0.5 hr = Volume × 2).',
      workedExample: {
        scenario: 'Order: Cefepime 1 g in 100 mL D5W IVPB over 30 minutes.',
        formula: 'Rate = 100 mL ÷ 0.5 hr',
        calculation: '100 ÷ 0.5 = 200 mL/hr',
        result: '200 mL/hr',
        ismpRationale: 'Programming 100 mL/hr instead of 200 mL/hr causes the antibiotic to infuse over 60 min instead of 30 min.'
      },
      content: [
        'Hang secondary bag higher than primary fluid bag to establish hydrostatic gravity feed.'
      ]
    },
    {
      lessonId: 'les_ivm_4',
      topicId: 'iv_mathematics',
      title: 'Infusion Completion Time Calculation',
      summary: 'Predicting exact bag change times and remaining infusion duration.',
      clinicalKey: 'Remaining Time (Hours) = (Remaining Volume in mL) ÷ (Infusion Rate in mL/hr).',
      workedExample: {
        scenario: 'An IV bag has 350 mL remaining, infusing at 125 mL/hr. Infusion started at 12:00.',
        formula: 'Time = 350 ÷ 125 = 2.8 hours (2 hours + 0.8 × 60 min = 2 hr 48 min).',
        calculation: '12:00 + 2 hr 48 min = 14:48 (2:48 PM)',
        result: '14:48 (2:48 PM)',
        ismpRationale: 'Timely IV bag changes prevent vein lumen clotting and air embolism.'
      },
      content: [
        'Multiply decimal hour by 60 to obtain exact minutes.'
      ]
    },
    {
      lessonId: 'les_ivm_5',
      topicId: 'iv_mathematics',
      title: 'Microdrip Rule of 60 Equivalency',
      summary: 'The mathematical relationship between mL/hr and microdrip gtt/min.',
      clinicalKey: 'With a 60 gtt/mL microdrip set, the rate in mL/hr is always identical to the rate in gtt/min (Rate in mL/hr = gtt/min).',
      workedExample: {
        scenario: 'Order: 45 mL/hr via microdrip tubing (60 gtt/mL).',
        formula: 'gtt/min = (45 mL × 60 gtt/mL) ÷ 60 min = 45 gtt/min',
        calculation: '45 gtt/min',
        result: '45 gtt/min (1:1 Ratio)',
        ismpRationale: 'The 60 gtt/min rule eliminates intermediate math during emergency pediatric transport.'
      },
      content: [
        'Microdrip tubing contains a small metal stylus inside the drip chamber.'
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
    },
    {
      lessonId: 'les_wb_2',
      topicId: 'weight_based',
      title: 'Pediatric Safe Dose Range Verification (Min/Max Checks)',
      summary: 'Verifying physician orders against recommended therapeutic ranges before administration.',
      clinicalKey: 'Always calculate both Minimum Safe Dose and Maximum Safe Dose before verifying order.',
      workedExample: {
        scenario: 'Order: Cefdinir 280 mg PO BID for 20 kg child. Safe range: 14 mg/kg/day divided BID.',
        formula: 'Recommended = 14 × 20 = 280 mg/day (140 mg BID). Order was 280 mg BID (560 mg/day = 2x overdose).',
        calculation: 'Order exceeds recommended range. Hold and clarify with prescriber.',
        result: 'Hold and clarify with physician',
        ismpRationale: 'Independent safe dose range verification prevents fatal pediatric toxicity from prescribing slips.'
      },
      content: [
        'Never administer an unverified pediatric dose that exceeds manufacturer ceiling.'
      ]
    },
    {
      lessonId: 'les_wb_3',
      topicId: 'weight_based',
      title: 'Weight Conversion Errors (Pounds to Kilograms)',
      summary: 'Avoiding the dangerous 2.2x over-dosing and under-dosing multipliers.',
      clinicalKey: 'Always convert lbs to kg (lb ÷ 2.2) before entering weight into dosing calculations.',
      workedExample: {
        scenario: 'Patient weighs 44 lbs. Order: 10 mg/kg.',
        formula: 'Weight in kg = 44 ÷ 2.2 = 20 kg. Correct dose = 20 × 10 = 200 mg. (Using 44 directly would give 440 mg = 220% overdose).',
        calculation: '200 mg',
        result: '200 mg',
        ismpRationale: 'Dosing in pounds instead of kilograms is one of the top reported root causes of fatal medication events in children.'
      },
      content: [
        'Weigh all patients directly in kilograms.'
      ]
    },
    {
      lessonId: 'les_wb_4',
      topicId: 'weight_based',
      title: 'Weight-Based Loading Dose Calculations',
      summary: 'Calculating initial bolus doses (mg/kg) to reach therapeutic plasma levels rapidly.',
      clinicalKey: 'Loading Dose (mg) = Prescribed Bolus (mg/kg) × Patient Weight (kg).',
      workedExample: {
        scenario: 'Order: Phenytoin loading dose 15 mg/kg IV for a 60 kg status epilepticus patient.',
        formula: 'Dose = 15 mg/kg × 60 kg = 900 mg IV.',
        calculation: '900 mg IV',
        result: '900 mg IV',
        ismpRationale: 'Phenytoin IV must not exceed 50 mg/min infusion rate to prevent severe hypotension and cardiac arrhythmias.'
      },
      content: [
        'Infuse loading doses strictly at approved manufacturer rate limits.'
      ]
    },
    {
      lessonId: 'les_wb_5',
      topicId: 'weight_based',
      title: 'Body Surface Area (BSA) Mosteller Formula',
      summary: 'Calculating exact BSA for oncology chemotherapy dosing protocols.',
      clinicalKey: 'BSA (m²) = √ [ (Height in cm × Weight in kg) ÷ 3,600 ].',
      workedExample: {
        scenario: 'Patient height: 170 cm; weight: 70 kg. Calculate BSA in m².',
        formula: 'BSA = √ [ (170 × 70) ÷ 3,600 ] = √ [ 11,900 ÷ 3,600 ] = √ 3.305 = 1.818 m².',
        calculation: '1.82 m²',
        result: '1.82 m²',
        ismpRationale: 'Chemotherapy medications require BSA calculation rounded to two decimal places.'
      },
      content: [
        'Ensure height is in centimeters and weight is in kilograms before applying formula.'
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
    },
    {
      lessonId: 'les_ac_2',
      topicId: 'advanced_calc',
      title: 'Weight-Based IV Heparin Nomograms & Boluses',
      summary: 'Calculating initial heparin boluses and aPTT titration rate adjustments.',
      clinicalKey: 'Initial Bolus: 80 units/kg IV Push. Initial Infusion: 18 units/kg/hr.',
      workedExample: {
        scenario: 'Patient weighs 75 kg. Calculate initial bolus and infusion rate for 25,000 units / 250 mL bag (100 u/mL).',
        formula: 'Bolus = 80 × 75 = 6,000 units (6 mL). Infusion = 18 × 75 = 1,350 u/hr -> 1,350 ÷ 100 = 13.5 mL/hr.',
        calculation: 'Bolus: 6,000 units (6 mL); Rate: 13.5 mL/hr',
        result: 'Bolus 6 mL | Rate 13.5 mL/hr',
        ismpRationale: 'Standardized weight-based heparin protocols reduce time to reach therapeutic anticoagulation without bleeding.'
      },
      content: [
        'Recheck aPTT / Anti-Xa every 6 hours after rate changes.'
      ]
    },
    {
      lessonId: 'les_ac_3',
      topicId: 'advanced_calc',
      title: 'Insulin Continuous Infusion Titration Protocols',
      summary: 'Calculating IV regular insulin infusion rates for Diabetic Ketoacidosis (DKA).',
      clinicalKey: 'DKA Infusion Protocol: 0.1 units/kg/hr continuous regular insulin infusion.',
      workedExample: {
        scenario: 'Order: Regular Insulin 0.1 units/kg/hr for an 80 kg DKA patient. Bag: 100 units in 100 mL Normal Saline (1 u/mL).',
        formula: 'Desired = 0.1 × 80 = 8 units/hr. Pump Rate = 8 units ÷ 1 u/mL = 8 mL/hr.',
        calculation: '8 mL/hr',
        result: '8 mL/hr',
        ismpRationale: 'Check blood glucose hourly on IV insulin infusions to prevent hypoglycemic coma.'
      },
      content: [
        'Prime infusion tubing with 20 mL of insulin solution before starting (insulin adheres to plastic tubing).'
      ]
    },
    {
      lessonId: 'les_ac_4',
      topicId: 'advanced_calc',
      title: 'Emergency Resuscitation Epinephrine Infusions (mcg/min)',
      summary: 'Calculating non-weight-based emergency vasoactive infusions.',
      clinicalKey: 'mL/hr = (Dose in mcg/min × 60 min/hr) ÷ Bag Concentration in mcg/mL.',
      workedExample: {
        scenario: 'Order: Epinephrine 4 mcg/min IV infusion for septic shock. Bag: 4 mg in 250 mL NS (16 mcg/mL).',
        formula: 'Hourly mcg = 4 × 60 = 240 mcg/hr. Rate = 240 ÷ 16 mcg/mL',
        calculation: '240 ÷ 16 = 15 mL/hr',
        result: '15 mL/hr',
        ismpRationale: 'Non-weight based infusions are titrated to target Mean Arterial Pressure (MAP >= 65 mmHg).'
      },
      content: [
        'Central venous access is preferred to prevent peripheral extravasation necrosis.'
      ]
    },
    {
      lessonId: 'les_ac_5',
      topicId: 'advanced_calc',
      title: 'Opioid Conversion & Patient-Controlled Analgesia (PCA)',
      summary: 'Calculating equianalgesic opioid rotations and PCA lockout safety.',
      clinicalKey: 'Morphine 10 mg IV = Hydromorphone (Dilaudid) 1.5 mg IV = Fentanyl 100 mcg IV.',
      workedExample: {
        scenario: 'Patient is switched from Morphine 20 mg IV daily to Hydromorphone IV.',
        formula: 'Hydromorphone = 20 mg Morphine × (1.5 mg Hydromorphone ÷ 10 mg Morphine)',
        calculation: '20 × 0.15 = 3 mg Hydromorphone IV daily',
        result: '3.0 mg daily',
        ismpRationale: 'Hydromorphone is ~7x more potent than Morphine. Failing to convert potency leads to fatal overdoses.'
      },
      content: [
        'PCA lockout time prevents rapid consecutive patient doses before peak effect is reached.'
      ]
    }
  ]
};
