const bunyan = require('bunyan');
const logger = bunyan.createLogger({
    name: 'QR-Page',
    streams: [
        {
            level: 'info',
            stream: process.stdout            // log INFO and above to stdout
        },
        {
            level: 'error',
            path: 'app/log/errors.log'           // log ERROR and above to a file
        }
    ]
});

module.exports = logger;