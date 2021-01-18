/**
 Let’s take a look at the new function called makePair(). It’s similar to makeState(),
 but instead of storing a single value, this one stores a pair of values as { first: ?, second: ? }.
 Right now, it only supports numbers.
 */
function makePair() {
    // Stores a pair of values
    let pair: { first: number; second: number }

    function getPair() {
        return pair
    }

    // Stores x as first and y as second
    function setPair(x: number, y: number) {
        pair = {
            first: x,
            second: y
        }
    }

    return { getPair, setPair }
}

const { getPair, setPair } = makePair()
setPair(1, 2)
console.log(getPair())
setPair(3, 4)
console.log(getPair())
















