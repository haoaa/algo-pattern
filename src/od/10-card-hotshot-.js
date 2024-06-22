let lines = "1,-5,-6,4,3,6,-2".split(",").map((i) => parseInt(i));

function fn(lines) {
  let dp = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (i == 0) {
      dp[i] = Math.max(lines[i], 0);
    } else if (i < 3) {
      dp[i] = Math.max(dp[i - 1] + lines[i], 0);
    } else {
      dp[i] = Math.max(dp[i - 1] + lines[i], dp[i - 3]);
    }
  }
  return dp.pop();
}
// console.log(fn(lines));

// const tmp = [73, 74, 75, 71, 69, 72, 76, 73];
const tmp = [123, 124, 125, 121, 119, 122, 126, 123];
function ddz(arr) {
  let stak = [],
    ans = new Array(arr.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    while (stak.length && tmp[stak[stak.length - 1]] < arr[i]) {
      let prev = stak.pop();
      // ans[prev] = i - prev;
      ans[prev] = i;
    }
    stak.push(i);
  }
  return ans;
}
console.log(ddz(tmp));

// 题目解析
// 首先，这道题题目描述中有一个关键词“为了防剐蹭”，隐式含义应该是尽可能让停车
// 位置左右两边是空位，这样才能起到防剐蹭的效果。
// 然后，满足上面停车条件后，找到离当前停的车 A 最近的车 B，求解 A~B 之间的距离，
// 比如用例中
// 1,0,0,0,0,1,0,0,1,0,1
// B A
// 当车停在第 3 个车位，满足防剐蹭要求，此时离停车位置最近的车停在第 1 个车位上，
// 距离为 2。最后，找出所有的停车情况下的 A~B 距离，求出其中最大那个距离。 (.....太绕口
// 了)另外如果没有满足防刮蹭要求，比如 101，或者满足一半防刮蹭要求，比如 1001，此时
// A~B 最近距离都是 1.还有一种情况，001，此时将车停在边界 0 上，A~B 最近距离为 2
// 解题思路很简单，把输入字符串中连续 0 子串截取出来，先判断是否为边界子串，若是，
// 则最近停车距离就是子串自身长度，若不是，则最近停车距离是:
// 。当是 101 这种情况，即只有 1 个 0 时，最近停车距离为 1
// 当是 1001，10001 这种情况，最近停车距离为 Math.ceil(zeroLen / 2)
// 算法源码

/* 最大车间距 */
function maxDistance(str) {
  const arr = str.split("1");
  let maxLen = 0;
  arr.forEach((ele, index) => {
    if (index === 0 || index === arr.length - 1) {
      maxLen = Math.max(maxLen, ele.length);
    } else {
      if (ele.length === 1) {
        maxLen = Math.max(maxLen, 1);
      } else {
        maxLen = Math.max(maxLen, Math.ceil(ele.length / 2));
      }
    }
  });
  return maxLen;
}
