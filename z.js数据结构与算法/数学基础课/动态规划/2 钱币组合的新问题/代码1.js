let count = 0;
let arr = [];
function MinCount(i) {
    count++;

    arr[1] = 'undefined';
    arr[2] = 1;
    arr[3] = 1;
    arr[4] = 2;
    arr[7] = 1;
    if(arr[i])  return arr[i];

    if (i > 4) {
        for (let j = 5; j <= i; j++) {
            const Money2Count = i - 2 > 1 ? MinCount(i - 2) + 1 : Infinity;
            const Money3Count = i - 3 > 1 ? MinCount(i - 3) + 1 : Infinity;
            const Money7Count = i - 7 > 1 ? MinCount(i - 7) + 1 : Infinity;

            console.log(i, ":", Money2Count, Money3Count, Money7Count);
            let min = Math.min(Money2Count, Money3Count);
            arr[i] = Math.min(min, Money7Count)
        }
    }

    return arr[i];
}

console.log(MinCount(1000));
console.log("count: " + count);
