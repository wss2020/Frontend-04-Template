/**
It can be annoying to specify types like <number> or <string> every time you call makeState().

 So here’s an idea: Can we make it so that <number> is the default type parameter of makeState()?
 We want to make it so that, if S is unspecified, it’s set as number by default.
*/

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

// Can we make it so that, <number> is the default type paramter of makeState()?
// We want these two statements to be equivalent
const numState1 = makeState()
const numState2 = makeState<number>()





/**
 To make this happen, we can specify the default type of S by adding = number at the end.
 It’s kind of like setting default values for regular function parameters, right?
 */
// Set the default type of S as number
function makeState1<S extends number | string = number> (){
    let state: S
    function getState() {
        return state
    }
    function setState(x: S) {
        state = x
    }
    return { getState, setState }
}

// By doing this, you can create a number-only state without specifying the type:
// Don’t need to use <number>
const numState3 = makeState1()
numState3.setState(1)
console.log(numState3.getState())





