const express = require('express');
const router = express.Router();
const { loginUser, signupUser, logout } = require('../controllers/api/authController'); 
const { deckList, addToFavorites } = require('../controllers/api/deckController');
const withAuth = require('../utils/auth')

// /api/login
router.post('/login', loginUser);
// /api/signup
router.post('/signup', signupUser); 
// /api/logout
router.get('/logout', logout);
// /api/deck/list
router.get ('/deck/list', deckList);
router.post ('/favorite', withAuth, addToFavorites);




module.exports = router;

