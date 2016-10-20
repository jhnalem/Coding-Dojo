(function() {
    'use strict';

    var mongoose = require('mongoose'),
        S = mongoose.Schema;

    var TopicSchema = new S({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['Web Fundamentals', 'Python', 'MEAN', 'Ruby on Rails', 'iOS', 'C#']
        },
        posts: [{
            type: S.Types.ObjectId,
            ref: 'Post'
        }],
        _user: {
            type: S.Types.ObjectId,
            ref: 'User'
        }
    }, {timestamps: true});

    var PostSchema = new S({
        text: {
            type: String,
            required: true
        },
        comments: [{
            type: S.Types.ObjectId,
            ref: 'Comment'
        }],
        _topic: {
            type: S.Types.ObjectId,
            ref: 'Topic'
        },
        _user: {
            type: S.Types.ObjectId,
            ref: 'User'
        }
    }, {timestamps: true});

    var CommentSchema = new S({
        text: {
            type: String,
            required: true
        },
        _post: {
            type: S.Types.ObjectId,
            ref: 'Post'
        },
        _user: {
            type: S.Types.ObjectId,
            ref: 'User'
        }
    }, {timestamps: true});

    mongoose.model('Topic', TopicSchema);
    mongoose.model('Post', PostSchema);
    mongoose.model('Comment', CommentSchema);
})();
