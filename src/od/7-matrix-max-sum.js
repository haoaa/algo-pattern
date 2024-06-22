console.log(
  maxSubMatrixSum2([
    [-3, 5, -1, 5],
    [2, 4, -2, 4],
    [-1, 3, -1, 3],
  ])
);
function maxSubMatrixSum2(matrix) {
  let result = 0,
    m = matrix.length,
    n = matrix[0].length;
  for (let i = 0; i < m; i++) {
    const tmp = new Array(n).fill(0);
    for (let j = i; j < m; j++) {
      let pre = 0;
      for (let k = 0; k < n; k++) {
        tmp[k] += matrix[j][k];
        // 最大子数组和的转移格式dp[i] = max(dp[i-1], 0) + nums[i]
        let cur = Math.max(pre, 0) + tmp[k];
        result = Math.max(result, cur);
        pre = cur;
      }
    }
  }
  return result;
}
function maxSubMatrixSum(matrix) {
  let dp = [];
  for (let i = 0; i < matrix.length; i++) {
    dp.push(maxSubArraySum(matrix[i]));
    for (let j = i + 1; j < matrix.length; j++) {
      dp.push(maxSubArraySum(matrixZip(matrix.slice(i, j + 1))));
    }
  }
  return dp.sort((a, b) => b - a)[0];
}

function maxSubArraySum(nums) {
  let pre = nums[0];
  let result = pre;
  for (let i = 1; i < nums.length; i++) {
    let cur = Math.max(pre, 0) + nums[i];
    result = Math.max(result, cur);
    pre = cur;
  }
  return result;
}
function matrixZip(matrix) {
  let cols = matrix[0].length;
  let rows = matrix.length;
  let zip = new Array(cols).fill(0);
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      zip[c] += matrix[r][c];
    }
  }
  return zip;
}
