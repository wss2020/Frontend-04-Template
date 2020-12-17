class Stack {
    constructor() {
        this.dataStore = [];
        this.top = 0;
        this.length = 0;
    }

    push(ele) {
        this.dataStore[this.top++] = ele;
    }

    pop() {
        return this.dataStore[--this.top];
    }

    peek() {
        return this.dataStore[this.top - 1];
    }

    length() {
        this.length = this.top;
    }

    clear() {
        this.top = 0;
    }

    isEmpty() {
        return this.top == 0;
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











