/* 
KMP 算法也可以提前构建一个数组，用来存储模式串中每个前缀（这些前缀都有可能是好前缀）的最长可匹配前缀子串的结尾字符下标。
我们把这个数组定义为next 数组，
   idx  0  1  2  3  4  6
substr  a  b  a  b  a  c
next01  0  0  1  2  3  0
*/

function genNext(sub) {
  let m = sub.length
  let next = Array.from({length: m}).fill(-1)
  let k = -1 //最长可匹配前缀子串的后缀子串长度
  for (let i = 1; i < m; i++) {
    while (k !== -1 && sub[k + 1] !== sub[i]) {
      k = next[k]
    }
    if (sub[k + 1] === sub[i]) { // 前与后比
      ++k
    }
    next[i] = k
  }
  return next
}

let a= 'ababacd'
console.log(genNext(a));

function kmp(src, substring) {
  let next = genNext(substring)
  let j = 0
  let m = substring.length
  for (let i = 0, n = src.length; i < n; i++) {
    while (j > 0 && src[i] !== substring[j]) {
      j = next[j - 1] + 1
    }
    if (src[i] === substring[j]) {
      j++
    }
    if (j === m) {
      return i - m +1
    }    
  }
  return -1
}

console.log(kmp('abcabcaababacacdeft', 'ababac'));