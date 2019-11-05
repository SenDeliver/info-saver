const pgp = require('pg-promise')();

const host = process.env.PG_HOST || 'localhost';
const port = process.env.PG_PORT || 5432;
const database = process.env.PG_DATABASE || 'qr-page';
const user = process.env.PG_USER || 'postgres';
const password = process.env.PG_PASSWORD || 'root';

const pgDB = pgp({
    host,
    port,
    database,
    user,
    password
});

module.exports = {
    pgDB
};