const {pgDB} = require('../singleton/postgreClient');

const savePage = async (
    {
        eid,
        value,
        protection_level,
        access_token_read = null,
        access_token_update = null,
        access_token_delete = null
    }) => {
    return await pgDB.one(
            `insert into 
            pages(json_template, external_id, protection_level, access_token_read, access_token_update, access_token_delete)
             VALUES($1, $2, $3, $4, $5, $6)
              RETURNING id`,
        [value, eid, protection_level, access_token_read, access_token_update, access_token_delete]
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

const removePage = async eid => {
    return await pgDB.any(`delete from pages where external_id = $1`, [eid]);
};

module.exports = {
    savePage,
    getPage,
    updatePage,
    removePage
};