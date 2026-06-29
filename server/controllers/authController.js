const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, password, username, deviceId, role } = req.body;
  try {
    const isFirst = (await User.countDocuments({})) === 0;
    const assignedRole = isFirst ? 'admin' : (role || 'student');
    const isApproved = isFirst || assignedRole === 'student';

    if (assignedRole === 'student') {
      if (!username || !deviceId) return res.status(400).json({ message: 'Missing student fields' });
      if (await User.findOne({ username })) return res.status(400).json({ message: 'Username taken' });
      const user = await User.create({ username, deviceId, role: assignedRole, isApproved });
      return res.status(201).json({ _id: user._id, username: user.username, role: user.role, isApproved: user.isApproved, token: generateToken(user._id) });
    }

    if (!email || !password || !name) return res.status(400).json({ message: 'Missing admin fields' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email exists' });
    const user = await User.create({ name, email, password, role: assignedRole, isApproved });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, isApproved: user.isApproved, token: generateToken(user._id) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const loginUser = async (req, res) => {
  const { email, password, username, deviceId, battery } = req.body;
  try {
    if (username) {
      const user = await User.findOne({ username, role: 'student' });
      if (!user || user.deviceId !== deviceId) return res.status(401).json({ message: 'Invalid credentials' });
      if (battery) { user.deviceData = { battery, status: 'Online', lastSync: new Date() }; await user.save(); }
      return res.json({ _id: user._id, username: user.username, role: user.role, token: generateToken(user._id) });
    }
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      if (!user.isApproved) return res.status(401).json({ message: 'Account pending approval' });
      return res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
    }
    res.status(401).json({ message: 'Invalid email or password' });
  
} catch (e) { 
  console.error("LOGIN ERROR STACK:", e); 
  res.status(500).json({ message: e.message }); 
}
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  } catch (e) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = { registerUser, loginUser, getMe };