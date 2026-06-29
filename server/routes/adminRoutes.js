const express = require('express');
const router = express.Router();
const { getAllUsers, approveAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware'); 

router.route('/users')
  .get(authMiddleware, adminMiddleware, getAllUsers);

router.route('/users/:id/approve')
  .put(authMiddleware, adminMiddleware, approveAdmin);

module.exports = router;