function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}


function fib(num) {
    let n1 = 1,
        n2 = 1,
        n = 1;
    for (let i = 3; i <= num; i++) {
        n = n1 + n2;
        n1 = n2;
        n2 = n;
    }
    return n;
}
