/**
 * 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。 这些定义有助于我们写出更高效的向/从树中插入、查找和删除节点的算法。
 * 二叉树在计算机科学中的应用非常广泛。
 *      二叉搜索树（BST）是二叉树得到一种，但是它只允许你在左侧节点存储（比父节点）小的值，在右侧节点存粗（比父节点）大（或者等于）的值。
 *      二叉搜索树是我们本章要研究的数据结构。
 * */

/**
 * 使用两个指针，一个指向左侧子节点，另一个指向右侧子节点。  声明一个 Node 类来表示树中的每个节点。
 *      我们声明一个变量以控制此数据结构的第一个节点，在树中，它是根元素  this.root.
 *
 * 实现方法：
 * insert(key): 向树中插入一个新的键
 * search(key): 在树中查找一个键，如果节点存在，则返回true,  不存在，返回 false
 * inOrderTraverse: 通过中序遍历方式遍历所有节点
 * preOrderTraverse: 通过先序遍历方式遍历所有节点
 * postOrderTraverse: 通过后序遍历方式遍历所有节点
 * min: 返回树中最小的值/键
 * max: 返回树中最大的值/键
 * remove(key): 从树中移除某个键
 * */
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree{
    constructor() {
        this.root = null;
    }

    /**向树中插入一个新的键,    要经历三个步骤
     * 第一步是创建用来表示新节点的Node 类实例。 只需要向构造函数传递我们想用来插入树的节点值，它的左指针和右指针的值会由构造函数自动设置为null.
     * 第二步要验证这个插入操作是否为一种特殊情况。这个特殊情况就是我们要插入的节点是树的第一个节点。如果是，就将根节点指向新节点。
     * 第三步是将节点加在非根节点的其他位置。这种情况下，需要一个私有的辅助函数 insertNode(node,newNode)，
     * */
    insert(key){
        let newNode = new Node(key);
        if(this.root === null){
            this.root = newNode;
        }else{
            this.insertNode(this.root,newNode);
        }
    }
    insertNode(node,newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                this.insertNode(node.left,newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
            }else{
                this.insertNode(node.right,newNode);
            }
        }
    }


    /**
     * 中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访问所有的节点。
     * 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
     * */
    inOrderTraverse(callback){
        this.inOrderTraverseNode(this.root,callback);
    }
    inOrderTraverseNode(node,callback){
        if(node !== null){
            this.inOrderTraverseNode(node.left,callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right,callback);
        }
    }

    /**
     * 先序遍历是以优先于后代节点的顺序访问每个节点的。  先序遍历的一种应用是打印一个结构化的文档。
     * 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
     * */
    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root,callback);
    }
    preOrderTraverseNode(node,callback){
        if(node !== null){
            callback(node.key);
            this.preOrderTraverseNode(node.left,callback);
            this.preOrderTraverseNode(node.right,callback);
        }
    }

    /**
     * 后序遍历则是先访问后代节点，再访问节点本身。  后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。
     * 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
     *  */
    postOrderTraverse(callback){
        this.postOrderTraverseNode(this.root,callback);
    }
    postOrderTraverseNode(node,callback){
        if(node !== null){
            this.postOrderTraverseNode(node.left,callback);
            this.postOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    }

    /**
     * 返回树中最小的值/键
     * minNode 内部，我们会遍历树的左边，至到找到树的最下层（最左端）
     * */
    min(){
        return this.minNode(this.root);
    }
    minNode(node){
        if(node){
            while(node && node.left !== null){
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    /**
     * 返回树中最大的值/键
     * maxNode 内部，我们会遍历树的右边，至到找到树的最下层（最右端）
     * */
    max(){
        return this.maxNode(this.root);
    }
    maxNode(node){
        if(node){
            while(node && node.right !== null){
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

    /**
     * 在树中查找一个键，如果节点存在，则返回true,  不存在，返回 false
     */
    search(key){
        return this.searchNode(this.root,key);
    }
    searchNode(node,key){
        if(node === null){
            return false;
        }
        if(key < node.key){
            return this.searchNode(node.left,key);
        }else if(key > node.key){
            return this.searchNode(node.right,key);
        }else{
            return true;
        }
    }

    /**
     *  从树中移除某个键(节点)
     *  这里注意： this.root 被赋值为 removeNode 方法的返回值。
     *  removeNode 方法的复杂之处在于我们要处理不同的运行场景，当然也包括它同样是通过递归实现的。
     * */
    remove(key){
        // this.root = this.removeNode(this.root,key);
        this.removeNode(this.root,key);
    }
    removeNode(node,key){
        if(node === null){
            return null;
        }
        if(key < node.key){
            node.left = this.removeNode(node.left,key);
            return node;
        }else if(key > node.key){
            node.right = this.removeNode(node.right,key);
            return node;
        }else{    // 键等于 node.key
            // 第一种情况：一个叶节点
            if(node.left === null && node.right === null){
                node = null;
                return node;
            }

            // 第二种情况：一个只有一个子节点的节点
            if(node.left == null){
                node = node.right;
                return node;
            }else if(node.right === null){
                node = node.left;
                return node;
            }

            // 第三种情况：一个有两个子节点的节点
            let aux = this.findMinNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right,aux.key);
            return node;
        }
    }
    findMinNode(node){
        if(node){
            while(node && node.left !== null){
                node = node.left;
            }
            return node;
        }
        return null;
    }

}

function printNode(value){
    console.log(value);
}

let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.insert(6);


// tree.insert(11);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// tree.insert(6);

// console.log(tree.root);
// tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);
// tree.postOrderTraverse(printNode);

// console.log( tree.min() );
// console.log( tree.max() );

// console.log( tree.search(1) ? "key 1 found." : "key 1 not found." )
// console.log( tree.search(8) ? "key 8 found." : "key 8 not found." )

console.log(tree.root);

tree.remove(5);

console.log(tree.root);
tree.inOrderTraverse(printNode);









































