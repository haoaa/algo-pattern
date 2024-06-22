class ArrayQueue {
  constructor(capacity){
    this.head = 0
    this.tail = 0
    this.items = []
    this.length = capacity
  }
  full(){
    return this.tail === this.length
  }
  empty() {
    return this.head === this.tail
  }
  enqueue(item) {
    if (this.full()) {
      if (this.head === 0) {
        return false
      }
      // 队尾满时搬移数据到数组头部
      for (let i = this.head; i < this.tail; i++) {
        this.items[i - this.head] = this.items[i]        
      }
      this.tail -= this.head
      this.head = 0
    }
    this.items[this.tail] = item
    ++this.tail
    return true
  }
  dequeue(){
    if (this.empty()) {
      return null
    }
    return this.items[this.head++]
  }
  toString() {
    console.log(this.items.join(','));
  }
}

let q = new ArrayQueue(3)
q.enqueue(3)
console.log(q);
q.enqueue(4)
console.log(q);
q.enqueue(5)
console.log(q);
q.dequeue()
q.dequeue()
console.log(q);
q.enqueue(8)
console.log(q);