let sumCount = 0;
let arr = {};

function checkMin(Money2Count, Money3Count, Money7Count) {
    let min = Money2Count;
    let value = 2;
    if (Money2Count.count >= Money3Count.count) {
        min = Money3Count, value = 3;
        if (min.count >= Money7Count.count) {
            min = Money7Count, value = 7;
        }
    }
    min = {count: min.count + 1, value: min.value.concat(value)}
    return min;
}

function MinCount(i) {
    sumCount++;

    arr[2] = {count: 1, value: [2]};
    arr[3] = {count: 1, value: [3]};
    arr[7] = {count: 1, value: [7]};
    if (arr[i]) return arr[i];

        const Money2Count = i - 2 > 1 ? MinCount(i - 2) : {key: Infinity, value: []};
        const Money3Count = i - 3 > 1 ? MinCount(i - 3) : {key: Infinity, value: []};
        const Money7Count = i - 7 > 1 ? MinCount(i - 7) : {key: Infinity, value: []};

        let {count, value} = checkMin(Money2Count, Money3Count, Money7Count);
        arr[i] = {count: count, value: value}

    return arr[i];
}

console.log(MinCount(100) );
console.log("sumCount: " + sumCount);


/**
 中国程序员的最大阻碍是语言障碍，英语不好，无法和世界各地的人交流技术，坐井观天的人很多。
 第二个严重的问题就是学习能力不强而且没有毅力，很容易放弃，不肯花时间深入思考问题和钻研，大多思考如何能少加班，如何能赚更多，
 如何在工作中偷懒等等。
 第三个问题就是好高骛远不能脚踏实地，很多人刚毕业就想要很多钱，换一份工作就想涨很多钱，但是能力不够，基础不扎实，有些连在简
 历中写的技术都说不清楚。曾经我是他们中的一员，但是我想改变去，不想继续平庸下去，所以，我来了，加油，坚持坚持再坚持!!!
 */
