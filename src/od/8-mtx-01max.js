// 题目描述
// 给定一个仅包含 0 和 1 的 N*N 二维矩阵，请计算二维矩阵的最大值，计算规则如下:
// 每行元素按下标顺序组成一个二进制数(下标越大越排在低位)，二进制数的值就是该行
// 的值。矩阵各行值之和为矩阵的值。
// 2、允许通过向左或向右整体循环移动每行元素来改变各元素在行中的位置。
// 比如:
// [1,0,1,1,1]向右整体循环移动 2 位变为[1,1,1,0,1],二进制数为 11101，值为 29.
// [1,0,1,1,1]向左整体循环移动 2 位变为[1,1,1,1,0]，二进制数为 11110，值为 30。
// 输入描述
// 1、输入的第一行为正整数，记录了 N 的大小，0< N<= 20.
// 2、输入的第 2 到 N+1 行为二维矩阵信息，行内元素边角逗号分隔。
// 输出描述
// 矩阵的最大值。
// 用例
// 题目解析
// 我首先想到的是暴力破解，因为暴力破解只需要双重 for，外层遍历 N 次 (行数)得到每
// 一行数据后，开始内层遍历，内层一共遍历 N 次(列数)，第一次内层遍历时，计算原数组二
// 进制和，第二次内层遍历时，原数组元素集体向右移动一位，再次计算数组二进制和，比较
// 两次二进制和最大值保存，然后继续下一次遍历。这样最终就可以得到每一行的最大和，然
// 后所有行最大和相加就是所求值。
// 关于每一行数组的移动，我这边采取的:
// 。左移一次: arr.push(arr.shift())
// 。右移一次: arr.unshift(arr.pop()
// 关于每一行数组当成二进制求十进制值，我这边采取的:Number.parselnt(arr.join("),2)
// 但是暴力破解还有优化的空间，比如当前暴力破解，我需要将每行数组的每一种二进制
// 数情况都求出，比如:全 0 和全 1 的情况，则怎么移动都是全 0 和全 1，因此不应该被移动
// 算法源码
/* JavaScript Node ACM 模式 控制台输入获取 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lines = [];
let n;
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 1) {
    n = parseInt(lines[0]);
  }
  if (lines.length > 1 && lines.length === n + 1) {
    lines.shift();
    let matrix = [];
    lines.forEach((line) => {
      let arr = line
        .split(",")
        .slice(0, n)
        .map((ele) => parseInt(ele));
      matrix.push(arr);
    });
    console.log(maxMatrixSum(matrix));
    lines.length = 0;
  }
});
/* 算法逻辑 */
function maxMatrixSum(matrix) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    let max = binArrSum(matrix[i]);
    if (max !== 0 && max !== binArrSum(matrix[i].slice().fill(1))) {
      for (let j = 0; j < matrix[i].length; j++) {
        move(matrix[i]);
        max = Math.max(max, binArrSum(matrix[i]));
      }
    }
    sum += max;
  }
  return sum;
}
function move(arr) {
  arr.unshift(arr.pop());
}
function binArrSum(arr) {
  return Number.parseInt(arr.join(""), 2);
}
111001010