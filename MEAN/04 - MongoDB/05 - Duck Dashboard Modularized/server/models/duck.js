var mongoose   = require('mongoose');

var DuckSchema = new mongoose.Schema({
    name: {type: String},
    color: {type: String}
}, {timestamps: true});

var Duck = mongoose.model('Duck', DuckSchema);
