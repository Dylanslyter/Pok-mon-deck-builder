const express = require('express');
const router = express.Router();
const { home, deck, pokemonList, pokemonDetail, favorite } = require('../controllers/homeController');

router.get ('/', home)
router.get ('/deck', deck)
router.get ('/pokemon', pokemonList)
router.get ('/favorite', favorite)
router.get('/pokemon/:name', pokemonDetail);

module.exports = router;