const axios = require('axios');

async function deckList(req, res) {
    try {
        const base = "https://pokeapi.co/api/v2/";
        const path = "pokemon?limit=100000&offset=0";

        const response = await axios.get(`${base}${path}`);
        const data = response.data;

        res.json(data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { deckList };
