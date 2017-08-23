const mongoose = require('mongoose');
const config = require('../../config');

module.exports = function () {
    const db = mongoose.connect(`${config.get('MONGO_URL')}/${config.get('MONGO_COLLECTION')}`, {
        useMongoClient: true
    });
    require('../../app/api/v1/users/users.model.js');
    require('../../app/api/v1/sites/sites.model.js');
    return db;
};
