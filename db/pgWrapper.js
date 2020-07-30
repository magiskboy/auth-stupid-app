module.exports = {
  query: query
}

const Pool = require('pg').Pool;
const PG_INFO = {
  user: process.env.PG_USERNAME || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'oauth2'
}

function query(queryString, cbFunc) {
  const pool = new Pool(PG_INFO);

  pool.query(queryString, (error, results) => {
    cbFunc(setResponse(error, results));
  });
}

function setResponse(error, results) {
  return {
    error: error,
    results: results ? results : null
  }
}
