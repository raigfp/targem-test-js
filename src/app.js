const express = require('express');

const initApp = require('./init');
const mountRoutes = require('./routes');

initApp({ dropTable: true });

const app = express();
app.set('view engine', 'pug');

mountRoutes(app);

app.listen(3000, function () {
    console.log('app is listening on port 3000');
});
