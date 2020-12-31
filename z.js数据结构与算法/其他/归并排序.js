/**
 * @param to_sort-等待排序的数组
 * @return int[]-排序后的数组
 * @Description: 使用函数的递归（嵌套）调用，实现归并排序（从小到大）
 */
function merge_sort(to_sort) {
    if (to_sort == null) return 0;
    // 如果分解到只剩一个数，返回该数
    if (to_sort.length === 1) return to_sort;

    // 将数组分解成左右两半
    let mid = Math.round(to_sort.length / 2);
    let left = to_sort.slice(0, mid);
    let right = to_sort.slice(mid, to_sort.length);

    // 嵌套调用，对两半分别进行排序
    left = merge_sort(left);
    right = merge_sort(right);

    // 合并排序后的两半

    const merged = merge(left, right);

    return merged;
}


/**
 * @param a-第一个数组，b-第二个数组
 * @return int[]-合并后的数组
 * @Description: 合并两个已经排序完毕的数组（从小到大）
 */
function merge(a, b) {
    if (a == null) a = 0;
    if (b == null) b = 0;

    let merged_one = [];
    let mi = 0, ai = 0, bi = 0;

    // 轮流从两个数组中取出较小的值，放入合并后的数组中
    while (ai < a.length && bi < b.length) {
        if (a[ai] <= b[bi]) {
            merged_one[mi] = a[ai];
            ai++;
        } else {
            merged_one[mi] = b[bi];
            bi++;
        }
        mi++;
    }

    // 将某个数组内剩余的数字放入合并后的数组中
    if (ai < a.length) {
        for (let i = ai; i < a.length; i++) {
            merged_one[mi] = a[i];
            mi++;
        }
    } else {
        for (let i = bi; i < b.length; i++) {
            merged_one[mi] = b[i];
            mi++;
        }
    }

    return merged_one;
}

function main() {
    //const to_sort = [3434, 3356, 67, 12334, 878667, 387];
    const to_sort = [34, 77, 67, 12, 66, 44];
    const sorted = merge_sort(to_sort);

    for (let i = 0; i < sorted.length; i++) {
        console.log(sorted[i])
    }
}

main();
