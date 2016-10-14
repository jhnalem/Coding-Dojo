(function() {
    "use strict";

    angular.module('app')
        .factory('UserFactory', UserFactory);

    function UserFactory($http) {
        var user = {};

        var factory = {
            register: _register,
            login: _login,
            getUser: _getUser
        };

        function _register(data, callback) {
            $http.post('/register', data).then(function(response) {
                var err = [];
                var errors = response.data.error;

                if( errors ) {
                    if( errors.code === 11000 ) {
                        err.push('The email you entered already exists.');

                    } else {
                        for( var e in errors.errors ) {
                            err.push(errors.errors[e].message);
                        }
                    }
                } else {
                    user = response.data.data;
                }

                var context = {
                    error: err,
                    data: response.data.data
                }

                callback(context);
            });
        }

        function _login(data, callback) {
            $http.post('/login', data).then(function(response) {
                if( !response.data.error ) {
                    user = response.data.data;
                }

                callback(response.data);
            });
        }

        function _getUser(callback) {
            callback(user);
        }

        return factory;
    }

})();
