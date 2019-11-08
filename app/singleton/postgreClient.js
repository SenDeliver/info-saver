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

setImmediate(async () => {
    await pgDB.any(`CREATE TABLE IF NOT EXISTS pages (
                     id serial not null unique,
                     json_template jsonb not null,
                     external_key text not null unique
                     );`
    );
});

module.exports = {
    pgDB
};