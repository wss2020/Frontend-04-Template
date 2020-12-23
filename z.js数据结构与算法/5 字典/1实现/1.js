/**
 集合表示一组互不相同的元素（不重复的元素）。   在字典中，存储的是[键，值]对，其中键名是用来查询特定元素的。
 字典和集合很类似，集合以[值，值]对的形式存储元素，  字典则是以[键，值]的形式来存储元素。字典也称为映射。

 用 Set 类类似，ES6 中同样包含了一个 Map 类的实现，即我们所说的字典。
 我们需要声明一些映射/字典所能使用的方法
 set(key，value): 向字典中添加新元素
 remove(key): 通过使用键值来从字典中移除键值对应的数据值
 has(key): 如果某个键值存在于这个字典中，则返回 true,反之则返回 false.
 get(key): 通过键值查找特定的数值并返回
 clear(): 将这个字典中所有元素全部删除
 size(): 返回字典所包含元素的数量。与数组的length 属性类似
 keys(): 将字典所包含的所有键名以数组形式返回
 values(): 将字典所包含的所有数值以数组形式返回
 * */

class Dictionary {
    constructor() {
        this.items = {};
    }


    set(key, value) {
        this.items[key] = value;
    }

    /*** 它会被 set 和 remove 等其他方法调用，优先实现它* */
    has(key) {
        return key in this.items;
    }

    remove(key) {
        if (this.has(key)) {
            delete this.items[key];
            return true;
        }
        return false;
    }

    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    keys() {
        return Object.keys(this.items);
    }

    /**
     * 我们不能仅仅使用 for-in 语句来遍历 this.items 对象的所有属性，还需要使用 has 方法（验证 this.items 对象是否包含某个属性），因为对象的原型
     * 也会包含对象的其他属性（JavaScript基本的 Object类中的属性将会被继承，并存在于当前对象中，而对于数据结构来说，我们并不需要它们。）
     * */
    values() {
        let values = [];
        for (let k in this.items) {
            if (this.has(k))
                values.push(this.items[k])
        }
        return values;
    }

    /**
     * 验证 this.items 属性的输出值，我们可以实现一个返回 items 变量的方法，叫做 getItems.
     * */
    getItems() {
        return this.items;
    }
}


let dictionary = new Dictionary();
dictionary.set('Gandalf', "fandalf@qq.com");
dictionary.set('John', "john@qq.com");
dictionary.set('Tyrion', "tyrion@qq.com");

console.log(dictionary.has('Gandalf'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get("Tyrion"));

dictionary.remove("John")

console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());

























