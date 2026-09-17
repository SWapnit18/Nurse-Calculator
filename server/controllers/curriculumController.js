const { topicsData, lessonsData, questionsData } = require('../data/seedData');
const { Topic, Lesson, Question, Attempt, Mistake, Progress, Bookmark } = require('../models');
const SafeMath = require('../services/calculationService');

// In-memory fallback registries
let memAttempts = [];
let memMistakes = [];
let memBookmarks = [];

// 1. Learn Topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 });
    if (topics && topics.length > 0) return res.json({ success: true, data: topics });
  } catch (e) {}
  res.json({ success: true, data: topicsData });
};

// 2. Lessons by Topic
const getLessons = async (req, res) => {
  const { topicId } = req.params;
  try {
    const lessons = await Lesson.find({ topicId }).sort({ order: 1 });
    if (lessons && lessons.length > 0) return res.json({ success: true, data: lessons });
  } catch (e) {}
  const filtered = lessonsData.filter(l => l.topicId === topicId);
  res.json({ success: true, data: filtered });
};

// 3. All Questions or Filter by Topic / Difficulty
const getQuestions = async (req, res) => {
  const { topicId, difficulty, limit } = req.query;
  try {
    let query = {};
    if (topicId) query.topicId = topicId;
    if (difficulty) query.difficulty = difficulty;
    const questions = await Question.find(query).limit(parseInt(limit) || 100);
    if (questions && questions.length > 0) {
      return res.json({ success: true, count: questions.length, data: questions });
    }
  } catch (e) {}

  let filtered = [...questionsData];
  if (topicId) filtered = filtered.filter(q => q.topicId === topicId);
  if (difficulty) filtered = filtered.filter(q => q.difficulty === difficulty);
  if (limit) filtered = filtered.slice(0, parseInt(limit));

  res.json({ success: true, count: filtered.length, data: filtered });
};

