(function() {
    'use strict';

    angular.module('app')
        .controller('EditController', EditController);

    function EditController($scope, $routeParams, $location, FriendsFactory) {
        $scope.id = $routeParams.id;

        var callback = function() {
            $scope.form = $scope.friend;
            setTimeout(Materialize.updateTextFields, 0);
        };

        var friend = FriendsFactory.getFriend(function(friend) {
            $scope.friend = friend;

            if( friend._id !== $scope.id ) {
                FriendsFactory.show($scope.id, function(response) {
                    $scope.friend = response;
                    callback();
                });
            } else {
                callback();
            }
        });

        $scope.update = function() {
            var data = {
                _id: $scope.id,
                firstName: $scope.form.firstName,
                lastName: $scope.form.lastName
            };

            FriendsFactory.update(data, function(response) {
                if( response.error ) {
                    alert('There was an error creating your friend.');
                    console.log(response.error);
                } else {
                    $location.path('/#/');
                }
            });
        };
    }

})();
