(function() {
    'use strict';

    angular.module('app', ['ngRoute', 'ngCookies'])
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/index.html',
                controller: 'IndexController'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            })
            .when('/topic/:id', {
                templateUrl: 'views/topic.html',
                controller: 'TopicController'
            })
            .when('/user/:id', {
                templateUrl: 'views/user.html',
                controller: 'UserController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
