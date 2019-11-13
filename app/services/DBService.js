const { pgDB } = require('../singleton/postgreClient');

const savePage = async ({key, value, access_token}) => {
    return await pgDB.one(
        `insert into pages(json_template, external_key, access_token) VALUES($1, $2, $3) RETURNING id`,
        [value, key, access_token]
    );
};

const getPage = async (key) => {
    return await pgDB.any(`select * from pages where external_key = '${key}';`);
};

module.exports = {
    savePage,
    getPage
};