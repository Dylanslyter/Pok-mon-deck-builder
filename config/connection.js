const { Sequelize } = require('sequelize');
require('dotenv').config();

let config;

if (process.env.JAWSDB_URL) {
  config = process.env.JAWSDB_URL;
} else {
  config = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: false,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  };
}

const instance = new Sequelize(config);

module.exports = { sequelize: instance };
// instance.authenticate()
//   .then(() => {
//     console.log('Database connection established');
//   })
//   .catch((err) => {
//     console.error('Error connecting to database:', err);
//   });



