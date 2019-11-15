const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const loggerMiddleware = require('./middleware/logger.middleware');
const errorHandlerMiddleware = require('./middleware/error.middleware');
const {PORT} = require('./constants');
const log = require('./singleton/logger');
const sendResponse = require('./singleton/sendResponse');

const pageCtrl = require('./controllers/pageCtrl');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());

app.use(loggerMiddleware);

app.use('/page', pageCtrl);

app.get('/', (req, res) => sendResponse(req, res, {data: "Hello"}));

app.use(errorHandlerMiddleware);

app.listen(PORT, (err) => {
    if (err) log.fatal(err);
    log.info(`Start on port: ${PORT}`)
});
