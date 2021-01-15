type Todo = {
    id: number,
    text: String,
    done: boolean
}

const foo: Todo = {
    id:1,
    text: '...',
    done:false
}

//1. 我们指定的输入toggleTodo()必须为Todo。为此，我们: Todo 在参数旁边添加todo。
//2. 接下来，我们指定的返回类型也toggleTodo() 必须为Todo。我们通过在参数列表后面添加来实现。 : Todo
function toggleTodo(todo: Todo) : Todo {
    return {
        id: todo.id,
        text: todo.text,
        done: !todo.done
    }
}

















