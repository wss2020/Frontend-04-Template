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



    //先序遍历
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback);
    };
    let preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key); //{1}
            preOrderTraverseNode(node.left, callback); //{2}
            preOrderTraverseNode(node.right, callback); //{3}
        }
    };


}



var tree = new BinarySearchTree();
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



function printNode(value){ //{6}
     console.log(value);
}
tree.preOrderTraverse(printNode); //{7}
