(function() {
    "use strict";

    /**
     * Countdown
     * Create a function that accepts a number as input.
     * Return a new array that counts down by one, from the number (as array's zeroth element) down to 0 (as the last element). How long is this array?
     */
    function A(num) {
        var arr = [];

        for( var i = num; i >= 0; i-- ) {
            arr.push(i);
        }

        return arr;
    }


    /**
     * Print and Return
     * Your function will receive an array with two numbers.
     * Print the first value, and return the second.
     */
    function B(arr) {

        console.log(arr[0]);

        return arr[1];
    }


    /**
     * First Plus Length
     * Given an array, return the sum of the first value in the array, plus the array's length.
     * What happens if the array's first value is not a number, but a string (like "what?") or a boolean (like false).
     */
    function C(arr) {

        return arr[0] + arr.length;
    }


    /**
     * Values Greater than Second
     * For [1, 3, 5, 7, 9, 13], print values that are greater than its 2nd value.
     * Return how many values this is.
     */
    function D() {
        var arr = [1, 3, 5, 7, 9, 13];

        console.log(5, 7, 9, 13);

        return 4;
    }


    /**
     * Values Greater than Second, Generalized
     * Write a function that accepts any array, and returns a new array with values that are greater than its 2nd value. Print how many values this is. What will you do if the array is only one element long?
     */
    function E(arr) {
        var counter = 0;

        for( var i = 0; i < arr.length; i++ ) {
            if( arr[i] > arr[1] ) {
                console.log(arr[i]);
                counter++;
            }
        }

        return counter;
    }


    /**
     * This Length, That Value
     * Given two numbers, return array of length num1 with each value num2.
     * Print "Jinx!" if they are the same.
     */
    function F(num1, num2) {
        var arr = [];

        for( var i = 0; i < num1; i++ ) {
            arr[i] = num2;
        }

        if( num1 === num2 ) { console.log('Jinx!'); }

        return arr;
    }


    /**
     * Fit the First Value
     * Your function should accept an array. If value at [0] is greater than array's length, print "Too big!"; if value at [0] is less than array's length, print "Too small!"; otherwise print "Just right!".
     */
    function G(arr) {
        var len = arr.length,
            val = arr[0];

        if( val > len ) { console.log('Too big!'); }
        else if( val < len ) { console.log('Too small!'); }
        else { console.log('Just right!'); }
    }


    /**
     * Fahrenheit to Celsius
     * Kelvin wants to convert between temperature scales. Create fahrenheitToCelsius(fDegrees) that accepts a number of degrees in Fahrenheit, and returns the equivalent temperature as express in Celsius degrees. For review, Fahrenheit = (9/5 * Celsius) + 32
     */
    function H(f) {

        return (f - 32) * (5 / 9);
    }


    /**
     * Celsius to Fahrenheit
     * Create celsiusToFarhenheit(cDegrees) that accepts number of degrees Celsius, and returns the equivalent temperature expressed in Fahrenheit degrees.
     */
    function I(c) {

        return (9 / 5 * c) + 32;
    }


    /**
     * Same Fahrenheit and Celsius degrees
     * Do Fahrenheit and Celsius values equate at a certain number? Scientific calculation can be complex, so for this challenge just try a series of Celsius integer values starting  at 200, going downward (descending), checking whether it is equal to the corresponding Fahrenheit value.
     */
    function J() {
        var cel = 200,
            fah = I(cel);

        while( cel <= fah ) {
            if( cel === fah ) { return cel; }

            cel--;
            fah = I(cel);
        }

        return null;
    }

})();
