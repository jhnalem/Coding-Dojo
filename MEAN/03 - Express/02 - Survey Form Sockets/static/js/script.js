(function() {
    "use strict";

    var socket;

    var init = function() {
        $('select').material_select();

        socket = io.connect();

        $('form').on('submit', function(e) {
            e.preventDefault();

            var data = {};
            $(e.currentTarget).serializeArray().map(function(x) { data[x.name] = x.value; });;

            socket.emit("formSubmission", data);
        });

        socket.on('serverResponse', function(data) {
            $('#message').text(data.response);
        });

        socket.on('randomNumber', function() {
            var num = Math.floor(Math.random() * 1001);
            $('#number').text('A random number: ' + num);
        });
    };

    $(init);
})();
