(function() {
    "use strict";

    $(function() {
        $('#contacts').on('click', '.contact', function() {
            $(this).toggleClass('clicked');
        });

        $('#form').on('submit', function(e) {
            e.preventDefault();

            var obj = {};

            $(this).serializeArray().map(function(x) {
                obj[x.name] = x.value;
            });

            $('<div/>', { class: 'contact' }).append(
                $('<h1/>', { text: obj.fname + ' ' + obj.lname }),
                $('<p/>', { text: obj.description })
            ).appendTo('#contacts');
        });
    });
})();
