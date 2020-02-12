/* eslint-disable no-console */
require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging: process.env.DB_LOG_QUERY !== 'false' ? console.log : false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
