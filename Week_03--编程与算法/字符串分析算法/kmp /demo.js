function kmp(source, pattern) {
    // a b c d a b c a a
    // 0 0 0 0 0 1 2 3 1


   //     j       i
   // a a b a a a c
   // 0 0 1 0 1 2 2
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

    //
    //             j
    // a a b a a a c
    // 0 0 1 0 1 2 2               i
    // a a b a a z a z a a b a a a c z z z z
    console.log(table);
    console.log("----------------------------------------");
    {
        let result = [];
        let i = 0, j = 0;
        while (i < source.length) {
            if (pattern[j] === source[i]) {
                result.push(i);
                ++i, ++j;
            } else {
               j > 0 ? j = table[j] :  ++i;
            }

            if (j === pattern.length)  return result.pop() - pattern.length + 1;
        }
        return false;
    }

}


// a a b a a a c
// 0 0 1 0 1 2 2

// 在长串(source)里面去找短的字符串(pattern),看看是否包含
let result =  kmp("aabaazazaabaaaczzzz","aabaaac");

console.log(result);




