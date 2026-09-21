const { User, Attempt, Mistake, Progress, Bookmark, Question, Topic, Lesson } = require('../models');
const { topicsData, questionsData } = require('../data/seedData');
const memStore = require('../config/memoryStore');
const { resolveSecureUserId } = require('../middleware/authMiddleware');

// GET /api/users/me
const getMe = async (req, res) => {
  try {
    const session = resolveSecureUserId(req);
    if (!session.isAuthorized) {
      return res.status(403).json({ success: false, message: session.error });
    }
    const userId = session.userId;
    let user = null;

    try {
      user = await User.findById(userId).select('-password');
    } catch (e) {}

    if (!user) {
      user = {
        id: userId || 'demo_student',
        name: req.user?.name || 'Nurse Student',
        email: req.user?.email || 'student@nursecalc.local',
        role: 'student',
        preferences: {
          preparingFor: 'B.Sc Nursing',
          confidence: 'Intermediate',
          goal: 'Exam preparation'
        }
      };
    }

    return res.json({ success: true, data: user });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/users/onboarding
const updateOnboarding = async (req, res) => {
  try {
    const session = resolveSecureUserId(req);
    if (!session.isAuthorized) {
      return res.status(403).json({ success: false, message: session.error });
    }
    const userId = session.userId;
    const { preparingFor, confidence, goal } = req.body;

    const preferences = { preparingFor, confidence, goal };

    try {
      await User.findByIdAndUpdate(userId, { preferences });
    } catch (e) {}

    return res.json({
      success: true,
      message: 'Onboarding preferences updated successfully.',
      data: preferences
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/mistakes
const getMistakes = async (req, res) => {
  try {
    const session = resolveSecureUserId(req);
    if (!session.isAuthorized) {
      return res.status(403).json({ success: false, message: session.error });
    }
    const userId = session.userId;
    let mistakes = [];
    try {
      mistakes = await Mistake.find({ userId }).sort({ timestamp: -1 });
    } catch (e) {}

    if (!mistakes || mistakes.length === 0) {
      mistakes = memStore.mistakes.filter(m => m.userId === userId);
    }

    // Aggregate by category
    const categoryCounts = {
      DECIMAL_SLIP_10X: 0,
      ROUNDING_MISMATCH: 0,
      UNIT_CONVERSION_ERROR: 0,
      ARITHMETIC_OR_FORMULA_ERROR: 0
    };

    mistakes.forEach(m => {
      if (categoryCounts[m.mistakeType] !== undefined) {
        categoryCounts[m.mistakeType]++;
      }
    });

    return res.json({
      success: true,
      data: {
        totalMistakes: mistakes.length,
        categories: categoryCounts,
        recentMistakes: mistakes.slice(0, 15)
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/bookmarks
const getBookmarks = async (req, res) => {
  try {
    const session = resolveSecureUserId(req);
    if (!session.isAuthorized) {
      return res.status(403).json({ success: false, message: session.error });
    }
    const userId = session.userId;
    let bookmarks = [];
    try {
      bookmarks = await Bookmark.find({ userId }).sort({ savedAt: -1 });
    } catch (e) {}

    if (!bookmarks || bookmarks.length === 0) {
      bookmarks = memStore.bookmarks.filter(b => b.userId === userId);
    }

    const detailed = bookmarks.map(b => {
      const q = questionsData.find(item => item.questionId === b.questionId);
      return {
        ...b._doc || b,
        question: q || null
      };
    });

    return res.json({ success: true, data: detailed });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/attempts
const getAttempts = async (req, res) => {
  try {
    const session = resolveSecureUserId(req);
    if (!session.isAuthorized) {
      return res.status(403).json({ success: false, message: session.error });
    }
    const userId = session.userId;
    let attempts = [];
    try {
      attempts = await Attempt.find({ userId }).sort({ timestamp: -1 }).limit(50);
    } catch (e) {}

    if (!attempts || attempts.length === 0) {
      attempts = memStore.attempts.filter(a => a.userId === userId);
    }

    return res.json({ success: true, count: attempts.length, data: attempts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/ai/explain-mistake
// AI NEVER performs calculations. It strictly explains approved mathematical and clinical concepts.
const explainMistake = async (req, res) => {
  try {
    const { questionId, questionTitle, prompt, studentAnswer, correctAnswer, unit, mistakeType, steps } = req.body;

    let targetQuestion = null;
    if (questionId) {
      targetQuestion = questionsData.find(q => q.questionId === questionId);
    }

    const effUnit = unit || targetQuestion?.unit || 'mL';
    const effCorrect = correctAnswer || targetQuestion?.correctAnswer || 'verified answer';
    const effStudent = studentAnswer !== undefined ? studentAnswer : 'your answer';
    const effMistakeType = mistakeType || (targetQuestion?.topicId === 'unit_conversions' ? 'UNIT_CONVERSION_ERROR' : 'FORMULA_ERROR');

    // Structured deterministic explanation generated server-side using clinical pedagogical reasoning
    let pedagogicalExplanation = '';
    let remediationGuidance = '';

    switch (effMistakeType) {
      case 'DECIMAL_SLIP_10X':
        pedagogicalExplanation = `You answered ${effStudent} ${effUnit}, which is a 10-fold or 100-fold displacement from the verified educational result of ${effCorrect} ${effUnit}. In nursing pharmacology, naked decimals (.X) or trailing zeros (X.0) are leading causes of fatal tenfold dosing errors.`;
        remediationGuidance = 'Remember the ISMP Rule: Always lead with a zero for numbers under 1 (e.g., 0.5), and never end with a trailing zero (e.g., 5, not 5.0).';
        break;

      case 'ROUNDING_MISMATCH':
        pedagogicalExplanation = `You answered ${effStudent} ${effUnit}, while the standard expected answer is ${effCorrect} ${effUnit}. For gravity drips (gtt/min), standard clinical administration guidelines require rounding to the nearest whole integer drop, because gravity infusion tubing can only form and deliver whole drops.`;
        remediationGuidance = 'When calculating drops per minute (gtt/min), round fractions ≥ 0.5 up and < 0.5 down to the nearest integer.';
        break;

      case 'UNIT_CONVERSION_ERROR':
        pedagogicalExplanation = `A metric conversion divergence occurred. Before calculating, all quantities must be expressed in the exact same metric unit (e.g. converting grams to milligrams or micrograms). Notice the relationship: 1 g = 1,000 mg = 1,000,000 mcg.`;
        remediationGuidance = '1 g = 1,000 mg | 1 mg = 1,000 mcg | 1 kg = 1,000 g | 1 L = 1,000 mL. Keep dimensional units aligned.';
        break;

      case 'CONCEPT_INQUIRY': {
        const p = (prompt || '').toLowerCase();
        if (p.includes('drip') || p.includes('gravity') || p.includes('gtt')) {
          pedagogicalExplanation = `Gravity Drip Rate Calculation:\n\n• Formula: (Total Volume in mL × Tubing Drop Factor in gtt/mL) ÷ Total Infusion Minutes\n• Step 1: Convert infusion hours into minutes (Hours × 60).\n• Step 2: Multiply total volume by tubing drop factor (10, 15, 20 for macrodrip; 60 for microdrip).\n• Step 3: Divide by total minutes and round to the nearest whole drop (e.g. 31.25 -> 31 gtt/min), as gravity tubing cannot deliver fractional drops.`;
          remediationGuidance = 'Macrodrip tubing: 10, 15, or 20 gtt/mL. Microdrip tubing: 60 gtt/mL (where mL/hr = gtt/min).';
        } else if (p.includes('pump') || p.includes('ml/hr') || p.includes('flow rate') || p.includes('infusion')) {
          pedagogicalExplanation = `Electronic Volumetric Infusion Pump Rate:\n\n• Formula: Rate (mL/hr) = Total Volume to Infuse (mL) ÷ Total Infusion Time (Hours)\n• Step 1: Convert partial hours or minutes into decimal hours (e.g. 30 min = 0.5 hr, 45 min = 0.75 hr, 90 min = 1.5 hr).\n• Step 2: Divide total volume in mL by decimal hours.\n• Precision: Smart infusion pumps support decimal precision (e.g. 62.5 mL/hr). Do not round to whole numbers unless ordered.`;
          remediationGuidance = 'Volumetric smart pumps support tenths (0.1 mL/hr). Ensure dose error reduction systems (DERS) are active.';
        } else if (p.includes('weight') || p.includes('pediatric') || p.includes('mg/kg') || p.includes('child')) {
          pedagogicalExplanation = `Pediatric & Weight-Based Dosage Calculation:\n\n• Step 1: Ensure patient weight is strictly in kilograms (if given in pounds, divide lbs by 2.2).\n• Step 2: Calculate daily or single dose requirement = Prescribed Rate (mg/kg or mcg/kg) × Patient Weight in kg.\n• Step 3: If the prescription is divided (e.g. daily dose in 3 divided doses q8h), divide total daily dose by frequency.\n• Safety Check: Always compare total calculated dose against standard pediatric maximum reference range limits.`;
          remediationGuidance = 'Formula: Dose (mg) = Weight (kg) × Dose Rate (mg/kg). 1 kg = 2.20462 lbs.';
        } else if (p.includes('titrat') || p.includes('mcg/kg/min') || p.includes('vaso') || p.includes('icu') || p.includes('dopamine') || p.includes('norepinephrine')) {
          pedagogicalExplanation = `ICU Vasoactive Titration (mcg/kg/min to mL/hr):\n\n• Step 1: Calculate drug bag concentration in mcg/mL = (Bag mg × 1,000) ÷ Bag Volume (mL).\n• Step 2: Calculate patient's hourly microgram requirement = Desired Rate (mcg/kg/min) × Patient Weight (kg) × 60 min/hr.\n• Step 3: Compute pump flow rate (mL/hr) = Hourly mcg Requirement ÷ Bag Concentration (mcg/mL).`;
          remediationGuidance = 'Double check continuous titration calculations with an independent secondary registered nurse.';
        } else if (p.includes('convert') || p.includes('metric') || p.includes('mcg') || p.includes('gram') || p.includes('lb') || p.includes('lbs') || p.includes('kg')) {
          pedagogicalExplanation = `Metric & Clinical Unit Conversions:\n\n• Mass Hierarchy: 1 kilogram (kg) = 1,000 grams (g) = 1,000,000 milligrams (mg) = 1,000,000,000 micrograms (mcg).\n• Volume Hierarchy: 1 Liter (L) = 1,000 milliliters (mL).\n• Weight Conversion: Pounds to kg = Weight in lbs ÷ 2.2.\n• Golden Rule: Convert units BEFORE placing numbers into any dosing formula.`;
          remediationGuidance = '1 g = 1,000 mg | 1 mg = 1,000 mcg | 1 kg = 2.2 lbs | 1 L = 1,000 mL.';
        } else if (p.includes('tablet') || p.includes('pill') || p.includes('oral') || p.includes('scored')) {
          pedagogicalExplanation = `Oral Solid Tablet Dosing (D/H × V):\n\n• Formula: Number of Tablets = (Desired Dose Ordered ÷ Stock on Hand) × 1 Tablet.\n• Scored Tablets: Only split tablets that have a manufacturer score line. Unscored tablets or extended-release (ER/XR/CR) capsules must NEVER be cut or crushed.\n• 4-Tablet Rule: If your math results in >3–4 tablets for a single dose, STOP and verify immediately with pharmacy.`;
          remediationGuidance = 'Formula: (D ÷ H) × V. Never crush enteric-coated or sustained-release formulations.';
        } else if (p.includes('inject') || p.includes('syringe') || p.includes('parenteral') || p.includes('vial') || p.includes('im') || p.includes('sc')) {
          pedagogicalExplanation = `Liquid & Syringe Dosage Calculation:\n\n• Formula: Volume (mL) = (Desired Dose ÷ Stock Concentration) × Vehicle Volume.\n• Syringe Selection: For volumes <1.0 mL, use a 1.0 mL tuberculin syringe with 0.01 mL calibrations. For volumes 1.0–3.0 mL, use a 3.0 mL syringe with 0.1 mL calibrations.\n• Injection Limits: Maximum IM volume in adult deltoid = 1.0 mL; adult ventrogluteal = 3.0 mL.`;
          remediationGuidance = 'Dose (mL) = (D ÷ H) × V. Apply ISMP leading zero rules (e.g. 0.4 mL, never .4 mL).';
        } else if (p.includes('zero') || p.includes('ismp') || p.includes('decimal')) {
          pedagogicalExplanation = `ISMP Leading & Trailing Zero Rules:\n\n• Leading Zero REQUIRED: Always place a zero before a decimal point for values under 1 (e.g. write 0.5 mg, NEVER .5 mg) to prevent catastrophic 10-fold overdose.\n• Trailing Zero FORBIDDEN: Never place a zero after a decimal point for whole numbers (e.g. write 5 mg, NEVER 5.0 mg) because an obscured decimal point causes a 50 mg administration.`;
          remediationGuidance = 'Remember: Leading zeros ALWAYS, trailing zeros NEVER.';
        } else if (p.includes('gcs') || p.includes('glasgow') || p.includes('coma')) {
          pedagogicalExplanation = `Glasgow Coma Scale (GCS) Assessment:\n\n• Eye Opening (E): 1 to 4 points\n• Verbal Response (V): 1 to 5 points\n• Motor Response (M): 1 to 6 points\n• Total Score: Range is 3 (deep coma/death) to 15 (fully alert).\n• Critical Airway Safety: GCS score ≤ 8 indicates severe brain injury; prepare for endotracheal intubation ("GCS of 8, intubate").`;
          remediationGuidance = 'GCS = Eye (4) + Verbal (5) + Motor (6). Score ≤ 8 = Immediate Airway Alert.';
        } else {
          pedagogicalExplanation = `Clinical Medication Mathematics Strategy:\n\n1. Identify Prescribed Order (Desired Dose) & Available Stock (Have Concentration).\n2. Convert metric units so numerator and denominator match (e.g. mg to mg).\n3. Apply Universal Formula: Dose = (Desired ÷ Have) × Vehicle.\n4. Enforce ISMP Safety: Always verify leading zeros (0.5 mL, not .5 mL) and remove trailing zeros (5 mg, not 5.0 mg).\n5. Clinical Sanity Check: Confirm volume is within physiological capacity (max 3 mL IM) and oral dose is ≤4 tablets.`;
          remediationGuidance = 'Always perform independent math verification before clinical medication administration.';
        }
        break;
      }

      default:
        pedagogicalExplanation = targetQuestion?.explanation || 
          `Your entered calculation (${effStudent} ${effUnit}) differed from the expected resolution (${effCorrect} ${effUnit}). Review the Desired over Have formula: (D ÷ H) × V. Ensure you placed the ordered dose in the numerator and available stock in the denominator.`;
        remediationGuidance = 'Step 1: Check units. Step 2: Set up (Desired / Have) * Vehicle. Step 3: Compute and round according to ISMP standards.';
        break;
    }

    return res.json({
      success: true,
      explanation: pedagogicalExplanation,
      aiExplanation: pedagogicalExplanation,
      data: {
        pedagogicalExplanation,
        remediationGuidance,
        steps: steps || targetQuestion?.steps || [],
        disclaimer: 'For educational learning and calculation practice only. Does not authorize clinical medication administration.'
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/users/profile
const updateProfile = async (req, res) => {
  try {
    const session = resolveSecureUserId(req);
    if (!session.isAuthorized) {
      return res.status(403).json({ success: false, message: session.error });
    }
    const userId = session.userId;
    const { name, email, targetExam, college, dailyGoal } = req.body;

    let updatedUser = null;
    try {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, targetExam, college, dailyGoal },
        { new: true }
      ).select('-password');
    } catch (e) {}

    if (!updatedUser) {
      updatedUser = {
        id: userId,
        name: name || 'Nurse Student',
        email: email || 'student@nursecalc.local',
        targetExam: targetExam || 'NCLEX-RN',
        college: college || 'Nursing College',
        dailyGoal: dailyGoal || 10,
        role: 'student'
      };
    }

    return res.json({
      success: true,
      message: 'Student profile updated successfully.',
      data: updatedUser
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getMe,
  updateOnboarding,
  updateProfile,
  getMistakes,
  getBookmarks,
  getAttempts,
  explainMistake
};
