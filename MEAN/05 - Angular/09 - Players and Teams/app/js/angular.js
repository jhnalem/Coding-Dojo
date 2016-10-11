(function() {
    "use strict";

    angular.module('app', ['ngRoute', 'ui.materialize'])
        .config(config)
        .factory('PlayerFactory', PlayerFactory)
        .factory('TeamFactory', TeamFactory)
        .controller('PlayersController', PlayersController)
        .controller('TeamsController', TeamsController)
        .controller('AssociationsController', AssociationsController);

    function config($routeProvider) {
        $routeProvider
            .when('/players', {
                templateUrl: 'views/players.html',
            })
            .when('/teams', {
                templateUrl: 'views/teams.html',
            })
            .when('/associations', {
                templateUrl: 'views/associations.html',
            })
            .otherwise({
                redirectTo: '/players'
            })
    }

    function PlayerFactory() {
        var factory = {
            sync: sync,
            add: add,
            remove: remove
        };

        var allPlayers = [{name:'Russel'}];

        function sync(callback) {
            callback(allPlayers);
        }

        function add(data, callback) {
            if( data && data.name ) {
                allPlayers.push(data);
            }
            callback(allPlayers);
        }

        function remove(id, callback) {
            allPlayers.splice(id, 1);
            callback(allPlayers);
        }

        return factory;
    }

    function TeamFactory() {
        var factory = {
            sync: sync,
            add: add,
            remove: remove
        };

        var allTeams = [{name:'Seahawks'}];

        function sync(callback) {
            callback(allTeams);
        }

        function add(data, callback) {
            if( data && data.name ) {
                allTeams.push(data);
            }
            callback(allTeams);
        }

        function remove(id, callback) {
            allTeams.splice(id, 1);
            callback(allTeams);
        }

        return factory;
    }

    function PlayersController($scope, PlayerFactory) {
        $scope.players = [];
        $scope.addPlayer = add;
        $scope.removePlayer = remove;

        PlayerFactory.sync(playerSync);

        function playerSync(data) {
            $scope.players = data;
        }

        function add(formData) {
            PlayerFactory.add(formData, playerSync);
            $scope.form = null;
        }

        function remove(id) {
            PlayerFactory.remove(id, playerSync);
        }
    }

    function TeamsController($scope, TeamFactory) {
        $scope.teams = [];
        $scope.addTeam = add;
        $scope.removeTeam = remove;

        TeamFactory.sync(teamSync);

        function teamSync(data) {
            $scope.teams = data;
        }

        function add(formData) {
            TeamFactory.add(formData, teamSync);
            $scope.form = null;
        }

        function remove(id) {
            TeamFactory.remove(id, teamSync);
        }
    }

    function AssociationsController($scope, PlayerFactory, TeamFactory) {
        $scope.players = [];
        $scope.teams = [];
        $scope.associations = [];
        $scope.addAssociation = add;
        $scope.removeAssociation = remove;

        PlayerFactory.sync(playerSync);
        TeamFactory.sync(teamSync);

        function playerSync(data) {
            $scope.players = data;
        }

        function teamSync(data) {
            $scope.teams = data;
        }

        function add(form) {
            $scope.associations.push({player: form.player, team: form.team});
        }

        function remove(id) {
            $scope.associations.splice(id, 1);
        }
    }
})();
