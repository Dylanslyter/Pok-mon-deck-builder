const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the User model with Sequelize
const User = sequelize.define('User', {
    // Define the username field with constraints
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure usernames are unique
    },
    // Define the password field with constraints
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});