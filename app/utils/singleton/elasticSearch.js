const elasticSearch = require('elasticsearch');

const url = process.env.ELASTIC_SEARCH_URL || 'localhost';
const port = process.env.ELASTIC_SEARCH_PORT || 9200;
const elascticLog = process.env.ELASTIC_SEARCH_LOG || 'trace';
const elascticApiVersion = process.env.ELASTIC_SEARCH_VERSION || '7.4';

const elastichost = `${url}:${port}`;

const client = new elasticSearch.Client({
    host: elastichost,
    log: elascticLog,
    apiVersion: elascticApiVersion,
});

module.exports = client;