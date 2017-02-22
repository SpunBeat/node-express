/* jslint node:true */

var extJwt = require('passport-jwt').ExtractJwt;

module.exports = function () {
    
    // Options to config passport jwt
    var opts = {
        jwtFromRequest: extJwt.fromAuthHeader(),
        secretOrKey:    "INeedAHero"
    };
    
    // Call to the JWT strategy
    require('./strategies/jsonwebtoken')(opts);
    
};