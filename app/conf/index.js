const pgCn = Object.freeze({
    host:       process.env.PG_HOST     || 'localhost',
    port:       process.env.PG_PORT     || 5432,
    database:   process.env.PG_DATABASE || 'postgres',
    user:       process.env.PG_USER     || 'postgres',
    password:   process.env.PG_PASSWORD || 'root'
});

const PORT = process.env.API_PORT || '3001';
const HOST = process.env.API_HOST || 'http://localhost';
const URL = `${HOST}:${PORT}`;

module.exports = {
  pgCn,
  PORT,
  HOST,
  URL
};