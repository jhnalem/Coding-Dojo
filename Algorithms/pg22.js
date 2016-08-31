(function() {
    "use strict";

    /**
     * Biggie Size
     * Given an array, write a function that changes all positive numbers in the array to "big".
     * Example: makeItBig([-1, 3, 5, -5]) returns the same array, changed to [-1, "big", "big", -5].
     */
    function A(arr) {
        for( var i = 0; i < arr.length; i++ ) {
            if( arr[i] > 0 ) { arr[i] = 'big'; }
        }

        return arr;
    }


    /**
     * Print Low, Return High
     * Create a function that takes array of numbers. The function should print the lowest value in the array, and return the highest value in the array.
     */
    function B(arr) {
        var low  = arr[0],
            high = arr[0];

        for( var i = 1; i < arr.length; i++ ) {
            var val = arr[i];

            if( val > high ) { high = val; }
            if( val < low  ) { low  = val; }
        }

        console.log(low);

        return high;
    }


    /**
     * Double Vision
     * Given array, create a function to return a new array where each value in the original has been doubled. Calling double([1, 2, 3]) should return [2, 4, 6] without chaning the original.
     */
    function C(arr) {
        var newArr = [];

        for( var i = 0; i < arr.length; i++ ) {
            newArr[i] = arr[i] * 2;
        }

        return newArr;
    }

    /**
     * Count Positives
     * Given array of numbers, create function to replace last value with number of positive values. Example, countPositives([-1, 1, 1, 1]) changes array to [-1, 1, 1, 3], and returns it.
     */
    function D(arr) {
        var count = 0;

        for( var i = 0; i < arr.length; i++ ) {
            if( arr[i] > 0 ) { count++; }
        }

        arr[arr.length - 1] = count;

        return arr;
    }


    /**
     * Evens and Odds
     * Create a function that accepts an array. Every time that array has three odd values in a row, print "That's odd!" Every time the array has three evens in a row, print "Even more so!"
     */
    function E(arr) {
        var even = 0, odd = 0;

        for( var i = 0; i < arr.length; i++ ) {
            if( arr[i] % 2 === 0 ) {
                odd = 0;
                even++;

            } else {
                even = 0;
                odd++;
            }

            if( even >= 3 ) { console.log("Even more so!"); }

            if( odd >= 3 ) { console.log("That's odd!"); }

        }
    }


    /**
     * Increment the Seconds
     * Given an array of numbers arr, add 1 to every second element, specifically those whose index is odd (arr[1], [3], [5], ...) Afterward, console.log each array value and return arr.
     */
    function F(arr) {
        var i, n = arr.length;

        for( i = 1; i < n; i+=2 ) {
            arr[i]++;
        }

        for( i = 0; i < n; i++ ) {
            console.log(arr[i]);
        }

        return arr;
    }


    /**
     * Previous Lengths
     * You are passed an array containing strings. Working within that same array, replace each string with a number - the length of the string at previous array index - and return the array
     */
    function G(arr) {
        for( var i = arr.length - 1; i > 0; i++ ) {
            arr[i] = arr[i - 1].length;
        }

        arr[0] = -1;

        return arr;
    }


    /**
     * Add Seven to Most
     * Build function that accepts array. Return a new array with all values except first, adding 7 to each. Do not alter the original array.
     */
    function H(arr) {
        var newArr = [];

        for( var i = 1; i < arr.length; i++ ) {
            newArr[i - 1] = arr[i] + 7;
        }

        return newArr;
    }


    /**
     * Reverse Array
     * Given array, write a function that reverses values, in-place. Example: reverse([3, 1, 6, 4, 2]) returns the same array, containing [2, 4, 6, 1, 3].
     */
    function I(arr) {
        var swap, index;

        for( var i = 0; i < arr.length / 2; i++ ) {
            index = arr.length - 1 - i;

            swap = arr[i];
            arr[i] = arr[index];
            arr[index] = swap;
        }

        return arr;
    }


    /**
     * Outlook: Negative
     * Given an array, create and return a new one containing all the values of the provided array, made negative (not simply multiplied by -1). Given [1, -3, 5] return [-1, -3, -5].
     */
    function J(arr) {
        var newArr = [];

        for( var i = 0; i < arr.length; i++ ) {
            newArr[i] = arr[i] > 0 ? 0 - arr[i] : arr[i];
        }

        return newArr;
    }


    /**
     * Always Hungry
     * Create a function that accepts an array, and prints "yummy" each time one of the values is equal to "food". If no array elements are "food", then print "I'm hungry" once.
     */
    function K(arr) {
        var check = false;

        for( var i = 0; i < arr.length; i++ ) {
            if( arr[i] === 'food' ) {
                console.log( 'yummy');
                check = true;
            }
        }

        if( !check ) {
            console.log("I'm hungry.");
        }
    }


    /**
     * Swap Toward the Center
     * Given array, swap first and last, third and third-to-last, etc. Input truem 42, "Ada", 2, "pizza"] becomes ["pizza", 42, "Ada", 2, true]. Change [1, 2, 3, 4, 5, 6] to [6, 2, 4, 3, 5, 1].
     */
    function L(arr) {
        var swap, index,
            len = arr.length - 1;

        for( var i = 0; i < len / 2; i+=2 ) {
            index = len - i;

            swap = arr[i];
            arr[i] = arr[index];
            arr[index] = swap;
        }

        return arr;
    }

    /**
     * Scale the Array
     * Given an array arr and a number num, multiply all values in arr by num, and return the changed array arr.
     */
    function K(arr, num) {
        for( var i = 0; i < arr.length; i++ ) {
            arr[i] *= num;
        }

        return arr;
    }

})();
