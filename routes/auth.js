const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  register,
  confirmationEmail,
  login,
  getMe,
  resendEmail,
} = require('../controllers/auth');

const { protect, protectResend } = require('../middlewares/auth');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  register
);

// @route   GET /api/auth/confirmation/:token
// @desc    Confirmation email
// @access  Public
router.get('/confirmation/:token', confirmationEmail);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  login
);

// @route   GET /api/auth/me
// @desc    Get logged in user
// @access  Private
router.get('/me', protect, getMe);

// @route   GET /api/auth/resend
// @desc    Resend email to verify account
// @access  Private
router.get('/resend', protectResend, resendEmail);

module.exports = router;
