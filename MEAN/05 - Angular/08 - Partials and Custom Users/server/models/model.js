var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    favorite_language: {type: String}
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);
