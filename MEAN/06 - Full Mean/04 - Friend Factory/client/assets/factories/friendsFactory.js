app.factory('friendsFactory', ['$http', function($http) {
    // constructor for our factory
    var friends = [];
    var friend = {};

    function FriendsFactory(){
        var _this = this;

        this.create = function(newfriend,callback){
            $http.post('/friends', newfriend).then(function(returned_data){
                if (typeof(callback) == 'function'){
                    callback(returned_data.data);
                }
            });
        };

        this.update = function(friend, callback){
            $http.put('/friends/' + friend._id, friend).then(function(response) {
                if (typeof(callback) == 'function'){
                    callback(response.data);
                }
            });
        };

        this.index = function(callback){
            //call this method if you want to update or set the friends variable
            $http.get('/friends').then(function(returned_data){
                friends = returned_data.data;
                callback(friends);
            });
            //Note: this can be shortened to $http.get('/friends').then(callback);
            //But only if you only want to run the callback from the controller.
        };

        this.delete = function(id, callback) {
            $http.delete('/friends/' + id).then(function(res) {
                callback(res);
            });
        };

        this.show = function(id, callback){
            $http.get('/friends/' + id).then(function(res) {
                var friend = {};

                if( !res.error ) {
                    friend = res.data;
                }

                callback(friend);
            });
        };

        // Sometimes you might not want to make a DB call, and just get the information stored in the factory.
        this.getFriends = function(callback){
            callback(friends);
        };

        this.getFriend = function(callback){
            callback(friend);
        };
    }

    return new FriendsFactory();
}]);
