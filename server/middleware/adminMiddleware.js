const User = require('../models/User');

const checkRole = (allowedRoles) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.isApproved && allowedRoles.includes(user.role)) {
      return next();
    }
    res.status(403).json({ message: 'Access denied: Insufficient permissions.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error verifying role.' });
  }
};

const adminMiddleware = checkRole(['admin', 'superadmin']);
const superAdminMiddleware = checkRole(['superadmin']);

module.exports = { adminMiddleware, superAdminMiddleware };