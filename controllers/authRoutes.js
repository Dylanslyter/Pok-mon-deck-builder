const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

// Define the login route which uses the loginUser controller function
router.post('/login', loginUser);

module.exports = router; // Export the router