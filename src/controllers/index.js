const moment = require('moment');

const db = require('../db');

function getStatus(online) {
    return online ? 'On' : 'Off';
}

module.exports = async (req, res) => {
    let errors = [];
    try {
        errors = JSON.parse(req.query.errors);
    } catch(err) {
        // do nothing
    }

    let selectResponse;
    try {
        selectResponse = await db.query(`
            SELECT * from players
            WHERE online = true
            ORDER BY registered
        `);
    } catch(err) {
        res.render('index', { rows: [], errors: ['can\'t get players'] });
        return;
    }

    const rows = selectResponse.rows.map(row => {
        const { id, nickname, email, registered, online } = row;
        const date = moment.unix(registered).format('DD.MM.YYYY hh:mm:ss');
        const status = getStatus(online);

        return [ nickname, email, date, status ];
    });


    res.render('index', { rows, errors });
};
