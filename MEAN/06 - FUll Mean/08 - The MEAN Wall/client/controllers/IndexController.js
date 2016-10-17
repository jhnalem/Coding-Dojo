(function() {
    'use strict';

    angular.module('app')
        .controller('IndexController', IndexController);

    function IndexController($scope, $location, UserFactory) {
        UserFactory.getUser(function(user) {
            if( user._id ) {
                $location.path('/messages');
            }
        });

        $scope.registerForm = {
            firstName: '',
            lastName: '',
            alias: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        $scope.loginForm = {
            email: '',
            password: ''
        };

        $scope.fillRegister = function(form) {
            $scope.registerForm.firstName = 'Christian';
            $scope.registerForm.lastName = 'Kwon';
            $scope.registerForm.alias = 'ckwon';
            $scope.registerForm.email = 'christian@kwon.com';
            $scope.registerForm.password = '1q2w3e4r';
            $scope.registerForm.confirmPassword = '1q2w3e4r';
        };

        $scope.fillLogin = function() {
            $scope.loginForm.email = 'christian@kwon.com';
            $scope.loginForm.password = '1q2w3e4r';
        }

        $scope.login = function() {
            UserFactory.login($scope.alias, function(error, user) {
                if( error ) {
                    console.error(error);

                } else {
                    $location.path('/messages');
                }
            });
        };

        $scope.login = function() {
            $scope.loginErrors = null;
            $scope.loginSuccess = null;
            $scope.registerErrors = null;
            $scope.registerSuccess = null;

            UserFactory.login($scope.loginForm, function(response) {
                if( response.error ) {
                    $scope.loginErrors = response.error.errors;

                } else {
                    $scope.loginSuccess = response.success;
                    $scope.loginForm = null;
                    $location.path('/messages');
                }
            });
        };

        $scope.register = function() {
            $scope.loginErrors = null;
            $scope.loginSuccess = null;
            $scope.registerErrors = null;
            $scope.registerSuccess = null;

            UserFactory.register($scope.registerForm, function(response) {
                if( response.error ) {
                    $scope.registerErrors = response.error.errors;

                } else {
                    $scope.registerSuccess = response.success;
                    $scope.registerForm = null;
                }

            });
        };
    }

})();
