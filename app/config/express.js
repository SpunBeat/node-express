'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');


module.exports = function() {
    
    let app = express();

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(methodOverride());
    
    app.use('/', express.static('public'));
    app.route('/api').get((req, res) => {
        res.status(201).json({
            success: true,
            name: 'Node + Express + Mongoose + Passport + JWT',
            author: 'Spunbeat',
            version: 2
        });
    });

    require('../api/v1/sites/sites.routes')(app);
    require('../api/v1/users/users.routes')(app);

    return app;
};