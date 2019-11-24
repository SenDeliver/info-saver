const pgp = require('pg-promise')();
const log = require('./logger');
const {pgCn} = require('../conf');

const pgDB = pgp(pgCn);

setImmediate(async () => {
    try {
        await pgDB.any(`CREATE TABLE IF NOT EXISTS pages (
                     id serial not null unique,
                     json_template jsonb not null,
                     external_id text not null unique,
                     access_token_read text default null,
                     access_token_update text default null,
                     access_token_delete text default null,
                     protection_level integer default 10
                     );`
        );
    } catch (e) {
        log.error(e);
    }
});

module.exports = {
    pgDB
};