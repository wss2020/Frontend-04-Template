class HashTable {
    constructor() {
        this.table = [];
    }

    // 散列函数
    djb2HashCode(key) {
        let hash = 5381;
        for (let i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
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
        let position = this.djb2HashCode(key);
        //console.log(position +" - "+ key);
        this.table[position] = value;
    }

    get(key) {
        return this.table[this.djb2HashCode(key)];
    }

    remove(key) {
        this.table[this.djb2HashCode(key)] = undefined;
    }

}

let hash = new HashTable();
hash.put('Gandalf', "fandalf@qq.com");
hash.put('dGanalf', "fandalf@qq.com");
hash.put('John', "john@qq.com");
hash.put('Tyrion', "tyrion@qq.com");

hash.print();
