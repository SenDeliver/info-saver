const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const loggerMiddleware = require('./middleware/logger.middleware');
const errorHandlerMiddleware = require('./middleware/error.middleware');
const log = require('./singleton/logger');

const pageCtrl = require('./controllers/page');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());

app.use(loggerMiddleware);

app.use('/page', pageCtrl);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => log.info(`Start in port: ${PORT}`));
