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


// 队列里的数据，循环出来，每到 num 的人淘汰，
// 淘汰之后，重新从1开始，到 num 的哪个人淘汰
// 反复操作，直到剩下最后一个人
function hotPotato(nameList, num) {
    let queue = new Queue(); // {1}
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]); // {2}   // 先把数据排好队列
    }
    let eliminated = '';
    while (queue.size() > 1) {
        for (let i = 0; i < num-1; i++) {
            queue.enqueue(queue.dequeue());   // {3}  把队列头出来的人,重新进入队列
        }
        eliminated = queue.dequeue();// {4}
        console.log(eliminated + '在击鼓传花游戏中被淘汰。');
    }
    return queue.dequeue();// {5}
}

let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
let winner = hotPotato(names, 3);
console.log('胜利者:' + winner);

