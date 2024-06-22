/**
 * 题目描述
给定一个 m x n 的矩阵，由若干字符’X’和’0’构成，’X’表示该处已被占据，’0’表示该处空闲，
请找到最大的单入口空闲区域。
解释:
空闲区域是由连通的'O'组成的区域，位于边界的’O’可以构成入口
单入口空闲区域即有且只有一个位于边界的'O'作为入口的由连通的’O'组成的区域
如果两个元素在水平或垂直方向相邻，则称它们是“连通”的。
输入描述
第一行输入为两个数字，第一个数字为行数 m，第二个数字为列数 n，两个数字以空格分隔，
1<=m,n<=200.
剩余各行为矩阵各行元素，元素为’X’或’O’，各元素间以空格分隔。
输出描述
若有唯一符合要求的最大单入口空闲区域，输出三个数字
。第一个数字为入口行坐标 (0~m-1)
。第二个数字为入口列坐标 (0~n-1)
。第三个数字为区域大小
三个数字以空格分隔;
若有多个符合要求，则输出区域大小最大的，若多个符合要求的单入口区域的区域大小相同，
则此时只需要输出区域大小，不需要输出入口坐标
若没有，输出 NULL。

 */

/* JavaScript Node ACM 模式 控制台输入获取 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lines = [];
let n, m;
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 1) {
    [n, m] = lines[0].split(" ").map(Number);
  }
  if (n && lines.length === n + 1) {
    lines.shift();
    const matrix = lines.map((line) => line.split(" "));
    console.log(getResult(matrix, n, m));
    lines.length = 0;
  }
});
function getResult(matrix, n, m) {
  const checked = new Set();
  const offset = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  function dfs(i, j, count, out) {
    const pos = `${i}-${j}`;
    if (
      i < 0 ||
      i >= n ||
      j < 0 ||
      j >= m ||
      matrix[i][j] === "X" ||
      checked.has(pos)
    ) {
      return count;
    }
    checked.add(pos);
    if (i === 0 || i === n - 1 || j === 0 || j === m - 1) out.push([i, j]);
    count++;
    for (let k = 0; k < offset.length; k++) {
      const [offsetX, offsetY] = offset[k];
      const newI = i + offsetX;
      const newJ = j + offsetY;
      count = dfs(newI, newJ, count, out);
    }
    return count;
  }
  const ans = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === "O" && !checked.has(`${i}-${j}`)) {
        const out = [];
        const count = dfs(i, j, 0, out);
        if (out.length === 1) {
          ans.push([...out[0], count]);
        }
      }
    }
  }
  if (!ans.length) return "NULL";
  ans.sort((a, b) => b[2] - a[2]);
  if (ans.length === 1 || ans[0][2] > ans[1][2]) {
    return ans[0].join(" ");
  } else {
    return ans[0][2];
  }
}
