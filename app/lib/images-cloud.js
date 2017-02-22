const Storage = require('@google-cloud/storage');

const CLOUD_BUCKET = 'imagenes-1380';

const storage = Storage({
    projectId: 'imagenes-1380'
});

const bucket = storage.bucket(CLOUD_BUCKET);

function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

function sendUploadToGCS(req, res, next) {

    var datetimestamp = Date.now();

    var gcsname, file, stream;

    if (!req.file) {
        if (!req.files) {
            return next();
        } else {
            req.newFiles = [];

            for (var i = 0; i < req.files.length; i++) {
                gcsname = req.files[i].fieldname + '-' + datetimestamp + '.' + req.files[i].originalname.split('.')[req.files[i].originalname.split('.').length - 1];
                file = bucket.file(gcsname);
                stream = file.createWriteStream({
                    metadata: {
                        contentType: req.files[i].mimetype
                    }
                });

                req.newFiles.push({
                    path: getPublicUrl(gcsname)
                });

                stream.end(req.files[i].buffer);
            }
            
            next();
        }

    } else {

        gcsname = req.file.fieldname + '-' + datetimestamp + '.' + req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        file = bucket.file(gcsname);
        stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            next(err);
        });

        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname;
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });

        stream.end(req.file.buffer);
    }
}

const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }, // no larger than 5mb
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    }
});

module.exports = {
    getPublicUrl: getPublicUrl,
    sendUploadToGCS: sendUploadToGCS,
    multer: multer
};