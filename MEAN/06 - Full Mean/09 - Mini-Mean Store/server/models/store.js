(function() {
    'use strict';

    var mongoose = require('mongoose');

    var ProductSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }]
    }, {timestamps: true});

    var OrderSchema = new mongoose.Schema({
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        _product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }, {timestamps: true});

    mongoose.model('Product', ProductSchema);
    mongoose.model('Order', OrderSchema);
})();
