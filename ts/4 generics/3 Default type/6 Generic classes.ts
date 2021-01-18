/**
 Generic classes

 The last thing we’ll cover is generic classes.
 First, let’s revisit the code for makeState().

 This is the generic version that doesn’t use extends or default type parameters.
 */

// Let’s revisit makeState()
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
 We can turn makeState() into a generic class called State like below.
 It looks similar to makeState(), right?
 */
class State<S> {
    state: S

    getState() {
        return this.state
    }

    setState(x: S) {
        this.state = x
    }
}


// To use this, you just need to pass a type parameter on initialization.

// Pass a type parameter on initialization
const numState = new State<number>()

numState.setState(1)

// Prints 1
console.log(numState.getState())


/**
 To summarize, generic classes are just like generic functions.
 Generic functions take a type parameter when we call them,
 but generic classes take a type parameter when we instantiate them.
 */












































