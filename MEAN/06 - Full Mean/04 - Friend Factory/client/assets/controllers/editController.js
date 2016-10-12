app.controller('editController', ['$scope','friendsFactory', '$routeParams', '$location', function($scope, friendsFactory, $routeParams, $location) {
    /*
        GET A FRIEND FROM THE FACTORY, This is a one time thing when we load this partial -
        so we didn't set a variable so we could reuse it -
        we just run the friendsFactory method directly.
    */

    $scope.id = $routeParams.id;

    friendsFactory.getFriend(function(res){
        if( res.id === $routeParams.id ) {
            $scope.friend = res;

        } else {
            friendsFactory.show($scope.id, function(res) {
                $scope.friend = res.friend;
                $scope.form = res.friend;
            });
        }
    });
    /*
        OUR $scope.update function goes here <-- $scope because we need to access this method
        with ng-submit or ng-click (from the form in the previous assignment).  Want to see
        all of the friends when we get back including the updated on??
        See Index in the previous controller.
    */
    $scope.update = function() {
        friendsFactory.update($scope.form, function(res) {

        });
    };

    $scope.remove = function() {
        friendsFactory.delete($scope.id, function(res) {
            if( !res.error ) {
                $location.path('/');
            } else {
                console.error(res.error);
            }
        });
    };
}]);
