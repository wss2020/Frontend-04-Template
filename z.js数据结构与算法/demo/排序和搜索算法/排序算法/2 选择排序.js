function ArrayList() {

    let array = [48,85,58,88,12,18]; //{1}

    this.insert = function (item) { //{2}
        array.push(item);
    };

    this.toString = function () { //{3}
        return array.join();
    };

    let swap = function(index1, index2){
        let aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    };


    this.selectionSort = function () {
        let length = array.length,   //{1}
            indexMin;

        for (let i = 0; i < length - 1; i++) {  //{2}
            indexMin = i;   //{3}

            for (let j = i; j < length; j++) {     //{4}
                if (array[indexMin] > array[j]) {  //{5}
                    indexMin = j; //{6}
                }
            }

            if (i !== indexMin) {     //{7}
                swap(i, indexMin);
            }

        }
    };


}



let array = new ArrayList();

console.log(array.toString());
array.selectionSort();
console.log(array.toString());






