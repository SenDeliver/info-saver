const R = require('ramda');
const host = process.env.MY_URL || 'http://localhost:3000';

const makeUrlWithKey = key => {
    return `${host}/page/${key}`
};

module.exports = {
    makeUrlWithKey
};