
// 创建第一个使用泛型的例子：identity函数。 这个函数会返回任何传入它的值。 你可以把这个函数当成是 echo命令。


//不用泛型的话，这个函数可能是下面这样：
function identity1(arg: number): number {
    return arg;
}

//或者，我们使用any类型来定义函数：
function identity2(arg: any): any {
    return arg;
}


/**
 使用any类型会导致这个函数可以接收任何类型的arg参数，这样就丢失了一些信息：传入的类型与返回的类型应该是相同的。
 如果我们传入一个数字，我们只知道任何类型的值都有可能被返回。

 因此，我们需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了 类型变量，它是一种特殊的变量，只用于表示类型而不是值。
 */
function identity<T>(arg: T): T {
    return arg;
}

/**
    我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。
 之后我们再次使用了 T当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。

    我们把这个版本的identity函数叫做泛型，因为它可以适用于多个类型。 不同于使用 any，它不会丢失信息，
 像第一个例子那像保持准确性，传入数值类型并返回数值类型。
 */


/**
 我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：
 这里我们明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()。
 */
let output = identity<string>("myString");  // type of output will be 'string'



/**
    第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型：
    注意我们没必要使用尖括号（<>）来明确地传入类型；编译器可以查看myString的值，然后把T设置为它的类型。
 类型推论帮助我们保持代码精简和高可读性。
    如果编译器不能够自动地推断出类型的话，只能像上面那样明确的传入T的类型，在一些复杂的情况下，这是可能出现的。
 */
let output2 = identity("myString");  // type of output will be 'string'







/**
 使用泛型变量
    使用泛型创建像identity这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。
 换句话说，你必须把这些参数当做是任意或所有类型。
    看下之前identity例子：
 */
function identity4<T>(arg: T): T {
    return arg;
}


/**
 如果我们想同时打印出arg的长度。 我们很可能会这样做：
    如果这么做，编译器会报错说我们使用了arg的.length属性，但是没有地方指明arg具有这个属性。
 记住，这些类型变量代表的是任意类型，所以使用这个函数的人可能传入的是个数字，而数字是没有 .length属性的。
 */
function loggingIdentity1<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}


/**
    现在假设我们想操作T类型的数组而不直接是T。由于我们操作的是数组，所以.length属性是应该存在的。
 我们可以像创建其它数组一样创建这个数组：
    你可以这样理解loggingIdentity的类型：泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，
 并返回元素类型是T的数组。 如果我们传入数字数组，将返回一个数字数组，因为此时 T的的类型为number。 这可以让我们把泛型变量T
 当做类型的一部分使用，而不是整个类型，增加了灵活性。
 */
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

//我们也可以这样实现上面的例子：
function loggingIdentity2<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
//使用过其它语言的话，你可能对这种语法已经很熟悉了。 在下一节，会介绍如何创建自定义泛型像 Array<T>一样。






/**
 泛型类型
    上一节，我们创建了identity通用函数，可以适用于不同的类型。 在这节，我们研究一下函数本身的类型，以及如何创建泛型接口。

    泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：
 */
function identity_1<T>(arg: T): T {
    return arg;
}

let myIdentity_1: <T>(arg: T) => T = identity_1;













