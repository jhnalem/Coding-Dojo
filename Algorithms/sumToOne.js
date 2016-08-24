function sumToOne(x) {
    var sum = x;

    do {
        var arr = [];

        for( var i = 0; i < x; i++ ) {
            var pow = Math.pow(10, i);

            if( pow > x ) { break; }

            arr.push( (sum % Math.pow(10, i + 1) - sum % pow) / pow );
        }

        sum = 0;
        for( var j = 0; j < arr.length; j++ ) {
            sum += arr[j];
        }

    } while( sum >= 10 );

    return sum;
};

function sumToOneStr(x) {
    var str = '' + x;

    var sum;

    do {
        sum = 0;

        for( var i = 0; i < str.length; i++ ) {
            sum += Number(str.charAt(i));
        }

        str = '' + sum;

    } while( sum >= 10 );

    return sum;
}

console.log(sumToOne(2087));
console.log(sumToOneStr(2087));
