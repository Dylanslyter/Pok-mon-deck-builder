const axios = require('axios');

async function home(req, res) {
    res.render("homepage", {pageTitle: "pokémon deck builder"})
}

module.exports = { home };