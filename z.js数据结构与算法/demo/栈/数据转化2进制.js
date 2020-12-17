function Stack() {
    let items = [];
    this.push = function (element) {
        items.push(element);
    };
    this.pop = function () {
        return items.pop();
    };
    this.peek = function () {
        return items[items.length - 1];
    };
    this.isEmpty = function () {
        return items.length == 0;
    };
    this.size = function () {
        return items.length;
    };
    this.clear = function () {
        items = [];
    };
    this.print = function () {
        console.log(items.toString());
    };
}


function divideBy2(decNumber) {
    let remStack = new Stack(),
        rem,
        binaryString = '';

    while (decNumber > 0) { //{1}
        rem = Math.floor(decNumber % 2); //{2}
        remStack.push(rem); //{3}
        decNumber = Math.floor(decNumber / 2); //{4}
    }

    while (!remStack.isEmpty()) { //{5}
        binaryString += remStack.pop().toString();
    }

    return binaryString;
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

// 转化成2进制
console.log(divideBy2(10));
console.log(divideBy2(200));
console.log(divideBy2(766));

//
console.log(baseConverter(10,2));
console.log(baseConverter(10,8));
console.log(baseConverter(10,16));


console.log(baseConverter(200,2));
console.log(baseConverter(200,8));
console.log(baseConverter(200,16));

