class Node {
  constructor(element){
    this.element = element
    this.next = null
  }
}
/* 单向链表 */
class LinkedList {
  constructor () {
    this.head = new Node('head')
  }
  findByValue(item) {
    let cur = this.head.next
    while(cur !== null && cur.element !== item) {
      cur = cur.next
    }
    return cur === null ? -1 : cur
  }
  findByIndex(i) {
    let cur = this.head.next
    let pos = 0
    while(cur !== null && pos !== i) {
      cur = cur.next
      pos++
    }
    return cur === null ? -1 : cur
  }
  append(element) {
    const node = new Node(element)
    let cur = this.head
    while (cur.next) {
      cur = cur.next
    }
    cur.next = node
  }
  insert(newElement, element) {
    let cur = this.findByValue(element)
    if (cur === -1) {
      console.log('未找到插入位置')
      return
    }
    let newNode = new Node(newElement)
    newNode.next = cur.next
    cur.next = newNode
  }
  findPrev (item) {
    let curNode = this.head
    while (curNode.next !== null && curNode.next.element !== item) {
      curNode = curNode.next
    }
    return curNode === null ? -1 : curNode
  }
  remove(item) {
    let pre = this.findPrev(item)
    if (pre === null) {
      console.log('未找到元素')
      return
    } else{
      pre.next = pre.next.next
    }
  }
  display() {
    let cur = this.head
    while (cur.next) {
      console.log(cur.next.element);
      cur = cur.next
    }
  }
}

// const LList = new LinkedList()
// LList.append('1')
// LList.append('2')
// LList.append('3')
// console.log('-------------insert item------------')
// LList.insert('4', '3') // 首元素后插入
// LList.insert('1.5', '1') // 尾元素后插入

// LList.display()
// LList.remove('2')
// LList.display()


