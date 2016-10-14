(function() {
    'use strict';

    angular.module('app')
        .controller('LoginController', LoginController);

    function LoginController($scope, $location, UserFactory) {

        $scope.login = function() {
            if( !$scope.loginForm.email.$modelValue || !$scope.loginForm.password.$modelValue ) {
                $scope.loginForm.email.$touched = true;
                $scope.loginForm.password.$touched = true;
                return;
            }

            UserFactory.login($scope.form, function(response) {
                if( !response.error ) {
                    $location.path('/');
                } else {
                    $scope.responseError = response.error;
                }
            });
        };
    }

})();
