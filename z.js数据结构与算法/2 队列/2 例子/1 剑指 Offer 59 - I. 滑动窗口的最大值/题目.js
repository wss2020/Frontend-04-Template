// dequeue  出列
// enqueue  入列

class Queue{
    constructor() {
        this.items = [];
    }
    enqueue (element) {
        this.items.push(element);
    };
    dequeue () {
        return this.items.shift();
    };
    front () {
        return this.items[0];
    };
    isEmpty () {
        return this.items.length == 0;
    };
    clear () {
        this.items = [];
    };
    size () {
        return this.items.length;
    };
    print () {
        // console.log(this.items);
        // console.log(this.items.toString());
        return this.items;
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    if(nums.length==0) return [];

    let queue = new Queue();
    for(let i of nums){
        queue.enqueue(i);
    }

    let result = [];
    while (queue.size() >= k){
        let array = queue.print().slice(0, k);
        let value = array[0];
        for(let i=0; i<array.length; i++){
            if(array[i] > value)  value = array[i];
        }
        result.push(value);
        queue.dequeue();
    }

    return result;
};

console.log(  maxSlidingWindow([1,3,-1,-3,5,3,6,7],3) );
