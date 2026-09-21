const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'nursecalc_secret_mvp_key_2026';

/**
 * Strict authentication middleware. Rejects any request missing a valid Bearer token.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired authorization token.' });
  }
};

/**
 * Optional authentication middleware.
 * If a token is provided, validates it and populates req.user.
 * If no token is provided, allows guest continuation (req.user = null).
 */
const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
      } catch (tokenErr) {
        // Provided an invalid token
        return res.status(401).json({ success: false, message: 'Invalid or expired authorization token.' });
      }
    }
    next();
  } catch (err) {
    next();
  }
};

/**
 * Defense against IDOR / BOLA (Broken Object Level Authorization):
 * Enforces that users can only query/modify their own resources.
 */
const resolveSecureUserId = (req) => {
  if (req.user && req.user.id) {
    return { userId: String(req.user.id), isAuthorized: true };
  }

  // Guest / Offline fallback: only allow 'demo_student' or 'guest_*' identifiers
  const requestedId = req.query.userId || req.body.userId || 'demo_student';
  if (requestedId === 'demo_student' || requestedId.startsWith('guest_') || requestedId.startsWith('mem_')) {
    return { userId: requestedId, isAuthorized: true };
  }

  // Prevent unauthenticated callers from targeting arbitrary registered user IDs
  return { userId: null, isAuthorized: false, error: 'Authentication required to access registered user records.' };
};

module.exports = {
  authMiddleware,
  optionalAuthMiddleware,
  resolveSecureUserId
};

