let cache = {};
let count = 0;

function check(newAmount, newMin, min) {
    return newAmount >= 0
        && (newMin.length < min.length - 1 || !min.length)
        && (newMin.length || !newAmount);
}

function makeChange(coins, amount) {
    count++;

    if (!amount) return [];
    if (cache[amount]) return cache[amount];

    let min = [], newMin, newAmount;
    for (let i = 0; i < coins.length; i++) {
        let coin = coins[i];
        newAmount = amount - coin;

        if (newAmount >= 0) {
            newMin = makeChange(coins, newAmount);
        }

        if (check(newAmount, newMin, min)) {
            min = [coin].concat(newMin);
            console.log('new Min ' + min + ' for ' + amount);
        }

    }
    return (cache[amount] = min);
}

console.log(makeChange([1, 2, 3, 7], 100));

console.log(count);
