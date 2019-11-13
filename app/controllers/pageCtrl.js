const express = require('express');
const router = express.Router();

const R = require('ramda');
const httpStatus = require('http-status-codes');

const sendResponse = require('../singleton/sendResponse');
const response = require('../utils/router-error-handler');
const {formatError} = require('../utils/helper');
const {PageEmerging, PageExisting} = require('./Page');

router.post('/', response(create));

router.get('/:eid', response(get));

async function create(req, res) {
    const eid = R.pathOr(null, ['query', 'eid'], req);
    const make_access_token = R.pathOr(null, ['query', 'make_access_token'], req);

    const page = new PageEmerging({key: eid, make_access_token});

    page.validate(req.body);
    await page.save();

    const URI = page.makeURI();

    sendResponse(req, res, {data: {URI}});
}

async function get(req, res) {
    const eid = R.pathOr(null, ['params', 'eid'], req);
    const access_token = R.pathOr(null, ['query', 'access_token'], req);

    if (!eid) formatError({
        errorMessage: 'Invalid id',
        httpCode: httpStatus.BAD_REQUEST
    });

    const page = new PageExisting({key: eid, access_token});
    const pageJSON = await page.getPage();

    sendResponse(req, res, {
        data: pageJSON
    })
}


module.exports = router;