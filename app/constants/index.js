const PORT = process.env.API_PORT || '3001';
const HOST = process.env.API_HOST || 'http://localhost';
const URL = `${HOST}:${PORT}`;

module.exports = {
    URL,
    PORT
};