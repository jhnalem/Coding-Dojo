(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Friend   = mongoose.model('Friend');

    module.exports = {
        index: index,
        create: createFriend,
        update: updateFriend,
        delete: deleteFriend,
        show: showFriend
    };

    function index(request, response) {
        Friend.find({}, function(error, friends) {
            var context = {
                error: error,
                friends: friends
            };

            response.json(context);
        });
    }

    function createFriend(request, response) {
        var friend = new Friend(request.body);

        friend.save(function(error) {
            response.json({error: error})
        });
    }

    function updateFriend(request, response) {
        Friend.findOneAndUpdate({_id: request.params.id}, {$set: {first_name: request.body.first_name, last_name:request.body.last_name}}, {new: true}, function(error, friend) {

            response.json({error:error, friend:friend})
        });
    }

    function deleteFriend(request, response) {
        Friend.findByIdAndRemove(request.params.id, function(error, friend) {

            response.json({error: error, friend:friend});
        });
    }

    function showFriend(request, response) {
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
