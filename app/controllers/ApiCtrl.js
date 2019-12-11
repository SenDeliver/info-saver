const express = require('express');
const response = require('../utils/router-error-handler');

class ApiCtrl {
    constructor() {
        this.router = express.Router();
        this.response = response;
    }
}

module.exports = {ApiCtrl};
