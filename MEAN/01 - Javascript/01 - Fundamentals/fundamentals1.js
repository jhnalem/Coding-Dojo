var x = [3, 5, 'Dojo', 'rocks', 'Michael', 'Sensei'];
x.push(100);
var newArr = ['hello', 'world', 'Javascript is Fun'];
x.push(newArr);
console.log(x);

var sum = 0;
for( var i = 1; i <= 500; i++ ) {
    sum += i;
}
console.log(sum);

var arr = [1, 5, 90, 25, -3, 0];
var min = arr[0],
    sum = 0;
for( var i = 1; i < arr.length; i++ ) {
    if( arr[i] < min ) { min = arr[i]; }

    sum += arr[i];
}
console.log(min);
console.log(sum / arr.length);

var new_ninja = {
    name: 'Jessica',
    profession: 'coder',
    favorite_language: 'JavaScript', //like that's even a question!
    dojo: 'Dallas'
}
for( var key in new_ninja ) {
    console.log(key, new_ninja[key]);
}
