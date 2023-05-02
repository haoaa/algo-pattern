// console.log(wordOrder());
function wordOrder(str = "AABBA") {
  const n = str.length;
  const A = str.replaceAll("B", "").length;
  if (A == 0 || A == n) return 0;
  // 这里 dp 缓存的是分界线左边（含分界线位置）一共有多少个 A，这里本来使用 dp数组的，
  // 但是 str 的长度太长了，用 dp 数组会爆内存
  let dp = 0,
    ans = str.length;
  for (let i = 0; i < n; i++) {
    if (str[i] == "A") dp += 1; // i 索引位置为分界线的话
    ans = Math.min(ans, test(i, dp, A - dp));
  }
  return ans;
}
// brandIdx 表示分界线，即[0,brandIdx]闭区间内理论上都是 A，而(brandIdx，str.length)开区间内理论上都是 B
function test(brandIdx, brand_LM_A, brand_R_A) {
  // brandIdx + 1 表示[0,brandIdx]闭区间内理论上应该都多少个 A
  // brand_LM_A 表示[0,brandIdx]闭区间内实际上有多少个 A
  // brandIdx + 1 - brand_LM_A 表示[0,brandIdx]闭区间内应该做多少次修改，让该区间全是 A
  // brand_R_A 表示(brandIdx，str.length)开区间内应该做多少次修改，让该区间全是 B
  return brandIdx + 1 - brand_LM_A + brand_R_A;
}

function sorted_word(words, target) {
  const sorted_target = [...target].sort().join("");
  const ans = [];
  [...target].sort().join("");
  for (let word of words) {
    const sorted_word = [...word].sort().join("");
    if (sorted_target === sorted_word) {
      ans.push(word);
    }
  }
  if (ans.length) return ans.sort().join(" ");
  else return "null";
}

/**
 * 现在有 n 个容器服务，服务的启动可能有一定的依赖性(有些服务启动没有依赖) ，其
次服务自身启动加载会消耗一些时间。给你一个 n x n 的二维矩阵 useTime，其中
。useTime[i][i]=10 表示服务 i 自身启动加载需要消耗 10s
。useTime[i][j] = 1 表示服务 i 启动依赖服务 i 启动完成
。useTime[i][k]=0 表示服务 i 启动不依赖服务 k
其实 0<=i,j,k< n
输入描述
第一行输入服务总量 n,
之后的 n 行表示服务启动的依赖关系以及自身启动加载耗时最后输入 k 表示计算需
要等待多少时间后可以对服务 k 进行 集成测试
其中 1 <= k <=n，1<=n<=100
输出描述
最少需要等待多少时间(s)后可以对服务 k 进行集成测试
 */
// getResult(
//   [
//     [2, 0, 0, 1],
//     [0, 3, 0, 0],
//     [0, 1, 1, 0],
//     [0, 1, 1, 1],
//   ],
//   1,
//   4
// );
// getResult(
//   [
//     [5, 0, 0],
//     [1, 5, 0],
//     [0, 1, 5],
//   ],
//   3,
//   3
// );
function getResult(matrix, k, n) {
  // next 用于保存每个点的后继点
  const next = {};
  // pre 用于保存每个点的前驱点
  const pre = {};
  // inDegree 用于统计每个点的入度
  const inDegree = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i == j) continue;
      if (!next[j]) next[j] = [];
      if (!pre[i]) pre[i] = [];
      // matrix[i][j] = 1 表示服务 i 启动依赖服务 j 启动完成，即 j 的后继点是 i；i 的前驱点是 j
      if (matrix[i][j] == 1) {
        next[j].push(i);
        pre[i].push(j);
        inDegree[i]++;
      }
    }
  }
  // preK 用于记录 k 点的所有前驱点，包括直接前驱和间接前驱
  const preK = new Set();
  const tmp = [...pre[k - 1]];
  while (tmp.length > 0) {
    const s = tmp.shift();
    preK.add(s);
    tmp.push(...pre[s]);
  }
  // 可以同时启动的服务，即同时入度为 0 的服务，我们需要将这些同时刻入度为 0的服务统计在一起，方便统计出最大时间作为这一层服务启动的最终时间
  const zeroDegree = [];
  for (let i = 0; i < n; i++) {
    // 同时，我们只添加是 k 服务前驱的入度为 0 的服务，即在 preK 中存在的
    if (inDegree[i] == 0 && preK.has(i)) zeroDegree.push(i);
  }
  // queue 用于控制入度 0 服务的启动
  const queue = [];
  if (zeroDegree.length > 0) queue.push(zeroDegree);
  // ans 记录题解，ans 必然包含自身启动时间
  let ans = matrix[k - 1][k - 1];
  while (queue.length > 0) {
    // 当前所有入度为 0 的点的集合
    const zd_cur = queue.shift();
    // 下一轮所有入度为 0 的点的集合
    const zd_next = [];
    // zd_cur 这些服务中耗时最长的将作为本轮服务启动最终时间
    let max = 0;
    for (let i of zd_cur) {
      max = Math.max(max, matrix[i][i]);
      for (let j of next[i]) {
        // 下一轮同样只统计，k 的前驱服务，且入度为 0 的服务
        if (--inDegree[j] == 0 && preK.has(j)) {
          zd_next.push(j);
        }
      }
    }
    // 计入本轮服务启动耗时
    ans += max;
    if (zd_next.length > 0) queue.push(zd_next);
  }
  return ans;
}

