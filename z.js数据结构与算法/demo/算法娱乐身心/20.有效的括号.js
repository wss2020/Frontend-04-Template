/**
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:
输入: "()"
输出: true

示例 2:
输入: "()[]{}"
输出: true

示例 3:
输入: "(]"
输出: false

示例 4:
输入: "([)]"
输出: false

示例 5:
输入: "{[]}"
输出: true
**/

/**
 * 解题思路1
   借鉴了国际站的实现思路，遍历字符串时，匹配到左括号时是将其相应的右括号进行了压栈，
   遇到右括时判断和栈顶元素是否相等即可，最后判断栈是否为空
 * @type {{"(": string, "{": string, "[": string}}
 */

let map = {
    '{' : '}',
    '(' : ')',
    '[' : ']'
};
/**
 * * @param {string} s
 * * @return {boolean} */
function isValid(s) {
    let stack = [];
    let top;

    for(let char of s){
        let value;
        if( (value = map[char]) ){
            stack.push(value);
        }else{
            top = stack.pop();
            if(top !== char){
                return false;
            }
        }
    }
    return !stack.length;
}


/**
 * 思路2

 如果字符串是奇数返回 false
 每次用空字符串替换一个紧挨着的括号
 如果是有效括号，返回true

 /**
 * @param {string} s
 * @return {boolean}
 */
let isValid2 = function(s) {
    if (s.length % 2 !== 0) return false;
    const len = s.length/2;
    for (let i = 0; i < len; i++) {
        s = s.replace(/(\(\))|(\[\])|(\{\})/, '');
    }
    return s.length == 0;
};


/**
 * 解题思路3  和思路1 基本上一致，但1利用了数据结构的特性，更棒。
 利用栈。
 遇到左括号，一律推入栈中，
 遇到右括号，将栈顶部元素拿出，如果不匹配则返回 false，如果匹配则继续循环。

 为了提高性能, 在循环前进行这一步：let len = s.length是非常关键的，减少了计算次数。
 为了提高执行时间，这一步if (len%2) return false是非常关键的，减少了不必要的计算。

 /**
 * @param {string} s
 * @return {boolean}
 */
let isValid3 = function(s) {
    let arr = [];
    let len = s.length;
    if (len%2) return false;
    for (let i = 0; i < len; i++) {
        let letter = s[i];
        switch(letter) {
            case "(": {
                arr.push(letter)
                break;
            }
            case "[": {
                arr.push(letter)
                break;
            }
            case "{": {
                arr.push(letter)
                break;
            }
            case ")": {
                if (arr.pop() !== "(") return false;
                break;
            }
            case "]": {
                if (arr.pop() !== "[") return false;
                break;
            }
            case "}": {
                if (arr.pop() !== "{") return false;
                break;
            }
        }
    }
    return !arr.length

};


console.log(  isValid("()")   );
console.log(  isValid("()[]{}")   );
console.log(  isValid("(]")   );
console.log(  isValid("([)]")   );
console.log(  isValid("{[]}")   );












