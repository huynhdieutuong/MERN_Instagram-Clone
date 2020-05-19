const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Make sure the user has been verified
    req.user = await User.findById(decoded.user.id).select('-password');

    if (!req.user.isVerified) {
      const url = `${req.protocol}://${req.get('host')}/api/auth/resend`;

      return res.status(401).json({
        msg: `Your account has not been verified. <a href=${url}>Click here</a> to resend verification email`,
      });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
