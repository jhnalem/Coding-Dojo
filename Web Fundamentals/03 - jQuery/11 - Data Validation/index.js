(function() {
    "use strict";

    $(function() {
        $('#error').dialog({
            autoOpen: false,
            modal: true
        });
        $('#start, #end').datepicker();

        var $start = $('#start'),
            $end   = $('#end'),
            $name  = $('#name');

        var $error = $('#error');

        $('#form').on('submit', function(e) {
            e.preventDefault();

            var data = {};

            $error.get(0).className = '';

            $(this).serializeArray().map(function(obj) {
                data[obj.name] = obj.value;
            });

            if( !data.name ) {
                $error.addClass('errorName');
            }

            if( !$start.val() || !$end.val() ) {
                $error.addClass('errorMissingDate');

            } else if( $start.datepicker('getDate') > $end.datepicker('getDate') ) {
                $error.addClass('errorDate');
            }

            if( $error.get(0).className ) {
                $error.dialog('open');
            } else {
                alert("Success!");
            }
        });
    });

})();
