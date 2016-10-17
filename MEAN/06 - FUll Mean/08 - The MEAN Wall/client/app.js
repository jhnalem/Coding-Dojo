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
            .when('/messages', {
                templateUrl: 'views/wall.html',
                controller: 'WallController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
