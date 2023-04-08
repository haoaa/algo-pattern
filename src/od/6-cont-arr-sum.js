/**
 * 给定一个含有 N 个正整数的数组,求出有多少个连续区间(包括单个正整数)，它们的和大
于等于 x。
输入描述
第一行两个整数N x (0< N <= 100000,0 <= x <= 10000000)第二行有N个正整数 (每个正整
数小于等于 100)。
输出描述
输出一个整数，表示所求的个数。
 */
/* JavaScript Node ACM 模式 控制台输入获取 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const [n, x] = lines[0].split(" ").map((ele) => parseInt(ele));
    const arr = lines[1];
    split(" ")
      .map((ele) => parseInt(ele))
      .slice(0, n);
    console.log(arraySum(arr, x));
    lines.length = 0;
  }
});
/* 算法逻辑 */
function arraySum(arr, max) {
  let dp = maxSubArray(arr);
  let count = 0;
  dp.forEach((ele, index) => {
    if (ele === max) {
      count++;
    }
    if (ele > max) {
      for (let i = 0; i <= index; i++) {
        let sum = arr.slice(i, index + 1).reduce((pre, cur) => pre + cur, 0);
        if (sum >= max) {
          count++;
        }
      }
    }
  });
  return count;
}
/* 求解各元素结尾的子数组最大和 */
function maxSubArray(arr) {
  let dp = [];
  dp[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1], 0) + arr[i];
  }
  return dp;
}
