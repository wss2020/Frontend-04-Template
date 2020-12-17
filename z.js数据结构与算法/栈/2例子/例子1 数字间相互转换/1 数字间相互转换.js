/**

 */

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




