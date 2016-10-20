(function() {
    'use strict';

    angular.module('app')
        .controller('UserController', UserController);

    function UserController($scope, $routeParams, $location, UserFactory, DiscussionFactory) {
        $scope.currentUser = {};
        $scope.user = {};

        UserFactory.getUser(function(response) {
            if( !response._id ) {
                $location.path('/');
            } else {
                $scope.currentUser = response;
            }
        });

        UserFactory.getById($routeParams.id, function(response)  {
            if( response.error ) {

            } else {
                $scope.user = response.user;
            }
        });

        $scope.logout = function() {
            UserFactory.logout(function(response) {
                $scope.user = response;
                $location.path('/');
            });
        }
    }

})();
