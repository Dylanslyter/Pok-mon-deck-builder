const express = require('express');
const router = express.Router();
const { loginUser, signupUser } = require('./authController'); // Update the import statement

router.post('/login', loginUser); // Update the function reference
router.post('/signup', signupUser); // Update the function reference

module.exports = router;