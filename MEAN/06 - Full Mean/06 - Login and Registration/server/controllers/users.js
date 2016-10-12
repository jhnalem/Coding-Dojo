(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Friend   = mongoose.model('Friend');

    module.exports = {
        index: _index,
        create: _create,
        update: _update,
        delete: _delete,
        show: _show
    };

    function _index(request, response) {
        Friend.find({}, function(error, friends) {
            var context = {
                error: error,
                friends: friends
            };

            response.json(context);
        });
    }

    function _create(request, response) {
        var friend = new Friend(request.body);

        friend.save(function(error) {
            var context = {
                error: error
            };

            response.json(context);
        });
    }

    function _update(request, response) {
        var id = request.params.id;
        var set = {
            firstName: request.body.firstName,
            lastName: request.body.lastName
        };

        Friend.findByIdAndUpdate(id, {$set: set}, {new: true}, function(error, friend) {
            var context = {
                error: error,
                friend: friend
            };

            response.json(context);
        });
    }

    function _delete(request, response) {
        Friend.findByIdAndRemove(request.params.id, function(error, friend) {
            var context = {
                error: error,
                friend: friend
            };

            response.json(context);
        });
    }

    function _show(request, response) {
        var id = request.params.id;

        Friend.findById(id, function(error, friend) {
            var context = {
                error: error,
                friend: friend
            };

            response.json(context);
        });
    }

})();
