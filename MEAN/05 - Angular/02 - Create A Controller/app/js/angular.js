var app = angular.module('app', []);
app.controller('controller', function($scope) {
    $scope.foodList = ['Pizza', 'Another Pizza', 'More Pizza', 'Fries', 'Curly Fries'];
    $scope.addFood = function(food) {
        $scope.foodList.push(food);
    };
});
