const User = require('../models/User');

// @desc    Get all users (Students & Admins) for the dashboard
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// @desc    Approve a pending admin account
// @route   PUT /api/admin/users/:id/approve
// @access  Private/Admin
const approveAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isApproved = true;
    await user.save();

    res.json({ message: 'Admin account successfully approved', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve user' });
  }
};

module.exports = {
  getAllUsers,
  approveAdmin
};