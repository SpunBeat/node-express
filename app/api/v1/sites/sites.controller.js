/* jslint node: true*/

var Site = require('mongoose').model('Site');

/*****************
 * CRUD functions *
 *****************/

// create
exports.create = function (req, res) {
    var site = new Site(req.body);
    site.creator = req.user;
    site.save(function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(site);
        }
    });
};

// read
exports.list = function (req, res) {
    Site.find()
        .sort('-created')
        .populate('creator', 'username profilePicture')
        .exec(function (err, sites) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).json(sites);
            }
        });
};

// update
exports.update = function (req, res) {
    Site.findOne({
        $and: [
            {
                '_id': req.params.site_id
            },
            {
                'creator': req.user._id
            }
        ]
    }, function (err, site) {
        site.main_image = req.body.main_image;
        site.gallery = req.body.gallery;
        site.name = req.body.name;
        site.who_we_are = req.body.who_we_are;
        site.address = req.body.address;
        site.location = req.body.location;
        site.phone = req.body.phone;
        site.email = req.body.email;
        site.website = req.body.website;
        
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(site);
        }
    });
};

// delete
exports.delete = function (req, res) {
    Site.findOneAndRemove({
        $and: [
            {
                '_id': req.params.site_id
            },
            {
                'creator': req.user._id
            }
        ]
    }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                removed: true
            });
        }
    });
};

/******************
 * Other functions *
 ******************/

// showpath: - shows the path returned from an image-upload
exports.showpath = function (req, res) {
    res.json(req.newFiles);
};

// detail: - finds one site searched by id
exports.detail = function (req, res) {
    Site.findOne({
        '_id': req.params.site_id
    }, function (err, site) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(site);
        }
    }).populate('creator', 'username profilePicture');
};