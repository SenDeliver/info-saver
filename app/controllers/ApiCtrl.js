const express = require('express');
const response = require('../utils/router-error-handler');
const sendResponse = require('../singleton/sendResponse');

class ApiCtrl {
    constructor() {
        this.router = express.Router();
        this.response = response;
        this.sendResponse = sendResponse;
    }
}

module.exports = {ApiCtrl};
