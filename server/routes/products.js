const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/products');

router.get('/products', getAllProducts); // → /api/products

module.exports = router;
