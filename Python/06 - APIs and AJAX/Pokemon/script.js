(function() {
    "use strict";

    var container = $('#pokemon'),
        dex = {
            name: $('.name', "#pokedex"),
            img: $('img', '#pokedex'),
            height: $('.height', "#pokedex"),
            weight: $('.weight', "#pokedex"),
            type: $('.type', "#pokedex")
        }

    var data = [
        null,
        {"name":"bulbasaur","height":7,"weight":69,"type":[{"slot":2,"type":{"url":"http://pokeapi.co/api/v2/type/4/","name":"poison"}},{"slot":1,"type":{"url":"http://pokeapi.co/api/v2/type/12/","name":"grass"}}]},
        {"name":"ivysaur","height":10,"weight":130,"type":[{"slot":2,"type":{"url":"http://pokeapi.co/api/v2/type/4/","name":"poison"}},{"slot":1,"type":{"url":"http://pokeapi.co/api/v2/type/12/","name":"grass"}}]},

    ];

    var callback = function(id) {
        var obj = data[id];

        dex.name.text(obj.name);
        dex.weight.text(obj.weight);
        dex.height.text(obj.height);
        dex.type.text('');
        for( var i = 0; i < obj.type.length; i++ ) {
            dex.type.text(dex.type.text() + obj.type[i].type.name + ' ');
        }
        dex.img.attr('src', 'images/' + id + '.png');

        $('#pokedex').show();
    };

    $(function() {
        $('#pokedex').hide();

        for( var i = 1; i <= 151; i++ ) {
            $('<img/>', {
                src: 'images/' + i + '.png',
                'data-id': i
            }).appendTo(container);
        }

        $('#pokemon').on('click', 'img', function() {
            var id = this.getAttribute('data-id');

            if( !data[id] ) {
                $('#pokedex').hide();

                $.getJSON('http://pokeapi.co/api/v2/pokemon/' + id, function(r) {
                    data[id] = {
                        name:   r.name,
                        height: r.height,
                        weight: r.weight,
                        type:   r.types
                    };
                }).done(function() {
                    callback(id)
                });
            } else {
                callback(id);
            }

        });
    });
})();
