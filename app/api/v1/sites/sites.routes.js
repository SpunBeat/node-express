const sites = require('./sites.controller.js');
const passport = require('passport');
const images = require('../../../lib/images-local.js');
const requireAuth = passport.authenticate('jwt', {
    session: false
});

/*****************
 * API functions *
 *****************/

module.exports = function (app) {

    app.route('/api/sites')
        .post(requireAuth, sites.create)
        .get(sites.list);

    app.route('/api/sites/upload')
        // .post(images.multer.any())
        .post(images.multer.single('file'), sites.showpath);

    app.route('/api/sites/:id')
        .get(sites.detail)
        .put(requireAuth, sites.update)
        .delete(requireAuth, sites.delete);

};