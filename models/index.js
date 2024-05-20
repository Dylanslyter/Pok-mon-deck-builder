const User = require('./User');
const Favorite = require('./Favorite');
const Deck = require('./Deck')
const DeckItems = require('./DeckItems')

User.hasMany(Favorite, {
    foreignKey: 'userId'
});

Favorite.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = { User, Favorite, Deck, DeckItems };