/**
 某农场主管理了一大片果园，fields[i]表示不同果林的面积，单位:m^2，现在要为所有
的果林施肥且必须在 n 天之内完成，否则影响收成。小布是果林的工作人员，他每次选择一
片果林进行施肥，且一片果林施肥完后当天不再进行施肥作业。
假设施肥机的能效为 k，单位: m^2/day，请问至少租赁能效 k 为多少的施肥机才能确
保不影响收成? 如果无法完成施肥任务，则返回-1。
输入描述
第一行输入为 m 和 n，m 表示 fields 中的元素个数，n 表示施肥任务必须在 n 天内 (含
n 天)完成
第二行输入为 fields，fields[i]表示果林 i 的面积，单位: m^2
输出描述
对于每组数据，输出最小施肥机的能效 k ，无多余空格.
 */
// console.log(mostEffective([5, 7, 9, 15, 10], 7));
// console.log(mostEffective([5, 7, 9, 15, 10], 147));

function mostEffective(areas, days) {
  if (areas.length > days) {
    return -1;
  }
  areas.sort((a, b) => a - b);
  let l = 1,
    r = areas[areas.length - 1];
  while (l < r) {
    let m = (l + r) >> 1;
    let eff = areas.reduce((p, area) => {
      let val = area > m ? Math.ceil(area / m) : 1;
      return p + val;
    }, 0);
    if (eff > days) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return l;
}

/**
 给你一个整数 M 和数组 N，N 中的元素为连续整数，要求根据 N 中的元素组装成新的
数组 R，组装规则:
1.R 中元素总和加起来等于 M
2.R 中的元素可以从 N 中重复选取
3.R 中的元素最多只能有 1 个不在 N 中，且比 N 中的数字都要小 (不能为负数)
输入描述
第一行输入是连续数组 N，采用空格分隔第二行输入数字 M
输出描述
输出的是组装办法数量，int 类型
备注
1≤M≤30
1≤ N.length ≤ 1000
 */

// console.log(rearrangeArr([2,3], 5));
function rearrangeArr(arr, m) {
  arr = arr.filter((val) => val <= m); // 只过滤出比 m 小的连续整数
  const min = arr[0];
  return dfs(arr, 0, 0, min, m, 0);
}
function dfs(arr, index, sum, min, m, count) {
  if (sum > m) {
    return count;
  }
  if (sum === m || (m - sum < min && m - sum > 0)) {
    return count + 1;
  }
  for (let i = index; i < arr.length; i++) {
    count = dfs(arr, i, sum + arr[i], min, m, count);
  }
  return count;
}

/**
 工位由序列 F1,F2...Fn 组成，Fi 值为 0、1 或 2。其中 0 代表空置，1 代表有人，2 代表障碍物。
1、某一空位的友好度为左右连续老员工数之和，
2、为方便新员工学习求助，优先安排友好度高的空位给出工位序列，求所有空位中友好度的最大值.
输入描述
第一行为工位序列: F1，F2...Fn 组成
1<=n<=10000，
输出描述
所有空位中友好度的最大值。如果没有空位，返回 0.
 */
// bestSeat([0,1,0])
bestSeat([1, 1, 0, 1, 2, 1, 0].map(String));
function bestSeat(arr) {
  const ep = {};
  let friendShip = 0;
  // 从左向右遍历，记录每个空位左边的友好度
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case "0":
        ep[i] = friendShip;
        friendShip = 0;
        break;
      case "1":
        friendShip++;
        break;
      case "2":
        friendShip = 0;
        break;
    }
  }
  friendShip = 0;
  let ans = 0;
  // 从右向左遍历，累加每个空位右边的友好度，这样就得到了每个空位的友好度，取最大值即可
  for (let i = arr.length - 1; i >= 0; i--) {
    switch (arr[i]) {
      case "0":
        ans = Math.max(ans, ep[i] + friendShip);
        friendShip = 0;
        break;
      case "1":
        friendShip++;
        break;
      case "2":
        friendShip = 0;
        break;
    }
  }
  return ans;
}

