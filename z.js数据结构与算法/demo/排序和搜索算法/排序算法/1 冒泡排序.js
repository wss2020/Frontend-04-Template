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


    //冒泡排序
    this.bubbleSort = function () {
        let length = array.length;//{1}
        for (let i = 0; i < length; i++) {//{2}

            for (let j = 0; j < length - 1; j++) {//{3}

                if (array[j] > array[j + 1]) { //{4}
                    swap(j, j + 1);//{5}
                }
            }
        }
    };

    // 改进版 冒泡排序
    this.modifiedBubbleSort = function () {
        let length = array.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - 1 - i; j++) { //{1}
                if (array[j] > array[j + 1]) {
                    swap(j, j + 1);
                }
            }
        }
    };


}



let array = new ArrayList();

console.log(array.toString());//{8}
array.bubbleSort();//{9}
console.log(array.toString());//{10}


