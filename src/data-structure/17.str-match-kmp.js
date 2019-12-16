/* 
KMP 算法也可以提前构建一个数组，用来存储模式串中每个前缀（这些前缀都有可能是好前缀）的最长可匹配前缀子串的结尾字符下标。
我们把这个数组定义为next 数组，
   idx  0  1  2  3  4  6
substr  a  b  a  b  a  c
next01  0  0  1  2  3  0
*/

function genNext(sub) {
  let m = sub.length
  let next = Array.from({length: m}).fill(0)
  let j = 0, i = 1 
  // 遍历后缀子串[1, m), 记录前缀子串的结束的下个字符下标, 同时尝试获取最大后缀子串.  
  for (let j = 0; j < m && i < m;) {
    if (sub[i] === sub[j]) {
      next[i] = j + 1
      i++
      j++
    } else {
      if(j > 0) {
        j = next[j - 1] // 获取失败, 尝试上一次匹配前缀子串的下一位
      } else {        
        i++
      }
    }    
  }
  return next
}

// function genNext(sub) {
//   let m = sub.length
//   let next = Array.from({length: m}).fill(0)
//   let j = 0, i = 1 
//   // 遍历后缀子串[1, m), 记录前缀子串的结束的下个字符下标, 同时尝试获取最大后缀子串.  
//   while (i < m) {
//     while(j > 0 && sub[i] !== sub[j]) {
//       j = next[j - 1] // 获取失败, 尝试上一次匹配前缀子串的下一位
//     }
//     if (sub[i] === sub[j]) {
//       next[i] = j + 1
//       j++
//     }    
//     i++
//   }
//   return next
// }
// genNext('ababac')
function kmp(src, substring) {
  let next = genNext(substring)
  let j = 0
  let m = substring.length
  for (let i = 0, n = src.length; i < n; i++) {
    while (j > 0 && src[i] !== substring[j]) {
      j = next[j - 1] 
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

console.log(kmp('abxabcabcaby', 'abcaby'));