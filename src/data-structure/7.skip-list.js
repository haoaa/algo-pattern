/* 
   lv2 ->                    x   -> undefined
   lv1 ->        x  ->       x   -> undefined  
   lv0 ->  x  -> x  -> x  -> x   -> undefined
  head     1     2     3     4
  forward是个数组, 每个下标代表一个层级, 每个元素在他插入的层级开始到lv0,都会被前一个元素同层指向.
  如2插入lv2,那么1.forward[0],header.forward[1,2]都指向元素2
*/
class SkipList {
  // 关于p :两个进一层就是1/2,三个就是1/3
  constructor(maxLevel = 3, p = .5) {
    this.maxLevel = maxLevel
    this.p = p
    this.levelCount = 1
    this.head = new Node('head', maxLevel)
  }
  find(value) {
    let temp = this.head
    // 从最高层索引找起,先找左边最大,再往下找
    for (let i = this.levelCount - 1; i >= 0; --i) {
      while (temp.forwards[i] !== undefined && temp.forwards[i].data < value) {
        temp = temp.forwards[i]
      }
    }
    if (temp.forwards[0] !== undefined && temp.forwards[0].data === value) {
      return temp.forwards[0]
    } else {
      return null
    }
  }
  insert(value) {
    let level = this.randomLevel() // 插几层
    let newNode = new Node(value, level)
    let update = [] // 记录层级移动轨迹
    
    // 找到每一层小于value的最大元素
    // record every level largest value which smaller than insert value in update[]
    let currentNode = this.head
    for (let i = level - 1; i >= 0; i--) {
      while (currentNode.forwards[i] !== undefined && currentNode.forwards[i].data < value) {
        currentNode = currentNode.forwards[i]
      }
      update[i] = currentNode
    }

    // 更新新元素与新元素前置元素的forwards
    for (let i = 0; i < level; i++) {
      newNode.forwards[i] = update[i].forwards[i]
      update[i].forwards[i] = newNode;
    }
    if (this.levelCount < level) {
      this.levelCount = level - 1
    }
  }
  delete(value) {
    let update = new Array(this.maxLevel).fill(undefined)
    let p = this.head
    for (let i = this.levelCount - 1; i >= 0; i--) {
      while(p.forwards[i] != undefined && p.forwards[i].data < value) {
        p = p.forwards[i]
      }
      update[i] = p
    }

    if (p.forwards[0] !== undefined && p.forwards[0].data === value) {
      for (let i = this.levelCount - 1; i >= 0; --i) {
        // 前置非头且指向当前值,就更新forward
        if (update[i].forwards[i] !== undefined && update[i].forwards[i].data === value) {
          update[i].forwards[i] = update[i].forwards[i].forwards[i]
        }
      }
    }

    while(this.levelCount > 1 && this.head.forwards[this.levelCount] === undefined) {
      this.levelCount--
    }
  }
  /*  
      理论来讲，一级索引中元素个数应该占原始数据的 50%，二级索引中元素个数占 25%，三级索引12.5% ，一直到最顶层。
      因为这里每一层的晋升概率是 50%。对于每一个新插入的节点，都需要调用 randomLevel 生成一个合理的层数。
      该 randomLevel 方法会随机生成 1~MAX_LEVEL 之间的数，且 ：
            50%的概率返回 1
            25%的概率返回 2
          12.5%的概率返回 3 ... 
  */
  randomLevel() {
    let level = 0
    while (Math.random() < this.p && level < this.maxLevel) {
      level++
    }
    return level + 1
  }
  printAll() {
    for (let i = this.levelCount - 1; i >= 0; i--) {
      let out = ''
      let node = this.head.forwards[i]
      out = `Level ${i} : head -> `
      while(node !== undefined) {
        out += node.data + (node.forwards[i] ? ' -> ' : '')
        node = node.forwards[i]
      }
      console.log(out)
    }
  }
}
SkipList.SKIPLIST_PACE = .5 // 两个元素加个索引
SkipList.MAX_LEVEL = 16


class Node {
  /**
   * 跳表构造函数
   * @param {number} data 数据
   * @param {array} forwards 每层索引
   */
  constructor(data = -1, level = 1) {
    this.data = data
    this.forwards = new Array(level).fill(undefined) // 向下索引 [leveli ... level0]
    this.level = level
  }
}

let list = new SkipList(5)
list.insert(1)
list.insert(2)
list.insert(3)
list.insert(4)
list.insert(6)
list.insert(8)
list.insert(9)
list.insert(12)
list.insert(15)
list.insert(17)
list.insert(23)
list.insert(21)
list.insert(27)
list.insert(25)
list.printAll()
console.log(!!list.find(17));
list.delete(7)
list.delete(17)
list.printAll()









