

// 函数返回结果的类型是两个对象的交叉类型。调用 extend 函数，实现两个对象的合并：
function extend<T, U>(first: T, second: U): T & U {
    for (const key in second) {
        (first as T & U)[key] = second[key] as any
    }
    return first as T & U
}

const data: Object = extend({a: 1, b: 2}, {b: 3, d: 3});
console.log(data);


/**
 * 通过 extend() 函数合并了两个类的实例，我们知道交叉类型是 and 的意思，那么合并后即可访问 Person 类实例的 name 属性，
 * 也可以调用 ConsoleLogger 类实例的 log() 方法。
 * */
class Person {
    constructor(public name: string) {
    }
}

class ConsoleLogger {
    log(name:string) {
        console.log(name);
    }
}

// let jim = extend(new Person('Jim'), new ConsoleLogger())
let jim = extend<Person,ConsoleLogger>(new Person('Jim'), new ConsoleLogger())
let n = jim.name
jim.log(n)
