(function() {
    'use strict';

    angular.module('app')
        .controller('LogoutController', LogoutController);

    function LogoutController($scope, $location, UserFactory) {
        console.log('hello');
        UserFactory.clearCookie();
        $location.path('/');
        $scope.$apply();
    }

})();
