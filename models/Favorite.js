const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');
// const { all } = require('axios');

class Favorite extends Sequelize.Model {}

const validationRules = {
  
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
        model: 'users', //references user table and id field
        key: 'id'
    }
  },
  pokemonId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
//   pokemonName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     primaryKey: true
//   }
};

Favorite.init(validationRules, {
  sequelize,
  modelName: 'favorite'
});

module.exports = Favorite;
