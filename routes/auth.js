const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  register,
  confirmationEmail,
  login,
  getMe,
  resendEmail,
  forgotPassword,
  resetPassword,
  updateInfo,
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

// @route   POST /api/auth/forgotpassword
// @desc    Forgot password
// @access  Public
router.post(
  '/forgotpassword',
  [check('email', 'Please include a valid email').isEmail()],
  forgotPassword
);

// @route   PUT /api/auth/resetpassword/:resetToken
// @desc    Reset password
// @access  Public
router.put(
  '/resetpassword/:resetToken',
  [
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  resetPassword
);

// @route   PUT api/auth/updateinfo
// @desc    Update info
// @access  Private
router.put(
  '/updateinfo',
  protect,
  [check('name', 'Name is required').not().isEmpty()],
  updateInfo
);

module.exports = router;
