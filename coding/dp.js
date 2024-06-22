// function LCS(s1, s2) {
//   const n = s1.length,
//     m = s2.length;
//   if (!n || !m) {
//     return "-1";
//   }
//   const dp = new Array(n + 1).fill(0).map((_) => new Array(m + 1).fill(0));
//   const b = new Array(n + 1).fill(0).map((_) => new Array(m + 1).fill(0));
//   for (let i = 1; i <= n; i++) {
//     for (let j = 1; j <= m; j++) {
//       if (s1[i - 1] === s2[j - 1]) {
//         dp[i][j] = dp[i - 1][j - 1] + 1;
//         b[i][j] = 1;
//       } else {
//         dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
//         b[i][j] = dp[i - 1][j] > dp[i][j - 1] ? 2 : 3;
//       }
//     }
//   }
//   const t = ans(n, m, b);
//   function ans(i, j, b) {
//     let res = "";
//     if (!i || !j) {
//       return res;
//     }
//     if (b[i][j] === 1) {
//       res = ans(i - 1, j - 1, b) + s1[i - 1];
//     } else if (b[i][j] === 2) {
//       res = ans(i - 1, j, b);
//     } else if (b[i][j] === 3) {
//       res = ans(i, j - 1, b);
//     }
//     return res;
//   }
//   return t.length ? t : "-1";
// }

// function LCS(s1, s2) {
//   const n = s1.length,
//     m = s2.length;
//   let len = 0,
//     index = 0;
//   const dp = new Array(n + 1).fill(0).map((_) => new Array(m + 1).fill(0));
//   for (let i = 1; i <= n; i++) {
//     for (let j = 1; j <= m; j++) {
//       if (s1[i - 1] === s2[j - 1]) {
//         dp[i][j] = dp[i - 1][j - 1] + 1;
//         if (dp[i][j] > len) {
//           len = dp[i][j];
//           index = j - 1;
//         }
//       } else {
//         dp[i][j] = 0;
//       }
//     }
//   }
//   return s2.slice(index - len + 1, index + 1);
// }

// function uniquePaths(n, m) {
//   let res = 1;
//   for (let i = 1; i < n; i++) {
//     res = (res * (m + i - 1)) / i;
//   }
//   return res;
// }
// function uniquePaths(n, m) {
//   const dp = new Array(n).fill(0).map((_) => new Array(m).fill(0));
//   for (let i = 0; i < n; i++) {
//     dp[i][0] = 1;
//   }
//   for (let i = 0; i < m; i++) {
//     dp[0][m] = 1;
//   }
//   for (let i = 1; i < n; i++) {
//     for (let j = 1; j < m; j++) {
//       dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
//     }
//   }
//   return dp[n][m];
// }

// function minPathSum(matrix) {
//   const n = matrix.length,
//     m = matrix[0].length;
//   const dp = new Array(m).fill(0);
//   for (let i = 0; i < n; i++) {
//     for (let j = 0; j < m; j++) {
//       if (i === 0) {
//         dp[j] = (j > 0 ? dp[j - 1] : 0) + matrix[i][j];
//       } else {
//         dp[j] = (j > 0 ? Math.min(dp[j - 1], dp[j]) : dp[j]) + matrix[i][j];
//       }
//     }
//   }
//   return dp[m - 1];
// }

// minPathSum([
//   [1, 2, 3],
//   [1, 2, 3],
// ]);

function LIS(arr) {
  const n = arr.length;
  const res = [];
  for (let i = 0; i < n; i++) {
    if (!res.length || res[res.length - 1] < arr[i]) {
      res.push(arr[i]);
    } else {
      let s = 0,
        e = res.length - 1;
      while (s < e) {
        const mid = (s + e) >> 1;
        if (arr[mid] >= arr[i]) {
          e = mid;
        } else {
          s = mid + 1;
        }
      }
      res[s] = arr[i];
    }
  }
  return arr.length;
}

