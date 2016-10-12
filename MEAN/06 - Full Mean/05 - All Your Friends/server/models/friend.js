(function() {
    'use strict';

    var mongoose = require('mongoose');

    var FriendSchema = new mongoose.Schema({
        first_name: {type: String},
        last_name: {type: String}
    }, {timestamps: true});

    mongoose.model('Friend', FriendSchema);
})();
