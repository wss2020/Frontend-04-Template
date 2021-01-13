/**
 * 集合表示一组互不相同的元素（不重复的元素）。  集合以[值，值]对的形式存储元素，
 *
 * 集合：集合是由一组无序且唯一（即不能重复）的项组成的，这个数据结构使用了与有限集合相同的数学概念。
 * 注意：集合可以是空集，比如24和29之间的素数集合，由于24和29之间没有素数（除了1和本身，没有其他正因数的大于1的自然数），这个集合就是空集
 *      用"{ }"表示。
 * 你可以把集合想像成一个既没有重复元素，也没有顺序概念的数组。   在数学中，集合有 并集、交集、差集等基本操作。下面也会介绍
 *
 * 实现： 我们以 Es6中 Set 类的实现为基础。  这里我们使用对象 而不是数据来表示集合（items）,但也可以用数组实现，这里我们用对象实现，
 *      稍微有点不一样，也学习以一下实现相似数据结构的新方法，同时 JavaScript的对象不允许一个健指向两个不同的属性，也保证了集合里的
 *      元素都是唯一的。
 *
 * 首选：声明一些集合可用的方法（尝试模拟于Es6实现相同的 Set 类）
 *      add(value): 向集合添加一个新的项
 *      remove(value): 从集合移除一个值
 *      has(value): 如果值在集合中，返回 true，否则返回 false
 *      clear()：移除集合中的所有项
 *      size(): 返回集合所包含的元素的数量。与数组的length属性类似
 *      values(): 返回一个包含集合中所有值的数组
 *
 * 其它：union(otherSet) 并集：
 *             返回一个 当前集合 和 otherSet集合中 所有元素的新集合
 *      intersection(otherSet) 交集：
 *              返回一个 包含当前集合 和 otherSet集合中 共有元素的新集合。
 *      difference(otherSet) 差集：
 *              返回一个 存在于当前集合且不存在于otherSet集合的元素的新集合。
 *      subset(otherSet) 子集：
 *              验证 当前集合 是否是 otherSet集合的子集。
 *
 * 并集：
        对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
 *      意思是：有 A B 两个集合，x(元素)存在于A中，或 x 存在于B中。
 * 交集：
        对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
        意思是：有 A B 两个集合，，x(元素)存在于A中，且 x 存在于B中。
 * 差集：
        对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在第二个集合的元素的新集合。
        意思是：有 A B 两个集合，x(元素)存在于A中，且 x 不存在于B中。
 * 子集：
        验证一个给定集合是否是另一个集合的子集。 集合A是B的子集（或集合B包含了A）
        意思是：有 A B 两个集合，集合A中的每一个x(元素)，也存在于B中。
 * */

class Set{
    constructor() {
        this.items = {};
    }

    /** has 方法它会被 add、remove等方法调用。
     * 用 JS 的 in操作符来验证给定的值是否是 this.items 对象的属性。
     * 还有更好的实现方法， 所有的 JS 对象都有 hasOwnProperty 方法，这个方法返回一个表明对象是否具有特定的属性的布尔值。
     * */
    has(value){
        // return value in this.items;
        return this.items.hasOwnProperty(value);
    }

    /**
     * 检查添加的值是否存在于集合中。 如果不存在，就把 value 添加到集合中，返回 true.   如果集合中存在，就 返回 false.
     * 注意： 添加一个值的时候，把它同时作为 健 和 值 保存，这样有利于查找这个值。
     * */
    add(value){
        if(!this.has(value)){
            this.items[value] = value;
            return true;
        }
        return false;
    }

    /**
     * 既然使用对象来存储集合的 this.items 对象，就可以简单地使用 delete操作符 从 items对象中移除属性
     * */
    remove(value){
        if(this.has(value)){
            delete this.items[value];
            return true;
        }
        return false;
    }

    clear(){
        this.items = {};
    }

    /**
     * size 方法（返回集合中有多少项），有三种实现方式
     * 第一种，使用一个 length 变量，每当使用 add 或 remove 方法时控制它，就像在 链表中 LinkList 类一样。
     * 第二种，使用 JS 内建的 Object 类的一个内建函数, keys() 方法，它返回一个包含给定对象所有属性的数组。
     * 第三种，手动提取 items 对象的每一个属性，记录属性的个数并返回这个数字. 这里注意，不能简单使用 for-in 语句遍历
     *       items 对象的属性，还需要使用 has 方法（以验证 items 对象具有该属性），因为对象的原型包含了额外的属性，
     *      （属性既有继承子 JS 的 Object类的，也有属于对象自身，未用于数据结构的）。
     * */
    size(){
        return Object.keys(this.items).length;

        // let count = 0;
        // for(let prop in this.items){
        //     if(this.items.hasOwnProperty(prop)){
        //         ++count;
        //     }
        // }
        // return count;
    }

    /** 返回一个包含集合中所有值的数组 */
    values(){
        return Object.keys(this.items);
    }

    // 并集
    union(otherSet) {
        let unionSet = new Set();

        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        return unionSet;
    }

    //交集
    intersection(otherSet){
        let intersection = new Set();
        let values = this.values();
        for(let i=0; i<values.length; i++){
            if(otherSet.has(values[i])){
                intersection.add(values[i]);
            }
        }
        return intersection;
    }

    //差集
    difference(otherSet){
        let differenceSet = new Set();
        let values = this.values();
        for(let i=0; i<values.length; i++){
            if(!otherSet.has(values[i])){
                differenceSet.add(values[i]);
            }
        }
        return differenceSet;
    }

    //子集
    subset(otherSet){
        if(this.size() > otherSet.size()){
            return false;
        }else{
            let values = this.values();
            for(let i=0; i<values.length; i++){
                if(!otherSet.has(values[i])){
                    return false;
                }
            }
        }
        return true;
    }

}





//测试-子集
// let setA = new Set();
// setA.add(1);
// setA.add(2);
//
// let setB = new Set();
// setB.add(1);
// setB.add(2);
// setB.add(3);
//
// let setC = new Set();
// setC.add(2);
// setC.add(3);
// setC.add(4);
//
// console.log(setA.subset(setB) );
// console.log(setA.subset(setC) );


//测试-差集
// let setA = new Set();
// setA.add(1);
// setA.add(2);
// setA.add(3);
//
// let setB = new Set();
// setB.add(2);
// setB.add(3);
// setB.add(4);
//
// let differecnceAB = setA.difference(setB);
// console.log(differecnceAB.values());


//测试-并集
// let setA = new Set();
// setA.add(1);
// setA.add(2);
// setA.add(3);
//
// let setB = new Set();
// setB.add(2);
// setB.add(3);
// setB.add(4);
//
// let intersectionAB = setA.intersection(setB);
// console.log(intersectionAB.values());

//测试-并集
// let setA = new Set();
// setA.add(1);
// setA.add(2);
// setA.add(3);
//
//
// let setB = new Set();
// setB.add(4);
// setB.add(5);
// setB.add(6);
//
// let unionAB = setA.union(setB);
// console.log( unionAB.values());






//测试-集合
// let set = new Set();
//
// set.add(1);
// console.log(set.values());
// console.log(set.has(1));
// console.log(set.size());
//
// set.add(2);
// console.log(set.values());
// console.log(set.has(2));
// console.log(set.size());
//
// set.remove(1);
// console.log(set.values());
//
// set.remove(2);
// console.log(set.values());














