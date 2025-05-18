// IMPORT
const express = require('express');
const router = express.Router();

// Import controller
const { register,login,currentUser } = require('../controllers/auth');


// @ENDPOINT http://localhost:5001/api/register
router.post('/register', register) // register
router.post('/login', login) // login
router.post('/current-user', currentUser) // current user
router.post('/current-admin', currentUser) // current admin


module.exports = router