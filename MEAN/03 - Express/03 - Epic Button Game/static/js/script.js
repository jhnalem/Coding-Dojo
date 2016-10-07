(function() {
    "use strict";

    var socket;

    var $count = $('#counter');

    var buttonClick = function() {
        socket.emit('click');
    };

    var resetClick = function() {
        socket.emit('reset')
    };

    var init = function() {
        socket = io.connect();

        $('#click').on('click', buttonClick);
        $('#reset').on('click', resetClick);

        socket.on('clickResponse', function(count) {
            $count.text(count);
        });

        socket.on('resetResponse', function(count) {
            $count.text(count);
        });
    };

    $(init);
})();
