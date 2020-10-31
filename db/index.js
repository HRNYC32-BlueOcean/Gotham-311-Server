const { Sequelize } = require('sequelize');
require('dotenv').config()
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;

const DB = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    timestamps: false
  },
});

DB.authenticate()
  .then(function() {
      console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
      console.log('Unable to connect to the database:', err);
});


module.exports.DB = DB;
