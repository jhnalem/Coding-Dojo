(function() {
    'use strict';

    angular.module('app')
        .controller('RegisterController', RegisterController);

    function RegisterController($scope, $location, UserFactory) {
        $scope.errors = [];
        $scope.passwordsMatch = true;

        $scope.register = function(form) {
            if( !form ) {
                return;
            }

            if( form.password !== form.confirmPassword ) {
                $scope.passwordsMatch = false;
                return;
            } else {
                $scope.passwordsMatch = true;
            }

            UserFactory.register(form, function(response) {
                console.log('RegisterController Response:');
                console.log(response);

                if( response.error ) {
                    $scope.errors = response.error;
                } else {
                    $location.path('/');
                }
            });
        };
    }

})();
