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
  bfs() {

  }
}

const gg = new Graph(['v0', 'v1', 'v2', 'v3', 'v4'])
gg.addEdge('v0', 'v1')
gg.addEdge('v0', 'v3')
gg.addEdge('v1', 'v2')
gg.addEdge('v1', 'v4')
gg.addEdge('v3', 'v2')

console.log(gg.getVertexRow('v1'));
gg.print()
