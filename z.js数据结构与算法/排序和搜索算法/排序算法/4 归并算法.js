function ArrayList() {

    let array = [8,4,5,7,1,3,6,2]; //{1}

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


    this.mergeSort = function () {
        array = mergeSortRec(array);
    };

    let mergeSortRec = function (array) {
        let length = array.length;
        if (length === 1) {  //{1}
            return array;    //{2}
        }
        let mid = Math.floor(length / 2), //{3}
            left = array.slice(0, mid),  //{4}
            right = array.slice(mid, length); //{5}

        return merge(mergeSortRec(left), mergeSortRec(right)); //{6}
    };

    let merge = function (left, right) {
        let result = [], // {7}
            il = 0,
            ir = 0;

        while (il < left.length && ir < right.length) { // {8}
            if (left[il] < right[ir]) {
                result.push(left[il++]); // {9}
            } else {
                result.push(right[ir++]); // {10}
            }
        }

        while (il < left.length) {// {11}
            result.push(left[il++]);
        }

        while (ir < right.length) {// {12}
            result.push(right[ir++]);
        }

        console.log(result);
        return result; // {13}
    };



}



let array = new ArrayList();

console.log(array.toString());
array.mergeSort();
console.log(array.toString());




