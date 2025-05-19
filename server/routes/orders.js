// IMPORT
const express = require('express');
const router = express.Router();

// Middleware
const authenticateToken = require('../middlewares/authMiddleware');

// Import controller
const orderController = require('../controllers/orderController');

// @ENDPOINT http://localhost:5001/api/order
// @ENDPOINT http://localhost:5001/api/order/history
router.post('/orders', authenticateToken, orderController.createOrder);
router.get('/orders/history', authenticateToken, orderController.getOrderHistory);

// Export router
module.exports = router;
