(function() {
    "use strict";

    angular.module('app')
        .factory('ProductFactory', ProductFactory);

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
})();
