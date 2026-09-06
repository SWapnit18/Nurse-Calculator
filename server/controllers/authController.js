const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'nursecalc_secret_mvp_key_2026';

// In-memory fallback if MongoDB is not running locally
const memoryUsers = [];

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    try {
      user = await User.create({ name, email, password: hashedPassword });
    } catch (dbErr) {
      // In-memory fallback
      const existing = memoryUsers.find(u => u.email === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ error: 'Email already registered.' });
      }
      user = { id: `mem_${Date.now()}`, name, email: email.toLowerCase(), role: 'student' };
      memoryUsers.push({ ...user, password: hashedPassword });
    }

    const token = jwt.sign({ id: user._id || user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id || user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required.' });
    }

    let user;
    let validPass = false;

    try {
      user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        validPass = await bcrypt.compare(password, user.password);
      }
    } catch (dbErr) {
      const memUser = memoryUsers.find(u => u.email === email.toLowerCase());
      if (memUser) {
        validPass = await bcrypt.compare(password, memUser.password);
        user = memUser;
      }
    }

    // Default demo login student@nursecalc.local / Demo1234!
    if (!user && email.toLowerCase() === 'student@nursecalc.local' && password === 'Demo1234!') {
      user = { id: 'demo_student', name: 'Demo Student', email: 'student@nursecalc.local', role: 'student' };
      validPass = true;
    }

    if (!user || !validPass) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id || user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      token,
      user: { id: user._id || user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login
};
