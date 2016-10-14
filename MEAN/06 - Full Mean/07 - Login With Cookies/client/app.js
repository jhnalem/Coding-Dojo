(function() {
    'use strict';

    angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies'])
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/index.html',
                controller: 'IndexController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            })
            .when('/logout', {
                templateUrl: '',
                controller: 'LogoutController'
            });
    }

})();
