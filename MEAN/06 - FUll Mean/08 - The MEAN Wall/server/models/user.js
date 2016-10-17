(function() {
    'use strict';

    var mongoose = require('mongoose');
    var bcrypt = require('bcryptjs');

    var UserSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }, {timestamps: true});

    UserSchema.methods.hashPassword = function(password) {
        return bcrypt.hashSync(password, 8);
    };

    UserSchema.methods.checkPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    UserSchema.pre('save', function(done) {
        this.password = this.hashPassword(this.password);
        done();
    });

    mongoose.model('User', UserSchema);
})();
