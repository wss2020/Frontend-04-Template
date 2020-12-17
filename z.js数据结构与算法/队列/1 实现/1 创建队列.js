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
        console.log(this.items);
        // console.log(this.items.toString());
    }
}


let queue = new Queue();
console.log(queue.isEmpty()); //输出true
queue.enqueue("John");
queue.enqueue("Jack");
queue.print();

console.log(queue.size()); //输出3
console.log(queue.isEmpty()); //输出false
queue.dequeue();
// queue.dequeue();
queue.print();
