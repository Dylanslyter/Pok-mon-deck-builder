const axios = require('axios');
const { Favorite, Deck, DeckItems } = require('../models/index');

async function signup(req, res) {
    res.render("signuppage", {pageTitle: "Pokémon Team Builder"})
}

async function login(req, res) {
    res.render("loginpage", {pageTitle: "Pokémon Team Builder"})
}

async function deck(req, res) {
    const deckList = await Deck.findAll({
        // order: [['pokemonId', 'ASC']],
    });
    res.render("deckspage", {pageTitle: "Pokémon Team Builder", decks:deckList})
}

async function favorite(req, res) {
    const pokemonFavorites = await Favorite.findAll({
        order: [['pokemonId', 'ASC']],
      });
    res.render("favoritespage", {pageTitle: "Pokémon Team Builder", favorites:pokemonFavorites })
   
}

async function pokemonList(req, res) {
    const base = "https://pokeapi.co/api/v2/";
    const path = "pokemon?limit=100000&offset=0";
    const myFavorites = await Favorite.findAll({
        where: {
            userId: req.session.userId
        }
    })

    const response = await axios.get(`${base}${path}`);
    const data = response.data;
    const pokemon = data.results.map(result => {
        const urlParts = result.url.split('/');
        const id = parseInt(urlParts[urlParts.length -2]);
        console.log(urlParts);
        return {
        ...result,
        id,
        favorited: Boolean(myFavorites.find(favorite => favorite.pokemonId === id))
    }
    });
    res.render("pokemonListpage", {pageTitle: "Pokémon Team Builder", data: pokemon})
};

async function pokemonDetail(req, res) {
 
        const { name } = req.params; 
        const path = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = await axios.get(path);
        console.log(response.data)
        res.render("pokemonDetailpage", { pageTitle: "Pokémon Team Builder", data:response.data });

}
module.exports = { signup, login, deck, pokemonList,
    pokemonDetail, favorite };
