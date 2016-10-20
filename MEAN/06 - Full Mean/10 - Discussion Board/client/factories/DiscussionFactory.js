(function() {
    "use strict";

    angular.module('app')
        .factory('DiscussionFactory', DiscussionFactory);

    function DiscussionFactory($http) {
        var users = [];
        var topics = [];

        var factory = {
            addPost: _addPost,
            addComment: _addComment,
            getTopic: _getTopic,
            getTopics: _getTopics,
            createTopic: _createTopic
        };

        function _getTopic(id, callback) {
            $http.get('/getTopic/' + id)
                .then(function(response) {
                    if( response.data.error ) {

                    } else {
                        callback(response.data.topic);
                    }
                });
        }

        function _getTopics(callback) {
            $http.get('/getTopics').then(function(response) {
                if( response.data.error ) {

                } else {
                    topics = response.data.topics;
                    callback(topics);
                }
            });
        }

        function _createTopic(data, callback) {
            $http.post('/addTopic', data).then(function(response) {
                console.log(response);
                if( response.data.error ) {
                    callback({
                        error: response.data.error
                    });
                } else {
                    topics = response.data.topics;
                    callback(topics);
                }
            });
        }

        function _addPost(data, callback) {
            $http.post('/addPost', data).then(function(response) {
                console.log(response);
                if( response.error ) {

                } else {
                    callback(response.data.topic);
                }
            });
        }

        function _addComment(data, callback) {
            $http.post('/addComment', data).then(function(response) {
                if( response.error ) {

                } else {
                    callback(response.data.topic);
                }
            });
        }

        return factory;
    }

})();
