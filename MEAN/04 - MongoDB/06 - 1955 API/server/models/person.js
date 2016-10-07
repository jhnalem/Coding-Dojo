var mongoose   = require('mongoose');

var PersonSchema = new mongoose.Schema({
    name: {type: String}
});

var Duck = mongoose.model('Person', PersonSchema);
