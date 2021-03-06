// 双向链表：一个节点只有链向下一个节点的链接，另一个节点链向前一个元素。

/**
 补充：我们可以对 insert 和 remove 这两个方法的实现做一些改进。在结果为否的情况下，我们可以
 把元素插入到列表的尾部。性能也可以有所改进，比如，如果 position 大于 length/2 ,就最好从尾
 部开始迭代，而不是从头开始（这样就能迭代更少别表中的元素）。
 */

/**
 类 Node 表示要加入列表的项。
 element 要添加到列表的值
 next    指向列表中下一个节点项的指针
 */
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
}

/**
 类 DoublyLinkList 也有存储列表项的数量的 length 属性（内部/私有变量）
 head  存储第一个节点的引用(列表中第一个元素)
 append(element)   向列表尾部添加一个新的项
 insert(position,element)  从列表中的特定位置插入一个新的项
 remove(element)  从列表中移除一项
 indexOf(element) 返回元素在列表中的索引，如果列表中没有该元素则返回-1
 removeAt(position)  从列表的特定位置移除一项
 isEmpty()  如果链表之后给你不包含任何元素，返回 true，如果链表长度大于0 则返回false
 size()  返回链表包含的元素个数。 与数组的length 属性类似
 toString()  由于列表项使用了 Node 类，就需要重写继承自JavaScript 对象默认的 toString方法，让其只输出元素的值
 getHead()  获取第一个元素
 注意：我们这里，列表最后一个节点的下一个元素始终是null
 */
class DoublyLinkList {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null;
    }

    set length(value) {
        this._length = value;
    }

    get length() {
        return this._length;
    }

    /**
     向LinkList对象此尾部添加一个元素，两种场景。
     第一种：列表为空，添加的是第一个元素；
     第二种：列表不为空，向其追加元素
     */
    append(element) {
        let node = new Node(element), current;
        if (this.head == null) {      //列表为空
            this.head = node;
            this.tail = node;     //new
        } else {
            current = this.head;
            while (current.next) {     // 循环列表，直到找到最后一项
                current = current.next;
            }
            current.next = node;    // 找到最后一项，将其next赋值为 node ,建立链接
            this.tail = node;      //new
            this.tail.prev = current;   //new
        }
        this.length++;
    }

    /**
     * 从列表中的特定位置插入一个元素
     * 和普通链表非常类似，区别在于，普通链表只要一个 next 指针，而双向链表则要同时控制 next
     * 和pre (previous 前一个) 指针。
     * */
    insert(position, element) {
        if (position >= 0 && position <= this.length) {  //检查越界值
            let node = new Node(element),
                current = this.head,
                previous,
                index = 0;
            if (position === 0) {    //在第一个位置添加
                if (!this.head) {    // 链表为空
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    this.head = node;
                }
            } else if (position === this.length) {    //在最后一项添加
                current = this.tail;
                current.next = node;
                node.prev = current;
            } else {
                if(position+1 > Math.floor(this.length/2)){
                    let length = this.length-1;
                    current = this.tail;
                    previous = current.prev;
                    while (length-- > position) {
                        current = current.prev;
                        previous = current.prev;
                    }
                }else{
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                }
                node.next = current;
                previous.next = node;

                current.prev = node;
                node.prev = previous;
            }
            this.length++;   //更新列表的长度
            return true;
        } else {
            return false;
        }
    }

    /**
     *从列表的特定位置移除一项
     和普通链表非常类似，唯一的区别就是还需要设置前一个位置的指针。
     * */
    removeAt(position) {
        if (position > -1 && position < this.length) {    //检查越界值
            let current = this.head,
                previous,
                index = 0;
            if (position === 0) {        // 移除第一项
                this.head = current.next;
                if (this.length === 1) {   //如果只有一项，更新tail
                    this.tail = null;
                } else {
                    this.head.prev = null;
                }
            } else if (position === this.length - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                if(position+1 > Math.floor(this.length/2)){
                    let length = this.length-1;
                    current = this.tail;
                    previous = current.prev;
                    while (length-- > position) {
                        current = current.prev;
                        previous = current.prev;
                    }
                }else{
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                }
                // 将 previous 与 current 的下一项链接起来：跳过current,从而移除它
                previous.next = current.next;
                current.prev.prev = previous;
            }
            this.length--;
            return current.element;
        } else {
            return null;
        }
    }

    remove(element) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    /**
     * 返回元素在列表中的索引，如果列表中没有该元素则返回-1
     *
     * */
    indexOf(element) {
        let current = this.head,
            index = -1;
        while (current) {
            index++;
            if (element === current.element) {
                return index;
            }
            current = current.next;
        }
        return -1;
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }

    /**
     * 把 DoublyLinkList 对象转换成一个字符串
     * */
    toString() {
        let current = this.head,
            string = '';
        while (current) {
            string += current.element + ' ';
            current = current.next;
        }
        return string;
    }

    getHead() {
        return this.head;
    }
}

let list = new DoublyLinkList();
list.insert(0, 15);
list.insert(0, 16);
console.log(list.toString());
list.insert(1, 16.5);
// list.insert(1, 18);
console.log(list.toString());
// list.insert(1, 17);
// list.append(18);
// list.append(19);
// list.append(20);
// console.log(list.toString());
// list.insert(4,21);
// console.log(  list.indexOf(56) );
// list.removeAt(0);
// console.log(list.getHead());
// console.log(list.getHead().next.element);
// console.log(list.getHead().next.next.prev.prev.element);
// console.log(list.getHead().next.next.next.next.element);
// console.log(list.getHead().next.next.next.next.next.element);
// console.log(list.getHead().next.next.next.next.next.prev.element);
// console.log(list.getHead().next.next.next.next.next.prev.prev.element);
// console.log(list.getHead().next.next.next.next.next.prev.prev.prev.element);
// list.remove(18);
// console.log( list.indexOf(18)  );
// console.log( list.indexOf(16)  );
console.log(list.toString());
list.removeAt(4);
console.log(list.toString());
console.log(list.size());


