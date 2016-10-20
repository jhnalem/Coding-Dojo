(function() {
    'use strict';

    angular.module('app')
        .controller('IndexController', IndexController);

    function IndexController($scope, $location, UserFactory) {
        UserFactory.getUser(function(response) {
            if( response._id ) {
                $location.path('/dashboard');
            }
        });

        $scope.enter = function(name) {
            $scope.errors = null;

            UserFactory.login(name, function(response) {
                if( response.error ) {
                    $scope.errors = response.error.errors;
                } else {
                    $location.path('/dashboard');
                }
            });
        };
    }

})();
