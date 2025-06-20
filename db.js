const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',           
  host: 'localhost',          
  database: 'ipo_db',       
  password: 'anshika.123',  
  port: 5432,                 
});

module.exports = pool;
