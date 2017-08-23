const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SiteSchema = new Schema({
    created: { type: Date, default: Date.now },
    image: { type: String },
    name: { type: String, default: '', trim: true,  required: 'Se require un nombre para el sitio.' },
    creator: { type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('Site', SiteSchema);