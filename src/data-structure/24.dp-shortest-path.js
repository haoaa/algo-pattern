/* 
  don't know the answer?
  DP ~ memorization + recursion + guessing
  try all guesses & take best one
*/
let minDist = Number.MAX_VALUE
let matrix = [
  [1, 3, 5, 9],
  [2, 1, 3, 4],
  [5, 2, 6, 7],
  [6, 8, 4, 3]
]
// 最短路径回溯实现
function minDistBacktracking(i, j, dist, w, n) {
  if (i === n || j === n) { // 触边返回
    if ((i + j ===  2 * n - 1) && dist < minDist) { // 总步数判最优
      minDist = dist
    }
    return
  }
  if (i < n) { // 往下走，更新 i=i+1, j=j
    minDistBacktracking(i + 1, j, dist + w[i][j], w, n)    
  }
  if (j < n) { // 往右走，更新 i=i, j=j+1
    minDistBacktracking(i, j + 1, dist + w[i][j], w, n)    
  }
}


console.time('minDist-bt')
minDistBacktracking(0, 0, 0, matrix, matrix.length)
console.log(minDist);
console.timeEnd('minDist-bt')

// 最短路径dp 状态转移表法实现
function minDistDP(matrix, n) {
  let states = Array.from({length: n}).map(i => [])
  let sum = 0
  // 初始化行
  for (let i = 0; i < n; i++) {
    sum += matrix[0][i]
    states[0][i] = sum
  }
  sum = 0
  // 初始化列
  for (let i = 0; i < n; i++) {
    sum += matrix[i][0]
    states[i][0] = sum
  }
  for (let i = 1; i < n; ++i) {
    for (let j = 1; j < n; ++j) {
      states[i][j] = 
            matrix[i][j] + Math.min(states[i][j-1], states[i-1][j]);
    }
  }
  return states[n-1][n-1];
}
console.time('minDist-dp')
console.log(minDistDP(matrix, matrix.length));
console.timeEnd('minDist-dp')

// 最短路径dp 状态转移方程法实现
// min_dist(i, j) = w[i][j] + min(min_dist(i, j-1), min_dist(i-1, j))

let mem = Array.from({length: matrix.length}).map(i => [])
function minDistDP2(i, j) {
  if (i === 0 && j === 0) {
    return matrix[0][0]
  }
  if (mem[i][j] > 0) {
    return mem[i][j]
  }
  let left = Number.MAX_SAFE_INTEGER, top = Number.MAX_SAFE_INTEGER
  if (i - 1 >= 0) {
    top = minDistDP2(i - 1, j)
  }
  if (j - 1 >= 0) {
    left = minDistDP2(i, j - 1)
  }
  mem[i][j] = matrix[i][j] + Math.min(left, top)
  return mem[i][j]
}
console.time('minDist-dp2')
console.log(minDistDP2(matrix.length - 1, matrix.length - 1));
console.timeEnd('minDist-dp2')