/**
 实现一个栈，存储数据的底层数据结构，我们用数组。
 定义 Stack 类，
 dataStore 保存栈内元素，初始值为空数组
 top 记录栈定位置，初始值为0，表示栈顶对应数组的起始位置是0
 push 入栈
 pop  出栈, 返回值为新的栈顶元素
 peek 查看栈顶元素
 length 栈内存储元素个数
 clear  清空栈
 isEmpty 是否为空
 * */

class Stack{
    constructor() {
        this.dataStore = [];
        this.top = 0;
        this.length = 0;
    }
    push(ele){
        this.dataStore[this.top++] = ele;
    }
    pop(){
        return this.dataStore[--this.top];
    }
    peek(){
        return this.dataStore[this.top - 1];
    }
    length() {
        this.length = this.top;
    }
    clear(){
        this.top = 0;
    }
    isEmpty(){
        return this.top == 0;
    }
}

