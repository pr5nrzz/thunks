/* Synchronous thunk (It is a function that doesn't require any argument to do it's job)
function add(x, y) {
    return x + y;
}

// No matter how many times this function is called, output will be same because values are hardcoded
var thunk = function () {
    return add(10, 5);
}

// Here thunk itself containing function has become a container around that particular collection of state (x => 10, y => 5)
// This container can be anytime passed around the program and the values can be extracted
// This thunk container doesn't expect a value, it's like a token, call the function and get the values
thunk(); // 15
*/

/* Asynchronous thunk (It is a function that doesn't require any arguments, except a callback so that value can be extracted)
// Example1
function addAsync(x, y, cb) {
    setTimeout(function () {
        cb(x + y);
    }, 100);
}

var thunk = function (cb) {
    return addAsync(10, 5, cb); // Values are hardcoded
}

// Asynchronous thunk is same as synchronous thunk, except that it expects a callback function
// Form the outside world, we do not know, nor do we care whether the value is available immediately or after sometime, it doesn't make any difference
// By wrapping this function around the state and allowing it to be asynchronous in nature, we have essentially normalized time out of the equation
// We have produced a wrapper around a value that is time independent (value can come anytime)
thunk(function (sum) {
    console.log(sum);
});
*/

/* Example2
// add
function addAsync(x, y, cb) {
    setTimeout(function () {
        cb(x + y);
    }, 100);
}

// make thunk
function makeThunk(fn) {
    var args = [].slice.call(arguments, 1);

    return function (cb) {
        args.push(cb);
        fn.apply(null, args);
    }
}

// create thunk
var thunk = makeThunk(addAsync, 5, 10);

// call thunk
thunk(function (sum) {
    console.log(sum);
});
*/
