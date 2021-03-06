require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST } = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
  },
});

// const db = new Sequelize(process.env.DATABASE_URL);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

module.exports.db = db;
