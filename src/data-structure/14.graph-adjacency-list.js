let LinkedList = require('./1.linklist')
/* 邻接表存储
1 ---> 2 ---> 3
^    / |   
|  /   |
4 <--- 5
*/
class Graph {
  constructor(vertexs) {
    this.vertexs = vertexs
    this.adjoinArray = Array.from({length: vertexs.length})
    for (let i = 0; i < this.adjoinArray.length; i++) {
      this.adjoinArray[i] = new LinkedList()      
    }
  }
  addEdge(s, t) {
    const index = this.vertexs.indexOf(s)
    this.adjoinArray[index].append(t)
  }
  getVertexRow(v) {
    const index = this.vertexs.indexOf(v)
    this.adjoinArray[index].display()
  }
  print() {
    let out
    for (let i = 0; i < this.adjoinArray.length; i++) {
      out = `vertex ${this.vertexs[i]}`
      let list = this.adjoinArray[i];
      list = list.head
      while(list.next) {
        list = list.next
        out += ` -> ${list.element}`
      }
      console.log(out);
    }
  }
  bfs(start, end) {
    if (start === end) {
      return
    }
    let visited = []
    let queue = []
    queue.push(start)
    while (queue.length) {
      let node = queue.shift()
      if(node === end) break
      if(queue.includes(node)) continue
      const index = this.vertexs.indexOf(node)
      visited.push(node)
      let head = this.adjoinArray[index].head
      while (head.next !== null) {
        head = head.next
        queue.push(head.element)
      }
    }
    return visited
  }
  dfs(start, end) {
    if (start === end) {
      return
    }
    let visited = []
    let queue = []
    queue.push(start)
    while (queue.length) {
      let node = queue.pop()
      if(node === end) break
      if(visited.includes(node)) continue
      const index = this.vertexs.indexOf(node)
      visited.push(node)
      let head = this.adjoinArray[index].head
      while (head.next !== null) {
        head = head.next
        queue.push(head.element)
      }
    }
    return visited
  }
}

/* 
v0 [head -> v1 -> v2]
v1 [head -> v2 -> v4]
*/
const gg = new Graph(['v0', 'v1', 'v2', 'v3', 'v4'])
gg.addEdge('v0', 'v1')
gg.addEdge('v0', 'v3')
gg.addEdge('v1', 'v2')
gg.addEdge('v1', 'v4')

// console.log(gg.getVertexRow('v1'));
// gg.print()
console.log(gg.bfs('v0'));
console.log(gg.dfs('v0'));
