const { Sequelize } = require('sequelize');
require('dotenv').config();

let config;

if (process.env.JAWSDB_URL) {
  config = {
    dialect: 'mysql',
    protocol: 'mysql',
    host: process.env.JAWSDB_URL,
    port: 3306,
    logging: false,
    name: process.env.JAWSDB_DB,
    username: process.env.JAWSDB_USER,
    password: process.env.JAWSDB_PASSWORD,
  };
} else {
  config = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: false,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
  };
}

const instance = new Sequelize(config);

instance.authenticate()
  .then(() => {
    console.log('Database connection established');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

module.exports = { sequelize: instance };

