const mysql = require('mysql2/promise');

async function connect() { 
  const db = await mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
  );
  return db;
};

module.exports = {
    connect
};