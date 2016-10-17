(function() {
    'use strict';

    var mongoose = require('mongoose');
    var User     = mongoose.model('User');
    var Message  = mongoose.model('Message');
    var Comment  = mongoose.model('Comment');

    mongoose.Promise = global.Promise;

    module.exports = {
        postMessage: _postMessage,
        postComment: _postComment,
        getMessages: _getMessages
    };

    function _getMessages(request, response) {
        Message.find({})
            .populate({
                path: '_author'
            })
            .populate({
                path: 'comments',
                populate: {
                    path: '_author'
                }
            })
            .sort('-_id')
            .exec()
            .then(function(messages) {
                response.json({
                    messages: messages
                });
            });
    }

    function _postMessage(request, response) {
        var user_id = request.body.user,
            text = request.body.message;

        var message = new Message({
            _author: user_id,
            text: text
        });

        message.save()
            .then(function(msg) {
                return User.findById(userId).exec();

            }).then(function(user) {
                user.messages.push(message);
                return user.save();

            }).then(function(user) {
                response.json({
                    error: null
                });

            }).catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

    function _postComment(request, response) {
        var userId = request.body.userId,
            messageId = request.body.messageId,
            commentText = request.body.comment;

        var comment = new Comment({
            _author: userId,
            _message: messageId,
            text: commentText
        });

        comment.save()
            .then(function() {
                return User.findById(userId).exec();

            }).then(function(user) {
                user.comments.push(comment);
                return user.save();

            }).then(function() {
                return Message.findById(messageId).exec();

            }).then(function(msg) {
                msg.comments.push(comment);
                return msg.save();

            }).then(function() {
                response.json({
                    error: null
                });

            }).catch(function(error) {
                response.json({
                    error: error
                });
            });

        response.json(request.body);
    }

})();
