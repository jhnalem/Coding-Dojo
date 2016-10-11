(function() {
    "use strict";

    angular.module('app', ['ngRoute'])
        .config(config)
        .factory('UserFactory', UserFactory)
        .controller('CustomizeUsersController', CustomizeUsersController)
        .controller('UserListsController', UserListsController);

    function config($routeProvider) {
        $routeProvider
            .when('/customizeUsers', {
                templateUrl: 'views/customizeUsers.html',
            })
            .when('/userList', {
                templateUrl: 'views/userList.html',
            })
            .otherwise({
                redirectTo: '/customizeUsers'
            })
    }

    function UserFactory() {
        var factory = {
            index: index,
            create: createUser,
            delete: deleteUser,
            show: showUser
        };

        var allUsers = [];

        function index(callback) {
            callback(allUsers);
        }

        function createUser(data, callback) {
            if( data && data.first_name && data.last_name && data.favorite_language) {
                allUsers.push(data);
                callback(allUsers);
            }
        }

        function deleteUser(id, callback) {
            allUsers.splice(id, 1);
            callback(allUsers);
        }

        function showUser(id, callback) {
            callback(allUsers[id]);
        }

        return factory;
    }

    function CustomizeUsersController($scope, $location, UserFactory) {
        $scope.users = [];
        $scope.addUser = create;
        $scope.removeUser = remove;

        UserFactory.index(userSync);

        function userSync(data) {
            $scope.users = data;
        }

        function create(formData) {
            UserFactory.create(formData, userSync);
            $scope.form = null;
            $location.url('/userList');
        }

        function remove(id) {
            UserFactory.delete(id, userSync);
        }
    }

    function UserListsController($scope, UserFactory) {
        $scope.users = [];

        UserFactory.index(userSync);

        function userSync(data) {
            $scope.users = data;
        }
    }
})();
