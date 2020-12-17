function MinCoinChange(aCoin) {
    let coins = aCoin; //{1}
    let cache = {};//{2}

    this.makeChange = function (amount) {
        let me = this;
        if (!amount) { //{3}
            return [];
        }
        if (cache[amount]) { //{4}
            return cache[amount];
        }

        let min = [], newMin, newAmount;
        for (let i = 0; i < coins.length; i++) { //{5}
            let coin = coins[i];
            newAmount = amount - coin; //{6}
            if (newAmount >= 0) {
                newMin = me.makeChange(newAmount); //{7}
            }

            if (
                newAmount >= 0 && //{8}
                (newMin.length < min.length - 1 || !min.length)//{9}
                && (newMin.length || !newAmount) //{10}
            ) {
                min = [coin].concat(newMin); //{11}
                console.log('new Min ' + min + ' for ' + amount);
            }

        }
        return (cache[amount] = min); //{12}
    }
};
var minCoinChange = new MinCoinChange([1, 5, 11]);
console.log(minCoinChange.makeChange(15));
console.log(minCoinChange.makeChange(13));
console.log(minCoinChange.makeChange(6));
console.log(minCoinChange.makeChange(8));
console.log(minCoinChange.makeChange(99));
