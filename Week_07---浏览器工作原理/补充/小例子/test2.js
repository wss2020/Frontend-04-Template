
function isNumber(value){
    return /^\d+$/.test(value);
}


console.log( isNumber(123) );
console.log( isNumber('123') );
console.log( isNumber('w122') );
console.log( isNumber(999.99) );
