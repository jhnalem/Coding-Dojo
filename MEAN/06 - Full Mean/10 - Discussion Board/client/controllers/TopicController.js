(function() {
    'use strict';

    angular.module('app')
        .controller('TopicController', TopicController);

    function TopicController($scope, $routeParams, $location, UserFactory, DiscussionFactory) {
        $scope.user = {};
        $scope.topic = {};

        UserFactory.getUser(function(response) {
            if( !response._id ) {
                $location.path('/');
            } else {
                $scope.user = response;
            }
        });

        DiscussionFactory.getTopic($routeParams.id, function(response) {
            if( response.error ) {

            } else {
                $scope.topic = response;
            }
        });

        $scope.logout = function() {
            UserFactory.logout(function(response) {
                $scope.user = response;
                $location.path('/');
            });
        }

        $scope.postAnswer = function(answer) {
            var data = {
                text: answer,
                topicId: $routeParams.id,
                userId: $scope.user._id,
                topicId: $routeParams.id
            };

            DiscussionFactory.addPost(data, function(response) {
                if( response.error ) {

                } else {
                    $scope.topic = response;
                }
            });
        };

        $scope.postComment = function(c) {
            var data = {
                text: c,
                postId: this.post._id,
                userId: $scope.user._id,
                topicId: this.topic._id
            }
            DiscussionFactory.addComment(data, function(response) {
                if( response.error ) {

                } else {
                    $scope.topic = response;
                }
            });
        }
    }

})();
