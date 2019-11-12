const PORT = process.env.API_PORT || '3001';
const HOST = process.env.API_HOST || 'http://localhost';
const URL = `${HOST}:${PORT}`;

const USER_FRIENDLY_DB_ERROR = Object.freeze({
    "23505": 'This eid already exist'
});

module.exports = {
    URL,
    PORT,
    USER_FRIENDLY_DB_ERROR
};