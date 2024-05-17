const axios = require('axios');
async function signup(req, res) {
    res.render("signuppage", {pageTitle: "pokémon deck builder"})
}
async function login(req, res) {
    res.render("loginpage", {pageTitle: "pokémon deck builder"})
}
async function deck(req, res) {
    res.render("deckspage", {pageTitle: "pokémon deck builder"})
}
async function favorite(req, res) {
    res.render("favoritespage", {pageTitle: "pokémon deck builder"})
}
async function pokemonList(req, res) {
    const base = "https://pokeapi.co/api/v2/";
    const path = "pokemon?limit=100000&offset=0";
    const myFavorites = [
        {
            pokemonId: 6,

        }, 
        {
            pokemonId: 9,
        }
    ];

    const response = await axios.get(`${base}${path}`);
    const data = response.data;
    console.log(data)
    const pokemon = data.results.map(result => {
        const urlParts = result.url.split('/');
        const id = parseInt(urlParts[urlParts.length -2]);
        return {
        ...result,
        id,
        favorited: Boolean(myFavorites.find(favorite => favorite.pokemonId === id))
    }
    });
    console.log(pokemon)
    res.render("pokemonListpage", {pageTitle: "pokémon deck builder", data: pokemon})
}
async function pokemonDetail(req, res) {
 
        const { name } = req.params; 
        const path = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const response = await axios.get(path);
        console.log(response.data)
        res.render("pokemonDetailpage", { pageTitle: "Pokémon Deck Builder", data:response.data });

}
module.exports = { signup, login, deck, pokemonList,
    pokemonDetail, favorite };
