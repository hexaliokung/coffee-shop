// IMPORT
const express = require('express');
const router = express.Router();

// Middleware
const authenticateToken = require('../middlewares/authMiddleware');

// Import controller
const { register,login,currentUser } = require('../controllers/auth');


// @ENDPOINT http://localhost:5001/api/register
// ส่วนนี้คือการ login และ register ที่ห้ามใช้ authenticate เพราะจะต้อง post
router.post('/register', register) // register
router.post('/login', login) // login


// ต้องใช้ token
router.post('/current-user', authenticateToken, currentUser);
router.post('/current-admin', authenticateToken, currentUser); // แยกสิทธิ์ admin ภายหลังได้ แต่ไม่มี

// Export router
module.exports = router