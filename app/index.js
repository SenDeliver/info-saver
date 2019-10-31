const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const loggerMiddleware = require('./middleware/logger.middleware');

const pageCtrl = require('./controllers/page');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '2000kb'}));
app.use(cookieParser());

app.use('*', loggerMiddleware);

app.use('/page', pageCtrl);

app.listen(process.env.PORT || 3000);
