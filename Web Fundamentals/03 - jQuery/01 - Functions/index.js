(function() {
    var output = $('#output'),
        firstBox = $('#firstBox'),
        dove = $('#dove');

    var handles = function() {
        $('#click').on('click', function() {
            output.val("You clicked on the button!");
        });

        $('#focus').on('click', function() {
            output.val("You focused on the button!");
        });

        $('#addClass').on('click', function() {
            if( output.hasClass('red') ) {
                output.val('I already have the class!');
            } else {
                output.val('You just added a class!');
                output.addClass('red');
            }
        });

        $('#removeClass').on('click', function() {
            output.val('You just removed a class!');
            output.removeClass('red');
        });

        $('#val').on('click', function(e) {
            output.val("The button's value is: " + e.currentTarget.value);
        });

        $('#text').on('click', function(e) {
            output.val("The button's text is: " + e.currentTarget.textContent);
        });

        $('#attr').on('click', function(e) {
            output.val("The image's src attr: " + e.currentTarget.src + " and it's alt attr: " + e.currentTarget.alt);
        });

        var prependCount = 0;
        $('#prepend').on('click', function() {
            firstBox.parent().prepend($('<div/>', {
                class: 'prepend',
                text: ++prependCount
            }));
            $('<div class="prepend">' + prependCount + '</div>');
        });


        var beforeCount = 0;
        $('#before').on('click', function() {
            firstBox.before($('<div/>', {
                class: 'before',
                text: ++beforeCount
            }));
        });

        var afterCount = 0;
        $('#after').on('click', function() {
            firstBox.after($('<div/>', {
                class: 'after',
                text: ++afterCount
            }));
        });

        var appendCount = 0;
        $('#append').on('click', function() {
            firstBox.parent().append($('<div/>', {
                class: 'append',
                text: ++appendCount
            }));
        });

        $('#show').on('click', function() {
            dove.show();
        });

        $('#hide').on('click', function() {
            dove.hide();
        });

        $('#toggle').on('click', function() {
            dove.toggle();
        });

        $('#fadeIn').on('click', function() {
            dove.fadeIn();
        });

        $('#fadeOut').on('click', function() {
            dove.fadeOut();
        });

        $('#slideDown').on('click', function() {
            dove.slideDown();
        });

        $('#slideUp').on('click', function() {
            dove.slideUp();
        });

        $('#slideToggle').on('click', function() {
            dove.slideToggle();
        });
    };

    var init = function() {
        output.val('');

        handles();
    };

    $(init);

})();
