class Entry{
  constructor(key, value, next) {
    this.key = key
    this.value = value
    this.next = next
  }
}
class HashTable{  
  constructor() {
    this.table = new Array(HashTable.INITIAL_CAPACITY).fill(undefined)
    this.size = 0 // 元素个数
    this.use = 0 // 已使用槽(对应索引有数据)数目
  }
  /* 散列函数 */
  hash(key) {
    // 1. 散列函数计算得到的散列值是一个非负整数；
    // 2. 如果 key1 = key2，那 hash(key1) == hash(key2)；
    // 3. 如果 key1 ≠ key2，那 hash(key1) ≠ hash(key2)。 (X)
    key = String(key)
    let code = key.charCodeAt(key.length - 1) % this.table.length
    return key === undefined ? 0 : code
  }
  resize() {
    /* js要动态扩容吗, js数组在内存是连续存储吗 */
    let newTable = new Array(this.table.length * 2)
    for (let i = 0; i < this.table.length; i++) {
      const element = this.table[i];
      if (element === undefined) {
        continue
      }
      newTable[i] = element
    }
    this.table = newTable
  }
  /* 插入 */
  put(key, value) {
    let index = this.hash(key)
    if (this.table[index] === undefined) {
      this.table[index] = new Entry(null, null, null) // 头节点为哨兵节点
    }
    let tmp = this.table[index]
    if (tmp.next === null) { // 空槽
      tmp.next = new Entry(key, value, null)
      this.size++
      this.use++ // 又有一个空槽被使用了
      // 自动扩容
      if (this.use >= this.table.length * HashTable.LOAD_FACTOR) {
        this.resize()
      }
    } else { // 链表append
      while (tmp.next !== null) {
        tmp = tmp.next
        if (tmp.key === key) {
          tmp.value = value
          return
        }
      }
      tmp.next = new Entry(key, value, null)
      this.size++
    }
  }
  remove(key) {
    let index = this.hash(key)
    let tmp = this.table[index]
    if (tmp === null || tmp.next === null) {
      return null
    }
    while (tmp.next !== null) {
      let next = tmp.next
      if (next.key === key) {
        tmp.next = next.next
        this.size--
        if (this.table[index].next === null) {
          use--
        }
        return next.value
      }
      tmp = tmp.next
    }
    return null
  }
  get(key) {
    let index = this.hash(key)
    let tmp = this.table[index]
    if (tmp === null || tmp.next === null) {
      return null
    }
    while (tmp.next !== null) {
      tmp = tmp.next
      if (tmp.key === key) {
        return tmp.value
      }
    }
    return null
  }
  toString() {
    let ret = {}
    for (let i = 0; i < this.table.length; i++) {
      let element = this.table[i];
      if (element!== undefined && element.next !== null) {
        ret[i] = []
        while (element.next !== null) {
          element = element.next
          ret[i].push({key: element.key, value: element.value})
        }
      }
    }
    console.log(JSON.stringify(ret, null, ' '));
  }
}
HashTable.INITIAL_CAPACITY = 8
HashTable.LOAD_FACTOR = .75

let table = new HashTable()
table.put('ba', 3)
table.put('aa', 10)
table.put('bb', 4)
table.put('bd', 5)
table.put('ba', 6)
table.put('be', 7)
// console.log(table.toString());
console.log(table.remove('aa'));
// console.log(table.toString());
console.log(table.get('ba'));