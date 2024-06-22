/**
 *
 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
let m;
let n;
rl.on("line", (line) => {
  lines.push(line);

  if (lines.length === 1) {
    [m, n] = lines[0].split(" ").map(Number);
  }

  if (m && lines.length === m + 1) {
    lines.shift();

    const matrix = lines.map((line) => line.split(" ").map(Number));

    console.log(getBrandCount(matrix, m, n));
    lines.length = 0;
  }
});

function getBrandCount(matrix, m, n) {
  const brands = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 5) {
        brands.push([i, j]);
      }
    }
  }
  let len = brands.length;
  if (len === 0 || len === n * m) {
    return 0;
  }

  const ufs = new UnionFindSet(len);

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      let [x1, y1] = brands[i];
      let [x2, y2] = brands[j];

      if (Math.abs(x2 - x1) <= 3 && Math.abs(y2 - y1) <= 3) {
        ufs.union(i, j);
      }
    }
  }

  return ufs.count;
}

class UnionFindSet {
  constructor(n) {
    this.fa = [];
    for (let i = 0; i < n; i++) {
      this.fa.push(i);
    }
    this.count = n;
  }

  find(x) {
    if (x !== this.fa[x]) {
      this.fa[x] = this.find(this.fa[x]);
      return this.fa[x];
    }
    return x;
  }

  union(x, y) {
    let x_fa = this.fa[x];
    let y_fa = this.fa[y];
    if (x_fa !== y_fa) {
      this.fa[y_fa] = x_fa;
      this.count--;
    }
  }
}
/**
      [0,1,2]
x y
0 1   [0,0,2]
1 2   [0,0,0]
 */

/* JavaScript Node ACM 模式  控制台输入获取  */
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
  const ufs = new UnionFindSet(n);

  for (let i = 0; i < n; i++) {
    //  这里j从i+1开始，是因为矩阵是对称的
    for (let j = i + 1; j < n; j++) {
      if (matrix[i][j] === 1) {
        ufs.union(i, j);
      }
    }
  }

  // connected对象的属性代表某个连通分量的顶级父节点，属性值代表该连通分量下的节点个数
  const connected = {};

  for (let i = 0; i < n; i++) {
    const fa = ufs.find(ufs.fa[i]);
    connected[fa] ? connected[fa]++ : (connected[fa] = 1);
  }

  //  返回最大节点数
  return Math.max.apply(null, Object.values(connected));
}

//  并查集实现
class UnionFindSet {
  constructor(n) {
    this.fa = new Array(n).fill(0).map((_, i) => i);
    this.count = n;
  }

  find(x) {
    if (x !== this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]));
    }
    return x;
  }

  union(x, y) {
    const x_fa = this.find(x);
    const y_fa = this.find(y);

    if (x_fa !== y_fa) {
      this.fa[y_fa] = x_fa;
      this.count--;
    }
  }
}
