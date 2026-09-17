-- ==============================================================================
-- NurseCalc Clinical Learning Platform - Production Supabase / PostgreSQL Schema
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TOPICS TABLE
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    lesson_count INTEGER DEFAULT 3,
    question_count INTEGER DEFAULT 20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id TEXT PRIMARY KEY,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    summary TEXT,
    clinical_key TEXT,
    worked_example JSONB,
    content JSONB,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    prompt TEXT NOT NULL,
    correct_answer NUMERIC NOT NULL,
    unit TEXT NOT NULL,
    calc_type TEXT DEFAULT 'dosage',
    difficulty TEXT DEFAULT 'medium',
    tolerance NUMERIC DEFAULT 0.05,
    steps JSONB,
    explanation TEXT,
    key_point TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. USER ATTEMPTS & PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    question_id TEXT REFERENCES public.questions(id) ON DELETE SET NULL,
    topic_id TEXT,
    student_answer NUMERIC NOT NULL,
    correct_answer NUMERIC,
    is_correct BOOLEAN NOT NULL,
    mistake_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. MISTAKES ARCHIVE TABLE
CREATE TABLE IF NOT EXISTS public.mistakes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    question_id TEXT REFERENCES public.questions(id) ON DELETE SET NULL,
    topic_id TEXT,
    student_answer NUMERIC NOT NULL,
    correct_answer NUMERIC NOT NULL,
    mistake_type TEXT NOT NULL,
    ai_explanation TEXT,
    remediation_recommendation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, question_id)
);

