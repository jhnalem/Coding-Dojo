(function() {
    'use strict';

    angular.module('app')
        .controller('DashboardController', DashboardController);

    function DashboardController($scope, $location, UserFactory, DiscussionFactory) {

        $scope.user = {};
        $scope.topics = [];
        $scope.categories = ['Web Fundamentals', 'Python', 'MEAN', 'Ruby on Rails', 'iOS', 'C#'];

        UserFactory.getUser(function(response) {
            if( !response._id ) {
                $location.path('/');
            } else {
                $scope.user = response;
            }
        });

        DiscussionFactory.getTopics(function(response) {
            $scope.topics = response;
        });

        $scope.logout = function() {
            UserFactory.logout(function(response) {
                $scope.user = response;
                $location.path('/');
            });
        }

        $scope.createTopic = function() {
            var formData = {
                userId: $scope.user._id,
                title: $scope.topic,
                description: $scope.description,
                category: $scope.category
            };

            DiscussionFactory.createTopic(formData, function(response) {
                if( response.error ) {
                    $scope.errors = response.error.errors;
                } else {
                    $scope.topics = response;
                    $scope.topic = '';
                    $scope.description = '';
                    $scope.category = '';
                }
            });
        };
    }

})();
