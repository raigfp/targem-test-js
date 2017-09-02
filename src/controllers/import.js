const fs = require('fs');
const parse = require('csv-parse');
const moment = require('moment');

const db = require('../db');

function parseStatus(status) {
    switch(status) {
        case 'On':
            return true;
        case 'Off':
            return false;
        default:
            return null;
    }
}

module.exports = async (req, res) => {
    const data = fs.readFileSync(req.file.path, 'UTF-8');
    parse(data, { delimiter: '; ' }, async (err, parsedData) => {
        parsedData.shift();
        let errors = [];

        for(const row of parsedData) {
            let valid = true;
            const [ nickname, email, date, status ] = row;
            const timestamp = moment(date, 'DD.MM.YYYY hh:mm:ss').unix();
            const online = parseStatus(status);

            if (isNaN(timestamp)) {
                errors.push(`Registration date (${date}) of player ${nickname} is not valid`);
                valid = false;
            }

            if (online === null) {
                errors.push(`Status (${status}) of player ${nickname} is not valid`);
                valid = false;
            }

            if (!valid) {
                continue;
            }

            try {
                await db.query(
                    'INSERT INTO players(nickname, email, registered, online) VALUES($1, $2, $3, $4)',
                    [ nickname, email, timestamp, online ],
                );
            } catch(err) {
                // Just for demo, need error mapping
                errors.push(`error code: ${err.code}, details: ${err.detail}`);
            }
        }

        res.redirect(`/?errors=${JSON.stringify(errors)}`);
    });
};
