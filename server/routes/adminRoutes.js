const express = require('express');
const router = express.Router();
const { getAllUsers, approveAdmin, updateUser } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const { adminMiddleware, superAdminMiddleware } = require('../middleware/adminMiddleware');

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.put('/users/:id/approve', authMiddleware, superAdminMiddleware, approveAdmin);
router.put('/users/:id', authMiddleware, superAdminMiddleware, updateUser);

module.exports = router;