/* jslint node:true */
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');

exports.showpath = function (req, res) {
    res.json(req.file.cloudStoragePublicUrl);
};

exports.register = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            success: false,
            message: 'Falta email y usuario'
        });
    } else {
        var newUser = new User(req.body);

        // Attempt to save the user
        newUser.save(function (err, user) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El email ya está registrado.'
                });
            }
            res.status(201).json({
                success: true,
                user: user
            });
        });
    }
};

exports.authenticate = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {

        if (err) {
            throw err;
        }

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'El usuario no se encontró.'
            });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, "INeedAHero", {
                        expiresIn: 10080
                    });
                    res.status(200).json({
                        success: true,
                        token: 'JWT ' + token,
                        user: user
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Contraseña incorrecta.'
                    });
                }
            });
        }
    });
};

exports.list = function (req, res) {
    User.find()
        .sort('-created')
        .exec(function (err, users) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).json(users);
            }
        });
};