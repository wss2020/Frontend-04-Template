function InitArray(a, b) {
    let arr = [];
    for (let i = 0; i <= a.length; i++) {
        arr[i] = [];
        for (let j = 0; j <= b.length; j++) {
            arr[i][j] = '';
        }
    }
    return arr;
}


/**
 * @Description:    使用状态转移方程，计算两个字符串之间的编辑距离
 * @param a-第一个字符串，b-第二个字符串
 * @return number-两者之间的编辑距离
 */

function getStrDistance(a, b) {

    if (a == null || b == null) return -1;

    // 初始用于记录化状态转移的二维表
    let d = InitArray(a, b);

    // 如果i为0，且j大于等于0，那么d[i, j]为j
    for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
    }

    // 如果i大于等于0，且j为0，那么d[i, j]为i
    for (let i = 0; i <= a.length; i++) {
        d[i][0] = i;
    }


    // 实现状态转移方程
    // 请注意由于Java语言实现的关系，代码里的状态转移是从d[i, j]到d[i+1, j+1]，而不是从d[i-1, j-1]到d[i, j]。本质上是一样的。
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {

            let r = 0;
            if (a[i] !== b[j]) {
                r = 1;
            }

            const first_append = d[i][j - 1] + 1;
            const second_append = d[i - 1][j] + 1;
            const replace = d[i - 1][j - 1] + r;

            if (j === 1) console.log("-------------")
            const result = " " + first_append + " " + second_append + " " + replace + " ";
            console.log(result);


            let min = Math.min(first_append, second_append);
            min = Math.min(min, replace);
            d[i][j] = min;
        }
    }

    return d[a.length][b.length];

}


console.log(getStrDistance("mouse", "mouuse"));
//System.out.println(Lesson10_1.getStrDistanceByThreshold("mouse", "mouuse", 0));


// 状态转移表的 A:o  B:o   那个是 （2，2，0）= 0；  图片上错了

