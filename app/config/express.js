/* jslint node:true */

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors');


module.exports = function () {
    var app = express();
    
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(methodOverride());
    
    app.use('/', express.static('site'));
    app.route('/api').get(function(req, res) {
        res.status(201).json({
            success: true,
            version: 1
        });
    });

    require('../api/v1/users/users.routes.js')(app);
    require('../api/v1/sites/sites.routes.js')(app);

    return app;
};