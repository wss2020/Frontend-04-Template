function DoublyLinkedList() {

    let Node = function (element) {

        this.element = element;
        this.next = null;
        this.prev = null; //新增的
    };

    let length = 0;
    let head = null;
    let tail = null; //新增的


    //这里是方法
    this.insert = function (position, element) {
       //检查越界值
        if (position >= 0 && position <= length) {

            let node = new Node(element),
                current = head,
                previous, index = 0;

            if (position === 0) { //在第一个位置添加
                if (!head) { //新增的 {1}
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node; //新增的 {2}
                    head = node;
                }
            }
            else if (position === length) { //最后一项 //新增的

                current = tail; // {3}
                current.next = node;
                node.prev = current;
                tail = node;

            }
            else {
                while (index++ < position) { //{4}
                    previous = current;
                    current = current.next;
                }
                node.next = current; //{5}
                previous.next = node;
                current.prev = node; //新增的
                node.prev = previous; //新增的
            }

            length++; //更新列表的长度
            return true;

        } else {
            return false;
        }
    };

}
