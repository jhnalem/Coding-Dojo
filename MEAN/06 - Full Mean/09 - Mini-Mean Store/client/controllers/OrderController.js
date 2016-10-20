(function() {
    'use strict';

    angular.module('app')
        .controller('OrderController', OrderController);

    function OrderController($scope, $location, UserFactory, StoreFactory) {
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

        $scope.orderProduct = function(form) {
            StoreFactory.createOrder(form, function(response) {
                if( response.error ) {
                    $scope.errors = response.error.errors;
                } else {
                    $scope.orders = response;
                    $scope.oF = null;
                    StoreFactory.getProducts(function(response) {
                        $scope.products = response;
                    });
                }
            });
        };
    }

})();
