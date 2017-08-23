const config = require('./config');
const express = require('./app/config/express');
const mongoose = require('./app/config/mongoose');
const passport = require('./app/config/passport');

mongoose();
passport();

let app = express();

app.listen((process.env.PORT || config.get('PORT')), () => {
    console.log('localhost:' + config.get('PORT'));
});