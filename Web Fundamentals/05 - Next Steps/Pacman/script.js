(function() {
    "use strict";

    var container;

    var PACMAN,
        PACMAN_POS = [-1, -1];

    var POINTS = 0;

    // 0 - wall
    // 1 - dot
    // 2 - empty
    // 3 - start
    // 5 - cherry
    var map = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,3,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,2,0,0,0,2,2,0,0,0,2,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,2,0,1,1,1,1,1,1,0,2,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,2,2,2,0,1,0,0,0,0,1,0,2,2,2,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,2,0,1,1,1,1,1,1,0,2,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
        [0,1,1,1,0,0,1,1,1,1,2,2,2,5,2,2,2,2,1,1,1,1,0,0,1,1,1,0],
        [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
        [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
        [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    var WORLD = [];

    var getBlock = (function() {
        var wall = document.createElement('div');
            wall.className = 'wall';

        var dot = document.createElement('div');
            dot.className = 'dot';

        var empty = document.createElement('div');
            empty.className = 'empty';

        var pacman = document.createElement('div');
            pacman.className = 'pacman';
            pacman.id = 'pacman';
            pacman.setAttribute('data-direction', 'right');
            pacman.setAttribute('data-next-direction', 'right');

        var cherry = document.createElement('div');
            cherry.className = 'cherry';

        var types = {
            wall: wall,
            dot: dot,
            empty: empty,
            pacman: pacman,
            cherry: cherry
        };

        return function(type) {
            return $(types[type].cloneNode(true));
        };
    })();

    var build = function() {
        var _getClass = function(i) {
            if( !i ) return 'wall';
            else if( i === 1 ) return 'dot';
            else if( i === 2 ) return 'empty';
            else if( i === 3 ) return 'pacman';
            else if( i === 5 ) return 'cherry';
        };

        for( var i = 0; i < map.length; i++ ) {
            var row = $('<div/>', { class: 'row' });
            WORLD[i] = [];

            for( var j = 0; j < map[i].length; j++ ) {
                var type = _getClass(map[i][j]);

                var block = getBlock(type);

                if( type === 'pacman' ) {
                    PACMAN = block;
                    PACMAN_POS = [i, j];
                }

                row.append(block);
                WORLD[i].push(block);
            }

            row.appendTo(container);
        }
    };

    var movePacman = function(dir) {
        var _canMove = function(dir) {
            var canMove = false;

            if( dir === 'left' ) {
                if( !!map[y][x - 1] ) {
                    canMove = true;
                }
            }

            if( dir === 'right' ) {
                if( !!map[y][x + 1] ) {
                    canMove = true;
                }
            }

            if( dir === 'up' ) {
                if( !!map[y - 1][x] ) {
                    canMove = true;
                }
            }

            if( dir === 'down' ) {
                if( !!map[y + 1][x] ) {
                    canMove = true;
                }
            }

            return canMove;
        };

        if( !dir ) dir = PACMAN.attr('data-direction') || 'right';

        var x = PACMAN_POS[0];
        var y = PACMAN_POS[1];

        if( _canMove(PACMAN.attr('data-next-direction')) ) {
            dir = PACMAN.attr('data-next-direction');
        }

        if( _canMove(dir) ) {
            PACMAN.attr('data-direction', dir);

            if( dir === 'left' ) {
                PACMAN_POS = [x - 1, y];
            } else if( dir === 'right' ) {
                PACMAN_POS = [x + 1, y];
            } else if( dir === 'up' ) {
                PACMAN_POS = [x, y - 1];
            } else if( dir === 'down' ) {
                PACMAN_POS = [x, y + 1];
            }

            map[y][x] = 2;

            if( map[PACMAN_POS[1]][PACMAN_POS[0]] === 1 ) {
                POINTS += 10;
                $('#points').text(POINTS);
            } else if( map[PACMAN_POS[1]][PACMAN_POS[0]] === 5 ) {
                POINTS += 50;
                $('#points').text(POINTS);
            }

            var newBlock = getBlock('empty');

            PACMAN.before(newBlock);
            WORLD[y][x] = newBlock;
            WORLD[PACMAN_POS[1]][PACMAN_POS[0]].replaceWith(PACMAN);
        }
    };

    var handles = function() {
        $(document).on('keydown', function(e) {
            var key = e.keyCode,
                dir = '';

            if( key === 37 ) {
                dir = 'left';

            } else if( key === 38 ) {
                dir = 'up';

            } else if( key === 39 ) {
                dir = 'right';

            } else if( key === 40 ) {
                dir = 'down';
            }

            if( dir ) {
                PACMAN.attr('data-next-direction', dir);
                return false;
            } else {
                return true;
            }
        });
    };

    var movement = function() {
        setInterval(function() {
            movePacman();
        }, 100);
    };

    $(function() {
        container = $('#world');

        build();
        handles();
        movement();

        window.World = WORLD;
    });

})();
