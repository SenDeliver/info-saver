const log = require('../singleton/logger');
const httpStatus = require('http-status');
const sendResponse = require('../singleton/sendResponse');
const {HttpError} = require('../utils/helper');

module.exports = (err, req, res, next) => {
    log.error(err);

    let httpCode = httpStatus.INTERNAL_SERVER_ERROR;
    let data = { error: err.message };

    if (err instanceof HttpError) httpCode = err.httpCode;

    sendResponse(req, res, {
        httpCode,
        data
    })
};