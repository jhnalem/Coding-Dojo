"use strict";
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/new'
        })
        .when('/new', {
            templateUrl: 'partials/new.html',
            controller: 'newController'
        })
        .when('/edit', {
            templateUrl: 'partials/edit.html',
            controller: 'editController'
        })
});

app.controller('NewController', function($scope) {

}).controller('EditController', function($scope) {
    $scope.submission = function(form) {
        console.log(form);
    };
});
