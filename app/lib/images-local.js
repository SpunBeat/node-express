/* jslint node:true*/

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, 
           file.fieldname + '-' + 
           datetimestamp + '.' + 
           file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = require('multer')({
    storage: storage
});

module.exports = {
    multer: upload
};