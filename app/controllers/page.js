const express = require('express');
const router = express.Router();

const sendResponse = require('../utils/singleton/sendResponse');
const elasticClient = require('../utils/singleton/elasticSearch');

router.post('/', (req, res, next) => {
    res.send('hi router page');
});

router.get('/:id', async (req, res, next) => {

    
    sendResponse(req, res, {data:'hi router get page from id'});
});

router.put('/:id', (req, res, next) => {
    res.send('hi router put page from id')
});

router.delete('/:id', (req, res, next) => {
    res.send('hi router delete page from id')
});


module.exports = router;