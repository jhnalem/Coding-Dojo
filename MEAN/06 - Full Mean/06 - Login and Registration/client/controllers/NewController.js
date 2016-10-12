(function() {
    'use strict';

    angular.module('app')
        .controller('NewController', NewController);

    function NewController($scope, $routeParams, $location, FriendsFactory) {
        $scope.create = function() {
            var data = {
                firstName: $scope.form.firstName,
                lastName: $scope.form.lastName
            };

            FriendsFactory.create(data, function(response) {
                if( response.error ) {
                    alert('There was an error creating your friend.');
                    console.log(response.error);
                } else {
                    $location.path('/');
                }
            });
        };
    }

})();
