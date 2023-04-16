/**
 * 给你一个以字符串表示的非负整数 num 和一个整数 k ，
 * 移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。
示例 1 ：

输入：num = "1432219", k = 3
输出："1219"
解释：移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219 。

*/
function removeKdigits(num, k) {
  const stk = [];
  for (const digit of num) {
      while (stk.length > 0 && stk[stk.length - 1] > digit && k) {
          stk.pop();
          k -= 1;
      }
      stk.push(digit);
  }

  for (; k > 0; --k) {
      stk.pop();
  }

  let ans = "";
  let isLeadingZero = true;
  for (const digit of stk) {
      if (isLeadingZero && digit === '0') {
          continue;
      }
      isLeadingZero = false;
      ans += digit;
  }
  return ans === "" ? "0" : ans;
};

console.log(removeKdigits([2,6,1,5,3,7,1],4));