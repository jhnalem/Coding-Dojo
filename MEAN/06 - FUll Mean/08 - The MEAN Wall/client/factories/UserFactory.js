(function() {
    "use strict";

    angular.module('app')
        .factory('UserFactory', UserFactory);

    function UserFactory($http, $cookies) {
        var user = {};

        var factory = {
            login: _login,
            register: _register,
            logout: _logout,
            getUser: _getUser,
            setUser: _setUser
        };

        function _login(data, callback) {
            $http.post('/login', data).then(function(response) {
                var res = {};

                if( response.data.error ) {
                    res.error = response.data.error;

                } else {
                    _setUser(response.data.user);
                    res.data = response.data.user;
                    res.success = response.data.success;
                }

                callback(res);
            });
        }

        function _register(data, callback) {
            $http.post('/register', data).then(function(response) {
                var res = {};

                if( response.data.error ) {
                    res.error = response.data.error;

                } else {
                    res.data = response.data.user;
                    res.success = response.data.success;
                }

                callback(res);
            });
        }

        function _logout(callback) {
            user = {};
            $cookies.remove('user');
            callback(user);
        }

        function _getUser(callback) {
            if( !user._id ) {
                var cookie = $cookies.getObject('user');
                if( cookie ) {
                    user = cookie;
                }
            }

            callback(user);
        }

        function _setUser(newUser, callback) {
            user = newUser;
            $cookies.putObject('user', newUser);

            if( typeof callback === 'function' ) {
                callback(user);
            }
        }

        return factory;
    }

})();
