(function() {
    'use strict';

    angular.module('app')
        .controller('DashboardController', DashboardController);

    function DashboardController($scope, $location, UserFactory, StoreFactory) {
        $scope.users = [];
        $scope.products = [];
        $scope.orders = [];

        UserFactory.getUsers(function(response) {
            $scope.users = response;
        });

        StoreFactory.getProducts(function(response) {
            $scope.products = response;
        });

        StoreFactory.getOrders(function(response) {
            $scope.orders = response;
        });
    }

})();
