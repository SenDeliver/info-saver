const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: 'info-saver'
});

module.exports = logger;