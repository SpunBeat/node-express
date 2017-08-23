const extJwt = require('passport-jwt').ExtractJwt;
const config = require('../../config');

module.exports = function () {

    const opts = {
        jwtFromRequest: extJwt.fromAuthHeader(),
        secretOrKey: config.get('SECRET_KEY')
    };

    require('./strategies/jsonwebtoken')(opts);

};