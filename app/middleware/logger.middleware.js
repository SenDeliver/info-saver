const log = require('../utils/singleton/logger');

module.exports = (req, res, next) => {
    log.info(`%s : %s, %j`, req.method, req.baseUrl, req.body);

    next();
};