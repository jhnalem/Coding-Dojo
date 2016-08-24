(function() {
    "use strict";

    var HERO,
        ENEMIES,
        BULLETS = [];

    var POINTS = 100;

    var stepRate = 20;

    var HEIGHT = 500,
        WIDTH = 980;

    var hero = [300, 300];

    var keys = {};

    function init() {
        HERO.css({
            top: hero[1],
            left: hero[0]
        });

        var obj = $(), i, rand, spd;

        for( i = 0; i < 2; i++ ) {
            rand = Math.floor(Math.random() * 100) + 1;
            spd  = Math.random() * 2 + 3;

            obj = obj.add($('<div/>', { class: 'enemy2' }).css({
                    top: i * rand,
                    left: 100 + i * 100
                }).attr('data-speed', spd)
            );
        }

        for( i = 2; i < 7; i++ ) {
            rand = Math.floor(Math.random() * 100) + 1;
            spd  = Math.random() * 2 + 2;

            obj = obj.add($('<div/>', { class: 'enemy1' }).css({
                    top: i * rand,
                    left: 100 + i * 100
                }).attr('data-speed', spd)
            );
        }

        for( i = 7; i < 9; i++ ) {
            rand = Math.floor(Math.random() * 100) + 1;
            spd  = Math.random() * 2 + 3;

            obj = obj.add($('<div/>', { class: 'enemy2' }).css({
                    top: i * rand,
                    left: 100 + i * 100
                }).attr('data-speed', spd)
            );
        }

        ENEMIES = obj;

        $('#score').text(POINTS);

        $('#enemies').append(ENEMIES);

        setInterval(step, stepRate);
    }

    function step() {
        movePlane();
        moveEnemies();
        detectCollision();

        POINTS = POINTS + 10;
        $('#score').text(POINTS);
    }

    function moveEnemies() {
        var pos;

        ENEMIES.each(function() {
            var $t = $(this);

            pos = parseInt($t.css('top')) + parseInt($t.attr('data-speed'));

            if( pos > HEIGHT ) pos = pos - HEIGHT;

            $t.animate({top: pos + 'px'}, 0);
        });
    }

    function movePlane() {
        var val;

        for( var direction in keys ) { if( keys.hasOwnProperty(direction) ) {
            if( keys.hasOwnProperty(direction) ) {
                if( direction == 37 ) {
                    val = hero[0] - 5;
                    hero[0] = val > 0 ? val : 0;
                }

                if( direction == 38 ) {
                    val = hero[1] - 5;
                    hero[1] = val > 0 ? val : 0;
                }

                if( direction == 39 ) {
                    val = hero[0] + 5;
                    hero[0] = val <= WIDTH ? val : WIDTH;
                }

                if( direction == 40 ) {
                    val = hero[1] + 5;
                    hero[1] = val <= HEIGHT ? val : HEIGHT;
                }
            }
        }}

        HERO.animate({
            top: hero[1],
            left: hero[0]
        }, 0);
    }

    function detectCollision() {
        // hero and enemy are 28px tall/wide
        var x, y;

        var hx = hero[0],
            hy = hero[1];

        ENEMIES.each(function(i) {
            x = parseInt($(this).css('left'));
            y = parseInt($(this).css('top'));

            if( hx - x <= 28 && hx - x >= -28 &&
                hy - y <= 28 && hy - y >= -28 ) {

                POINTS = POINTS - 100;
                $('#score').text(POINTS);
            }
        });
    }

    $(function() {
        HERO = $('#hero');

        $(document).on({
            keydown: function(e) {
                var kc = e.keyCode;

                if( kc == 37 || kc == 38 || kc == 39 || kc == 40 ) {
                    keys[kc] = true;

                    return false;
                } else {
                    return true;
                }
            },

            keyup: function(e) {
                delete keys[e.keyCode];
            }
        });

        init();
    });
})();
