(function() {
    "use strict";

    angular.module('app', [])
        .factory('ProductFactory', ProductFactory)
        .controller('ProductController', ProductController)
        .controller('OrderController', OrderController);

    function ProductFactory() {
        var allProducts = [];

        var factory = {
            sync: sync,
            create: create,
            remove: remove,
            buy: buy
        };

        function sync(callback) {
            callback(allProducts);
        }

        function create(data, callback) {
            if( data.name && parseFloat(data.price) == data.price ) {
                data.qty = 50;
                allProducts.push(data);
                callback(allProducts);
            }
        }

        function remove(id, callback) {
            allProducts.splice(id, 1);
            callback(allProducts);
        }

        function buy(id, callback) {
            if( allProducts[id].qty > 0 ) {
                allProducts[id].qty--;
            }

            callback(allProducts);
        }

        return factory;
    }

    function ProductController($scope, ProductFactory) {
        $scope.products = [];
        $scope.addProduct = create;
        $scope.removeProduct = remove;

        ProductFactory.sync(refreshProducts);

        function refreshProducts(data) {
            $scope.products = data;
        }

        function create(formData) {
            ProductFactory.create(formData, refreshProducts);
            $scope.form = null;
        }

        function remove(id) {
            ProductFactory.remove(id, refreshProducts);
        }
    }

    function OrderController($scope, ProductFactory) {
        $scope.products = [];
        $scope.buyProduct = buy;

        ProductFactory.sync(refreshProducts);

        function refreshProducts(data) {
            $scope.products = data;
        }

        function buy(id) {
            ProductFactory.buy(id, refreshProducts);
        }
    }
})();
