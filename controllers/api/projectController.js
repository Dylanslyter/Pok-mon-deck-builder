const axios = require('axios');
const APIBase = 'https://pokeapi.co/api/v2/';
const { User, Favorite, Deck, DeckItems } = require('../../models/index');

async function fetchPokemonList(limit = 100000, offset = 0) {
  try {
    const path = `pokemon?limit${limit}&offset=${offset}`;
    const response = await axios.get(`${APIBase}${path}`);
    return response.data;
  } catch (error) {
    console.error('Error fectching data from API', error);
    throw error;
  }
}

async function deckList(req, res) {
  try {
    const data = await fetchPokemonList(100000, 0);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function addToFavorites(req, res) {
    console.log(req.body);
  const { pokemonId, pokemonName } = req.body;
  const favorite = await Favorite.findOne({
    where: {
      userId: req.session.userId,
      pokemonId: pokemonId,
      pokemonName: pokemonName
    },
  });

  if (favorite) {
    await favorite.destroy();
    return res.json({ Message: 'Pokemon removed from favorites!' });
  } else {
    await Favorite.create({
      userId: req.session.userId,
      pokemonId: pokemonId,
      pokemonName: pokemonName
    });
    return res.json({ Message: 'Pokemon added to favorites!' });
  }
};

async function addToDeck(req,res) {
    console.log(req.body);
    const { deckId, pokemonName } = req.body;
    await DeckItems.create({
     deckId: deckId,
     pokemonName: pokemonName
    });
};

async function removeFromDeck(req,res) {
    console.log(req.body);
    const { deckId, pokemonName } = req.body;
    await DeckItems.findOne.destroy({
     deckId: deckId,
     pokemonName: pokemonName
    });
};

async function addDeck(req,res){
    console.log(req.body);
    const { name } = req.body;
      await Deck.create({
        userId: req.session.userId,
        name: name
      });
      return res.json({ Message: 'Pokemon added to favorites!' });
    
}


module.exports = { deckList, addToFavorites, addToDeck, addDeck, removeFromDeck };


