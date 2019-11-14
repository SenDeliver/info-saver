const { pgDB } = require('../singleton/postgreClient');

const savePage = async ({eid, value, access_token}) => {
    return await pgDB.one(
        `insert into pages(json_template, external_id, access_token) VALUES($1, $2, $3) RETURNING id`,
        [value, eid, access_token]
    );
};

const getPage = async (eid) => {
    return await pgDB.any(`select * from pages where external_id = '${eid}';`);
};

const updatePage = async ({data, eid}) => {
    return await pgDB.one(`update pages
                           set json_template = $1
                           where external_id = $2
                           returning id;`,
        [data, eid]
        );
};

module.exports = {
    savePage,
    getPage,
    updatePage
};