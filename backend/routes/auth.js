const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

// Simple in-memory user (in production, store in database)
// Default credentials: admin / admin123
let ADMIN_USER = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || null
};

// Hash default password on startup (admin123)
(async () => {
  if (!process.env.ADMIN_PASSWORD) {
    try {
      const hash = await bcrypt.hash('admin123', 10);
      ADMIN_USER.password = hash;
    } catch (err) {
      console.error('Error hashing password:', err);
    }
  }
})();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check credentials
    if (username !== ADMIN_USER.username) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    if (!ADMIN_USER.password) {
      // First time setup - hash the default password
      if (password === 'admin123') {
        ADMIN_USER.password = await bcrypt.hash('admin123', 10);
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      const isValidPassword = await bcrypt.compare(password, ADMIN_USER.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: ADMIN_USER.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      username: ADMIN_USER.username,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/verify - Verify token
router.post('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    res.json({ valid: true, user });
  });
});

module.exports = router;

