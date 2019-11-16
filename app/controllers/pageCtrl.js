const express = require('express');
const router = express.Router();

const R = require('ramda');
const httpStatus = require('http-status-codes');

const sendResponse = require('../singleton/sendResponse');
const response = require('../utils/router-error-handler');
const {formatError} = require('../utils/helper');

const {PageAppear} = require('./Page/PageAppear');
const {PageExist} = require('./Page/PageExist');
const {PageUpdate} = require('./Page/PageUpdate');
const {PageDelete} = require('./Page/PageDelete');

router.post('/', response(create));

router.get('/:eid', response(get));

router.get('/', response((req, res) => sendResponse(req, res, {data: require('../data/wiki')})));

router.put('/:eid', response(update));

router.delete('/:eid', response(remove));

async function create(req, res) {
    const eid = R.pathOr(null, ['query', 'eid'], req);
    const make_access_token = R.pathOr(null, ['query', 'make_access_token'], req);

    const page = new PageAppear({eid, make_access_token});

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

    const page = new PageExist({eid, access_token});
    const pageJSON = await page.getPage();

    sendResponse(req, res, {
        data: pageJSON
    })
}

async function update(req, res) {
    const eid = R.pathOr(null, ['params', 'eid'], req);
    const access_token = R.pathOr(null, ['query', 'access_token'], req);

    if (!eid) formatError({
        errorMessage: 'Invalid id',
        httpCode: httpStatus.BAD_REQUEST
    });

    const page = new PageUpdate({eid, access_token});
    page.validate(req.body);
    await page.update();

    sendResponse(req, res, {
        data: {result: 'Success update'}
    });
}

async function remove(req, res) {
    const eid = R.pathOr(null, ['params', 'eid'], req);
    const access_token = R.pathOr(null, ['query', 'access_token'], req);

    if (!eid) formatError({
        errorMessage: 'Invalid id',
        httpCode: httpStatus.BAD_REQUEST
    });

    const page = new PageDelete({eid, access_token});
    await page.remove();

    sendResponse(req, res, {
        data: {result: 'Success remove'}
    });
}

module.exports = router;