const elasticClient = require('../utils/singleton/elasticSearch');

const saveData = async ({key, value}) => {
    return true;
};

module.exports = {
    saveData
};