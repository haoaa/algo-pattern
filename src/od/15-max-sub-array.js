// Given an array consisting of n integers, find the contiguous subarray whose length is greater than or equal to k that has the maximum average value. And you need to output the maximum average value.

// Example 1:

// Input: [1,12,-5,-6,50,3], k = 4
// Output: 12.75
function findMaxAverage(nums, k) {
  let preSum = nums.slice(0, k).reduce((a, b) => a + b);
  let sum = preSum,
    res = preSum / k;
  for (let i = k; i < nums.length; ++i) {
    preSum += nums[i];
    sum = preSum;
    if (sum > res * (i + 1)) res = sum / (i + 1);
    for (let j = 0; j <= i - k; ++j) {
      sum -= nums[j];
      if (sum > res * (i - j)) res = sum / (i - j);
    }
  }
  return res;
}
console.time(`1`);
findMaxAverage([1, 12, -5, -6, 50, 3], (k = 4));
console.timeEnd(`1`);
function fma(nums, k) {
  let l = Math.min(...nums);
  let r = Math.max(...nums);
  let avsum = new Array(nums.length).fill(0);
  while (r - l > 1e-5) {
    let min_pre = 0,
      mid = (r + l) / 2;
    let blowav = false;
    for (let i = 0; i < nums.length; i++) {
      avsum[i] = (i > 0 ? avsum[i - 1] : 0) + nums[i] - mid;
      if (i >= k) {
        min_pre = Math.min(min_pre, avsum[i - k]);
      }
      if (i >= k - 1 && avsum[i] > min_pre) {
        blowav = true;
        break;
      }
    }
    if (blowav) {
      l = mid;
    } else {
      r = mid;
    }
  }
  return l;
}
console.time(2);
fma([1, 12, -5, -6, 50, 3], (k = 4));
console.timeEnd(2);

// 题目描述
// 从一个长度为 N 的正数数组 numbers 中找出长度至少为 L 且几何平均值最大子数组，并输
// 出其位置和大小。(K 个数的几何平均值为 K 个数的乘积的 K 次方根)
// 若有多个子数组的几何平均值均为最大值，则输出长度最小的子数组。
// 若有多个长度相同的子数组的几何平均值均为最大值，则输出最前面的子数组。
// 输入描述
// 第一行输入为 N、L
// .N 表示 numbers 的大小 (1 <=N <=100000)
// .L 表示子数组的最小长度 (1<=L<= N)
// 之后 N 行表示 numbers 中的 N 个数，每个一行 (10^-9 <= numbers[i] <= 10^9)
// 输出描述
// 输出子数组的位置(从 0 开始计数)和大小，中间用一个空格隔开
// 备注
// 用例保证除几何平均值为最大值的子数组外，其他子数组的几何平均值至少比最大值小
// 10^-10 倍
getResult([2, 2, 3], 2);
getResult([0.2, 0.1, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.2, 0.2], 2);
function getResult(numbers, k) {
  const sorted_numbers = numbers.slice().sort((a, b) => a - b);
  let l = sorted_numbers.at(0);
  let r = sorted_numbers[numbers.length - 1];
  const diff = 1e-10;
  let ans = [];
  while (r - l > diff) {
    let midAvg = (l + r) / 2;
    let belowAvg = false,
      preAvgSum = 1,
      preAvgSumMin = Infinity,
      avgSum = 1,
      minIdx = -1;
    for (let i = 0; i < numbers.length; i++) {
      avgSum *= numbers[i] / midAvg; // k+长度的均值汇总
      if (i >= k) {
        preAvgSum *= numbers[i - k] / midAvg;
        if (preAvgSum < preAvgSumMin) {
          //移除最少的才能剩下最大的
          minIdx = i - k + 1;
          preAvgSumMin = preAvgSum;
        }
      }
      //  avgSum/preAvgSumMin>= 1 移除头部判断是否低于均值
      if (i >= k - 1 && avgSum >= preAvgSumMin) {
        belowAvg = true;
        ans = [minIdx, i - minIdx + 1];
        break;
      }
    }
    if (belowAvg) {
      l = midAvg;
    } else {
      r = midAvg;
    }
  }
  console.log(ans, l);
}
