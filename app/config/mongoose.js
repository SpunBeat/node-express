/* jslint node:true */

var mongoose = require('mongoose');

module.exports = function() {
    
    // Database Reference
    var db = mongoose.connect('mongodb://vash:02f64ef10f@ds021895.mlab.com:21895/pleizer-demo');
    
    // Models to load
    require('../../app/api/v1/users/users.model.js');
    require('../../app/api/v1/sites/sites.model.js');
    
    return db;
};
