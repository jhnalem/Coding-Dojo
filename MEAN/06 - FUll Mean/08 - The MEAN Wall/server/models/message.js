(function() {
    'use strict';

    var mongoose = require('mongoose');

    var CommentSchema = new mongoose.Schema({
        _author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        _message: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            required: true
        }
    }, {timestamps: true});

    var MessageSchema = new mongoose.Schema({
        _author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }, {timestamps: true});

    mongoose.model('Comment', CommentSchema);
    mongoose.model('Message', MessageSchema);
})();
