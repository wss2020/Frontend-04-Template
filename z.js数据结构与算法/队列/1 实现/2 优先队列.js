class QueueElement{    // {1}
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue{
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        let items = this.items;
        let queueElement = new QueueElement(element, priority);
        if (this.isEmpty()) {
            items.push(queueElement); // {2} 队列为空，直接放进队列
        } else {
            let added = false;
            for (let i = 0; i < items.length; i++) {
                if (queueElement.priority < items[i].priority) {
                    items.splice(i, 0, queueElement); // {3}
                    added = true;
                    break; // {4}  结束循环
                }
            }
            if (!added) { //{5}   此时说明，优先级比队列中存在优先级的都低，放到队列最后
                items.push(queueElement);
            }
        }
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
    }
}



let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();










