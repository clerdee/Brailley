const express = require('express'); const router = express.Router();
const User = require('../models/User');

router.put('/sync', async (req, res) => {
  const { deviceId, battery, status } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { deviceId },
      { 
        $set: { 
          "deviceData.battery": battery, 
          "deviceData.status": status, 
          "deviceData.lastSync": new Date() 
        } 
      },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'Device not found' });
    res.json({ message: 'Sync successful' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;