const express = require('express');
const router = express.Router();

const R = require('ramda');
const uuidv4 = require('uuid/v4');

const sendResponse = require('../singleton/sendResponse');
const response = require('../utils/router-error-handler');
const helper = require('../utils/helper');
const db = require('../services/DBService');

router.post('/', response(create));

router.get('/:id', async (req, res) => {
    sendResponse(req, res, {data:'hi router get page from id'});
});

router.put('/:id', (req, res) => {
    res.send('hi router put page from id')
});

router.delete('/:id', (req, res) => {
    res.send('hi router delete page from id')
});

async function create(req, res) {
    const data = req.body;

    if (R.isEmpty(data)) throw new Error('Invalid data');

    const key = uuidv4();

    const saveDataResult = await db.savePage({
        key,
        value: data
    });

    if (saveDataResult) {
        const URL = helper.makeUrlWithKey(key);

        sendResponse(req, res, {data: {URL}});
    } else {
        throw new Error(`Can't save data`);
    }
}


module.exports = router;