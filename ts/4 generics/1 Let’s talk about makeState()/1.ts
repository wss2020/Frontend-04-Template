function makeState() {
    let state: number | string;
    function getState() {
        return state
    }
    function setState(x: number | string) {
        state = x
    }
    return { getState, setState }
}


const { getState, setState } = makeState()
setState(1)
console.log(getState())

setState(2)
console.log(getState())


setState('foo')
console.log(getState())


/**
 This does NOT work. You’ll end up creating a state that allows both numbers and strings,
 which is not what we want.
 Instead, we want makeState() to support creating two different
 states: one that allows only numbers, and the other that allows only strings.

 */













































