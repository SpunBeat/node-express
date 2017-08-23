const config = require('../../config');
const bluebird = require('bluebird');
let mongoose = require('mongoose');


module.exports = function () {
    mongoose.Promise = bluebird;
    const db = mongoose.connection;
    mongoose.connect(`${config.get('MONGO_URL')}/${config.get('MONGO_COLLECTION')}`, {
        useMongoClient: true
    });
    require('../../app/api/v1/users/users.model.js');
    require('../../app/api/v1/sites/sites.model.js');
    return db;
};
