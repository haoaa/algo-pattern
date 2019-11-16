class ArrayCircularQueue {
  constructor(capacity){
    this.head = 0
    this.tail = 0
    this.items = []
    this.length = capacity
  }
  full(){
    return (this.tail + 1) % this.length === this.head
  }
  empty() {
    return this.head === this.tail
  }
  enqueue(item) {
    if (this.full()) {
      return false
    }
    this.items[this.tail] = item
    this.tail = (this.tail + 1) % this.length // 模成环
    return true
  }
  dequeue(){
    if (this.empty()) {
      return null
    }
    let ret = this.items[this.head]
    this.head = (this.head + 1) % this.length
    return ret
  }
  toString() {
    console.log(this.items.join(','));
  }
}

let q = new ArrayCircularQueue(3)
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
console.log(q);
q.dequeue()
q.dequeue()
q.enqueue(4)
q.enqueue(5)
console.log(q);