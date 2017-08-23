const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');
const config = require('../../../../config');

exports.register = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            success: false,
            message: 'Falta email y usuario'
        });
    } else {
        let newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'El email ya está registrado.',
                    error: err
                });
            } else {
                res.status(201).json({
                    success: true,
                    user: user
                });
            }
        });
    }
};

exports.authenticate = (req, res) => {
    User.findOne({
            'email': req.body.email
        })
        .exec((err, user) => {
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
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        // Create token if the password matched and no error was thrown
                        let token = jwt.sign(user, config.get('SECRET_KEY'), {
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


/******************
 * Other functions *
 ******************/

exports.list = (req, res) => {
    User.find()
        .exec((err, users) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).json(users);
            }
        });
};

exports.upload = (req, res) => {
    if (req.file) res.status(201).json(req.file.path);
};