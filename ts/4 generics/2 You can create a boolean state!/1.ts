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


// Creates a boolean-only state
const boolState = makeState<boolean>()
boolState.setState(true)
console.log(boolState.getState())

/**
 Maybe we might NOT want this to be allowed.
 Suppose that don’t want makeState() to be able to create non-number or
 non-string states (like boolean). How can we ensure this?

 The solution: When you declare makeState(),
 you change the type parameter <S> to <S extends number | string>.
 That’s the only change you need to make.
 */

function makeState1<S extends number | string>(){}


/**
 By doing this, when you call makeState(),
 you’d only be able to pass number, string,
 or any other type that extends either number or string as S.
 */

















