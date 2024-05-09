const { Sequelize } = require('sequelize');

// Initialize Sequelize with database connection details
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Disable logging to console
});

module.exports = sequelize; // Export the initialized Sequelize instance