const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Deck extends Sequelize.Model {};


const validationRules = {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }
  

  
Deck.init(validationRules, {
    sequelize,
    modelName: 'deck'
});

module.exports = Deck;