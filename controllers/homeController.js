const axios = require('axios');

async function home(req, res) {
    res.render("homepage", {pageTitle: "pokémon deck builder"})
}
async function deck(req, res) {
    res.render("deckpage", {pageTitle: "pokémon deck builder"})
}
async function favorite(req, res) {
    res.render("favoritespage", {pageTitle: "pokémon deck builder"})
}
async function team(req, res) {
    res.render("teamspage", {pageTitle: "pokémon deck builder"})
}
module.exports = { home, deck, team, favorite };