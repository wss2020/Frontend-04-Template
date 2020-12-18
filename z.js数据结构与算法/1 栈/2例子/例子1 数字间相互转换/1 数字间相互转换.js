/**
 实现一个栈，存储数据的底层数据结构，我们用数组。
 定义 Stack 类，
 _items 保存栈内元素，初始值为空数组
 push 入栈
 pop  出栈, 返回值为新的栈顶元素
 peek 查看栈顶元素
 clear  清空栈
 isEmpty 是否为空
 print  打印当前栈内元素
 * */

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



function baseConverter(decNumber, base){
    let remStack = new Stack(),
        rem,
        baseString = '',
        digits = '0123456789ABCDEF'; //{6}

    while (decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()]; //{7}
    }

    return baseString;
}


console.log(baseConverter(10,2));
console.log(baseConverter(10,8));
console.log(baseConverter(10,16));

console.log(baseConverter(200,2));
console.log(baseConverter(200,8));
console.log(baseConverter(200,16));




