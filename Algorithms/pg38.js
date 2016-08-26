function pushFront(arr, x) {
    for( var i = arr.length - 1; i >= 0; i-- ) {
        arr[i + 1] = arr[i];
    }

    arr[0] = x;

    console.log(arr);
}
// pushFront([1,3,5], 7);


function popFirst(arr) {
    var temp = arr[0];

    for( var i = 0; i < arr.length; i++ ) {
        arr[i] = arr[i + 1];
    }

    arr.pop();

    console.log(arr, temp);
}
// popFirst([1,3,5,7]);


function insertAt(arr, index, value) {
    for( var i = arr.length - 1; i >= index; i-- ) {
        arr[i + 1] = arr[i];
    }

    arr[index] = value;

    console.log(arr);
}
// insertAt([1,3,5], 1, 7);

function removeAt(arr, index) {
    var val = arr[index];

    for( var x = index; x < arr.length; x++ ) {
        arr[x] = arr[x + 1];
    }

    arr.length = arr.length - 1;

    console.log(arr, val);
}
// removeAt([1,3,5,7,9], 4);

function swapPairs(arr) {
    var temp;

    for( var i = 0; i < arr.length - 1; i+=2 ) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
    }

    console.log(arr);
}
// swapPairs([1,3,5,7,5]);
// swapPairs([1,3,5,7]);

function removeDuplicates(arr) {
    var newArr = [];

    for( var i = 0; i < arr.length; i++ ) {
        if( arr[i] !== arr[i+1] ) {
            newArr[newArr.length] = arr[i];
        }
    }
    console.log(newArr);

}
removeDuplicates([1,3,3,5,7,7,7,9,9,9]);
