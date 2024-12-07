require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || 'adminroot',
  DB_NAME: process.env.DB_NAME || 'store'
};
