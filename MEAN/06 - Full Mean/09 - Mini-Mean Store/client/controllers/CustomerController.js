(function() {
    'use strict';

    angular.module('app')
        .controller('CustomerController', CustomerController);

    function CustomerController($scope, $location, UserFactory, StoreFactory) {
        $scope.users = [];
        $scope.errors = null;

        UserFactory.getUsers(function(response) {
            $scope.users = response;
        });

        $scope.removeUser = function() {
            UserFactory.removeUser(this.user._id, function(response) {
                if( response.error ) {
                    $scope.errors = response.error.errors;
                } else {
                    $scope.users = response;
                }
            });
        };

        $scope.createCustomer = function(name) {
            $scope.errors = null;

            UserFactory.createUser(name, function(response) {
                if( response.error ) {
                    $scope.errors = response.error.errors;
                } else {
                    $scope.users = response;
                    $scope.customerName = '';
                }

            });
        };
    }

})();
