(function() {
    'use strict';

    var mongoose = require('mongoose'),
        S = mongoose.Schema;

    var UserSchema = new S({
        name: {
            type: String,
            required: [true, 'A name must be provided.'],
            unique: true
        },
        topics: [{
            type: S.Types.ObjectId,
            ref: 'Topic'
        }],
        comments: [{
            type: S.Types.ObjectId,
            ref: 'Comment'
        }],
        posts: [{
            type: S.Types.ObjectId,
            ref: 'Post'
        }],
        votes: [{
            type: S.Types.ObjectId,
            ref: 'Vote'
        }]
    }, {timestamps: true});

    mongoose.model('User', UserSchema);
})();
