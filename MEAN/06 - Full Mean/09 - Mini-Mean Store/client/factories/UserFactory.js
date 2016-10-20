(function() {
    "use strict";

    angular.module('app')
        .factory('UserFactory', UserFactory);

    function UserFactory($http) {
        var users = [];

        var factory = {
            createUser: _create,
            removeUser: _remove,
            getUsers: _getUsers
        };

        function _getUsers(callback) {
            $http.get('/getUsers')
                .then(function(response) {
                    if( response.data.error ) {
                        callback({
                            error: response.data.error
                        });
                    } else {
                        users = response.data.users;

                        if( typeof callback === 'function' ) {
                            callback(users);
                        }
                    }
                });
        }

        function _remove(id, callback) {
            $http.delete('/remove/' + id)
                .then(function(response) {
                    if( response.data.error ) {
                        callback({
                            error: response.data.error
                        });

                    } else {
                        _getUsers(callback);
                    }
                });
        }

        function _create(name, callback) {
            $http.post('/create', {name: name})
                .then(function(response) {
                    if( response.data.error ) {
                        callback({
                            error: response.data.error
                        });

                    } else {
                        _getUsers(callback);
                    }
                });
        }

        return factory;
    }

})();
