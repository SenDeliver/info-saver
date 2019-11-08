const httpStatuses = require('http-status-codes');
const log = require('./logger');

const sendResponse = (req, res, {httpCode = httpStatuses.OK, data}) => {
    log.info(`===>>>> %s : %s, %s - %j`, req.method, req.originalUrl, httpCode, data);

    res.status(httpCode).json(data);
};

module.exports = sendResponse;