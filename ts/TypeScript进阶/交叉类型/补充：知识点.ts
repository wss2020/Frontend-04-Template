// 1、as关键字表示断言
// 在Typescript中，表示断言有两种方式。一种是扩号表示法：
// let data: any = "this is a string";
// let length: string = (data).length;


// 另一种使用as关键字：
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;



function test(value):number{
    return (value as string).length;
}
let value: string = "this is a string";
console.log( test(value) );



/**
 1、as和!用于属性的读取，都可以缩小类型检查范围，都做判空用途时是等价的。
 只是!具体用于告知编译器此值不可能为空值（null和undefined），
 而as不限于此。
 2、?可用于属性的定义和读取，读取时告诉编译器此值可能为空值（null和undefined），需要做判断。
 * */
