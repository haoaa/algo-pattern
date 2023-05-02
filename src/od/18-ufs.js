/**
 * Linux 操作系统有多个发行版，distrowatch.com 提供了各个发行版的资料。这些发行版互相
存在关联。
发行版集是一个或多个相关存在关联的操作系统发行版，集合内不包含没有关联的发行版
给你一个 n*n 的矩阵 isConnected，其中 isComnected[i][j] = 1 表示第 i 发行版和第 j 个发行
版直接关联，而 isConnected[i][j] =0 表者不直接相连。
返回最大的发行版集中发行版的数量
 */
const { UnionFindSet } = require("./utils");
// console.log(
//   UFS(
//     [
//       [1, 1, 0, 0],
//       [1, 1, 1, 0],
//       [0, 1, 1, 0],
//       [0, 0, 0, 1],
//     ],
//     4
//   )
// );
function UFS(matrix, n) {
  const ufs = new UnionFindSet(n);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 这里 j 从 i+1 开始，是因为矩阵是对称的
      if (matrix[i][j] === 1) {
        ufs.union(i, j);
      }
    }
  }
  // 连通点个数;
  const connected = {};
  for (let i = 0; i < n; i++) {
    const fa = ufs.find(ufs.fa[i]);
    connected[fa] ? connected[fa]++ : (connected[fa] = 1);
  }
  // 返回最大节点数
  return Math.max.apply(null, Object.values(connected));
}

/** 
 * 某网上商场举办优惠活动，发布了满减、打折、无门槛 3 种优惠券，分别为:
.每满 100 元优惠 10 元，无使用数限制，如 100~199 元可以使用 1 张减 10 元，200~299 可
使用 2 张减 20 元，以此类推:
。92 折券，1 次限使用 1 张，如 100 元，则优惠后为 92 元;
。无门槛 5 元优惠券，无使用数限制，直接减 5 元。
即: 满 100，最多使用 1 张减 10 元的券，满 200 最多使用 2 张减 10 元的券，满 300 可以使
用 3 张减 10 元的券.
*/

// getResult([100, 200, 400], 3, 2, 5);

/**
 *
 * @param {*} prices 几个人打折之前的商品总价
 * @param {*} m 满减券数量
 * @param {*} n 打折券数量
 * @param {*} k 无门槛券数量
 */
function getResult(prices, m, n, k) {
  for (let price of prices) {
    const ans = [];
    const resM = M(price, m); // 先满减
    const resMN_N = N(resM[0], n); // 满减后打折
    ans.push([resMN_N[0], m + n - (resM[1] + resMN_N[1])]);
    const resMK_K = K(resM[0], k); // 满减后无门槛
    ans.push([resMK_K[0], m + k - (resM[1] + resMK_K[1])]);

    const resN = N(price, n); // 先打折
    const resNM_M = M(resN[0], m); // 打折后满减
    ans.push([resNM_M[0], n + m - (resN[1] + resNM_M[1])]);
    const resNK_K = K(resN[0], k); // 打折后无门槛
    ans.push([resNK_K[0], n + k - (resN[1] + resNK_K[1])]);
    ans.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])); // 对 ans 进行排序，排序规则是：优先按剩余总价升序，如果剩余总价相同，则再按“使用掉的券数量”升序
    console.log(ans[0].join(" "));
  }
}
function M(price, m) {
  const maxCount = price / 100; // 满 100 最多用 1 张满减券，满 200 最多用 2 张满减券....，
  const count = Math.min(m, maxCount); // 实际可使用的满减券数量
  price -= count * 10;
  m -= count;
  return [price, m];
}
function N(price, n) {
  if (n >= 1) {
    price = Math.floor(price * 0.92);
  }
  return [price, n - 1];
}
function K(price, k) {
  while (price > 0 && k > 0) {
    price -= 5;
    price = Math.max(price, 0); // 无门槛券过多会导致优惠后总价小于 0，此时我们应该避免
    k--;
  }
  return [price, k];
}

function dam(arr = [1, 8, 6, 2, 5, 4, 8, 3, 7]) {
  let ans = [0, 0, 0];
  let l = 0,
    r = arr.length - 1;
  while (l < r) {
    let low = Math.min(arr[l], arr[r]);
    let sum = 0;
    for (let i = l; i <= r; i++) {
      if (arr[i] < low) {
        sum += low - arr[i];
      }
    }
    if (sum >= ans[2]) {
      ans = [l, r, sum];
    }
    if (arr[l] < arr[r]) {
      l++;
    } else if (arr[r] < arr[l]) {
      r--;
    } else if (arr[l] <= arr[l + 1]) {
      l++;
    } else {
      r--;
    }
  }
  console.log(ans);
}

// dam()

/**
 * 
 * 给一个数组，数组里面哦都是代表非负整数的字符串，将数组里所有的数值排列组合 Q
拼接起来组成一个数字，输出拼接成的最小的数字。
输入描述
个数组，数组不为空，数组里面都是代表非负整数的字符串，可以是 0 开头，例
如:["13","045","09","56”]
数组的大小范围: [1,50]
数组中每个元素的长度范围: [1,30]
输出描述
以字符串的格式输出一个数字
如果最终结果是多位数字，要优先选择输出不是“0”开头的最小数字
如果拼接出来的数字都是“0”开头，则选取值最小的，并且把开头部分的“0”都去掉
再输出
如果是单位数“0”，可以直接输出“0”
 */

// console.log(minNun(["13","045","09","56"]));
// console.log(minNun(["08",'10','2']));

function minNun(strs) {
  strs.sort((a, b) => {
    const s1 = a + b;
    const s2 = b + a;
    return s1 == s2 ? 0 : s1 > s2 ? 1 : -1;
  });
  if (strs[0][0] == "0") {
    for (let i = 1; i < strs.length; i++) {
      if (strs[i][0] != "0") {
        strs[0] = strs[i] + strs[0];
        strs[i] = "";
        break;
      }
    }
  }
  return strs.join("").replace(/^0+/, "");
}

/**
 * 输入单行英文句子，里面包含英文字母，空格以及,.?三种标点符号，请将句子内每个单
词进行倒序，并输出倒序后的语句。
输入描述
输入字符串 S，S 的长度 1<= N<= 100
输出描述
输出倒序后的字符串
 */
// console.log(wordReverse('yM eman si boB.'));
function wordReverse(str) {
  const reg = /[\,\.\?\s]/;
  const idxs = [-1];
  for (let i = 0; i < str.length; i++) {
    if (reg.test(str[i])) {
      idxs.push(i);
    }
  }
  idxs.push(str.length);
  const arr = [...str];
  idxs.reduce((p, c) => {
    let l = p + 1;
    let r = c - 1;
    while (l < r) {
      let tmp = arr[l];
      arr[l] = arr[r];
      arr[r] = tmp;
      l++;
      r--;
    }
    return c;
  });
  return arr.join("");
}

function 硬件产品销售方案(amount, prices) {
  const res = [];
  dfs(amount, prices, 0, 0, [], res);
  return JSON.stringify(res);
}
function dfs(total, arr, index, sum, path, res) {
  if (sum >= total) {
    if (sum === total) res.push([...path]);
    return;
  }
  for (let i = index; i < arr.length; i++) {
    path.push(arr[i]);
    dfs(total, arr, i, sum + arr[i], path, res);
    path.pop();
  }
}
