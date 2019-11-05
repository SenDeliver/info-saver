const { pgDB } = require('../singleton/postgreClient');

const savePage = async ({key, value}) => {
    return await pgDB.one(`insert into pages(json_template, external_key) VALUES($1, $2) RETURNING id`, [value, key]);
};

const getPage = async (key) => {
    return await pgDB.any(`select json_template from pages where external_key = '${key}';`);
};

module.exports = {
    savePage,
    getPage
};