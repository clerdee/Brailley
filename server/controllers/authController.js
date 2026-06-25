const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password, username, deviceId, role } = req.body;

  try {
    const totalUsers = await User.countDocuments({});
    const isFirstAccount = totalUsers === 0;

    const assignedRole = isFirstAccount ? 'admin' : (role || 'student');
    const isApproved = isFirstAccount || assignedRole === 'student';

    // ==========================================
    // STUDENT FLOW (MOBILE)
    // ==========================================
    if (assignedRole === 'student') {
      if (!username || !deviceId) {
        return res.status(400).json({ message: 'Username and Device ID are required for students' });
      }

      const userExists = await User.findOne({ username });
      if (userExists) return res.status(400).json({ message: 'Username is already taken' });

      const user = await User.create({ 
        username, 
        deviceId, 
        role: assignedRole, 
        isApproved 
      });

      return res.status(201).json({
        _id: user._id, 
        username: user.username, 
        role: user.role, 
        isApproved: user.isApproved,
        token: generateToken(user._id)
      });
    }

    // ==========================================
    // ADMIN FLOW (WEB PORTAL)
    // ==========================================
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email, and password are required for admins' });
    }

    const adminExists = await User.findOne({ email });
    if (adminExists) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: assignedRole, 
      isApproved 
    });

    return res.status(201).json({
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role, 
      isApproved: user.isApproved,
      token: generateToken(user._id)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password, username, deviceId } = req.body;

  try {
    // ==========================================
    // STUDENT LOGIN FLOW (MOBILE)
    // ==========================================
    if (username) {
      const user = await User.findOne({ username, role: 'student' });
      
      if (!user) return res.status(401).json({ message: 'Username not found' });

      if (user.deviceId !== deviceId) {
        return res.status(401).json({ message: 'Unrecognized device. Please log in from your original phone.' });
      }

      return res.json({
        _id: user._id, 
        username: user.username, 
        role: user.role,
        token: generateToken(user._id)
      });
    }

    // ==========================================
    // ADMIN LOGIN FLOW (WEB PORTAL)
    // ==========================================
    if (email) {
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        if (!user.isApproved) {
          return res.status(401).json({ message: 'Your admin account is pending approval from the Main Admin.' });
        }

        return res.json({
          _id: user._id, 
          name: user.name, 
          email: user.email, 
          role: user.role,
          token: generateToken(user._id)
        });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    res.status(400).json({ message: 'Please provide valid login credentials' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    // Ang req.user.id ay nagmula sa authMiddleware kapag na-verify ang token
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error("Error sa getMe:", error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, getMe };