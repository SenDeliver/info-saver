const pgCn = Object.freeze({
    host:       process.env.PG_HOST     || 'localhost',
    port:       process.env.PG_PORT     || 5432,
    database:   process.env.PG_DATABASE || 'postgres',
    user:       process.env.PG_USER     || 'postgres',
    password:   process.env.PG_PASSWORD || 'root'
});

const HEROKU_HOST = 'https://info-saver.herokuapp.com';

const PORT = process.env.PORT || '3001';
const HOST = process.env.API_HOST || 'http://localhost';
const URL = HOST !== HEROKU_HOST ? `${HOST}:${PORT}` : HOST;

module.exports = {
  pgCn,
  PORT,
  HOST,
  URL
};