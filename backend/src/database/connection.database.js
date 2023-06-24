const mariadb = require('mariadb');
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

const pool = mariadb.createPool({
 
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,

  connectionLimit: 5, 
});

module.exports = pool;