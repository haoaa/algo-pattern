class Node {
  constructor(data) {
    this.data = data
    this.children = Array.from({length: AcMatch.charLength}).fill(null)
    this.isWord = false
    this.length = 0
    this.fail = null
  }
}

class AcMatch {
  constructor() {
    this.root = new Node('/')
    this.beginCharCode = 'a'.charCodeAt(0)  
  }
  insert(text) {
    if (!text || !text.length) {
      return false
    }
    let m = text.length
    let curNode = this.root
    for (let i = 0; i < m; i++) {
      let c = text[i]
      let index = c.charCodeAt(0) - this.beginCharCode
      if (curNode.children[index] === null) {
        let newNode = new Node(c)
        newNode.length = curNode.length + 1
        curNode.children[index] = newNode
      }
      curNode = curNode.children[index]
    }
    curNode.isWord = true
  }
  find(text) {
    let n = text.length
    if (!text || !n) {
      return false
    }    
    let curNode = this.root
    for (let i = 0; i < n; i++) {
      const c = text[i];
      let index = c.charCodeAt(0) - this.beginCharCode
      while (curNode.children[index] === null && curNode !== this.root) {
        curNode = curNode.fail
      }
      curNode = curNode.children[index]
      if (curNode === null) {
        curNode = this.root
      }
      let tmp = curNode
      while (tmp !== this.root) {
        if (tmp.isWord) {
          let pos = i - tmp.length + 1
          console.log(" 匹配起始下标 " + pos + "; 长度 " + tmp.length);
        }
        tmp = tmp.fail
      }
    }
  }  
  /* 
       root
     /    \ \
     a ... y z   
    /|\
   a b c
  */
  buildFailurePointer() {
    let queue = [] // 利用队列对trie做广度优先遍历处理
    queue.push(this.root)
    while (queue.length) {
      let p = queue.shift() // 父节点 pc p's child qc q's child
      for (let i = 0; i < AcMatch.charLength; i++) {
        let pc = p.children[i]
        if (pc === null) {
          continue
        } 
        if (p === this.root) {
          pc.fail = this.root // 返驻
        } else {          
          let q = p.fail // fail节点在上层, 第二层的fail节点都是root
          while(q !== null) {
            let qc = q.children[pc.data.charCodeAt(0) - this.beginCharCode]
            if (qc !== null) {
              pc.fail = qc
              break
            }
            q = q.fail
          }
          if (q === null) {
            pc.fail = this.root
          }
        }
        queue.push(pc);
      }
    }
  }
}

AcMatch.charLength = 26
let tree = new AcMatch();
// let strs = ["how", "hi", "her", "hello", "so", "see"];
let strs = ["c", "bc", "bcd", "abcd"]; // 多个模式串匹配一个主串
for(let str of strs) {
    tree.insert(str);
}
tree.buildFailurePointer()
for(let str of strs) {
    tree.find(str)
}

tree.find('cde')