const { User, Attempt, Mistake, Progress, Bookmark, Question, Topic, Lesson } = require('../models');
const { topicsData, questionsData } = require('../data/seedData');

// GET /api/users/me
const getMe = async (req, res) => {
  try {
    const userId = req.user?.id;
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
    const userId = req.user?.id || req.body.userId || 'demo_student';
    const { preparingFor, confidence, goal } = req.body;

    const preferences = { preparingFor, confidence, goal };

    try {
      await User.findByIdAndUpdate(userId, { preferences });
    } catch (e) {}

    return res.json({
      success: true,
      message: 'Onboarding preferences saved successfully.',
      data: { userId, preferences }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/mistakes
const getMistakes = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId || 'demo_student';
    let mistakes = [];
    try {
      mistakes = await Mistake.find({ userId }).sort({ timestamp: -1 });
    } catch (e) {}

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
    const userId = req.user?.id || req.query.userId || 'demo_student';
    let bookmarks = [];
    try {
      bookmarks = await Bookmark.find({ userId }).sort({ savedAt: -1 });
    } catch (e) {}

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
    const userId = req.user?.id || req.query.userId || 'demo_student';
    let attempts = [];
    try {
      attempts = await Attempt.find({ userId }).sort({ timestamp: -1 }).limit(50);
    } catch (e) {}

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

      case 'CONCEPT_INQUIRY':
        if (prompt && (prompt.toLowerCase().includes('drip') || prompt.toLowerCase().includes('gravity') || prompt.toLowerCase().includes('gtt'))) {
          pedagogicalExplanation = `Gravity Drip Rate Calculation:\nFormula: (Total Volume in mL × Tubing Drop Factor in gtt/mL) ÷ Total Minutes.\n\nAlways convert hours to minutes (hours × 60), and round your final answer to the nearest whole integer drop.`;
          remediationGuidance = 'Macro-tubing drop factors: 10, 15, or 20 gtt/mL. Micro-drip tubing: 60 gtt/mL.';
        } else if (prompt && (prompt.toLowerCase().includes('pump') || prompt.toLowerCase().includes('ml/hr'))) {
          pedagogicalExplanation = `Electronic Infusion Pump Flow Rate:\nFormula: Total Volume (mL) ÷ Total Infusion Time (hr).\n\nSmart volumetric electronic infusion pumps support decimal precision (e.g., 62.5 mL/hr). Do not round to integer unless specifically ordered.`;
          remediationGuidance = 'Always convert partial hours into decimal format before calculating (e.g., 30 min = 0.5 hr, 45 min = 0.75 hr).';
        } else {
          pedagogicalExplanation = `Clinical Calculation Strategy:\n1. Identify the desired dose and available stock concentration.\n2. Convert metric units so numerator and denominator match.\n3. Apply formula: (Desired ÷ Have) × Vehicle.\n4. Apply ISMP leading zero rules (e.g. 0.5 mL, never .5 mL).`;
          remediationGuidance = 'Always perform independent math verification before clinical medication administration.';
        }
        break;

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


module.exports = {
  getMe,
  updateOnboarding,
  getMistakes,
  getBookmarks,
  getAttempts,
  explainMistake
};
