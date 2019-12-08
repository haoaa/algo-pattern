const HashTable = require('./8.hash-table') 

/* 用双向链表做LRU, 同时把节点添加到散列表中, 能做到在查找,删除时时间复杂度为O(1) */
class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

class LRUBaseHashTable {
  constructor(capacity = 10) {
    this.capacity = capacity
    this.length = 0
    this.head = new Node('head')
    this.tail = new Node('tail')

    this.head.next = this.tail
    this.tail.prev = this.head

    this.table = new HashTable()
  }
  /* 链表相关操作 */
  addNodeToHead(newNode) {
    newNode.next = this.head.next
    newNode.prev = this.head

    this.head.next.prev =  newNode
    this.head.next = newNode
  }
  removeNode(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }
  popTail() {
    let last = this.tail.prev
    this.removeNode(last)
    return last
  }
  moveToHead(node) {
    this.removeNode(node)
    this.addNodeToHead(node)
  }
  /* LRU相关操作 */
  add(key, value) {
    let node = this.table.get(key)
    /* 已经存在,移到队头. */
    if (node === null) {
      let newNode = new Node(key, value)
      this.table.put(key, newNode)
      this.addNodeToHead(newNode)
      this.length++
      if (this.length > this.capacity) {
        let tail = this.popTail()
        this.table.remove(tail.key)
        this.length--
      }
    } else {
      node.value = value
      this.moveToHead(node)
    }
  }
  remove(key) {
    let node = this.table.get(key)
    if (null === node) {
      return
    }
    /* 从双链表和散列表中移除 */
    this.removeNode(key)
    this.table.remove(key)
    this.length--
  }
  printAll() {
    let p = this.head.next
    let out = 'head ->'
    while (p.next !== null) {
      out = `${out} ${p.value} ->`
      p = p.next
    }
    console.log(`${out} tail`);
  }
}

let lru = new LRUBaseHashTable(3)

lru.add('bb', 5)
lru.add('bc', 6)
lru.add('bd', 7)
lru.printAll()
lru.add('be', 8)
lru.add('bf', 9)
lru.printAll()