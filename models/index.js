const User = require('./User');
const Favorite = require('./Favorite');

User.hasMany(Favorite, {
    foreignKey: 'userId'
});

Favorite.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = { User, Favorite };