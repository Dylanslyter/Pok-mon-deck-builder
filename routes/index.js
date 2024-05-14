const express = require('express');
const router = express.Router();
const { home, deck, team, favorite } = require('../controllers/homeController');

router.get ('/', home)
router.get ('/deck', deck)
router.get ('/team', team)
router.get ('/favorite', favorite)

module.exports = router;