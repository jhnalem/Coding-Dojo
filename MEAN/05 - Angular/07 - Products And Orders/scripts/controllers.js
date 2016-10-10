(function() {
    "use strict";

    angular
        .module('app')
        .controller('ProductController', ProductController)
        .controller('OrderController', OrderController);

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
