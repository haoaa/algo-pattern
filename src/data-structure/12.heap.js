// ///////////////
//      7       //
//    /   \     //
//   5     6    //
//  / \   /     //
// 4  2  1      //
// ///////////////
// [ , 7, 5, 6, 4, 2, 1]
// 堆是一个完全二叉树；堆中每一个节点的值都必须大于等于（或小于等于）其子树中每个节点的值。
class Heap { // 大顶堆
  constructor(capacity) {
    this.arr = [undefined]
    this.total = capacity
    this.count = 0
  }
  swap(arr, i, j){
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  // 从数组最后插入,再交互到范围层数
  insert(value) {
    if (this.count >= this.total) {
      return
    }
    this.count++
    this.arr[this.count] = value
    let i = this.count
    while(Math.floor(i / 2) > 0 && this.arr[i] > this.arr[Math.floor(i / 2)]) { //// 自下往上堆化
      this.swap(this.arr, i, Math.floor(i / 2))
      i = Math.floor(i / 2)
    }
  }
  removeMax() {
    if (this.count === 0) {
      return -1
    }
    this.arr[1] = this.arr[this.count]
    this.count--
    this.heapify(this.arr, this.count, 1)
  }
  print() {
    let out =''
    for (let i = 1; i <= this.count; i++) {
      out += this.arr[i] + ', '
    }
    console.log(out);
  }
  /**
   * 自上往下堆化
   * @param {Array} arr 
   * @param {number} n 元素个数
   * @param {number} i 堆顶序号
   */
  // ///////////////
  //      1       //
  //    /   \     //
  //   5     6    //
  //  / \         //
  // 4  2         //
  // ///////////////
  // [ , 1, 5, 6, 4, 2]
  heapify(arr, n, i) { 
    while (true) {
      let maxPos = i
      if (i * 2 <= n && arr[i] < arr[i * 2]) {
        maxPos = i * 2
      }
      if (i * 2 + 1 <= n && arr[maxPos] < arr[i * 2 + 1]) { // 取左右子节点最大的那个
        maxPos = i * 2 + 1
      }
      if (maxPos === i) { // 没有更大序号中断循环
        break
      }
      this.swap(arr, i, maxPos)
      i = maxPos
    }
  }
  buildHeap(arr, n) {
    for (let i = Math.floor(n / 2); i >= 1; i--) {
      this.heapify(arr, n, i)      
    }
  }
  sort(arr, n) { // 给外部数组排序
    this.buildHeap(arr, n)
    let k = n
    while(k > 1){
      this.swap(arr, 1, k)
      k--
      this.heapify(arr, k, 1)
    }
    return arr
  }
}

let heap = new Heap(10)
heap.insert(1)
heap.insert(2)
heap.insert(3)
heap.insert(4)
heap.insert(5)
heap.print()
heap.removeMax()
heap.print()
let a = [,5, 4, 3, 2, 1]
console.log(heap.sort(a, a.length - 1));