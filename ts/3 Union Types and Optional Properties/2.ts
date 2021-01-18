// Optional properties


type Foo = {
    // bar is an optional property because of "?"
    bar?: number
}

// These will both compile:
// bar can be present or missing
const a: Foo = {}
const b: Foo = { bar: 1 }



type Place = 'home' | 'work' | { custom: string }
type Todo = Readonly<{
    id: number
    text: string
    done: boolean
    // place is optional
    place?: Place
}>




















