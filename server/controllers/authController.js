const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already exists' });

    const totalUsers = await User.countDocuments({});
    const isFirstAccount = totalUsers === 0;

    const assignedRole = isFirstAccount ? 'admin' : (role || 'student');
    const isApproved = isFirstAccount || assignedRole === 'student';

    const user = await User.create({ name, email, password, role: assignedRole, isApproved });

    if (user) {
      res.status(201).json({
        _id: user._id, name: user.name, email: user.email, role: user.role, isApproved: user.isApproved,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      
      if (!user.isApproved) {
        return res.status(401).json({ message: 'Your admin account is pending approval from the Main Admin.' });
      }

      res.json({
        _id: user._id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };