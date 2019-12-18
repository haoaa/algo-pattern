
class Node{
  constructor(data) {
    this.data = data
    this.children = Array.from({length: Trie.charLength}).fill(null)
    this.isWord = false
  }
}

class Trie {
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
        curNode.children[index] =  new Node(c)
      }
      curNode = curNode.children[index]
    }
    curNode.isWord = true
  }
  find(text) {
    if (!text || !text.length) {
      return false
    }    
    let curNode = this.root
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      let index = c.charCodeAt(0) - this.beginCharCode
      if(curNode.children[index] === null) {
        return false
      }
      curNode = curNode.children[index]
    }
    return curNode.isWord
  }
}
Trie.charLength = 26
let tree = new Trie();
let strs = ["how", "hi", "her", "hello", "so", "see"];
for(let str of strs) {
    tree.insert(str);
}

for(let str of strs) {
    console.log(tree.find(str));
}

console.log(tree.find('world'));