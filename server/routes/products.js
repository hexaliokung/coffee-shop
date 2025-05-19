// IMPORT
const express = require('express');
const router = express.Router();

// Middleware
// ไม่จำเป็นต้องใช้

// Import controller
const { getAllProducts } = require('../controllers/products');

// @ENDPOINT http://localhost:5001/api/products
router.get('/products', getAllProducts); // → /api/products

// Export router
module.exports = router;