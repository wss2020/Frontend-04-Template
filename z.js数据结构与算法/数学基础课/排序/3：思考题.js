/**
 * 假设有一个 4 位字母密码，每位密码是 a～e 之间的小写字母。你能否编写一段代码，来暴力破解该密码？
 * （提示：根据可重复排列的规律，生成所有可能的 4 位密码。）
 * */


const password = 'bacd'
const classes = ['a', 'b', 'c', 'd', 'e']

/**
 * @Description:  使用函数的递归（嵌套）调用，找出所有可能的密码顺序
 * @param n-目前密码可尝试的位数，result-保存当前已经生成的字母及顺序
 * @return void
 */
function get_password(n, result = '') {

    // 找到了密码，输出结果
    if (n === 0 || result === password) {
        // console.log(result);
        if(result === password ){
            console.log('找到了密码：' + result);
        }
        return;
    }

    for (let i = 0; i < classes.length; i++) {
        // 从剩下的未选的字母中，选择一个，加入结果
        let new_result = result.slice();
        new_result = new_result + classes[i];

        // 递归调用，对于密码可尝试的位数，继续生成排列
        get_password(n - 1, new_result)
    }
}

get_password(4)
