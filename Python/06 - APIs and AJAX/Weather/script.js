(function() {
    "use strict";

    var key = "7ecfc55800741ef9bcb8079c82acb7ae";

    var callback = function(data) {
        $('#weather').show();
        $('#city').text(data.name);
        $('#temp').text(data.main.temp + 'F');
    };

    $(function() {
        $('#weather').hide();

        $('form').on('submit', function(e) {
            e.preventDefault();

            var loc = $(this).serializeArray()[0].value;

            $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + loc + '&units=imperial&APPID=' + key, callback);
        });
    });
})();
