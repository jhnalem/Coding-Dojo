(function() {
    'use strict';

    angular.module('app')
        .controller('ProductController', ProductController);

    function ProductController($scope, $location, StoreFactory) {
        $scope.products = [];

        StoreFactory.getProducts(function(response) {
            $scope.products = response;
        });

        $scope.createProduct = function(form) {
            StoreFactory.createProduct(form, function(response) {
                if( response.error ) {
                    $scope.errors = response.error.errors;
                } else {
                    $scope.products = response;
                    $scope.pF = null;
                }
            });
        };
    }

})();
