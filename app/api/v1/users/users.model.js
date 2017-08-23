const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, lowercase: true, unique: true, required: true },
    image: { type: String },
    password: { type: String, required: true },
    sex: { type: String, enum: ['M', 'F', 'O'], default: 'O' },
    created: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);