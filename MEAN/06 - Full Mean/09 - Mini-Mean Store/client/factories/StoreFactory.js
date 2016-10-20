(function() {
    "use strict";

    angular.module('app')
        .factory('StoreFactory', StoreFactory);

    function StoreFactory($http) {
        var products = [];
        var orders = [];

        var factory = {
            getProducts: _getProducts,
            getOrders: _getOrders,
            createProduct: _createProduct,
            createOrder: _createOrder
        };

        function _getProducts(callback) {
            $http.get('/getProducts')
                .then(function(response) {
                    if( response.data.error ) {
                        callback({
                            error: response.data.error
                        });
                    } else {
                        products = response.data.products;

                        if( typeof callback === 'function' ) {
                            callback(products);
                        }
                    }
                });
        }

        function _getOrders(callback) {
            $http.get('/getOrders')
                .then(function(response) {
                    if( response.data.error ) {
                        callback({
                            error: response.data.error
                        });
                    } else {
                        orders = response.data.orders;

                        if( typeof callback === 'function' ) {
                            callback(orders);
                        }
                    }
                });
        }

        function _createOrder(data, callback) {
            var product;

            for( var i in products ) {
                if( products[i]._id === data.productId ) {
                    product = products[i];
                    break;
                }
            }

            if( data.quantity > product.quantity ) {
                callback({
                    error: {
                        errors: {
                            quantity: {
                                message: 'You can\'t order that many!'
                            }
                        }
                    }
                });
            } else {
                $http.post('/order', data)
                    .then(function(response) {
                        if( response.data.error ) {
                            callback({
                                error: response.data.error
                            });
                        } else {
                            _getOrders(callback);
                        }
                    });
            }
        }

        function _createProduct(data, callback) {
            $http.post('/add', data)
                .then(function(response) {
                    if( response.data.error ) {
                        callback({
                            error: response.data.error
                        });
                    } else {
                        _getProducts(callback);
                    }
                });
        }

        return factory;
    }

})();
