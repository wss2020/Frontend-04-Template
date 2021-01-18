
// This is where generics come in. Take a look below:
// makeState<S>() is a generic function
function makeState<S>() {
    let state: S
    function getState() {
        return state
    }
    function setState(x: S) {
        state = x
    }
    return { getState, setState }
}

/**
 makeState() is now defined as makeState<S>().
 You can think of <S> as another thing that you have to pass in when you call the function.
 But instead of passing a value, you pass a type to it.
 */

// For example, you can pass the type number as S when you call makeState():
// It sets S as number
makeState<number>();

/**
 Then, inside the function definition of makeState(), S will become number:
In the function definition of makeState()
    let state: S // <- number
    function setState(x: S  <- number ) {
        state = x
    }
*/

// Because state will be number and setState will only take number, it creates a number-only state.
// Creates a number-only state
const numState = makeState<number>()
numState.setState(1)
console.log(numState.getState())
// numState.setState('foo') will fail!


// On the other hand, to create a string-only state,
// you can pass string as S when you call makeState():
// Creates a string-only state
const strState = makeState<string>()
strState.setState('foo')
console.log(strState.getState())
// strState.setState(1) will fail!


/**
 Note: We call makeState<S>() a “generic function” because it’s literally generic—you
 have a choice to make it number-only or string-only. And you know it’s a generic function
 if it takes a type parameter.
 */















