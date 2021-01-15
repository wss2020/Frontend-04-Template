// ReadOnly<...>映射类型
// 在TypeScript中，还有另一种方法可以使对象类型的所有属性为只读。首先，这是我们的只读版本： Todo

// Readonly<...> makes each property readonly
type Todo = Readonly<{
    id: number
    text: string
    done: boolean
}>

// 这个和上面的代码是等效的
type Todo1 = {
    readonly id: number
    readonly text: string
    readonly done: boolean
}


// 这样写就会报错
function toggleTodo2(todo: Todo) : Todo {
    todo.done = !todo.done
    return todo
}

function toggleTodo(todo: Todo) : Todo {
    return {
        id: todo.id,
        text: '...',
        done: !todo.done
    }
}



// 在TypeScript中，如果在对象类型上使用关键字，则它将使用其所有属性。这通常比手动添加到每个属性要容易。 Readonly<...> readonly readonly
// 这是另一个例子：
type Foo = {
    bar: number
}
type ReadonlyFoo = Readonly<Foo>;
// ReadonlyFoo is { readonly bar: number }








