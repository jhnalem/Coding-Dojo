(function() {
    'use strict';

    var mongoose = require('mongoose');

    var UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'A name must be provided.'],
            unique: true
        },
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }]
    }, {timestamps: true});

    mongoose.model('User', UserSchema);
})();
