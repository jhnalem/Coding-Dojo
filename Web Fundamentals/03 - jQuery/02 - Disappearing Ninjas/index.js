(function() {
    "use strict";

    var $button = $('#reset'),
        $images = $('.image-wrap img');

    var init = function() {
        $button.on('click', function() {
            $images.show();
        });

        $images.on('click', function() {
            $(this).hide();
        })
    };

    $(init);
})();
