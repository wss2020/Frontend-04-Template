// Let’s go back to our previous implementation of makePair().
// Now, take a look at the type of pair:

function makePair<F, S>() {
    let pair: { first: F; second: S }
    // ...
}

/**
 This works as is, but if we want to, we can refactor { first: F, second: S }
 into an interface or a type alias so it can be reused.


 Let’s first extract the type of pair into a generic interface. I’ll use A and B as type
 parameter names to distinguish them from the type parameters of makePair().
 */

// Extract into a generic interface
// to make it reusable
interface Pair<A, B> {
    first: A
    second: B
}

// We can then use this interface to declare the type for pair.
function makePair1<F, S>() {
    // Usage: Pass F for A and S for B
    let pair: Pair<F, S>
    // ...
}


/**
 By extracting into a generic interface (an interface that takes type parameters),
 we can reuse it in other places if necessary.


 Alternatively, we can extract it into a generic type alias. For object types, type aliases
 are basically identical to interfaces, so you can use whichever one you prefer.
 * */
// Extract into a generic type alias. It’s basically identical to using an interface
type Pair1<A, B> = {
    first: A
    second: B
}

// To summarize, you can create generic interfaces and type aliases,
// just as you can create generic functions.
























