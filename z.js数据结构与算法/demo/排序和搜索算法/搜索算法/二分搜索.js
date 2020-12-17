

function ArrayList() {

    // let array = [8,4,5,7,1,3,6,2]; //{1}
    let array = []; //{1}

    this.insert = function (item) { //{2}
        array.push(item);
    };

    this.toString = function () { //{3}
        return array.join();
    };



    this.quickSort = function () {
        quick(array, 0, array.length - 1);
    };
    let quick = function (array, left, right) {
        let index;   //{1}
        if (array.length > 1) {   //{2}

            index = partition(array, left, right);   //{3}

            if (left < index - 1) {   //{4}
                quick(array, left, index - 1);  //{5}
            }
            if (index < right) {   //{6}
                quick(array, index, right);   //{7}
            }
        }
    };
    let partition = function (array, left, right) {

        let pivot = array[Math.floor((right + left) / 2)], //{8}
            i = left,   //{9}
            j = right;  //{10}

        while (i <= j) {  //{11}
            while (array[i] < pivot) { //{12}
                i++;
            }
            while (array[j] > pivot) { //{13}
                j--;
            }
            if (i <= j) {  //{14}
                swapQuickStort(array, i, j); //{15}
                i++;
                j--;
            }
        }

        return i; //{16}
    };
    let swapQuickStort = function (array, index1, index2) {
        let aux = array[index1];
        array[index1] = array[index2];
        array[index2] = aux;
    };


    this.binarySearch = function (item) {
        this.quickSort(); //{1}

        let low = 0,//{2}
            high = array.length - 1, //{3}
            mid, element;

        while (low <= high) { //{4}
            mid = Math.floor((low + high) / 2); //{5}
            element = array[mid];//{6}

            if (element < item) {//{7}
                low = mid + 1;//{8}
            } else if (element > item) {//{9}
                high = mid - 1;//{10}
            } else {
                return mid;//{11}
            }

        }

        return -1; //{12}
    };


}


const data = [8,7,6,5,4,3,2,1];
let array = new ArrayList();
for(let i=0; i<data.length; i++){
    array.insert(data[i]);
}

array.binarySearch(5);

console.log(array.binarySearch(5));


