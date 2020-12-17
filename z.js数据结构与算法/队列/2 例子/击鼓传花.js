function Queue() {
    let items = [];
    this.enqueue = function (element) {
        items.push(element);
    };
    this.dequeue = function () {
        return items.shift();
    };
    this.front = function () {
        return items[0];
    };
    this.isEmpty = function () {
        return items.length == 0;
    };
    this.clear = function () {
        items = [];
    };
    this.size = function () {
        return items.length;
    };
    this.print = function () {
        console.log(items.toString());
    }
}


function hotPotato(nameList, num) {
    let queue = new Queue(); // {1}
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i]); // {2}
    }
    let eliminated = '';
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue()); // {3}
        }
        eliminated = queue.dequeue();// {4}
        console.log(eliminated + '在击鼓传花游戏中被淘汰。');
    }
    return queue.dequeue();// {5}
}

let names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
let winner = hotPotato(names, 7);
console.log('胜利者:' + winner);
