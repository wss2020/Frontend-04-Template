// Creates a union type of number and string
type Foo = number | string


// You can assign either a number or a string
// variable to Foo. So these will both compile:
const a: Foo = 1
const b: Foo = 'hello'



// Place can be either 'home', 'work', or an object containing a string custom property
type Place = 'home' | 'work' | { custom: string }

// Here’s an example usage of the Place type:
// They all compile
const place1: Place = 'home'
const place2: Place = 'work'
const place3: Place = { custom: 'Gym' }
const place4: Place = { custom: 'Supermarket' }



// Assign Place to Todo’s place property
type Todo = Readonly<{
    id: number
    text: string
    done: boolean
    place: Place
}>





























