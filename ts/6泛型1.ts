/**
 泛型类型
 上一节，我们创建了identity通用函数，可以适用于不同的类型。 在这节，我们研究一下函数本身的类型，以及如何创建泛型接口。

 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：
 */
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;




// 我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
function identity1<T>(arg: T): T {
    return arg;
}

let myIdentity1: <U>(arg: U) => U = identity;




// 我们还可以使用带有调用签名的对象字面量来定义泛型函数：
function identity3<T>(arg: T): T {
    return arg;
}

let myIdentity3: {<T>(arg: T): T} = identity;















