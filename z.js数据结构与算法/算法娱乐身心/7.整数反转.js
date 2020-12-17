/**
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

 示例 1:

 输入: 123
 输出: 321
  示例 2:

 输入: -123
 输出: -321
 示例 3:

 输入: 120
 输出: 21
 注意:

 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

 来源：力扣（LeetCode）
 链接：https://leetcode-cn.com/problems/reverse-integer
 */


/**
 * 思路
 由题可知
 对数字进行反转，且对反转后的数值有一定的限定
 在这里，我把数值按照正数和负数分开处理的
 之后对返回的结果res,进行范围判断
 其中，Math.pow(x,y)是返回 x 的 y 次幂
 */
/**
 * @param {number} x
 * @return {number}
 */
let reverse = function (x) {
    let res = '';
    let str = x + '';
    if (x > 0) {
        for (let i = str.length - 1; i >= 0; i--) {
            res += str[i]
        }
    } else {
        for (let i = str.length - 1; i > 0; i--) {
            res += str[i]
        }
        res = -res
    }

    if (res < Math.pow(-2, 31) || res >= Math.pow(2, 31) - 1) {
        return 0
    }
    return res * 1
};

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));
console.log(reverse(5523552));
console.log(reverse(1534236469));

