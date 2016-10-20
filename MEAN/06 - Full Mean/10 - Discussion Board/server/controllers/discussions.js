(function() {
    'use strict';

    var mongoose = require('mongoose');
    var User     = mongoose.model('User');
    var Topic    = mongoose.model('Topic');
    var Post     = mongoose.model('Post');
    var Comment  = mongoose.model('Comment');

    mongoose.Promise = global.Promise;

    module.exports = {
        getTopics: _getTopics,
        getTopic: _getTopic,
        addTopic: _addTopic,
        addPost: _addPost,
        addComment: _addComment
    };

    function _getTopics(request, response) {
        Topic.find()
            .populate({path: '_user'})
            .exec()
            .then(function(data) {
                response.json({
                    topics: data
                });
            })
            .catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

    function _getTopic(request, response) {
        Topic.findById(request.params.id)
            .populate({
                path: '_user posts',
                populate: {
                    path: '_user comments',
                    populate: {path: '_user'}
                }
            })
            .exec()
            .then(function(data) {
                response.json({
                    topic: data
                });
            })
            .catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

    function _addTopic(request, response) {
        var userId = request.body.userId,
            topic;

        Topic.create({
            title: request.body.title,
            description: request.body.description,
            category: request.body.category,
            _user: userId
        })
        .then(function(t) {
            topic = t;

            return User.findById(userId).exec();
        })
        .then(function(user) {
            user.topics.push(topic);
            return user.save();
        })
        .then(function() {
            return Topic
                .find()
                .populate({path: '_user'})
                .exec();
        })
        .then(function(data) {
            response.json({
                topics: data
            });
        })
        .catch(function(error) {
            response.json({
                error: error
            });
        });
    }

    function _addPost(request, response) {
        var userId = request.body.userId,
            topicId = request.body.topicId,
            post;

        Post.create({
            text: request.body.text,
            _topic: topicId,
            _user: userId
        })
        .then(function(p) {
            post = p;
            return User.findById(userId).exec();
        })
        .then(function(user) {
            user.posts.push(post);
            return user.save();
        })
        .then(function() {
            return Topic
                .findById(topicId)
                .populate({
                    path: '_user posts',
                    populate: {
                        path: '_user comments',
                        populate: {path: '_user'}
                    }
                })
                .exec();
        })
        .then(function(topic) {
            topic.posts.push(post);
            return topic.save();
        })
        .then(function(topic) {
            return Topic
                .findById(topicId)
                .populate({
                    path: '_user posts',
                    populate: {
                        path: '_user comments',
                        populate: {path: '_user'}
                    }
                })
                .exec();
        })
        .then(function(data) {
            response.json({
                topic: data
            });
        })
        .catch(function(error) {
            response.json({
                error: error
            });
        });
    }

    function _addComment(request, response) {
        var userId = request.body.userId,
            postId = request.body.postId,
            topicId = request.body.topicId,
            comment;

        Comment.create({
            text: request.body.text,
            _post: postId,
            _user: userId
        })
        .then(function(c) {
            comment = c;
            return User.findById(userId).exec();
        })
        .then(function(user) {
            user.comments.push(comment);
            return user.save();
        })
        .then(function() {
            return Post.findById(postId).exec();
        })
        .then(function(post) {
            post.comments.push(comment);
            post.save();
        })
        .then(function() {
            return Topic
                .findById(topicId)
                .populate({
                    path: '_user posts',
                    populate: {
                        path: '_user comments',
                        populate: {path: '_user'}
                    }
                })
                .exec();
        })
        .then(function(data) {
            response.json({
                topic: data
            });
        })
        .catch(function(error) {
            response.json({
                error: error
            });
        });
    }

})();
