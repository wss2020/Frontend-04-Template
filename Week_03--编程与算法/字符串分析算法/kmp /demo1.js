
function kmp(source, pattern) {
    if(pattern.length === 1){
        let result = [];
        for(let i=0; i<source.length; i++){
            if(source[i] === pattern) result.push(i);
        }
        return result;
    }


    let table = new Array(pattern.length).fill(0);
    {
        let i = 1, j = 0;
        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++j, ++i;
                table[i] = j;
            } else {
                j > 0 ? j = table[j] : ++i;
            }
        }
    }

    {
        let result = [];
        let i = 0, j = 0;
        while (i <= source.length) {
            if (pattern[j] === source[i]) {
                if(j === pattern.length - 1)  { result.push(i-1); j=0;}
                ++i, ++j;
            } else {
                j > 0 ? j = table[j] :  ++i;
            }

            if (i === source.length)
                return result;
        }
        return false;
    }

}



// 在长串(source)里面去找短的字符串(pattern),看看是否包含
let result1 =  kmp("zzabc abc bc bc","bc");
let result2 =  kmp("aaaaa","aa");
let result3 =  kmp("ababa","a");

console.log(result1);
console.log(result2);
console.log(result3);




