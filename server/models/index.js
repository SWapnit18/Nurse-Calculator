const mongoose = require('mongoose');

// 1. User Schema (with 30-Day Free Trial & ₹99/mo Subscription)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor'], default: 'student' },
  preferences: {
    preparingFor: { type: String, default: 'B.Sc Nursing' },
    confidence: { type: String, default: 'Intermediate' },
    goal: { type: String, default: 'Exam preparation' }
  },
  subscription: {
    plan: { type: String, enum: ['free_trial', 'pro_monthly'], default: 'free_trial' },
    status: { type: String, enum: ['trialing', 'active', 'past_due', 'expired'], default: 'trialing' },
    trialStartDate: { type: Date, default: Date.now },
    trialEndDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 Days Free
    },
    currentPeriodEnd: { type: Date },
    paymentMethod: { type: String, default: 'None (Trial)' },
    lastPaymentAmount: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' },
    orderHistory: [{
      orderId: String,
      amount: Number,
      currency: String,
      paymentId: String,
      method: String,
      date: { type: Date, default: Date.now },
      status: { type: String, default: 'PAID' }
    }]
  },
  createdAt: { type: Date, default: Date.now }
});

// 2. Topic Schema (5 Roadmap Topics)
const topicSchema = new mongoose.Schema({
  topicId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
  lessonCount: { type: Number, default: 3 }
});

// 3. Lesson Schema (15 Roadmap Lessons)
const lessonSchema = new mongoose.Schema({
  lessonId: { type: String, required: true, unique: true },
  topicId: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  clinicalKey: { type: String, required: true },
  workedExample: {
    scenario: String,
    formula: String,
    calculation: String,
    result: String,
    ismpRationale: String
  },
  content: [String],
  order: { type: Number, default: 0 }
});

// 4. Question Schema (100+ Question Bank)
const questionSchema = new mongoose.Schema({
  questionId: { type: String, required: true, unique: true },
  topicId: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  title: { type: String, required: true },
  prompt: { type: String, required: true },
  correctAnswer: { type: Number, required: true },
  unit: { type: String, required: true },
  inputLabel: { type: String, required: true },
  tolerance: { type: Number, default: 0.05 },
  steps: [{ type: String }],
  clinicalPearls: { type: String }
});

// 5. Attempt Schema
const attemptSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous_student' },
  questionId: { type: String, required: true },
  topicId: { type: String, required: true },
  studentAnswer: { type: Number, required: true },
  correctAnswer: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
  timeSpentSeconds: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

// 6. Mistake Schema (Mistake Intelligence Classification)
const mistakeSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous_student' },
  questionId: { type: String, required: true },
  topicId: { type: String, required: true },
  studentAnswer: { type: Number, required: true },
  correctAnswer: { type: Number, required: true },
  mistakeType: { 
    type: String, 
    enum: ['DECIMAL_SLIP_10X', 'ROUNDING_MISMATCH', 'UNIT_CONVERSION_ERROR', 'ARITHMETIC_OR_FORMULA_ERROR'],
    required: true 
  },
  aiExplanation: { type: String },
  remediationRecommendation: { type: String },
  timestamp: { type: Date, default: Date.now }
});

// 7. Progress Schema
const progressSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous_student' },
  topicId: { type: String, required: true },
  completedLessons: [{ type: String }],
  totalAttempts: { type: Number, default: 0 },
  correctAttempts: { type: Number, default: 0 },
  accuracyPercentage: { type: Number, default: 100.0 },
  lastPracticed: { type: Date, default: Date.now }
});

// 8. Bookmark Schema
const bookmarkSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous_student' },
  questionId: { type: String, required: true },
  note: { type: String },
  savedAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.models.User || mongoose.model('User', userSchema),
  Topic: mongoose.models.Topic || mongoose.model('Topic', topicSchema),
  Lesson: mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema),
  Question: mongoose.models.Question || mongoose.model('Question', questionSchema),
  Attempt: mongoose.models.Attempt || mongoose.model('Attempt', attemptSchema),
  Mistake: mongoose.models.Mistake || mongoose.model('Mistake', mistakeSchema),
  Progress: mongoose.models.Progress || mongoose.model('Progress', progressSchema),
  Bookmark: mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema)
};
