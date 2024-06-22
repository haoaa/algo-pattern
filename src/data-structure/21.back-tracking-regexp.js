class Pattern{
  constructor(pattern) {
    this.matched = false
    this.pattern = pattern
    this.pLength = pattern.length
  }
  match(text) {
    this.matched = false
    this.rmatch(0, 0, text, text.length)
  }
  rmatch(ti, pj, text, tlen) {
    if (this.matched) {
      return  // 如果已经匹配了，就不要继续递归了
    } 
    if (pj === this.pLength) {
      if (ti === tlen) {  // 正则表达式到结尾了
        this.matched = true
      }
      return
    }
    if (this.pattern[pj] === '*') { // * 匹配任意个字符
      for (let k = 0; k <= tlen - ti; k++) {
        this.rmatch(ti + k, pj + 1, text, tlen)
      }
    } else if (this.pattern[pj] === '?') { // ? 匹配 0 个或者 1 个字符
      this.rmatch(ti, pj + 1, text, tlen)
      this.rmatch(ti + 1, pj + 1, text, tlen)
    } else if (ti < tlen && this.pattern[pj] === text[ti]) { // 纯字符匹配才行
      this.rmatch(ti + 1, pj + 1, text, tlen)
    }
  }
}

let p = new Pattern('abc?d*')
p.match('abcdd53o4o')
console.log(p.matched);