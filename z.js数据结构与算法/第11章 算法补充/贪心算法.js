function MinCoinChange(aCoins) {
    let coins = aCoins; //{1}

    this.makeChange = function (amount) {
        let change = [],
            total = 0;
        for (let i = coins.length; i >= 0; i--) { //{2}
            let coin = coins[i];
            while (total + coin <= amount) { //{3}
                change.push(coin);//{4}
                total += coin;//{5}
            }
        }
        return change;
    };
}


