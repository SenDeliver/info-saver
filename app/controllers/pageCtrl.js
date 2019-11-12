const express = require('express');
const router = express.Router();

const R = require('ramda');
const httpStatus = require('http-status-codes');

const sendResponse = require('../singleton/sendResponse');
const response = require('../utils/router-error-handler');
const {formatError} = require('../utils/helper');
const Page = require('./Page');

router.post('/', response(create));

router.get('/:id', response(get));

async function create(req, res) {
    const eid = R.pathOr(null, ['query', 'eid'], req);

    const page = new Page({key: eid});

    page.validate(req.body);
    await page.save();

    const URI = page.makeURI();

    sendResponse(req, res, {data: {URI}});
}

async function get(req, res) {
    const id = R.pathOr(null, ['params', 'id'], req);

    if (!id) formatError({
        errorMessage: 'Invalid id',
        httpCode: httpStatus.BAD_REQUEST
    });

    const page = new Page({key: id});
    const pageJSON = await page.getPage();

    sendResponse(req, res, {
        data: pageJSON
    })
}


module.exports = router;