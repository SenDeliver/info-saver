const express = require('express');
const router = express.Router();

const R = require('ramda');

const sendResponse = require('../singleton/sendResponse');
const response = require('../utils/router-error-handler');
const Page = require('./Page');

router.post('/', response(create));

router.get('/:id', response(get));

async function create(req, res) {
    const page = new Page();

    page.validate(req.body);
    await page.save();

    const URL = page.makeURL();

    sendResponse(req, res, {data: {URL}});
}

async function get(req, res) {
    const id = R.pathOr(null, ['params', 'id'], req);

    if (!id) throw new Error('Invalid id');

    const page = new Page({key: id});
    const pageJSON = await page.getPage();

    sendResponse(req, res, {
        data: pageJSON
    })
}


module.exports = router;