-- 8. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_lessons_topic_id ON public.lessons(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic_id ON public.questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON public.attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_created_at ON public.attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_mistakes_user_id ON public.mistakes(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);

-- 9. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- 10. RLS POLICIES
DROP POLICY IF EXISTS "Public Read Access for Topics" ON public.topics;
CREATE POLICY "Public Read Access for Topics" ON public.topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access for Lessons" ON public.lessons;
CREATE POLICY "Public Read Access for Lessons" ON public.lessons FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Access for Questions" ON public.questions;
CREATE POLICY "Public Read Access for Questions" ON public.questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Attempts" ON public.attempts;
CREATE POLICY "Public Insert Attempts" ON public.attempts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Select Attempts" ON public.attempts;
CREATE POLICY "Public Select Attempts" ON public.attempts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public All Mistakes" ON public.mistakes;
CREATE POLICY "Public All Mistakes" ON public.mistakes FOR ALL USING (true);

DROP POLICY IF EXISTS "Public All Bookmarks" ON public.bookmarks;
CREATE POLICY "Public All Bookmarks" ON public.bookmarks FOR ALL USING (true);

-- ==============================================================================
-- 11. PRODUCTION SEED DATA: 8 CLINICAL UNITS
-- ==============================================================================
INSERT INTO public.topics (id, title, description, order_index, lesson_count, question_count) VALUES
('med_math_basics', 'Unit 1: Medication Math Basics & Safety Protocols', 'Foundations of clinical numeracy, ratio-proportion, dimensional analysis, and ISMP decimal rules.', 1, 6, 25),
('unit_conversions', 'Unit 2: Metric & Clinical Unit Conversions', 'Metric-to-metric conversions (mcg, mg, g, kg, mL, L), household, and exact imperial pound conversions.', 2, 6, 25),
('tablet_calculations', 'Unit 3: Oral & Enteral Solid Formulations', 'Desired over Have formula (D/H × V), scored tablet split safety, and 4-tablet ceiling rules.', 3, 5, 25),
('liquid_calculations', 'Unit 4: Parenteral Liquids & Syringe Calibrations', 'Parenteral liquid injection volumes, reconstitution concentration, and visual syringe barrel calibrations.', 4, 5, 25),
('iv_flow_mathematics', 'Unit 5: IV Gravity Infusions & Drop Timing', 'Gravity drip rates (gtt/min), macro/micro drop factors, and whole-integer drop rounding.', 5, 5, 25),
('volumetric_infusion_pumps', 'Unit 6: Volumetric Smart Pumps & Secondary Piggybacks', 'Electronic infusion pump rate (mL/hr), IVPB timing, smart pump DERS guardrails, and IV push.', 6, 5, 25),
('weight_based_practice', 'Unit 7: Pediatric & Neonatal Weight-Based Dosing', 'Weight-based mg/kg/dose, safe therapeutic window verification, and neonatal precision math.', 7, 5, 25),
('critical_care_titrations', 'Unit 8: Critical Care Titrations & Heparin Protocols', 'Continuous vasopressor titrations (mcg/kg/min), weight-based heparin protocols, and regular insulin drips.', 8, 5, 25)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  order_index = EXCLUDED.order_index;

-- ==============================================================================
-- 12. PRODUCTION SEED DATA: 42 CLINICAL LESSONS
-- ==============================================================================
INSERT INTO public.lessons (id, topic_id, title, summary, clinical_key, worked_example, content, order_index) VALUES
('les_mmb_1', 'med_math_basics', 'Fractions, Decimals & Percentages in Clinical Practice', 'Translating fractions, decimals, and percentage strengths into clinical drug quantities.', 'Always interpret % solution strength as grams of drug per 100 mL of total fluid.', '{"scenario": "Order: 500 mL of 0.45% Sodium Chloride. Calculate total grams of NaCl.", "formula": "Grams = (% ÷ 100) × Volume", "calculation": "(0.45 ÷ 100) × 500 = 2.25 g", "result": "2.25 g NaCl", "ismpRationale": "Percentage strength in pharmacology represents grams of solute per 100 mL of solution."}', '["Fractions to Decimals: Divide numerator by denominator.", "Percentage solutions: grams per 100 mL.", "1:1,000 ratio means 1 mg/mL; 1:10,000 means 0.1 mg/mL."]', 1),
('les_mmb_2', 'med_math_basics', 'Dimensional Analysis & Factor-Label Cancellation', 'Using conversion factors and diagonal unit cancellation to solve complex clinical problems.', 'Position matching units diagonally until only the desired outcome unit remains.', '{"scenario": "Order: Ampicillin 750 mg IV. Stock: Ampicillin 1 g in 10 mL vial.", "formula": "Target mL = 750 mg × (1 g / 1000 mg) × (10 mL / 1 g)", "calculation": "(750 × 10) ÷ 1000 = 7.5 mL", "result": "7.5 mL", "ismpRationale": "Diagonal cancellation prevents arithmetic oversight and incorrect conversion directions."}', '["Identify target unit on the left.", "Cancel intermediate units diagonally.", "Multiply numerators and divide by denominators."]', 2),
('les_mmb_3', 'med_math_basics', 'Ratio & Proportion Method for Drug Dosages', 'Solving clinical dosage equations using the classic ratio and proportion framework.', 'Align units identically on both sides of the proportion before computing.', '{"scenario": "Order: Furosemide 30 mg IV Push. Stock: Furosemide 40 mg in 4 mL vial.", "formula": "40 mg : 4 mL = 30 mg : x mL", "calculation": "40x = 120 -> x = 3 mL", "result": "3.0 mL", "ismpRationale": "The product of the extremes equals the product of the means."}', '["Set up Have Dose : Have Volume = Desired Dose : x Volume.", "Solve for x by cross-multiplying.", "Ensure metric units match before multiplying."]', 3),
('les_mmb_4', 'med_math_basics', 'ISMP Decimal Safety: Leading Zeros vs. Trailing Zeros', 'Enforcing leading zero protocol and eliminating dangerous trailing zeros.', 'Zero before the point always (0.X); zero after the whole number NEVER (X, not X.0).', '{"scenario": "Order: Levothyroxine .1 mg PO. Identify hazard and correct notation.", "formula": "Decimal Safety Rule", "calculation": "Naked decimal .1 mg corrected to 0.1 mg (100 mcg).", "result": "0.1 mg (100 mcg)", "ismpRationale": "Naked decimals lead to 10-fold overdose; trailing zeros lead to 10-fold or 100-fold errors."}', '["ALWAYS use a leading zero (0.5 mg, never .5 mg).", "NEVER use a trailing zero (5 mg, never 5.0 mg).", "The Joint Commission strictly bans trailing zeros."]', 4),
('les_mmb_5', 'med_math_basics', 'High-Alert Medications & Independent Double-Check Protocol', 'Implementing independent double-checks for APINCH high-alert medications.', 'Two licensed nurses must calculate and verify from raw orders independently.', '{"scenario": "Order: Regular Insulin 8 units SubQ with breakfast.", "formula": "Independent Double-Check", "calculation": "Nurse A and Nurse B independently verify order, vial, and U-100 syringe reading.", "result": "2-Nurse Independent Sign-off", "ismpRationale": "Independent double checks catch up to 95% of math errors."}', '["APINCH: Antibiotics, Potassium, Insulin, Narcotics, Chemotherapy, Heparin.", "Never show your work to the second nurse before they calculate.", "Verify vial, concentration, and smart pump settings."]', 5),
('les_mmb_6', 'med_math_basics', 'Clinical Rounding Guidelines: Drops, Liquids, Tablets & Ceilings', 'Executing hospital and NCLEX rounding standards for drops, oral liquids, and tablets.', 'Drops are always whole integers; volumes > 1 mL round to tenths; volumes < 1 mL round to hundredths.', '{"scenario": "Gravity drip calculates to 37.6 gtt/min; liquid calculates to 1.48 mL.", "formula": "Clinical Rounding Rules", "calculation": "37.6 gtt/min rounds to 38 gtt/min; 1.48 mL rounds to 1.5 mL.", "result": "38 gtt/min and 1.5 mL", "ismpRationale": "Gravity tubing cannot deliver fractional drops."}', '["Gravity drops: Round to whole integer.", "Liquid > 1 mL: Round to tenths (0.1 mL).", "Liquid < 1 mL: Round to hundredths (0.01 mL)."]', 6),
('les_uc_1', 'unit_conversions', 'Metric Weight Hierarchy: Kilograms (kg) to Grams (g)', 'Converting metric masses between kilograms, grams, and foundational SI units.', 'Kilogram to Gram = Multiply by 1,000; Gram to Kilogram = Divide by 1,000.', '{"scenario": "Order: Potassium Citrate 1.5 g PO. Bulk packaging is 0.0015 kg.", "formula": "Grams = Kilograms × 1,000", "calculation": "0.0015 × 1,000 = 1.5 g", "result": "1.5 g (Verified)", "ismpRationale": "Metric prefixes operate on base-10 multiples."}', '["1 kg = 1,000 g.", "1 g = 0.001 kg.", "Move decimal 3 places right for kg to g."]', 1),
('les_uc_2', 'unit_conversions', 'Metric Micro-Dosing: Milligrams (mg) to Micrograms (mcg)', 'Converting micro-doses between milligrams and micrograms for potent agents.', 'Always convert doses to identical units before performing division.', '{"scenario": "Order: Levothyroxine 0.075 mg PO daily. Available: 25 mcg tablets.", "formula": "0.075 mg × 1,000 = 75 mcg. Tablets = 75 ÷ 25", "calculation": "75 ÷ 25 = 3 tablets", "result": "3 Tablets", "ismpRationale": "Aligning units prevents 1,000-fold dosing mistakes."}', '["1 mg = 1,000 mcg.", "1 mcg = 0.001 mg.", "mg to mcg: Multiply by 1,000."]', 2),
('les_uc_3', 'unit_conversions', 'Household to Metric Volumetric Conversions (tsp, tbsp, oz to mL)', 'Converting household liquid volumes into standardized milliliters.', '1 tsp = 5 mL, 1 tbsp = 15 mL, 1 oz = 30 mL, 1 cup = 240 mL.', '{"scenario": "Patient drinks 8 oz broth, 4 oz juice, and 2 tbsp antacid.", "formula": "Total mL = (8 × 30) + (4 × 30) + (2 × 15)", "calculation": "240 + 120 + 30 = 390 mL", "result": "390 mL Total Intake", "ismpRationale": "Standardizing all intake to mL enables exact fluid balance charting."}', '["1 tsp = 5 mL.", "1 tbsp = 15 mL.", "1 fl oz = 30 mL.", "1 cup = 240 mL."]', 3),
('les_uc_4', 'unit_conversions', 'Body Mass Conversions: Pounds (lbs) to Kilograms (kg)', 'Converting patient body weights accurately between pounds and kilograms.', 'Always DIVIDE pounds by 2.2 to find kilograms.', '{"scenario": "Patient weighs 187 lbs. Calculate mass in kg.", "formula": "Mass (kg) = Weight (lbs) ÷ 2.2", "calculation": "187 ÷ 2.2 = 85.0 kg", "result": "85.0 kg", "ismpRationale": "Clinical drug formulas strictly require patient mass in kilograms."}', '["1 kg = 2.2 lbs.", "lbs to kg: Divide by 2.2.", "Round adult kg to tenths place."]', 4),
('les_uc_5', 'unit_conversions', 'Milliequivalents (mEq) & International Units (IU) Principles', 'Calculating electrolyte doses in mEq and biological products in International Units.', 'Treat mEq and Units as standard dosage units: Volume = (Desired / Available) × Volume.', '{"scenario": "Order: KCl 30 mEq IVPB in 250 mL D5W. Stock: 2 mEq/mL vial.", "formula": "Volume = 30 mEq ÷ 2 mEq/mL", "calculation": "30 ÷ 2 = 15 mL", "result": "15.0 mL", "ismpRationale": "Never attempt to convert mEq or Units into grams or milligrams."}', '["mEq: Measures electrolyte ionic reactivity.", "Units: Measures biological potency (Insulin, Heparin).", "Calculate volume using labeled concentration."]', 5),
('les_uc_6', 'unit_conversions', 'Temperature Conversions: Celsius (°C) and Fahrenheit (°F)', 'Converting clinical temperatures between Celsius and Fahrenheit scales.', 'Always subtract 32 first when going to °C; always multiply by 1.8 first when going to °F.', '{"scenario": "Child temperature is 39.5°C. Convert to Fahrenheit.", "formula": "°F = (°C × 1.8) + 32", "calculation": "(39.5 × 1.8) + 32 = 71.1 + 32 = 103.1°F", "result": "103.1°F", "ismpRationale": "Normal body temp: 37.0°C (98.6°F); Fever: ≥ 38.0°C (100.4°F)."}', '["°C = (°F - 32) ÷ 1.8", "°F = (°C × 1.8) + 32", "37°C = 98.6°F, 38°C = 100.4°F."]', 6)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  clinical_key = EXCLUDED.clinical_key,
  worked_example = EXCLUDED.worked_example,
  content = EXCLUDED.content;
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  clinical_key = EXCLUDED.clinical_key,
  worked_example = EXCLUDED.worked_example,
  content = EXCLUDED.content;

-- ==============================================================================
-- 13. PRODUCTION SEED DATA: NCLEX CLINICAL QUESTIONS
-- ==============================================================================
INSERT INTO public.questions (id, topic_id, title, prompt, correct_answer, unit, calc_type, difficulty, tolerance, steps, explanation, key_point) VALUES
('q_med_1', 'med_math_basics', 'ISMP Zero Syntax Check', 'A physician writes an order for "Haloperidol .5 mg PO BID". Apply ISMP leading and trailing zero rules. What is the correct numerical dosage in milligrams that must be transcribed to the MAR?', 0.5, 'mg', 'dosage', 'easy', 0.01, '["Identify naked decimal point .5 mg.", "Enforce standard ISMP leading zero.", "Correct compliant notation: 0.5 mg."]', 'Never omit the leading zero for values under 1 (use 0.5, never .5) to prevent 10-fold overdosing.', 'ISMP "Do Not Use" Rule'),
('q_unit_1', 'unit_conversions', 'Levothyroxine mcg to mg', 'Order: Levothyroxine 125 mcg PO daily. Available: Levothyroxine 0.125 mg scored tablets. How many tablets should the nurse administer?', 1, 'tablets', 'conversion', 'easy', 0.05, '["Convert 125 mcg to mg: 125 ÷ 1,000 = 0.125 mg.", "Tabs = Desired ÷ Have = 0.125 mg ÷ 0.125 mg = 1 tablet."]', '1 mg equals 1,000 mcg. Moving decimal 3 places left yields 0.125 mg.', 'Metric Mass Alignment'),
('q_tab_1', 'tablet_calculations', 'Digoxin Tablet Dose', 'Order: Digoxin 0.25 mg PO daily. Available: Digoxin 0.125 mg tablets. How many tablets should the nurse administer?', 2, 'tablets', 'dosage', 'easy', 0.05, '["Tabs = Desired ÷ Have = 0.25 mg ÷ 0.125 mg", "Calculation: 0.25 ÷ 0.125 = 2 tablets."]', 'D/H formula: (0.25 / 0.125) = 2 tablets.', 'Standard Oral Dosing'),
('q_liq_1', 'liquid_calculations', 'Morphine Sulfate IM', 'Order: Morphine Sulfate 4 mg IM every 4 hours PRN pain. Available: Morphine Sulfate 10 mg/mL injectable solution. How many mL should the nurse draw up?', 0.4, 'mL', 'liquid', 'medium', 0.05, '["Formula: Volume = (Desired ÷ Have) × Vehicle", "Calculation: (4 mg ÷ 10 mg) × 1 mL = 0.4 mL", "ISMP Rule: Always lead with zero (0.4 mL)."]', 'D/H × V: (4 / 10) * 1 mL = 0.4 mL.', 'Use 1 mL TB Syringe'),
('q_flow_1', 'iv_flow_mathematics', 'Normal Saline Pump Rate', 'Order: 1,000 mL Normal Saline IV to infuse over 8 hours via electronic infusion pump. What rate in mL/hr should the nurse program?', 125, 'mL/hr', 'flow_rate', 'easy', 0.1, '["Formula: Rate = Total Volume (mL) ÷ Time (hr)", "Calculation: 1,000 mL ÷ 8 hr = 125 mL/hr."]', 'Rate (mL/hr) = Volume in mL divided by Total Hours: 1000 / 8 = 125 mL/hr.', 'Smart Volumetric Pump'),
('q_flow_2', 'iv_flow_mathematics', 'Gravity Infusion Drip Rate', 'Order: 500 mL D5W IV over 4 hours. The tubing drop factor is 10 gtt/mL. Calculate the gravity infusion rate in whole drops per minute (gtt/min).', 21, 'gtt/min', 'gravity', 'medium', 0.1, '["Convert hours to minutes: 4 hr × 60 = 240 min.", "Formula: (500 mL × 10 gtt/mL) ÷ 240 min = 5,000 ÷ 240 = 20.83 gtt/min.", "Round to nearest whole integer drop: 21 gtt/min."]', 'Gravity drip calculations must be rounded to nearest whole integer drop because tubing cannot deliver fractional drops.', 'Gravity Drop Factor Rounding')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  prompt = EXCLUDED.prompt,
  correct_answer = EXCLUDED.correct_answer,
  unit = EXCLUDED.unit,
  steps = EXCLUDED.steps,
  explanation = EXCLUDED.explanation;
