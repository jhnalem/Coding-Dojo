(function() {
    "use strict";

    angular.module('app')
        .factory('UserFactory', UserFactory);

    function UserFactory($http, $cookies) {
        var user = {};

        var factory = {
            getUser: _getUser,
            getById: _getById,
            login: _login,
            logout: _logout
        };

        function _getUser(callback) {
            if( !user._id ) {
                var cookie = $cookies.getObject('user');
                if( cookie ) {
                    user = cookie;
                }
            }

            callback(user);
        }

        function _getById(id, callback) {
            $http.get('/getUserId/' + id).then(function(response) {
                if( response.data.error ) {
                    callback({
                        error: response.data.error
                    });
                } else {
                    callback({
                        user: response.data.user
                    });
                }
            });
        }

        function _login(name, callback) {
            $http.post('/getUser', {name: name}).then(function(response) {
                if( response.data.error ) {
                    callback({
                        error: response.data.error
                    });
                } else {
                    user = response.data.user;
                    $cookies.putObject('user', user);
                    callback({
                        user: response.data.user
                    });
                }
            });
        }

        function _logout(callback) {
            user = {};
            $cookies.remove('user');
            callback(user);
        }

        return factory;
    }

})();
