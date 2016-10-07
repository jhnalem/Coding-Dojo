(function() {
    "use strict";

    var socket,
        board,
        history,
        $users;

    var nameSubmit = function() {
        socket.emit('userNameSubmit', $('#name').val());
        $('#name').val('');
    };

    var newMessage = function() {
        socket.emit('postMessage', $('#message').val());
        $('#message').val('');
    };

    var nameExists = function() {
        $('#username').hide();
        $('#chat-wrapper').show();
    };

    var init = function() {
        socket = io.connect();
        board = $('#board');
        history = $('#history');
        $users = $('#users');

        $('#nameSubmit').on('click', nameSubmit);
        $('#newMessage').on('click', newMessage);

        socket.on('userNameResponse', function(response) {
            if( response === 'success' ) {
                nameExists();
            }
        });

        socket.on('userDisconnected', function(id) {
            $(document.getElementById(id)).remove();
        });

        socket.on('currentUsers', function(users) {
            var all = [];

            for( var i = 0; i < users.length; i++ ) {
                all.push($('<p id="' + users[i].id + '" class="valign">' + users[i].name + '</p>'));
            }

            $users.html('').append(all);
        });

        socket.on('previousMessages', function(messages) {
            for( var i = 0; i < messages.length; i++ ) {
                var newLine = $('<div/>', {
                    html: '<p><strong>' + messages[i][0] + ':</strong> ' + messages[i][1] + '</p>'
                });

                board.append(newLine);
            };
        });

        socket.on('messagePosted', function(name, msg) {
            var newLine = $('<div/>', {
                html: '<p><strong>' + name + ':</strong> ' + msg + '</p>'
            });

            board.append(newLine);
        });
    };

    $(init);
})();
