/**
 * 题目解析
用例输入含义是
//有 3 个基站
0 2 1 //站点 1 到站点 1 的距离 0，到站点 2 的距离 2，到站点 3 的距离 1
1 0 2 // 站点 2 到站点 1 的距离 1，到站点 2 的距离 0，到站点 3 的距离 2
2 1 0 // 站点 3 到站点 1 的距离 2，到站点 2 的距离 1，到站点 3 的距离 0
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 1) {
    n = lines[0] - 0;
  }
  if (n && lines.length === n + 1) {
    lines.shift();
    const matrix = lines.map((line) => line.split(" ").map(Number));
    console.log(getResult(matrix, n));
    lines.length = 0;
  }
});
function getResult(matrix, n) {
  const res = [];
  dfs(n, [], [], res);
  let ans = Infinity;
  for (let path of res) {
    let dis = matrix[0][path[0]];
    path.reduce((p, c) => {
      dis += matrix[p][c];
      return c;
    });
    dis += matrix[path.at(-1)][0];
    ans = Math.min(ans, dis);
  }
  return ans;
}
function dfs(n, used, path, res) {
  if (path.length === n - 1) return res.push([...path]);
  for (let i = 1; i < n; i++) {
    if (!used[i]) {
      path.push(i);
      used[i] = true;
      dfs(n, used, path, res);
      used[i] = false;
      path.pop();
    }
  }
}
