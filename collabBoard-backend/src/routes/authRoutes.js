// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
// This route uses the 'protect' middleware to ensure a valid JWT is present
router.get('/me', protect, getMe);

module.exports = router;