// 4. Practice Attempt Submission & Mistake Classification
const submitPractice = async (req, res) => {
  const { questionId, studentAnswer, timeSpentSeconds, userId } = req.body;
  const uid = userId || 'demo_student';

  const q = questionsData.find(item => item.questionId === questionId);
  if (!q) {
    return res.status(404).json({ error: 'Question not found.' });
  }

  const numericStudent = parseFloat(studentAnswer);
  const numericCorrect = q.correctAnswer;
  const tol = (q.tolerance !== undefined && q.tolerance !== null) ? q.tolerance : 0.05;
  const isCorrect = Math.abs(numericStudent - numericCorrect) <= tol;

  let mistakeType = null;
  let aiExplanation = null;
  let remediationRecommendation = null;

  if (!isCorrect) {
    const diff = Math.abs(numericStudent - numericCorrect);
    const qType = q.questionType || 'generic';

    // 1. Decimal slip — 10x or 100x magnitude error (all types)
    if (
      Math.abs(numericStudent - numericCorrect * 10) < numericCorrect * 0.5 ||
      Math.abs(numericStudent - numericCorrect / 10) < numericCorrect * 0.05 ||
      Math.abs(numericStudent - numericCorrect * 100) < numericCorrect * 5
    ) {
      mistakeType = 'DECIMAL_SLIP_10X';
      aiExplanation = `High-alert 10-fold decimal slip detected. You entered ${numericStudent} instead of ${numericCorrect}. In clinical pharmacology, this mistake can cause severe overdose or acute toxicity.`;
      remediationRecommendation = `Review Topic 1, Lesson 1: ISMP Leading & Trailing Zero Rules.`;

    // 2. Rounding mismatch — ONLY for gravity drip questions (gtt/min must be whole integer)
    } else if (qType === 'gravity_drip' && diff < 1 && numericStudent !== Math.round(numericStudent)) {
      mistakeType = 'ROUNDING_MISMATCH';
      aiExplanation = `Rounding protocol error. Gravity drip calculations must be rounded to the nearest whole integer drop (correct answer: ${Math.round(numericCorrect)} gtt/min), because IV tubing cannot produce fractional drops.`;
      remediationRecommendation = `Review Topic 5, Lesson 1: IV Gravity Drip Rate Calculations.`;

    // 3. Unit conversion error
    } else if (q.topicId === 'unit_conversions' || Math.abs(numericStudent - numericCorrect * 1000) < 1) {
      mistakeType = 'UNIT_CONVERSION_ERROR';
      aiExplanation = `Unit conversion error. Double-check metric orders of magnitude: 1 g = 1,000 mg = 1,000,000 mcg.`;
      remediationRecommendation = `Review Topic 2, Lesson 1: Metric Mass Conversions.`;

    // 4. Type-specific formula errors
    } else if (qType === 'injection' || qType === 'oral') {
      mistakeType = 'FORMULA_ERROR';
      aiExplanation = `Formula error for ${qType === 'injection' ? 'injection' : 'oral dose'} calculation. Correct: (${q.steps?.[1] || 'Desired ÷ Have × Volume'}) = ${numericCorrect} ${q.unit}. You entered ${numericStudent} ${q.unit}.`;
      remediationRecommendation = `Review Topic 3, Lesson 1: The Desired Over Have (D/H × V) Formula.`;

    } else if (qType === 'weight_based') {
      mistakeType = 'WEIGHT_BASED_ERROR';
      aiExplanation = `Weight-based dosing error. Formula: Dose Rate (mg/kg) × Body Weight (kg). Correct: ${numericCorrect} ${q.unit}. You entered ${numericStudent} ${q.unit}.`;
      remediationRecommendation = `Review Topic 4, Lesson 2: Pediatric Weight-Based Dosing.`;

    } else if (qType === 'pump_rate') {
      mistakeType = 'PUMP_RATE_ERROR';
      aiExplanation = `Pump rate error. Formula: Total Volume (mL) ÷ Time (hours). Correct rate: ${numericCorrect} mL/hr. You entered ${numericStudent} mL/hr.`;
      remediationRecommendation = `Review Topic 5, Lesson 2: Volumetric Pump Rate Calculations.`;

    } else {
      mistakeType = 'ARITHMETIC_OR_FORMULA_ERROR';
      aiExplanation = `Arithmetic or formula divergence. Expected: ${numericCorrect} ${q.unit}. You entered: ${numericStudent} ${q.unit}. Review your formula setup.`;
      remediationRecommendation = `Review Topic 3, Lesson 1: The Desired Over Have (D/H × V) Formula.`;
    }


    const mistakeRecord = {
      userId: uid,
      questionId,
      topicId: q.topicId,
      studentAnswer: numericStudent,
      correctAnswer: numericCorrect,
      mistakeType,
      aiExplanation,
      remediationRecommendation,
      timestamp: new Date()
    };

    try {
      await Mistake.create(mistakeRecord);
    } catch (e) {
      memMistakes.push(mistakeRecord);
    }
  }

  const attemptRecord = {
    userId: uid,
    questionId,
    topicId: q.topicId,
    studentAnswer: numericStudent,
    correctAnswer: numericCorrect,
    isCorrect,
    timeSpentSeconds: timeSpentSeconds || 30,
    timestamp: new Date()
  };

  try {
    await Attempt.create(attemptRecord);
  } catch (e) {
    memAttempts.push(attemptRecord);
  }

  res.json({
    success: true,
    isCorrect,
    mistakeType,
    aiExplanation,
    remediationRecommendation,
    correctAnswerFormatted: `${SafeMath.formatISMP(numericCorrect)} ${q.unit}`,
    steps: q.steps,
    clinicalPearls: q.clinicalPearls
  });
};

