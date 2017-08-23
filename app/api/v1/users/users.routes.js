const users = require('./users.controller.js');
const imagesLocal = require('../../../lib/images-local.js');

module.exports = function (app) {

    app.route('/api/reg')
        .post(users.register);

    app.route('/api/reg/upload')
        .post(imagesLocal.multer.single('file'), users.upload);

    app.route('/api/login')
        .post(users.authenticate);

    app.route('/api/users/')
        .get(users.list);

};