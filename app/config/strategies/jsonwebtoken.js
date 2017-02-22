/* jslint node:true */

var passport    = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    User        = require('mongoose').model('User');

module.exports = function (opts) {
    var jwtStrategy = new JwtStrategy(opts,             
        function (jwt_payload, done) {
            User.findOne({
                    _id: jwt_payload._doc._id
                },
                function (err, user) {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                });
        }
    );
    passport.use(jwtStrategy);
};