const express = require('express');
const router = express.Router();
const { loginUser, signupUser, logout } = require('../controllers/api/authController'); 
const { deckList } = require('../controllers/api/deckController');

router.post('/login', loginUser);
router.post('/signup', signupUser); 
router.post('/logout', logout);
router.get ('/deck/list', deckList);



module.exports = router;

