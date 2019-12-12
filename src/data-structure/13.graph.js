let LinkedList = require('./1.linklist')
/* 邻接表存储
1 ---> 2 ---> 3
^    / |   
|  /   |
4 <--- 5
*/
class Graph {
  constructor(v) {
    this.v = v
    this.adj = []
    this.count = 0
    for (let i = 0; i < v; i++) {
      this.adj[i] = new LinkedList()      
    }
  }
  addEdge(s, t) {
    this.adj[s].append(t)
    this.adj[t].append(s)
  }
}