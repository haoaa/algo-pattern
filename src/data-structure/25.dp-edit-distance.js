
let a = 'abz'.split('')
let b = 'cba'.split('')
let n = a.length
let m = b.length
let minDist = Number.MAX_VALUE
function lwstBT(i, j, edist) { // 回溯法求编辑距离
  if (i === n || j === m) {
    if (i < n) {
      edist += n - i
    }
    if (j < m) {
      edist += m - j
    }
    if (edist < minDist) {
      minDist = edist
    }
    return
  }
  if (a[i] === b[j]) {
    lwstBT(i + 1, j + 1, edist)
  } else {
    lwstBT(i + 1, j, edist + 1); // 删除 a[i] 或者 b[j] 前添加一个字符
    lwstBT(i, j + 1, edist + 1); // 删除 b[j] 或者 a[i] 前添加一个字符
    lwstBT(i + 1, j + 1, edist + 1); // 将 a[i] 和 b[j] 替换为相同字符
  }
}

lwstBT(0, 0, 0)
console.log(minDist);

function lswtDp(a, n, b, m) {
  let minDist = Array.from({length: n}).map(a=> [])
  for (let j = 0; j < m; j++) { // 初始化第 0 行的编辑距离
    if (a[0] === b[j]) {
      minDist[0][j] = j
    } else if (j !== 0) {
      minDist[0][j] = minDist[0][j - 1] + 1
    } else minDist[0][j] = 1    
  }
  for (let i = 0; i < n; i++) { // 初始化第 0 列的编辑距离
    if (b[0] === a[i]) { // 为啥, 减少了哨兵行列不好理解
      minDist[i][0] = i
    } else if (i !== 0) {
      minDist[i][0] = minDist[i - 1][0] + 1
    } else minDist[i][0] = 1    
  }
  // 除了首行首列,剩下的表格填充公式
  // if str[i] === str2[j]
  //    dist[i][j] =  dist[i-1][j-1] 
  // else dist[i][j] =  min(dist[i-1][j-1], dist[i][j-1], dist[i-1][j]) + 1
  for (let i = 1; i < n; i++) { 
    for (let j = 1; j < m; j++) {
      if (a[i] === b[j]) {
        minDist[i][j] = minDist[i - 1][j - 1]
      } else {
        minDist[i][j] = min(
          minDist[i - 1][j], minDist[i][j - 1], minDist[i - 1][j - 1]
        ) + 1
      }
    }    
  }
  return minDist[n - 1][m - 1]
}
function min(x, y, z) {
  return Math.min(x, Math.min(y, z))
}
let astr = 'aba', bstr= 'adb'
console.log(lswtDp(astr, astr.length, bstr, bstr.length))