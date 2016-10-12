app.controller('newController', ['$scope','friendsFactory', '$location', function($scope, friendsFactory, $location) {

    var index = function(){
        friendsFactory.index(function(returnedData){
            $scope.friends = returnedData;
        });
    };

    index();

    $scope.create = function(data) {
        friendsFactory.create(data, function(response) {
            if( response.error ) {
                console.error(response.error);
            } else {
                index();
                $location.path('/')
            }
        });
    };
}]);
