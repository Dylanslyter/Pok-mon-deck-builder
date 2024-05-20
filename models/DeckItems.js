const { sequelize } = require("../config/connection");
const { Sequelize, DataTypes } = require('sequelize');

  
  class DeckItems extends Sequelize.Model{}
  
  const validationRules = {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    deckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'deck',
        key: 'id'
      }
    },
    pokemonName: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  };

  DeckItems.init(validationRules, {
    sequelize,
    modelName: 'deck_items'
  });

  module.exports = DeckItems;