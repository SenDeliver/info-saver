const { pgClient } = require('../singleton/postgreClient');

const savePage = async ({key, value}) => {

    return true;
};

module.exports = {
    savePage
};