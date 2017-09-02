const { Pool } = require('pg');

const pool = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'test',
    password: 'user'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};
