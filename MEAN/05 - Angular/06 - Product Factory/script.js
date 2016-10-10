(function() {
    "use strict";

    var app = angular.module('app', []);

    app.factory('productFactory', function() {
        var products = [];

        var factory = {};

        factory.addProducts = function(data) {
            var newProduct = {
                name: data.name,
                price: Number(data.price) || 0
            };

            return newProduct;
        };

        factory.removeProducts = function(callback) {
            callback(products);
        };

        factory.getProducts = function(callback) {
            callback(products);
        };

        return factory;
    });

    app.controller('productController', ['$scope', 'productFactory', function($scope, productFactory) {
        $scope.products = [];

        $scope.reverse = false;
        $scope.sortColumn = 'name';

        $scope.sortByName = function() {
            $scope.reverse = $scope.sortColumn === 'name' ? !$scope.reverse : false;
            $scope.sortColumn = 'name';
        };

        $scope.sortByPrice = function(price) {
            $scope.reverse = $scope.sortColumn === 'price' ? !$scope.reverse : false;
            $scope.sortColumn = 'price';

        };

        $scope.addProduct = function(formData) {
            var p = productFactory.addProducts(formData);

            $scope.form = null;

            $scope.products.push(p);
        };

        $scope.removeProduct = function(product) {
            var index = $scope.products.indexOf(product);
            $scope.products.splice(index, 1);
        };

    }]);
})();
