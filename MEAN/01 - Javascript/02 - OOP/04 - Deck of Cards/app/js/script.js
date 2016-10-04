(function() {
    "use strict";

    class Deck {
        constructor() {
            this.cards = [];
            this.build();
        }

        build() {
            let suits  = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
            let values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];

            for( let s in suits ) {
                for( let v in values ) {
                    this.cards.push(
                        $('<img/>', {src: `images/${suits[s][0]}${values[v]}.png`.toLowerCase()}).addClass('responsive-img')
                    );
                }
            }

            return this;
        }

        shuffle() {
            var array = this.cards;

            var m = array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return this;
        }

        reset() {
            this.cards = [];

            this.build();

            return this;
        }

        deal() {
            var rand = Math.floor(Math.random * this.cards.length),
                card = this.cards.splice(rand, 1);

            return card[0];
        }
    }

    class Person {
        constructor(name) {
            this.name = name;
            this.hand = [];
        }

        drawCard(deck) {
            this.hand.push(deck.deal());
        }

        disCard(card) {
            var idx = this.hand.indexOf(card);
            if( idx > -1 ) {
                this.hand.splice(idx, 1);
            }
        }
    }

    var deck = (new Deck()).shuffle();
    var players = [];
    var dealt = [];

    var $name = $('#name');

    var paintCards = function() {
        for( let i = 0; i < players.length; i++ ) {
            var player = players[i],
                cards = player.hand,
                container = player.html.querySelector('div');

            $(container).append(cards);
        }
    };

    var init = function() {
        $('#deal, #reset').hide();

        $('#addPlayer').on('click', function(e) {
            var name = $name.val();

            if( !name ) { return false; }

            var newPerson = new Person(name);

            var player = document.createElement('div');
            player.obj = newPerson;
            player.id = `player-${name}`;
            player.innerHTML = `<h4>${name}</h4>`;

            var cards = document.createElement('div');
            cards.className = 'cards';
            player.appendChild(cards);

            newPerson.html = player;

            players.push(newPerson);

            $('#table').append(player);

            $name.val('');
        });

        $('#start').on('click', function(e) {
            if( players.length < 2 ) {
                alert('Need more players.');
                return false;
            }

            $('#players, #start').hide();
            $('#deal').show();

            for( let j = 0; j < 2; j++ ) {
                for( let i = 0; i < players.length; i++ ) {
                    players[i].drawCard(deck);
                }
            }

            paintCards();
        });

        $('#deal').on('click', function(e) {
            var count = document.getElementById('dealer').childElementCount;

            if( count === 0 ) {
                dealt.push(deck.deal());
                dealt.push(deck.deal());
                dealt.push(deck.deal());
            } else if( count === 3 ) {
                dealt.push(deck.deal());
            } else if( count === 4 ) {
                dealt.push(deck.deal());
                $('#deal').hide();
                $('#reset').show();
            }

            for( let i = 0; i < dealt.length; i++ ) {
                $('#dealer').append(dealt);
            }
        });

        $('#reset').on('click', function(e) {
            deck.reset().shuffle();
            dealt = [];
            for( let i = 0; i < players.length; i++ ) {
                var player = players[i];

                // player.hand = [];
                while( player.hand.length ) {
                    player.disCard(player.hand[0]);
                }
            }
            $('#dealer, .cards').html('');
            $('#reset').hide();
            $('#start').show();
        });
    };

    $(init);

})();
