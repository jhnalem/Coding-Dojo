(function() {
    'use strict';

    angular.module('app', ['ngRoute'])
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            })
            .when('/products', {
                templateUrl: 'views/products.html',
                controller: 'ProductController'
            })
            .when('/orders', {
                templateUrl: 'views/orders.html',
                controller: 'OrderController'
            })
            .when('/customers', {
                templateUrl: 'views/customers.html',
                controller: 'CustomerController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();
