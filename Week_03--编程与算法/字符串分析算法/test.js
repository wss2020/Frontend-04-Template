// randomWord 产生一个随机的单词，
function randomWord(length) {
    let s = "";
    for(let i=0; i<length; i++)
        s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
    return s;
}



console.log(Math.random() * 26);
console.log( "a".charCodeAt(0) );

let value = Math.random() * 26 + "a".charCodeAt(0);

console.log(  String.fromCharCode( 97 + 25 )   );


