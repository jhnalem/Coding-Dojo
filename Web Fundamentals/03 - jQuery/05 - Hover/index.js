(function() {
    "use strict";

    $(function() {
        var $imgs = $('.hover');

        $imgs.hover(function() {
            this.src = "https://placehold.it/100/ccc/000";

        }, function() {
            this.src = "https://placehold.it/100/000/fff";

        });
    });
})();
