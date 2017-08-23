const passport    = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const User        = require('mongoose').model('User');

module.exports = function(opts) {
    let jwtStrategy = new JwtStrategy(opts,             
        (req, next) => {
            User.findById(req._doc._id)
            .exec((err, user) => {
                if(err) {
                    return next(err, false);
                }
                if(user) {
                    next(null, user);
                } else {
                    next(null, false);
                }
            });
        }
    );
    passport.use(jwtStrategy);
};