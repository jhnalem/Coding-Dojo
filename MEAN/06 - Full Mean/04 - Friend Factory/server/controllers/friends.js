var mongoose = require('mongoose');
var Friend   = mongoose.model('Friend');

function FriendsController() {
    this.index = function(request, response) {
        Friend.find({}, function(error, friends) {
            var context = {
                error: error,
                friends: friends
            };

            response.json(context);
        });
    };

    this.create = function(request, response) {
        var friend = new Friend(request.body);

        friend.save(function(error) {
            response.json({error: error})
        });
    };

    this.update = function(request, response) {
        Friend.findOneAndUpdate({_id: request.params.id}, {$set: {first_name: request.body.first_name, last_name:request.body.last_name}}, {new: true}, function(error, friend) {

            response.json({error:error, friend:friend})
        });
    };

    this.delete = function(request, response) {
        Friend.findByIdAndRemove(request.params.id, function(error, friend) {

            response.json({error: error, friend:friend});
        });
    };

    this.show = function(request, response) {
        var id = request.params.id;

        Friend.findById(id, function(error, friend) {
            var context = {
                error: error,
                friend: friend
            };

            response.json(context);
        });
    };
}

module.exports = new FriendsController();
