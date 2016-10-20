(function() {
    'use strict';

    var mongoose = require('mongoose');
    var User     = mongoose.model('User');
    var Product  = mongoose.model('Product');
    var Order    = mongoose.model('Order');

    mongoose.Promise = global.Promise;

    module.exports = {
        add: _addProduct,
        order: _addOrder,
        getOrders: _getOrders,
        getProducts: _getProducts
    };

    function _addProduct(request, response) {
        Product.create(request.body)
            .then(function(data) {
                response.json({
                    products: data
                });
            })
            .catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

    function _addOrder(request, response) {
        var order;

        var userId = request.body.userId,
            productId = request.body.productId,
            quantity = request.body.quantity;

        Order.create({
            _user: userId,
            _product: productId,
            quantity: request.body.quantity

        }).then(function(o) {
            order = o;
            return User.findById(userId).exec();

        }).then(function(user) {
            user.orders.push(order);
            return user.save();

        }).then(function() {
            return Product.findById(productId).exec();

        }).then(function(product) {
            product.orders.push(order);
            product.quantity -= quantity;
            return product.save();

        }).then(function() {
            response.json({
                order: order
            });

        }).catch(function(error) {
            response.json({
                error: error,
            });
        });
    }

    function _getProducts(requst, response) {
        Product.find()
            .sort('-_id')
            .exec()
            .then(function(data) {
                response.json({
                    products: data
                });
            })
            .catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

    function _getOrders(request, response) {
        Order.find()
            .sort('-_id')
            .populate({path: '_product'})
            .populate({path: '_user'})
            .exec()
            .then(function(data) {
                response.json({
                    orders: data
                });
            })
            .catch(function(error) {
                response.json({
                    error: error
                });
            });
    }

})();