function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        // 存储在 result 更新前的最后一个索引的值
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      // 二分搜索，查找比 arrI 小的节点，更新 result 的值
      while (u < v) {
        c = ((u + v) / 2) | 0;

        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  // 回溯数组 p，找到最终的索引
  while (u-- > 0) {
    result[u] = v;

    v = p[v];
  }
  return result;
}
// getSequence([2,1,5,3,6,4,8,9,7])

function getLongestPalindrome(A) {
  let n = A.length;
  //边界条件判断
  if (n < 2) return n;
  //start表示最长回文串开始的位置，
  //maxLen表示最长回文串的长度
  let maxLen = 1;
  const dp = new Array(n).fill([]);
  for (let right = 1; right < n; right++) {
    for (let left = 0; left <= right; left++) {
      //如果两种字符不相同，肯定不能构成回文子串
      if (A[left] !== A[right]) continue;

      //下面是s.charAt(left)和s.charAt(right)两个
      //字符相同情况下的判断
      if (right - left <= 2) {
        //类似于"aa"和"aba"，也是回文子串
        dp[left][right] = true;
      } else {
        //类似于"a******a"，要判断他是否是回文子串，只需要
        //判断"******"是否是回文子串即可
        dp[left][right] = !!dp[left + 1][right - 1];
      }
      //如果字符串从left到right是回文子串，只需要保存最长的即可
      if (dp[left][right] && right - left + 1 > maxLen) {
        maxLen = right - left + 1;
      }
    }
  }
  //最长的回文子串
  return maxLen;
}

function editDistance(str1, str2) {
  const n = str1.length,
    m = str2.length;
  const dp = new Array(n + 1).fill(0).map((_) => new Array(m + 1).fill(0));
  dp[0].forEach((_, i) => (dp[0][i] = i));
  dp.forEach((r, i) => (r[0] = i));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }
  return dp[n][m];
}

function isMatch(str, pattern) {
  function matches(i, j) {
    if (i === 0) return false;
    if (pattern[j - 1] === ".") {
      return true;
    }
    return str[i - 1] === pattern[j - 1];
  }
  let n = str.length;
  let m = pattern.length;
  let dp = new Array(n + 1).fill(0);
  dp = dp.map((i) => new Array(m + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (pattern[j - 1] === "*") {
        dp[i][j] = dp[i][j - 2];
        if (matches(i, j - 1)) {
          dp[i][j] |= dp[i - 1][j];
        }
      } else {
        if (matches(i, j)) {
          dp[i][j] = dp[i - 1][j - 1];
        }
      }
    }
  }
  return dp[n][m];
}

function rob(nums) {
  const n = nums.length;
  const dp = new Array(n + 1).fill(0);
  res = dp[1] = nums[0];
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[n];
}
// 环
function rob(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];
  const dp = new Array(n + 1).fill(0);
  dp[1] = nums[0];
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  let res = dp[n - 1];

  dp.fill(0);
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return Math.max(res, dp[n]);
}

function maxProfit(prices) {
  const n = prices.length;
  if (n < 1) return 0;

  const dp = new Array(n).fill(0).map((_) => [0, 0]);
  dp[0] = [0, -prices[0]];
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][0]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }
  return dp[n - 1][0];
}

function maxProfit(prices) {
  const n = prices.length;
  if (n < 1) return 0;
  let min = prices[0],
    res = 0;
  for (let i = 1; i < n; i++) {
    min = Math.min(min, prices[i - 1]);
    res = Math.max(res, prices[i] - min);
  }
  return res;
}

function maxProfit(prices) {
  let n = prices.length;
  let dp = new Array(n).fill(0).map(_=>new Array(5).fill(0));
  //初始化dp为最小
  dp[0].fill(-10000);
  //第0天不持有状态
  dp[0][0] = 0;
  //第0天持有股票
  dp[0][1] = -prices[0];
  //状态转移
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0];
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
    dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
    dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]);
  }
  //选取最大值，可以只操作一次
  return Math.max(dp[n - 1][2], Math.max(0, dp[n - 1][4]));
}
