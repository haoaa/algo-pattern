class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}


/* bst, search and traverse */
class BinarySearchTree {
  constructor() {
    this.root = null /* 根节点 */
  }
  find(value) {
    let p = this.root
    while (p !== null) {
      if (value < p.value) {
        p = p.left
      } else if (value > p.value) {
        p = p.right
      } else {
        return p
      }
    }
    return null
  }
  insert(value) {
    if(this.root === null) {
      this.root = new Node(value)
      return
    }
    let p = this.root
    while (p !== null) {
      if (value > p.value) {
        if (p.right === null) {
          p.right = new Node(value)
          return
        }
        p = p.right
      } else {
        if (p.left === null) {
          p.left = new Node(value)
          return
        }
        p = p.left
      }
    }
  }
  delete(value) {
    let p = this.root
    let pp = null
    // 做到节点和父节点
    while (p !== null && p.value !== value) {
      pp = p
      if (value > p.value) {
        p = p.right
      } else {
        p = p.left
      }
    }
    if(p === null) return
    // 有两个子节点,把右节点最小的节点的值给要删除的节点, 删除右节点最小的节点
    if (p.left !== null && p.right !== null) {
      let pright = p.right
      let prightParent = p
      while(pright.left !== null) {
        prightParent = pright
        pright = pright.left
      }
      p.value = pright.value // 将pright的数据替换到p中
      p = pright  // 下面就变成了删除pright了
      pp = prightParent
    }

    // 删除节点是叶子节点或者仅有一个子节点
    let child = null
    // 获取子节点
    if(p.left !== null|| p.right !== null) child = (p.left || p.right)

    if (pp === null) {
      this.root = child
    } else if (pp.left === p) {
      pp.left = child
    } else {
      pp.right = child
    }
  }
  findMax() {
    if (this.root === null) {
      return null
    }
    let p = this.root
    while( p.right !== null) {
      p = p.right
    }
    return p
  }
  preOrder(root) {
    if(root === null) return
    console.log(root.value);
    this.preOrder(root.left)
    this.preOrder(root.right)
  }
  inOrder(root) {
    if(root === null) return
    this.inOrder(root.left)
    console.log(root.value);
    this.inOrder(root.right)
  }
  postOrder(root) {
    if(root === null) return
    this.postOrder(root.left)
    this.postOrder(root.right)
    console.log(root.value);
  }
  levelOrder(root) { // 广度优先遍历
    let q = []
    q.push(root)
    while (q.length) {
      let node = q.shift()
      console.log(node.value);
      if (node.left) {
        q.push(node.left)
      }
      if (node.right) {
        q.push(node.right)
      }
    }
  }
}


// ///////////////   高度   深度   层
//      5       //    2      0     1
//    /   \     //
//   3     8    //    1      1     2
//  / \   /     //
// 2  4  6      //    0      2     3
// ///////////////
// 树的高度=根节点的高度
let searchTree = new BinarySearchTree()
searchTree.insert(5);
searchTree.insert(3);
searchTree.insert(8);
searchTree.insert(2);
searchTree.insert(4);
searchTree.insert(6);
// console.log(searchTree.find(6));
// searchTree.delete(8)
// searchTree.preOrder(searchTree.root);
// searchTree.inOrder(searchTree.root);
// searchTree.postOrder(searchTree.root);
searchTree.levelOrder(searchTree.root)