// 5. Progress Aggregation
const getProgress = async (req, res) => {
  const { userId } = req.params;
  const uid = userId || 'demo_student';

  let attempts = [];
  try {
    attempts = await Attempt.find({ userId: uid }).sort({ timestamp: 1 });
  } catch (e) {
    attempts = memAttempts.filter(a => a.userId === uid);
  }

  const total = attempts.length;
  const correct = attempts.filter(a => a.isCorrect).length;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 1000) / 10;

  // Real-time Day Streak calculation based on distinct activity calendar days
  const activeDateSet = new Set();
  attempts.forEach(a => {
    if (a.timestamp) {
      const d = new Date(a.timestamp);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      activeDateSet.add(dateStr);
    }
  });

  const sortedDates = Array.from(activeDateSet).sort().reverse();
  let streak = 0;
  
  if (sortedDates.length > 0) {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

    // Streak is active if user practiced today or yesterday
    let checkDate = sortedDates[0] === todayStr ? today : (sortedDates[0] === yesterdayStr ? yesterday : null);

    if (checkDate) {
      let currentCheck = new Date(checkDate);
      while (true) {
        const checkStr = `${currentCheck.getFullYear()}-${String(currentCheck.getMonth() + 1).padStart(2, '0')}-${String(currentCheck.getDate()).padStart(2, '0')}`;
        if (activeDateSet.has(checkStr)) {
          streak++;
          currentCheck.setDate(currentCheck.getDate() - 1);
        } else {
          break;
        }
      }
    }
  }

  // Calculate past 7 days weekly study activity
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const past7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = daysOfWeek[d.getDay()];
    const count = attempts.filter(a => {
      if (!a.timestamp) return false;
      const ad = new Date(a.timestamp);
      return `${ad.getFullYear()}-${String(ad.getMonth() + 1).padStart(2, '0')}-${String(ad.getDate()).padStart(2, '0')}` === dateStr;
    }).length;
    past7Days.push({ day: dayLabel, date: dateStr, count });
  }

  const maxCount = Math.max(...past7Days.map(p => p.count), 1);
  const weeklyActivity = past7Days.map(p => ({
    day: p.day,
    value: p.count > 0 ? Math.max(Math.round((p.count / maxCount) * 100), 25) : 0,
    count: p.count
  }));

  // Topic accuracies
  const topicStats = {};
  attempts.forEach(a => {
    if (!topicStats[a.topicId]) topicStats[a.topicId] = { total: 0, correct: 0 };
    topicStats[a.topicId].total++;
    if (a.isCorrect) topicStats[a.topicId].correct++;
  });

  res.json({
    success: true,
    data: {
      userId: uid,
      totalAttempts: total,
      correctAttempts: correct,
      incorrectAttempts: total - correct,
      overallAccuracy: accuracy,
      streak: streak,
      weeklyActivity,
      topicStats,
      recentMistakesCount: total - correct,
      masteryStatus: accuracy >= 85 ? 'NCLEX Mastered (Above 85% Benchmark)' : 'Remediation Required'
    }
  });
};

// 6. Bookmarks
const toggleBookmark = async (req, res) => {
  const { questionId, note, userId } = req.body;
  const uid = userId || 'demo_student';
  try {
    const existing = await Bookmark.findOne({ userId: uid, questionId });
    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return res.json({ success: true, bookmarked: false });
    }
    await Bookmark.create({ userId: uid, questionId, note });
    return res.json({ success: true, bookmarked: true });
  } catch (e) {
    const idx = memBookmarks.findIndex(b => b.questionId === questionId && b.userId === uid);
    if (idx !== -1) {
      memBookmarks.splice(idx, 1);
      return res.json({ success: true, bookmarked: false });
    }
    memBookmarks.push({ userId: uid, questionId, note });
    return res.json({ success: true, bookmarked: true });
  }
};

// 7. Reset Progress & Clean Real-Time State
const resetProgress = async (req, res) => {
  const { userId } = req.body || {};
  const uid = userId || 'demo_student';
  try {
    await Attempt.deleteMany({ userId: uid });
    await Mistake.deleteMany({ userId: uid });
    await Bookmark.deleteMany({ userId: uid });
  } catch (e) {}

  memAttempts = memAttempts.filter(a => a.userId !== uid);
  memMistakes = memMistakes.filter(m => m.userId !== uid);
  memBookmarks = memBookmarks.filter(b => b.userId !== uid);

  return res.json({
    success: true,
    message: 'All student activity reset to 0 initial level.',
    data: {
      totalAttempts: 0,
      correctAttempts: 0,
      accuracy: 0,
      streak: 0
    }
  });
};

module.exports = {
  getTopics,
  getLessons,
  getQuestions,
  submitPractice,
  getProgress,
  toggleBookmark,
  resetProgress
};
