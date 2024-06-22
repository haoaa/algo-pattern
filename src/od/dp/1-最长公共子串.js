/**
动态规划状态转移方程是:
dp[i][0] = 0
dp[0][j] = 0
if(str1[i] === str2[j]) dp[i][j] = dp[i-1][j-1] + 1 
else dp[i][j] = 0
 */
function getResult(str1, str2) {
  const n = str1.length;
  const m = str2.length;
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));
  let max = 0;
  let ans = "";
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > max) {
          max = dp[i][j];
          ans = str1.slice(i - max, i);
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return ans;
}
