

type Todo = Readonly<{
    id: number
    text: string
    done: boolean
}>

type CompletedTodo = Todo &{
    readonly done: true
}

function completeAll(todos: readonly Todo[]): CompletedTodo[] {
    return todos.map(todo => ({
        ...todo,
        done: true
    }))
}






















