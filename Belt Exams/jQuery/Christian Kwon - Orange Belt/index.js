(function() {
    "use strict";

    /** Set event handles for necessary elements */
    var handles = function() {
        var textContainer = $('.right', '#textContainer');
        var tileContainer = $('#tiles');
        var commentsContainer = $('#comments');

        tileContainer.on('click', 'img, p', function() {
            $(this)
                .addClass('highlighted')
                .siblings().removeClass('highlighted');

            var category = this.getAttribute('data-category');

            $(this.textBlock)
                .show()
                .siblings().hide();

            if( category ) {
                $(document.getElementById(category))
                    .addClass('outlined')
                    .siblings().removeClass('outlined');
            } else {
                $('.left p').removeClass('outlined');
            }

        });

        $('#add').on('submit', function(e) {
            e.preventDefault();

            var text = $(this).serializeArray()[0].value;

            var tileBlock = $('<p/>', {
                text: text,
                'data-stack': text
            });

            var textBlock = $('<p/>', {
                text: text,
                'data-stack': text
            }).hide();

            tileBlock.get(0).textBlock = textBlock;

            tileContainer.append(tileBlock);
            textContainer.append(textBlock);
        });

        $('#comment').on('submit', function(e) {
            e.preventDefault();

            var today = new Date();

            var text = [
                $(this).serializeArray()[0].value,
                '<span class="fade">',
                ' - Comment made at: ',
                today.toString(),
                '</span>'
            ].join('');

            var newBlock = $('<p/>', {
                html: text,
                'data-stack': text
            });
            commentsContainer.prepend(newBlock);
        });
    };

    var init = function() {
        var textContainer = $('.right p', '#textContainer');

        $('img', '#tiles').each(function() {
            this.textBlock = $('p[data-stack="' + this.getAttribute('data-stack') + '"]');
        });

        textContainer.hide();

        $('img:first', '#tiles').click();
    };

    $(function() {
        handles();
        init();
    });
})();
