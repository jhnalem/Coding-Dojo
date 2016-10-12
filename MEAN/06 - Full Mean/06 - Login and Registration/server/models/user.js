(function() {
    'use strict';

    var mongoose = require('mongoose');

    var UserSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: true,
            trim: true
        }
    }, {timestamps: true});

    mongoose.model('User', UserSchema);
})();
