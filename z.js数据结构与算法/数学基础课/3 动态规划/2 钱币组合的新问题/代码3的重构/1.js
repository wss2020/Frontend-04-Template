let sumCount = 0;
let arr = {};

function getMin(MoneyCounts,coins) {
    let min = MoneyCounts[0];
    let i = 0;
    if ( MoneyCounts[0].count >=  MoneyCounts[1].count) {
        min = MoneyCounts[1], i = 1;
        if (min.count >= MoneyCounts[2].count) {
            min = MoneyCounts[2], i = 2;
            if(min.count >= MoneyCounts[3].count){
                min = MoneyCounts[3], i = 3;
            }
        }
    }
    min = {count: min.count + 1, value: min.value.concat(coins[i])}
    return min;
}

function MinCount(i,coins) {
    sumCount++;

    if (arr[i]) return arr[i];

    let MoneyCounts = coins.map(item=>{
        // 这个判断条件 大于多少，要根据具体情况，不过，这个值，可以作为参数，传进来。
         return i - item > 0 ? MinCount(i - item,coins) : {count: Infinity, value: []};
    });

    let {count, value} = getMin(MoneyCounts,coins);
    arr[i] = {count: count, value: value}

    return arr[i];
}

let coins = [1,2,3,7];
coins.map(item=>{ arr[item] = {count: 1, value: [item]} })
console.log(   MinCount(100,coins )    );
console.log("sumCount: " + sumCount);



