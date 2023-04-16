/**
 * 某沙漠新种植 N 棵胡杨(编号 1-N)，排成一排
一个月后，有 M 棵胡杨未能成活
现可补种胡杨 K 棵，请问如何补种 (只能补种，不能新种)，可以得到最多的连续胡杨
树?
输入描述
N 总种植数量，1 <= N <= 100000
M 未成活胡杨数量，M 个空格分隔的数，按编号从小到大排列，1 <= M = N
K 最多可以补种的数量，0 <= K <= M
输出描述
最多的连续胡杨棵树
 */
const lines = [10, 3, "2 4 7", 1];
if (lines.length === 4) {
  let n = lines[0] - 0;
  let m = lines[1] - 0;
  let k = lines[3] - 0;
  const arr = new Array(n).fill(1);
  let idx = lines[2].split(" ").slice(0, m);
  for (let i = 0; i < idx.length; i++) {
    arr[idx[i] - 1] = 0;
  }
  console.log(slide(arr, k));
  lines.length = 0;
}
/* 滑动窗口 */
function slide(arr, k) {
  let left = 0;
  let occur = [];
  let maxLen = 0;
  for (let right = 0; right < arr.length; right++) {
    if (arr[right] === 0) {
      //记录 right指针每次扫描到 0 的索引，当滑动窗口内 0 超过制定数量时，我们可以抛弃记录的滑动窗口内部的第一个 0 及之前部分，因此即让 lef 指针移动到记录的第一个 0 的右边
      occur.push(right);
      if (occur.length > k) {
        maxLen = Math.max(maxLen, right - left);
        left = occur.shift() + 1;
        continue;
      }
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
