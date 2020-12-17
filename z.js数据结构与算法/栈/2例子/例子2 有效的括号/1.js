

class Stack {
    constructor() {
        this._items = [];
    }
    set items(ele){
        this._items = ele;
    }
    get items(){
        return this._items;
    }
    push(ele) {
        this._items.push(ele);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this._items[this._items.length - 1];
    }
    isEmpty() {
        return this._items.length == 0;
    }
    clear() {
        this.item = [];
    }
    print(){
        console.log(this.items.toString());
    }
}



/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    let data = {
        '(': ')',
        '{': '}',
        '[': ']',
    };
    let stack = new Stack();
    for (let i of s) {
        if (i == '(' || i == "{" || i == "[") {
            stack.push(data[i])
        } else {
            if (stack.peek() == i) stack.pop();
            else return false;
        }
    }
    return stack.isEmpty();
};

console.log( isValid('()') );
console.log( isValid('(') );
console.log( isValid('((') );









