/* jslint node: true*/

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SiteSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    main_image: {
        type: String
    },
    gallery: {
        type: Array
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Se require un nombre para el sitio.'
    },
    who_we_are: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: [Number]
    },
    phone: {
        type: String
    },
    email: {
        type: String  
    },
    website: {
        type: String
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Site', SiteSchema);