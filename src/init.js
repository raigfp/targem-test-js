const db = require('./db');

module.exports = async (params) => {
    const { dropTable } = params;

    if (dropTable) {
        await db.query('DROP TABLE IF EXISTS players');
    }

    await db.query(`CREATE TABLE IF NOT EXISTS players(
        id SERIAL PRIMARY KEY NOT NULL,
        nickname VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        registered INTEGER NOT NULL,
        online BOOLEAN NOT NULL
    )`);
};
