(function() {
    "use strict";

    angular.module('app')
        .factory('FriendsFactory', FriendsFactory);

    function FriendsFactory($http) {
        var friends = [],
            friend = {empty:true};

        var factory = {
            index: _index,
            show: _show,
            create: _create,
            update: _update,
            delete: _delete,
            getFriends: _getFriends,
            getFriend: _getFriend
        };

        function _index(callback) {
            $http.get('/friends').then(function(response){
                friends = response.data;

                if( typeof(callback) === 'function' ) {
                    callback(friends);
                }
            });
        }

        function _show(id, callback) {
            // is http request necessary here
            $http.get('/friends/' + id).then(function(response) {
                if( !response.data.error ) {
                    friend = response.data.friend;
                }

                if( typeof(callback) === 'function' ) {
                    callback(friend);
                }
            });
        }

        function _create(friend, callback) {
            $http.post('/friends', friend).then(function(response) {
                if( typeof(callback) === 'function' ) {
                    callback(response.data);
                }
            });
        }

        function _update(friend, callback) {
            $http.put('/friends/' + friend._id, friend).then(function(response) {
                if( typeof(callback) === 'function' ) {
                    callback(response.data);
                }
            });
        }

        function _delete(id, callback) {
            $http.delete('/friends/' + id).then(function(response) {
                if( typeof(callback) === 'function' ) {
                    callback(response.data);
                }
            });
        }

        function _getFriends(callback) {
            callback(friends);
        }

        function _getFriend(callback) {
            callback(friend);
        }

        return factory;
    }

})();
