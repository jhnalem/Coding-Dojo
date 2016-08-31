(function() {
    "use strict";

    $(function() {
        $('#form').on('submit', function(e) {
            e.preventDefault();

            var data = $(this).serializeArray();

            var row = $('<tr/>'), td;

            for( var i = 0; i < data.length; i++ ) {
                td = $('<td/>', {
                    text: data[i].value
                });

                row.append(td);
            }

            $('#table tbody').append(row);
        });
    });
})();
