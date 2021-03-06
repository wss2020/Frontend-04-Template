/**
 网址：https://time.geekbang.org/column/article/76183

 实战演练：钱币组合的新问题

 和排列组合等穷举的方法相比，动态规划法关注发现某种最优解。如果一个问题无需求出所有可能的解，而是要找到满足一定条件的最优解，
 那么你就可以思考一下，是否能使用动态规划来降低求解的工作量。

 还记得之前我们提到的新版舍罕王奖赏的故事吗？国王需要支付一定数量的赏金，而宰相要列出所有可能的钱币组合，这使用了排列组合的思想。
 如果这个问题再变化为“给定总金额和可能的钱币面额，能否找出钱币数量最少的奖赏方式？”，那么我们是否就可以使用动态规划呢？

 举个例子，假设这里我们有三种面额的钱币，2 元、3 元和 7 元。为了凑满 100 元的总金额，我们有三种选择。
 */
let count = 0;
let arr = [];
function MinCount(i) {
    count++;

    arr[1] = 'undefined';
    arr[2] = 1;
    arr[3] = 1;
    arr[4] = 2;
    arr[7] = 1;
    if(arr[i]) return arr[i];

    if (i > 4) {
        const Money2Count = i - 2 > 1 ? MinCount(i - 2) + 1 : Infinity;
        const Money3Count = i - 3 > 1 ? MinCount(i - 3) + 1 : Infinity;
        const Money7Count = i - 7 > 1 ? MinCount(i - 7) + 1 : Infinity;

        console.log(i, ":", Money2Count, Money3Count, Money7Count);

        let min = Math.min(Money2Count, Money3Count);
        arr[i] = Math.min(min, Money7Count)
    }

    return arr[i];
}

console.log(MinCount(100 ));
console.log("count: " + count);


/**
    中国程序员的最大阻碍是语言障碍，英语不好，无法和世界各地的人交流技术，坐井观天的人很多。
    第二个严重的问题就是学习能力不强而且没有毅力，很容易放弃，不肯花时间深入思考问题和钻研，大多思考如何能少加班，如何能赚更多，
 如何在工作中偷懒等等。
    第三个问题就是好高骛远不能脚踏实地，很多人刚毕业就想要很多钱，换一份工作就想涨很多钱，但是能力不够，基础不扎实，有些连在简
 历中写的技术都说不清楚。曾经我是他们中的一员，但是我想改变去，不想继续平庸下去，所以，我来了，加油，坚持坚持再坚持!!!
 */
