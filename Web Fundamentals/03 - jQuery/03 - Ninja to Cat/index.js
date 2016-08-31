(function() {
    "use strict";

    $(function() {
        var temp;

        $('.ninja').on('click', 'img', function() {
            temp = this.src;
            this.src = this.getAttribute('data-next');
            this.setAttribute('data-next', temp);
        });
    });
})();
