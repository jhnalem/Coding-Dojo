(function() {
    'use strict';

    angular.module('app', ['ngRoute'])
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/index.html',
                controller: 'IndexController'
            })
            .when('/new', {
                templateUrl: 'partials/new.html',
                controller: 'NewController'
            })
            .when('/:id/edit', {
                templateUrl: 'partials/edit.html',
                controller: 'EditController'
            })
            .when('/:show/edit', {
                templateUrl: 'partials/show.html',
                controller: 'ShowController'
            });
    }

})();
