// 链表相对于数组
// 优点：无需移动链表中的元素，就能轻松地 添加 和 移除元素。
// 缺点：查找不如数组


//普通链表：一个节点只有链向下一个节点的链接。

/**
 类 Node 表示要加入列表的项。
 element  要添加到列表的值
 next     指向列表中下一个节点项的指针
 */
class Node{
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}


/**
 类 LinkList 也有存储列表项的数量的 length 属性（内部/私有变量）
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
class LinkList{
    constructor() {
        this._length = 0;
        this.head = null;
    }
    set length(value){
        this._length = value;
    }
    get length(){
        return this._length;
    }

    /**
     向LinkList对象此尾部添加一个元素，两种场景。
         第一种：列表为空，添加的是第一个元素；
         第二种：列表不为空，向其追加元素
     */
    append(element){
         let node = new Node(element),current;
         if(this.head == null){      //列表为空
             this.head = node;
         }else{
             current = this.head;
             while (current.next){     // 循环列表，直到找到最后一项
                 current = current.next;
             }
             current.next = node;    // 找到最后一项，将其next赋值为 node ,建立链接
         }
         this.length++;
    }

    /**
     * 从列表中的特定位置插入一个元素
     * 注意：使用变量引用我们需要控制的节点非常重要，这样就不会丢失节点之间的链接。我们
            可以只使用一个变量（previous），但那样会很难控制节点之间的链接。由于这个
            原因，最好是声明一个额外的变量来帮助我们处理这些引用。
     * */
    insert(position,element){
        if(position >=0 && position<=this.length){  //检查越界值
            let node = new Node(element),
                current = this.head,
                previous,
                index = 0;
            if(position === 0){    //在第一个位置添加
                node.next = current;
                this.head = node;
            }else{
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            this.length++;   //更新列表的长度
            return true;
        }else{
            return false;
        }
    }

    /**
     *从列表的特定位置移除一项,两种场景
     * 1.移除第一个元素
     * 2.移除第一个以外的任一元素。
     * 注意：被移除的元素被丢弃在了计算机内存中，等着被垃圾回收器清除
     * */
    removeAt(position) {
        if (position > -1 && position < this.length) {    //检查越界值
            let current = this.head,
                previous,
                index = 0;
            if(position === 0){        // 移除第一项
                this.head = current.next;
            }else{
                while (index++ < position){
                    previous = current;
                    current = current.next;
                }
                // 要移除的元素 当前就是 current
                // 将 previous 与 current 的下一项链接起来：跳过current,从而移除它
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        }else{
            return null;
        }
    }

    remove(element){
        let index = this.indexOf(element);
        return this.removeAt(index);
    }

    /**
     * 返回元素在列表中的索引，如果列表中没有该元素则返回-1
     *
     * */
    indexOf(element){
        let current = this.head,
            index = -1;
        while(current){
            index++;
            if(element === current.element){
                return index;
            }
            current = current.next;
        }
        return -1;
    }

    isEmpty(){
        return this.length === 0;
    }

    size(){
        return this.length;
    }

    /**
     * 把 LinkedList对象转换成一个字符串
     * */
    toString(){
        let current = this.head,
            string = '';
        while(current){
            string += current.element + ' ';
            current = current.next;
        }
        return string;
    }

    getHead(){
        return this.head;
    }
}

let list = new LinkList();
list.append(15);
list.append(16);
list.append(17);
list.append(18);
list.removeAt(2);
// console.log(  list.indexOf(56) );
// list.remove(16);
// console.log(list.getHead());
console.log( list.toString() );
