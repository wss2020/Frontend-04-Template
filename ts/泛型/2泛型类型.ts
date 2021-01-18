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




// 这引导我们去写第一个泛型接口了。 我们把上面例子里的对象字面量拿出来做为一个接口：
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity_1<T>(arg: T): T {
    return arg;
}

let myIdentity_1: GenericIdentityFn = identity;




/**
    一个相似的例子，我们可能想把泛型参数当作整个接口的一个参数。 这样我们就能清楚的知道使用的具体是哪个泛型类型
 （比如： Dictionary<string>而不只是Dictionary）。 这样接口里的其它成员也能知道这个参数的类型了。
 */
interface GenericIdentityFn_2<T> {
    (arg: T): T;
}

function identity_2<T>(arg: T): T {
    return arg;
}

let myIdentity_2: GenericIdentityFn_2<number> = identity_2


/**
    注意，我们的示例做了少许改动。 不再描述泛型函数，而是把非泛型函数签名作为泛型类型一部分。
 当我们使用 GenericIdentityFn的时候，还得传入一个类型参数来指定泛型类型（这里是：number），锁定了之后代码里使用的类型。
 对于描述哪部分类型属于泛型部分来说，理解何时把参数放在调用签名里和何时放在接口上是很有帮助的。

    除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间。
 */

