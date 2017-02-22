/* jslint node:true */

var site = require('./sites.controller.js'),
    imagesCloud = require('../../../lib/images-cloud.js'),
    passport = require('passport');

// passport jwt
var requireAuth = passport.authenticate('jwt', {
    session: false
});

/*****************
 * API functions *
 *****************/

module.exports = function (app) {
    
    app.route('/api/sites')
        .post(requireAuth, site.create)
        .get(site.list);

    app.route('/api/sites/upload')
        .post(imagesCloud.multer.any(), imagesCloud.sendUploadToGCS, site.showpath);

    app.route('/api/sites/:site_id')
        .get(site.detail)
        .put(requireAuth, site.update)
        .delete(requireAuth, site.delete);

};