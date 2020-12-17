//让我们开始创建自己的BinarySearchTree类。首先，声明它的结构：
function BinarySearchTree() {

    // 声明数据结构  key 键（节点）   left 左侧子节点   right 右侧子节点
    let Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    // root 根元素( 头节点）
    let root = null;


    let insertNode = function (node, newNode) {
        if (newNode.key < node.key) { //{4}

            if (node.left === null) {     //{5}
                node.left = newNode;    //{6}
            } else {
                insertNode(node.left, newNode); //{7}
            }

        } else {

            if (node.right === null) { //{8}
                node.right = newNode; //{9}
            } else {
                insertNode(node.right, newNode); //{10}
            }

        }
    };

    // 向树中插入一个新的节点
    this.insert = function (key) {
        var newNode = new Node(key);   // {1}
        if (root === null) {   // {2}
            root = newNode;
        } else {
            insertNode(root, newNode);  // {3}
        }
    };

    this.remove = function(key){
        root = removeNode(root, key); //{1}
    };

    let removeNode = function (node, key) {
        if (node === null) { //{2}
            return null;
        }
        if (key < node.key) { //{3}
            node.left = removeNode(node.left, key); //{4}
            return node; //{5}
        } else if (key > node.key) { //{6}
            node.right = removeNode(node.right, key); //{7}
            return node; //{8}
        } else {//键等于node.key


            //第一种情况—— 一个叶节点
            if (node.left === null && node.right === null) { //{9}
                node = null; //{10}
                return node; //{11}
            }

            //第二种情况—— 一个只有一个子节点的节点
            if (node.left === null) { //{12}
                node = node.right; //{13}
                return node; //{14}

            } else if (node.right === null) { //{15}
                node = node.left; //{16}
                return node; //{17}
            }

            //第三种情况—— 一个有两个子节点的节点
            let aux = findMinNode(node.right); //{18}
            node.key = aux.key; //{19}
            node.right = removeNode(node.right, aux.key); //{20}
            return node; //{21}
        }
    };


    let findMinNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;//{3}
            }
            return node;
        }
        return null;
    };


};


let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);



