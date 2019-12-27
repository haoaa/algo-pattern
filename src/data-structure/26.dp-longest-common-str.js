/* 最长公共子串长度 
  a a b c e f 与 a b c e d f的最长连续公共子串长度就是  a b c e, 不连续就是abcef

公式 if s1[i] === s2[j]
        t[i][j] = max(t[i - 1][j - 1] + 1, t[i - 1][j], t[i][j - 1])
    else 
        t[i][j] = max(t[i - 1][j - 1], t[i - 1][j], t[i][j - 1]) 
    a a b c e f
  0 0 0 0 0 0 0
a 0 1 1 1 1 1 1
b 0 1 1 2 2 2 2
c 0 1 1 2 3 3 3
e 0 1 1 2 3 4 4
d 0 1 1 2 3 4 4
f 0 1 1 2 3 4 5
公式 if s1[i] === s2[j]
        t[i][j] = t[i - 1][j - 1] + 1
     else
        t[i][j] = 0 
    a a b c e f
  0 0 0 0 0 0 0
a 0 1 1 0 0 0 0
b 0 0 0 2 0 0 0 
c 0 0 0 0 3 0 0
e 0 0 0 0 0 4 0
d 0 0 0 0 0 0 0
f 0 0 0 0 0 0 1
*/

class LCS {
  commonStr(s1, s2) {
    let n = s1.length, m = s2.length
    let maxlcs = Array.from({length: n + 1}).map(_ => Array.from({length: m + 1}).fill(0))
    
    let maxClcs = 0
    function max(x, y, z) {
      return Math.max(x, Math.max(y, z))
    }
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          maxlcs[i][j] = max(maxlcs[i][j - 1], maxlcs[i - 1][j], maxlcs[i - 1][j - 1] + 1)
        } else {
          maxlcs[i][j] = max(maxlcs[i][j - 1], maxlcs[i - 1][j], maxlcs[i - 1][j - 1])
        }
        // if (s1[i - 1] === s2[j - 1]) {
        //   maxlcs[i][j] = maxlcs[i - 1][j - 1] +  1
        //   maxClcs = maxClcs < maxlcs[i][j] ? maxlcs[i][j] : maxClcs
        // }
      }      
    }
    return maxlcs[m][n]
  }
  longestIncreaseArr(arr) {
    let max 
    for (let i = 0; i < arr.length; i++) {
      let curMax = [arr[i]]
      for (let j = i + 1; j < arr.length; j++) {
      }
    }
  }
}


let lcs = new LCS()
console.log(lcs.commonStr('abcedf', 'aabcef' ));