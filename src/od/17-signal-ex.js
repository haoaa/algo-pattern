/**
 * 每根天线有自己的高度 anth，每根天线的高度存储在一个二维数组中，各个天线的位置[,c
表示，r 代表天线的行位置(从 0 开始编号)，c 代表天线的列位置 (从 0 开始编号)。
在某一方向 (东向或南向)，某根天线可以收到多根其他天线的信号(也可能收不到任何其他
天线的信号)，对任一天线 X 和天线 Y，天线 X 能接收到天线 Y 的条件是:
1.天线 X 在天线 Y 的东边或南边
2.天线 X 和天线 Y 之间的其他天线的高度都低于天线 X 和天线 Y，或天线 X 和天线 Y 之间无
其他天线，即无遮挡.
 */
signal(2, 6, "2 5 4 3 2 8 9 7 5 10 10 3");
// 0 1 1 1 1 4
// 1 2 2 4 2 2
function signal(row, col, str) {
  str = str.split(" ").map(Number);
  let mx = new Array(row).fill(0).map((v, idx) => {
    return str.slice(idx * col, (idx + 1) * col);
  });
  const res = new Array(row).fill(0).map((i) => new Array(col).fill(0));
  for (let i = 0; i < row; i++) {
    const stk = [];
    for (let j = 0; j < col; j++) {
      calc(stk, i, j);
    }
  }
  for (let i = 0; i < col; i++) {
    const stk = [];
    for (let j = 0; j < row; j++) {
      calc(stk, j, i);
    }
  }
  function calc(stk, i, j) {
    while (stk.length && stk[stk.length - 1] < mx[i][j]) {
      stk.pop();
      res[i][j]++;
    }
    if (stk.length) {
      if (stk[stk.length - 1] === mx[i][j]) {
        stk.pop();
      }
      res[i][j]++;
    }
    stk.push(mx[i][j]);
  }
  console.log(row, " ", col);
  console.log(res.map((i) => i.join(" ")).join("\n"));
}


