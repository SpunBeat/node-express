/* jslint node:true */

// Server Configuration
var server_configuration = {
    express: require('./app/config/express'),
    passport: require('./app/config/passport'),
    mongoose: require('./app/config/mongoose'),
    port: 8080
};

server_configuration.mongoose();
server_configuration.passport();

var app = server_configuration.express();

app.listen((process.env.PORT || server_configuration.port), function () {
    console.log('localhost:' + server_configuration.port);
});