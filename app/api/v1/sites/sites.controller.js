const Site = require('mongoose').model('Site');

/*****************
 * CRUD functions *
 *****************/

exports.create = (req, res) => {
    let site = new Site(req.body);
    site.creator = req.user;
    site.save((err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(data);
        }
    });
};

exports.list = (req, res) => {
    Site.find()
        .exec((err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).json(data);
            }
        });
};

exports.update = (req, res) => {
    Site.findById(req.params.id)
        .exec((err, site) => {
            if (err) {
                res.status(400).send(err);
            } else {
                site.image = req.body.image;
                site.name = req.body.name;
                site.save((err, doc) => {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.status(201).json(site);
                    }
                });
            }

        });
};

exports.delete = (req, res) => {
    Site.findByIdAndRemove(req.params.id)
        .exec((err) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).json({
                    removed: true
                });
            }
        });
};

/******************
 * Other functions *
 ******************/

exports.showpath = (req, res) => {
    if (req.file) res.status(201).json(req.file.path);
};

exports.detail = (req, res) => {
    Site.findById(req.params.id)
        .exec((err, site) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).json(site);
            }
        });
};