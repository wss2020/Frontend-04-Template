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


    this.insertionSort = function () {
        let length = array.length,  //{1}
            j, temp;

        for (let i = 1; i < length; i++) {  //{2}
            j = i;  //{3}
            temp = array[i];  //{4}

            while (j > 0 && array[j - 1] > temp) {   //{5}
                array[j] = array[j - 1];  //{6}
                j--;
            }
            array[j] = temp;  //{7}
        }
    };



}



let array = new ArrayList();

console.log(array.toString());
array.insertionSort();
console.log(array.toString());






