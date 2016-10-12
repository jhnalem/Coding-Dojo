(function() {
    'use strict';

    var mongoose = require('mongoose');

    var FriendSchema = new mongoose.Schema({
        firstName: {type: String},
        lastName: {type: String}
    }, {timestamps: true});

    mongoose.model('Friend', FriendSchema);
})();
