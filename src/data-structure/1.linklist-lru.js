let LinkedList = require('./1.linklist')

/* 
我们维护一个有序单链表，越靠近链表尾部的结点是越早之前访问的。当有一个新的数据被访问时，我们从链表头开始顺序遍历链表。

1. 如果此数据之前已经被缓存在链表中了，我们遍历得到这个数据对应的结点，并将其从原来的位置删除，然后再插入到链表的头部。
new -> old 
find ?
  move to head
  :
  full ? remove last : noop ; insert to head
2. 如果此数据没有在缓存链表中，又可以分为两种情况：

如果此时缓存未满，则将此结点直接插入到链表的头部；

如果此时缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。

这样我们就用链表实现了一个 LRU 缓存，是不是很简单？
*/
class LRUcache{
  constructor(capacity){
    this.capacity = capacity
    this.list = new LinkedList()
  }
  get(item) {
    if(this.list.findByValue(item) !== -1) {
      this.list.remove(item)
    } else {
      if (this.list.length() >= this.capacity) {
        let last = this.list.findByIndex(this.capacity -1)
        this.list.remove(last.element) // 按值删还是按指针
      }      
    }
    this.list.insertHead(item)
    this.list.display()
  }
}

let cc = new LRUcache(2)
cc.get(5)
console.log('-----');
cc.get(6)
console.log('-----');
cc.get(7)
console.log('-----');
cc.get(6)