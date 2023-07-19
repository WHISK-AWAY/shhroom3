require('dotenv').config();
const DB_URL = process.env.DB_URL;

const Sequelize = require('sequelize');
console.log('DB_URL:', DB_URL);

const db = new Sequelize(DB_URL, {
  logging: false,
});

module.exports = db;
