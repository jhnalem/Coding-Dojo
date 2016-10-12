app.controller('indexController', ['$scope', 'friendsFactory', function($scope, friendsFactory) {

    $scope.friends = [];
    friendsFactory.index(function(returnedData) {
        if( !returnedData.error ) {
            $scope.friends = returnedData.friends;
        }
    });
}]);
