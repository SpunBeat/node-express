const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        let datetimestamp = Date.now();
        cb(null, 
           file.fieldname + '-' + 
           datetimestamp + '.' + 
           file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

let upload = require('multer')({
    storage: storage
});

module.exports = {
    multer: upload
};