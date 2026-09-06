const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const SafeMath = require('./services/calculationService');
const { register, login } = require('./controllers/authController');
const {
  getTopics,
  getLessons,
  getQuestions,
  submitPractice,
  getProgress,
  toggleBookmark
} = require('./controllers/curriculumController');

const app = express();

// Initialize DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// Mandatory Educational Disclaimer Header
app.use((req, res, next) => {
  res.setHeader('X-Clinical-Disclaimer', 'For educational and simulation use only. Not for direct patient dosing authorization.');
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    product: 'NurseCalc MERN Platform',
    version: '1.0.0-MVP',
    ismpCompliant: true,
    roadmapModules: ['Learn', 'Practice', 'Calculator', 'Mistakes', 'Progress', 'AI'],
    timestamp: new Date().toISOString()
  });
});

// Auth Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Curriculum & Learning Routes (5 Topics, 15 Lessons)
app.get('/api/topics', getTopics);
app.get('/api/topics/:topicId/lessons', getLessons);

// Practice & NCLEX Question Bank (105 Questions)
app.get('/api/questions', getQuestions);
app.post('/api/practice/submit', submitPractice);

// Progress & Bookmarks
app.get('/api/progress/:userId', getProgress);
app.get('/api/progress', getProgress);
app.post('/api/bookmarks/toggle', toggleBookmark);

// Student & User Specific APIs
const {
  getMe,
  updateOnboarding,
  getMistakes,
  getBookmarks,
  getAttempts,
  explainMistake
} = require('./controllers/studentController');

const {
  getSubscriptionStatus,
  createPaymentOrder,
  verifyPayment,
  cancelSubscription
} = require('./controllers/subscriptionController');

app.get('/api/users/me', getMe);
app.put('/api/users/onboarding', updateOnboarding);
app.get('/api/mistakes', getMistakes);
app.get('/api/bookmarks', getBookmarks);
app.get('/api/attempts', getAttempts);
app.post('/api/ai/explain-mistake', explainMistake);

// Subscription & Google Play / PayPal / UPI Billing APIs
app.get('/api/subscription/status', getSubscriptionStatus);
app.post('/api/subscription/create-order', createPaymentOrder);
app.post('/api/subscription/verify', verifyPayment);
app.post('/api/subscription/cancel', cancelSubscription);

// Deterministic Calculation Engine Endpoint
app.post('/api/calculate', (req, res) => {
  try {
    const { mode, params } = req.body;
    let result = null;

    switch (mode) {
      case 'injection':
        result = SafeMath.calculateInjection(
          parseFloat(params.desiredMg),
          parseFloat(params.haveMg),
          parseFloat(params.vehicleMl || 1.0)
        );
        break;

      case 'oral':
        result = SafeMath.calculateOral(
          parseFloat(params.desiredMg),
          parseFloat(params.haveMg),
          parseFloat(params.vehicleQty || 1)
        );
        break;

      case 'weight':
        result = SafeMath.calculateWeightBased(
          parseFloat(params.rateMgPerKg),
          parseFloat(params.weight),
          params.weightUnit || 'kg'
        );
        break;

      case 'gravity':
        result = SafeMath.calculateGravityDrip(
          parseFloat(params.volumeMl),
          parseFloat(params.durationHours),
          parseFloat(params.dropFactor || 15)
        );
        break;

      case 'pump':
        result = SafeMath.calculatePumpRate(
          parseFloat(params.volumeMl),
          parseFloat(params.durationHours)
        );
        break;

      case 'gcs':
        result = SafeMath.calculateGCS(
          parseInt(params.eye, 10),
          parseInt(params.verbal, 10),
          parseInt(params.motor, 10)
        );
        break;

      case 'titration':
        result = SafeMath.calculateTitration(
          parseFloat(params.doseMcgKgMin),
          parseFloat(params.patientKg),
          parseFloat(params.bagMg),
          parseFloat(params.bagMl)
        );
        break;

      default:
        return res.status(400).json({ error: `Unsupported calculation mode: ${mode}` });
    }

    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[NurseCalc MERN Server] Active on port ${PORT}`);
  });
}

module.exports = app;
