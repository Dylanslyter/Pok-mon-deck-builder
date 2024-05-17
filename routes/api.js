const express = require('express');
const router = express.Router();
const { loginUser, signupUser, logout } = require('../controllers/api/authController'); 
const { deckList } = require('../controllers/api/deckController');

// /api/login
router.post('/login', loginUser);
// /api/signup
router.post('/signup', signupUser); 
// /api/logout
router.get('/logout', logout);
// /api/deck/list
router.get ('/deck/list', deckList);




module.exports = router;

