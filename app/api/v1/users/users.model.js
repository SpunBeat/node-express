/* jslint node:true */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Schema defines how the user's data will be stored in MongoDB
var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    birthday: {
        type: Date
    },
    sex: {
        type: String,
        enum: ['M', 'F', 'O'],
        default: 'O'
    },
    role: {
        type: String,
        enum: ['Client', 'Manager', 'Admin'],
        default: 'Client'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);