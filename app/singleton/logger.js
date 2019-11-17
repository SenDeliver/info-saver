const bunyan = require('bunyan');
const {LOG_LEVEL} = require('../conf');

const logger = bunyan.createLogger({
    name: 'info-saver',
    level: LOG_LEVEL
});

module.exports = logger;