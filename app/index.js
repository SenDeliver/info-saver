const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const loggerMiddleware = require('./middleware/logger.middleware');
const log = require('./utils/singleton/logger');
const httpStatus = require('http-status');

const pageCtrl = require('./controllers/page');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());

app.use(loggerMiddleware);

app.use('/page', pageCtrl);

app.use((err, req, res, next) => {
    log.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(httpStatus.BAD_GATEWAY).json({error: err.message});
});

app.listen(process.env.PORT || 3000);
