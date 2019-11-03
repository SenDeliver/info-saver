const { Client } = require('pg');
const pgClient = Client();

// (async () => await pgClient.connect())();
pgClient.connect();

module.exports = {
    pgClient
};