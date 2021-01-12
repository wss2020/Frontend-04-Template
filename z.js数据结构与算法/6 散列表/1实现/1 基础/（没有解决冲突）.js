/**
 散列算法的作用是尽可能快地在数据结构中找到一个值。如果使用散列函数，就知道值的具体位置，因此能够快读检索到该值。
 散列函数的作用是给定一个键值，然后返回值在表中的地址。
 我们使用最常见的散列函数--- "lose lose" 散列函数，方法是简单到将每个键值中的每个字母的 ASCII 值相加。

 put(key,value): 向散列表增加一个新的项（也能更新散列表）
 remove(key): 根据键值从散列表中移除值
 get(key): 返回根据键值检索到的特定的值

 还有一种叫做 散列集合的实现。 散列集合由一个集合构成，但是插入、移除和获取元素时，使用的是散列函数。 我们可以参考 HashTable 来写散列集合，不同之
 处在于，不再添加键值对，而是只插入值没有键。  例如，可以使用散列集合来存储所有的英语单词（不包括它们的定义）。和集合相似，散列集合只存储唯一的不重复
 的值。

 创建的 HashTable 类，可能会出新一些键的值会有相同的散列表。不同的值在散列表中对应相同的位置，我们称之为冲突。   后面的 put ，会覆盖掉前面的。
 使用一个数据结构来保存数据的目的显然不是去丢失这些数据，而是通过某种方法将它们全部保存起来。 因此，当这种情况发生的时候就要去解决它。
 处理冲突有几种方法：分离链接、线性探查 和 双散列法。  下面我们会介绍前两种方法。
 * */

class HashTable {
    constructor() {
        this.table = [];
    }

    // 散列函数
    loseLoseHashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }

    // 辅助方法，输出 HashTable 中的值
    print() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                console.log(i + ": " + this.table[i]);
            }
        }
    }

    put(key, value) {
        let position = this.loseLoseHashCode(key);
        //console.log(position +" - "+ key);
        this.table[position] = value;
    }

    get(key) {
        return this.table[this.loseLoseHashCode(key)];
    }

    remove(key) {
        this.table[this.loseLoseHashCode(key)] = undefined;
    }

    containsKey(key){
        let value = this.loseLoseHashCode(key);
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                if(i === value )  return true;
            }
        }
        return false;
    }

}

let hash = new HashTable();
/*
hash.put('Gandalf', "fandalf@qq.com");
hash.put('John', "john@qq.com");
hash.put('Tyrion', "tyrion@qq.com");

console.log(hash.get('Gandalf'));
console.log(hash.get('John'));

hash.remove('Gandalf');
console.log(hash.get('Gandalf'));
*/

hash.put('Gandalf', "fandalf@qq.com");
hash.put('aGndalf', "john@qq.com");
hash.put('a', "a@qq.com");


hash.print();

console.log(  hash.containsKey('a') );
console.log(  hash.containsKey('b') );
