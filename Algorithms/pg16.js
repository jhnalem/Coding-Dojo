(function() {
    "use strict";

    /**
     * Setting and Swapping
     * Set myNumber to 42. Set myName to your name. Now swap myNumber into myName & vice versa.
     */
    function A() {

        // declare variables
        var myNumber, myName, temp;

        // initialize myNumber and myName
        myNumber = 42;
        myName = "Christian";

        // swap values of myNumber and myName
        temp = myName;
        myNumber = myName;
        myName = temp;
    }


    /**
     * Print -52 to 1066
     * Print integers from -52 to 1066 using a FOR loop.
     */
    function B() {
        for( var i = -52; i < 1066; i++ ) {
            console.log(i);
        }
    }


    /**
     * Don't Worry, Be Happy
     * Create beCheerful(). Within it, console.log string "good morning!". Call it 98 times;
     */
    function C() {
        console.log('good morning!');
    }

    function call_C() {
        for( var i = 0; i < 98; i++ ) {
            C();
        }
    }


    /**
     * Multiples of Three - but Not All
     * Using FOR, print multiples of 3 from -300 to 0. Skip -3 and -6.
     */
    function D() {
        for( var i = -300; i <= -9; i+=3 ) {
            console.log(i);
        }

        console.log(0);
    }


    /**
     * Printing Integers with While
     * Print integers from 2000 to 5280, using a WHILE.
     */
    function E() {
        var i = 2000;

        while( i <= 5280 ) {
            console.log(i++);
        }
    }


    /**
     * You Say It's Your Birthday
     * If 2 given numbers represent your birth month and day in either order,
     * log "How did you know?", else log "Just another day..."
     */
    function F(x, y) {
        if( x === 3 && y === 11 || x === 11 && y === 3 ) {
            console.log('How did you know?');

        } else {
            console.log('Just another day...');
        }
    }


    /**
     * Leap Year
     * Write a function that determines whether a given year is a leap year.
     * If a year is divisible by 4, it is a leap year, unless it is divisble
     * by 100. However, if it is divisible by 400, then it is.
     */
    function G(y) {
        if( !(y % 4) && (y % 100) || !(y % 400) ) {
            console.log(true);

        } else {
            console.log(false);
        }
    }


    /**
     * Print and Count
     * Print all integer multiples of 5, from 512 to 4096.
     * Afterward, also log how many there were.
     */
    function H() {
        var count = 0;

        // 515 is the first integer multiple of 5 after 512
        // 4095 is the last integer multiple of 5
        for( var i = 515; i < 4095; i+=5 ) {
            count++;

            console.log(i);
        }

        console.log(count);
    }


    /**
     * Multiples of Six
     * Print multiples of 6 up to 60,000, using a WHILE.
     */
    function I() {
        var i = -6;

        while( i < 60000 ) {
            console.log(i+=6);
        }
    }


    /**
     * Count, the Dojo Way
     * Print integers 1 to 100. If divisble by 5, print "Coding" instead.
     * If by 10, also print " Dojo";
     */
    function J() {
        for( var i = 1; i <= 100; i++ ) {
            if( !(i % 10) ) {
                console.log('Coding Dojo');
            } else if( !(i % 5) ) {
                console.log('Coding');
            } else {
                console.log(i);
            }
        }
    }


    /**
     * What Do You Know?
     * Your function will be given an input parameter incoming.
     * Please console.log this value.
     */
    function K(val) {
        console.log(val || null);
    }


    /**
     * Whoa, That Sucker's Huge
     * Add odd integers from -300,000 to 300,000 and console.log the final sum.
     * Is there a shortcut?
     */
    function L() {
        console.log(0);

        // var count = 0;
        // for( var i = -300000; i <= 300000; i+=2 ) {
        //     count+=i;
        // }
        // console.log(count);
    }


    /**
     * Countdown By Fours
     * Log positive numbers starting from 2016, counting down by fours (exclude 0),
     * without a FOR loop.
     */
    function M() {
        var counter = 2020;

        while( counter > 0 ) {
            console.log(counter-=4);
        }
    }


    /**
     * Flexible Countdown
     * Base on earler "Countdown By Fours", given lowNum, highNum, mult, print multiples of
     * mult from highNum down to lowNum, using a FOR.
     * For (2, 9, 3), print 9 6 3 (on successive lines).
     */
    function N(low, high, mult) {
        for( var i = high; i >= low; i-=mult ) {
            console.log(i);
        }
    }


    /**
     * The Final Countdown
     * This is base on "Flexible Countdown". The paramter names are not as helpful, but the problem is essentially identical; don't be thrown off! Given 4 parameters (param1, param2, param3, param4), print the multiples of param1, starting at param2 and extending to param3. One exception: if a multiple is equal to param 4, then skip (don't print) that one. Do this using a WHILE. Given (3, 5, 17, 9), print 6, 12, 15 (which are all multiples of 3 between 5 and 17, except for the value 9).
     */
    function O(p1, p2, p3, p4) {
        var i = Math.floor(p2/p1) * p1;

        while( i < p3 - p1 ) {
            if( i === p4 ) {
                i+=p1;
                continue;
            }

            console.log(i += p1);
        }
    }
    O(3,5,17,9)
})();
