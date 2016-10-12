"use strict";
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/index.html',
            controller: 'indexController'
        })
        .when('/new', {
            templateUrl: 'partials/new.html',
            controller: 'newController'
        })
        .when('/:id/edit', {
            templateUrl: 'partials/edit.html',
            controller: 'editController'
        })
});
