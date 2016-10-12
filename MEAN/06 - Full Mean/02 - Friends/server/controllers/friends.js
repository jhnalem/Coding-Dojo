var path     = require('path');
var mongoose = require('mongoose');
var Friend   = mongoose.model('Friend');

var root = process.env['APPROOT'];

function FriendsController() {
    this.index = function(request, response) {
        Friend.find({}, function(error, friends) {
            var context = {
                error: error,
                friends: friends
            };

            response.json(context);
            // response.sendFile(path.join(root, 'client/index.html'), context);
        });

    };

    this.create = function(request, response) {
        //your code here
        response.json({placeholder:'create'});
    };

    this.update = function(request, response) {
        //your code here
        response.json({placeholder:'update'});
    };

    this.delete = function(request, response) {
        //your code here
        response.json({placeholder:'delete'});
    };

    this.show = function(request, response) {
        var id = request.params.id;

        Friend.find({_id: id}, function(error, friend) {
            var context = {
                error: error,
                friend: friend
            };

            response.json(context);
        });
    };
}

module.exports = new FriendsController(); // what does this export?
