/**
 Here’s a generic version of makePair.
    It takes two type parameters F and S (for “F”irst and “S”econd).
    The type of first will be F.
    The type of second will be S.
 */
function makePair<F, S>() {
    let pair: { first: F; second: S }

    function getPair() {
        return pair
    }

    function setPair(x: F, y: S) {
        pair = {
            first: x,
            second: y
        }
    }

    return { getPair, setPair }
}


/**
 Here’s an example usage. By calling makePair with <number, string>,
 it forces first to be number and second to be string.
 */
// Creates a (number, string) pair
const { getPair, setPair } = makePair< number, string>()
// Must pass (number, string)
setPair(1, 'hello')



// To summarize, you can create a generic function that takes multiple type parameters.
// makeState() has 1 type parameter
function makeState1<S>(){}
// makePair() has 2 type parameters
function makePair1<F, S>(){}

// Of course, you can also use the extends keyword or default types like before:
function makePair2<
    F extends number | string = number,
    S extends number | string = number
    >(){}


// You can even make the second type (S) to be related to the first type (F). Here’s an example:

// The second parameter S must be either
// boolean or whatever was specified for F
function makePair3<
    F extends number | string,
    S extends boolean | F
    >(){}

// These will work
makePair3<number, boolean>()
makePair3<number, number>()
makePair3<string, boolean>()
makePair3<string, string>()

// This will fail because the second
// parameter must extend boolean | number,
// but instead it’s string
makePair3<number, string>()





















