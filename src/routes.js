const multer  = require('multer');

const indexController = require('./controllers/index');
const importController = require('./controllers/import');

const upload = multer({ dest: '../uploads/' });

module.exports = (app) => {
    app.get('/', indexController);
    app.post('/import', upload.single('data'), importController);
};
