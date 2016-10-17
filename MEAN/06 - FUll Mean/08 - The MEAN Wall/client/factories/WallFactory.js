(function() {
    "use strict";

    angular.module('app')
        .factory('WallFactory', WallFactory);

    function WallFactory($http, $cookies) {
        var messages = [];

        var factory = {
            postMessage: _postMessage,
            postComment: _postComment,
            getMessages: _getMessages
        };

        function _getMessages(callback) {
            $http.get('/allMessages').then(function(response) {
                messages = response.data.messages;
                callback(messages);
            });
        }

        function _postMessage(message, userId, callback) {
            if( message && userId ) {
                $http.post('/postMessage', {
                    message: message,
                    user: userId
                }).then(function() {
                    _getMessages(callback);
                });
            }
        }

        function _postComment(comment, messageId, userId, callback) {
            if( comment && messageId && userId ) {
                $http.post('/postComment', {
                    comment: comment,
                    messageId: messageId,
                    userId: userId
                }).then(function() {
                    _getMessages(callback);
                });
            }
        }

        return factory;
    }

})();
