const httpStatuses = require('http-status');

const sendResponse = (req, res, {httpCode = httpStatuses.OK, data}) => {
    res.status(httpCode).json({data});
};

module.exports = sendResponse;