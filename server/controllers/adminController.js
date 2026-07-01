const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

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

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    await user.save();
    res.json(user);
  } catch (error) { res.status(500).json({ message: 'Failed to update' }); }
};

module.exports = { getAllUsers, approveAdmin, updateUser };