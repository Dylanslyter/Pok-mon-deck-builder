const axios = require('axios');
const APIBase = 'https://pokeapi.co/api/v2/';
const { User, Favorite } = require('../../models/index');

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
  const { pokemonId } = req.body;
  const favorite = await Favorite.findOne({
    where: {
        userId: req.session.userId,
        pokemonId
    }
  })

   if(favorite){
        await favorite.destroy();
        return res.json({ Message: 'Pokemon removed from favorites!' });

   } else{
        await Favorite.create({
            userId: req.session.userId,
            pokemonId
        })
        return res.json({ Message: 'Pokemon added to favorites!' });

   }
};

async function getFavorites(req, res) {
  const favorites = req.user.favorites || [];
  const favoritePokemon = await Promise.all(
    favorites.map(async (id) => {
      const response = await axios.get(`${APIBase}pokemon/${id}`);
      return response.data;
    }),
  );

  res.json(favoritePokemon);
}

module.exports = { deckList, addToFavorites, getFavorites };

// async function deckList(req, res) {
//     try {
//         const base = "https://pokeapi.co/api/v2/";
//         const path = "pokemon?limit=100000&offset=0";

//         const response = await axios.get(`${base}${path}`);
//         const data = response.data;

//         res.json(data);
//     } catch (error) {
//         console.error('Error fetching data from API:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

