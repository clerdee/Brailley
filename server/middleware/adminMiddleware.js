const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user && user.role === 'admin' && user.isApproved) {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. You must be an approved Admin.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error verifying admin status' });
  }
};

module.exports = adminMiddleware;