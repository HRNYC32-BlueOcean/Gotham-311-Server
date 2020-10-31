const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST } = process.env;

const DB = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

DB.authenticate()
  .then(function () {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports.DB = DB;
