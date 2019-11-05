const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: 'QR-Page'
});

module.exports = logger;