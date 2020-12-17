function ArrayList() {

    let array = []; //{1}

    this.insert = function (item) { //{2}
        array.push(item);
    };

    this.toString = function () { //{3}
        return array.join();
    };
}

/*
    注意ArrayList类并没有任何方法来移除数据或插入数据到特定位置。我们刻意保持简单是为了能够专注于排序和搜索算法。
    所有的排序和搜索算法会添加至这个类中。

 */
