(function() {
    'use strict';

    var users = require('../controllers/users.js');
    var store = require('../controllers/stores.js');

    module.exports = function(app) {
        app.get('/getUsers', users.get);
        app.post('/create', users.create);
        app.delete('/remove/:id', users.remove);

        app.get('/getOrders', store.getOrders);
        app.get('/getProducts', store.getProducts);
        app.post('/add', store.add);
        app.post('/order', store.order);
    };
})();
