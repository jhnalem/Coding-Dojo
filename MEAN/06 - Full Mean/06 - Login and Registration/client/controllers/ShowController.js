(function() {
    'use strict';

    angular.module('app')
        .controller('ShowController', ShowController);

    function ShowController($scope, $routeParams, $location, FriendsFactory) {
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
    }

})();
