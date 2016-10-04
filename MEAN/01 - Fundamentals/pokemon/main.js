var all = [];

(function() {
  "use strict";

  var game = {
      players: [],
      deck: [],
      addPlayer: function(player) {
          this.players.push(player);

          return this;
      }
  };

  class Player {
    constructor(name) {
      this.name = name;
      this.hand = [];
    }

    addCard(card) {
      this.hand.push(card);
    }
  }

  var player1 = new Player('Joe');
  var player2 = new Player('Sarah');

  game.addPlayer(player1).addPlayer(player2);

  // for( var i = 0; i <= 151; i++ ) {
  //   $.getJSON('http://pokeapi.co/api/v2/pokemon/' + i, function(res) {
  //     all.push(res);
  //   });
  // }

  var all_pokemon = $.ajax({
    type: 'GET',
    dataType: 'json',
    async: false
  }).done(function(res) {
    console.log(res)
  })

})();
