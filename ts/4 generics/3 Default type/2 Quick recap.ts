// For example, here’s a regular function that takes any value:
// Declare a regular function
function regularFunc(x: any) {
    // You can use x here
}
// Call it: x will be 1
regularFunc(1)



// Similarly, you can declare a generic function with a type parameter:
// Declare a generic function
function genericFunc<T>() {
    // You can use T here
}
// Call it: T will be number
genericFunc<number>()







// Example 2: In regular functions, you can specify the type of a parameter like this:
// Specify x to be number
function regularFunc1(x: number){}
// Success
regularFunc1(1)

// Error
regularFunc1('foo')


// Similarly, you can specify what’s allowed for the type parameter of a generic function:
// Limits the type of T
function genericFunc1<T extends number>(){}
// Success
genericFunc1<number>()
// Error
genericFunc1<string>()





// Example 3: In regular functions, you can specify the default value of a parameter like this:
// Set the default value of x
function regularFunc2(x = 2){}

// x will be 2 inside the function
regularFunc2()



//Similarly, you can specify the default type for a generic function:

// Set the default type of T
function genericFunc2<T = number>(){}
// T will be number inside the function
genericFunc2()


// Generics are not scary. They’re like regular function parameters, but instead of values, it deals with types.
// If you understood this much, you’re good to go!









