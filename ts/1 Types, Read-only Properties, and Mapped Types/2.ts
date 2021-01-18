type Todo = {
    id: number,
    text: String,
    done: boolean
}

// 必须返回一个新的todo对象,下面这样重构写不好
function toggleTodo1(todo: Todo) : Todo {
    //这是，错误的重构，因为它会修改 参数（输入）todo对象
    todo.done = !todo.done
    return todo
}



// 如何修改？
// 为了防止函数修改其输入，可以在TypeScript中使用关键字。在此，关键字被添加到的所有属性中。 readonly readonly Todo
type Todo1 = {
    readonly id: number
    readonly text: string
    readonly done: boolean
}
// 这样写就会报错
function toggleTodo2(todo: Todo1) : Todo1 {
    todo.done = !todo.done
    return todo
}













