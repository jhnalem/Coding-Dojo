var app = angular.module('app', []);
app.controller('userController', function($scope) {
    $scope.users = [];
    $scope.createUser = function(form) {
        var obj = {
            id: $scope.users.length + 1,
            first_name: form.fname,
            last_name: form.lname,
            favorite_language: form.language,
            created_at: new Date().toLocaleFormat()
        };

        $scope.users.push(obj);
        $scope.form = null;
    };
    $scope.deleteUser = function(user) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
    };

    $scope.propertyName = 'first_name';
    $scope.reverse = false;
    $scope.sortBy = function(propertyName) {
        $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    }
});