/**
 * 每个站点开站会由一系列部署任务项构成，每个任务项部署完成时间都是固定和相等的，设为 1。部署任务项之间可能存在依赖，假如任务 2 依赖任务 1，那么等任务 1 部署完，任务2 才能部署。任务有多个依赖任务则需要等所有依赖任务都部署完该任务才能部署。没有依赖的任务可以并行部署。给定一个站点部署任务项和它们之间的依赖关系，请给出一个站点的最短开站时间。
输入描述
第 一 行 是 任 务 数 taskNum, 第 二 行 是 任 务 的 依 赖 关 系 数 relationsNum 接 下 来
relationsNum 行，每行包含两 id，描述一个依赖关系，格式为: IDi IDj，表示部署任务 i 部署完成了，部署任务 j 才能部署，IDi 和 IDi 值的范围为: [0,taskNum)
注:输入保证部署任务之间的依赖不会存在环
输出描述
1个整数，表示一个站点的最短开站时间。
备注
。1 < taskNum <= 100
。i <= relationsNum <= 5000

本题是要我们求解最短开战时间，这里最短开战时间其实就是剥离入度 0 点的次数
 */

console.log(
  buildSiteTime(
    [
      [0, 4],
      [1, 2],
      [1, 3],
      [2, 3],
      [2, 4],
    ],
    5
  )
);
function buildSiteTime(relations, taskNum) {
  const next = {};
  const inDegree = new Array(taskNum).fill(0);
  for (let relation of relations) {
    const [a, b] = relation;
    next[a] ? next[a].push(b) : (next[a] = [b]);
    inDegree[b]++;
  }
  const queue = [];
  for (let i = 0; i < taskNum; i++) {
    if (inDegree[i] === 0) {
      queue.push([i, 1]);
    }
  }
  let t = 0;
  while (queue.length) {
    const [task, time] = queue.shift(); // 注意这里为了维持 t，一定要使用队列先进先出,出队代表删除某顶点;
    next[task]?.forEach((nxt) => {
      // 该顶点被删除，则其后继点的入度值--，若--后入度为 0，则将成为新的出队点;
      if (--inDegree[nxt] === 0) {
        t = time + 1; // 此时建站时间+1
        queue.push([nxt, t]);
      }
    });
  }
  return t;
}

/**
 * 某电力公司希望在这里建设多个
光伏电站，生产清洁能源对每平方公里的土地进行了发电评估，其中不能建设的区域发电量
为 0kw，可以发电的区域根据光照，地形等给出了每平方公里年发电量 x 千瓦。我们希望能
够找到其中集中的矩形区域建设电站，能够获得良好的收益
输入描述
第一行输入为调研的地区长，宽，以及准备建设的电站[长宽相等，为正方形] 的边长
最低要求的发电量之后每行为调研区域每平方公里的发电量
输出描述
输出为这样的区域有多少个
 */
/**
 * @param {*} r 调研区域的长
 * @param {*} c 调研区域的宽
 * @param {*} s 正方形电站的边长
 * @param {*} min 正方形电站的最低发电量
 * @param {*} matrix 调研区域每单位面积的发电量矩阵
 */
// getResult(2, 5, 2, 6, [
//   [1, 3, 4, 5, 8],
//   [2, 3, 6, 7, 1],
// ]);
function getResult(r, c, s, min, matrix) {
  // 列压缩
  const zip_col_dps = [];
  // 列压缩后的列数
  const zip_c = c - s + 1;
  for (let row of matrix) {
    const zip_col_dp = new Array(zip_c).fill(0);
    for (let i = 0; i < s; i++) {
      zip_col_dp[0] += row[i];
    }
    for (let i = 1; i < zip_c; i++) {
      zip_col_dp[i] = zip_col_dp[i - 1] - row[i - 1] + row[i + s - 1];
    }
    zip_col_dps.push(zip_col_dp);
  }
  matrix = zip_col_dps;
  // 行压缩之后的行数
  const zip_r = r - s + 1;
  // 题解
  let ans = 0;
  for (let j = 0; j < zip_c; j++) {
    const zip_row_dp = new Array(zip_c).fill(0);
    for (let i = 0; i < s; i++) {
      zip_row_dp[0] += matrix[i][j];
    }
    if (zip_row_dp[0] >= min) ans++;
    for (let i = 1; i < zip_r; i++) {
      zip_row_dp[i] =
        zip_row_dp[i - 1] - matrix[i - 1][j] + matrix[i + s - 1][j];
      if (zip_row_dp[i] >= min) ans++;
    }
  }
  return ans;
}
// 二维矩阵前缀和
function getResult(r, c, s, min, matrix) {
  const preSum = new Array(r + 1).fill(0).map(() => new Array(c + 1).fill(0));
  for (let i = 1; i <= r; i++) {
    for (let j = 1; j <= c; j++) {
      preSum[i][j] =
        preSum[i - 1][j] +
        preSum[i][j - 1] -
        preSum[i - 1][j - 1] +
        matrix[i - 1][j - 1];
    }
  }
  let ans = 0;
  for (let i = s; i <= r; i++) {
    for (let j = s; j <= c; j++) {
      const square =
        preSum[i][j] -
        (preSum[i - s][j] + preSum[i][j - s]) +
        preSum[i - s][j - s];
      if (square >= min) ans++;
    }
  }
  return ans;
}
