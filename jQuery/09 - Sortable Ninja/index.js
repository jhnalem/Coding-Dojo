(function() {
    "use strict";

    var arr = [1,2,3,4,5];

    var shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }

        return array;
    }

    $(function() {
        var ninja = $('#ninja');

        var random = shuffle(arr);

        for( var i = 0; i < random.length; i++ ) {
            random[i] = $('<div/>').append(
                $('<img/>', { src: 'images/sort' + random[i] + '.png'})
            );
        }

        ninja.append(random);

        ninja.sortable();
    });
})();
