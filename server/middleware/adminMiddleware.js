const User = require('../models/User');

const checkRole = (roles) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.isApproved && roles.includes(user.role)) return next();
    res.status(403).json({ message: 'Access denied: Insufficient permissions or pending approval.' });
  } catch (e) { res.status(500).json({ message: 'Server error verifying role.' }); }
};

const adminMiddleware = checkRole(['admin', 'superadmin']);
const superAdminMiddleware = checkRole(['superadmin']);

module.exports = { adminMiddleware, superAdminMiddleware };