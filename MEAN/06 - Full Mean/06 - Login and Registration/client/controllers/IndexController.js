(function() {
    'use strict';

    angular.module('app')
        .controller('IndexController', IndexController);

    function IndexController($scope, $route, $routeParams, FriendsFactory) {
        $scope.friends = [];

        var reload = function() {
            FriendsFactory.index(function(data) {
                $scope.friends = data.friends;
            });
        };

        reload();

        $scope.deleteFriend = function(id) {
            FriendsFactory.delete(id, function(response) {
                if( response.error ) {
                    console.error(error);
                    alert("Something went wrong while deleting.");
                } else {
                    reload();
                }
            });
        };
    }

})();
