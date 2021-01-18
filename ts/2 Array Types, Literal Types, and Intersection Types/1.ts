/**
    让我们使用TypeScript实现此功能。我们将编写一个名为的函数completeAll()，该函数接受一个待办事项数组，
 并返回一个新的待办事项数组where all 。
 */

type Todo = Readonly<{
    id: number
    text: string
    done: boolean
}>

type CompletedTodo = Readonly<{
    id: number
    text: string
    done: true
}>

// Takes an array of todo items and returns
// a new array where "done" is all true
// Output is an array of Todo items: Todo[]
function completeAll(todos: readonly Todo[]): CompletedTodo[] {
    // We want it to return a new array
    // instead of modifying the original array


    // Compile error - modifies the array
    // todos[0] = { id: 1, text: '…', done: true }

    // Compile error - push() modifies the array
    // todos.push({ id: 1, text: '…', done: true })



}

// You can use exact values when specifying a type. This is called literal types.
// 指定类型时可以使用精确值。这称为文字类型。
