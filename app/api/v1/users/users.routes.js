var users = require('./users.controller.js');
var imagesLocal  = require('../../../lib/images-local.js');
var imagesCloud = require('../../../lib/single-image-cloud.js');

module.exports = function (app) {
    
    app.route('/api/register')
        .post(users.register);
    
    app.route('/api/register/upload')
        .post(imagesLocal.multer.single('file'), users.showpath);
    
    app.route('/api/register/gstorage')
        .post(imagesCloud.multer.single('file'), imagesCloud.sendUploadToGCS, users.showpath);
    
    app.route('/api/authenticate')
        .post(users.authenticate);

    app.route('/api/users/')
        .get(users.list);    
    
};