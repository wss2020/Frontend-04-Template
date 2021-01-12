
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

    size(){
        return this.table.length;
    }

}


