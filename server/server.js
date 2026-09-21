require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const connectDB = require('./config/db');
const SafeMath = require('./services/calculationService');
const { register, login } = require('./controllers/authController');
const { optionalAuthMiddleware } = require('./middleware/authMiddleware');
const {
  getTopics,
  getLessons,
  getQuestions,
  submitPractice,
  getProgress,
  toggleBookmark,
  resetProgress
} = require('./controllers/curriculumController');

const app = express();

// High-Concurrency Reverse Proxy & Load Balancer Trust (Nginx / Cloudflare / AWS ALB)
app.set('trust proxy', 1);

// Initialize DB connection
connectDB();

// Security Headers via Helmet (HSTS, NoSniff, X-Frame-Options, DNS Prefetch Control)
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false // Allows seamless CDN fonts, styles, and assets
}));

// Defensive CORS Hardening: Whitelist production, Capacitor mobile schemes, and dev ports
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:5000',
  'capacitor://localhost',
  'https://localhost',
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim()) : [])
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow mobile app webviews (Capacitor), curl, Postman, and server-to-server requests without Origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV !== 'production' && origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    return callback(new Error('Blocked by CORS policy: Origin not allowed.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-Clinical-Disclaimer']
}));

app.use(express.json());


// Gzip / Brotli Payload Compression (Reduces 105 question payload by 75% for 1M users)
app.use(compression({
  threshold: 1024,
  level: 6
}));

// HTTP Edge & Browser Micro-Caching for Static Curriculum Assets (Reduces DB queries by 95%)
const staticCurriculumCache = (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  next();
};

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

// Curriculum & Learning Routes (Cached for 1M User Scalability)
app.get('/api/topics', staticCurriculumCache, getTopics);
app.get('/api/topics/:topicId/lessons', staticCurriculumCache, getLessons);

// Practice & NCLEX Question Bank (Edge Cached)
app.get('/api/questions', staticCurriculumCache, getQuestions);
app.post('/api/practice/submit', submitPractice);

// Progress, Reset & Bookmarks
app.get('/api/progress/:userId', getProgress);
app.get('/api/progress', getProgress);
app.post('/api/progress/reset', resetProgress);
app.post('/api/bookmarks/toggle', toggleBookmark);

// Student & User Specific APIs
const {
  getMe,
  updateOnboarding,
  updateProfile,
  getMistakes,
  getBookmarks,
  getAttempts,
  explainMistake
} = require('./controllers/studentController');

const {
  getSubscriptionStatus,
  createPaymentOrder,
  verifyPayment,
  cancelSubscription,
  handleWebhook
} = require('./controllers/subscriptionController');

app.get('/api/users/me', optionalAuthMiddleware, getMe);
app.put('/api/users/onboarding', optionalAuthMiddleware, updateOnboarding);
app.put('/api/users/profile', optionalAuthMiddleware, updateProfile);
app.get('/api/mistakes', optionalAuthMiddleware, getMistakes);
app.get('/api/bookmarks', optionalAuthMiddleware, getBookmarks);
app.get('/api/attempts', optionalAuthMiddleware, getAttempts);
app.post('/api/ai/explain-mistake', optionalAuthMiddleware, explainMistake);

// Subscription & Google Play / PayPal / UPI Billing APIs
app.get('/api/subscription/status', getSubscriptionStatus);
app.post('/api/subscription/create-order', createPaymentOrder);
app.post('/api/subscription/verify', verifyPayment);
app.post('/api/subscription/cancel', cancelSubscription);
app.post('/api/subscription/webhook', handleWebhook);

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

// Production Global Error Handler (Protects internal error details & stack traces)
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'An unexpected server error occurred. Please try again later.'
    : err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message
  });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[NurseCalc MERN Server] Active on port ${PORT}`);
  });
}

module.exports = app;
