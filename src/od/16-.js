/**
 * 一个快递公司希望在一条街道建立新的服务中心。公司统计了该街道中所有区域在地图上的
位置，并希望能够以此为依据为新的服务中心选址:使服务中心到所有区域的距离的总和最
小
给你一个数组 positions，其中 positions[i] = [left, right] 表示第 i 区域在街道上的位置，其中
left 代表区域的左侧的起点，right 代表区域的右侧终点，假设服务中心的位置为 location:
.如果第 i 个区域的右侧终点 right 满足 right< location，则第 i 个区域到服务中心的距离为
location - right;
.如果第 i 个区域的左侧起点 left 满足 left> location，则第 i 个区域到服务中心的距离为 left -
location;
.如果第 i 个区域的两侧 left，right 满足 left <= location <= right，则第 i 个区域到服务中心的
距离为 0
选择最佳的服务中心位置为 location，请返回最佳的服务中心位置到所有区域的距离总和的
最小值.
输入描述
第一行，一个整数 N 表示区域个数
后面 N 行，每行两个整数，表示区域的左右起点终点
输出描述
运行结果输出一个整数，表示服务中心位置到所有区域的距离总和的最小值

 */
getResult(["1 2", "3 4", "10 20"].map((line) => line.split(" ").map(Number)));
function getResult(positions) {
  const tmp = positions.flat(2).sort((a, b) => a - b);
  let min = tmp.at(0);
  let max = tmp.at(-1);
  let ans = Infinity;

  // while (max - min > 1) {
  //   let mid = (max + min) >> 1;
  //   let dis = 0;

  //   for (let position of positions) {
  //     const [l, r] = position;
  //     if (r < mid) dis += mid - r;
  //     else if (mid < l) dis += l - mid;
  //   }
  //   if (dis > mid) {
  //     r= mid
  //   }else {
  //     l=mid
  //   }
  //   ans = Math.min(ans, dis);
  // }
  for (let i = min; i <= max; i++) {
    let dis = 0;
    for (let position of positions) {
      const [l, r] = position;
      if (r < i) dis += i - r;
      else if (i < l) dis += l - i;
    }
    ans = Math.min(ans, dis);
  }
  return ans;
}

/**
 * 有 N 条线段，长度分别为 a[1]-a[n]。
现要求你计算这 N 条线段最多可以组合成几个直角三角形
每条线段只能使用一次，每个三角形包含三条线段。
输入描述
第一行输入一个正整数 T (1< =T< = 100) ，表示有组测试数据对于每组测试数据，接下来有 T
行，
每行第一个正整数 N，表示线段个数 (3< = N< = 20)，接着是 N 个正整数，表示每条线段长
度，(0<a[i]<100)。
输出描述
对于每组测试数据输出一行，每行包括一个整数，表示最多能组合的直角三角形个数
用例
 */
getResult([7, 3, 4, 5, 6, 5, 12, 13]);
function getResult(arr) {
  // 对每组测试线段升序排序
  arr.sort((a, b) => a - b);
  const res = [];
  dfs(arr, 0, [], res);
  const count = new Array(100).fill(0);
  for (let i of arr) {
    count[i]++;
  }
  const ans = [];
  canCombine(res, 0, count, 0, ans);
  console.log(Math.max.apply(null, ans));
}
// 全组合求解，即 n 个数中选 3 个
function dfs(arr, index, path, res) {
  if (path.length === 3) {
    if (isRightTriangle(path)) res.push([...path]);
    return;
  }
  for (let i = index; i < arr.length; i++) {
    path.push(arr[i]);
    dfs(arr, i + 1, path, res);
    path.pop();
  }
}
// 判断三条边是否可以组成直角三角形
function isRightTriangle(path) {
  const [x, y, z] = path;
  return x * x + y * y === z * z;
}
// 求解当前直角三角形中不超用线段的最多组合数
function canCombine(ts, index, count, num, ans) {
  if (index >= ts.length) {
    ans.push(num);
    return;
  }
  for (let i = index; i < ts.length; i++) {
    const [a, b, c] = ts[i];
    if (count[a] > 0 && count[b] > 0 && count[c] > 0) {
      count[a]--;
      count[b]--;
      count[c]--;
      num++;
      canCombine(ts, i + 1, count, num, ans);
      num--;
      count[a]++;
      count[b]++;
      count[c]++;
    }
  }
  ans.push(num);
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const lines = [];
rl.on("line", (line) => {
  lines.push(line);
  if (lines.length === 4) {
    const n = lines[0] - 0;
    const goods = lines[1].split(" ").map(Number);
    const types = lines[2].split(" ").map(Number);
    const k = lines[3] - 0;
    console.log(getResult(n, goods, types, k));
    lines.length = 0;
  }
});
function getResult(n, goods, types, k) {
  const drys = new PriorityQueue((a, b) => b[0] - a[0]);
  const wets = new PriorityQueue((a, b) => b[0] - a[0]);
  let isDry = true;
  let tmp = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    if (types[i] == 0) {
      if (isDry) {
        tmp.push(goods[i]);
        sum += goods[i];
      } else {
        tmp.unshift(sum);
        wets.offer(tmp);
        tmp = [];
        sum = 0;
        tmp.push(goods[i]);
        sum += goods[i];
        isDry = true;
      }
    } else {
      if (isDry) {
        tmp.unshift(sum);
        drys.offer(tmp);
        tmp = [];
        sum = 0;
        tmp.push(goods[i]);
        sum += goods[i];
        isDry = false;
      } else {
        tmp.push(goods[i]);
        sum += goods[i];
      }
    }
  }
  tmp.unshift(sum);
  if (isDry) {
    drys.offer(tmp);
  } else {
    wets.offer(tmp);
  }
  return Math.max(divide(drys, k), divide(wets, k));
}
function divide(goods, k) {
  while (goods.size() < k) {
    const top = goods.poll();
    if (!top) break;
    const dry_sum = top.shift();
    if (top.length <= 1) {
      return dry_sum;
    }
    let splitIdx = 0;
    let splitHalf = 0;
    let half = 0;
    let min = dry_sum;
    for (let i = 1; i < top.length; i++) {
      const val = top[i - 1];
      half += val;
      const max = Math.max(half, dry_sum - half);
      if (max < min) {
        min = max;
        splitIdx = i;
        splitHalf = half;
      }
    }
    const halfDry = [splitHalf, ...top.slice(0, splitIdx)];
    goods.offer(halfDry);
    const otherhalfDry = [dry_sum - splitHalf, ...top.slice(splitIdx)];
    goods.offer(otherhalfDry);
  }
  return goods.peek()[0];
}
// 基于堆实现优先队列
class PriorityQueue {
  constructor(cpr) {
    this.queue = [];
    this.cpr = cpr;
  }
  swap(a, b) {
    const tmp = this.queue[a];
    this.queue[a] = this.queue[b];
    this.queue[b] = tmp;
  }
  // 上浮
  swim() {
    let c = this.queue.length - 1;
    while (c >= 1) {
      const f = Math.floor((c - 1) / 2);
      if (this.cpr(this.queue[c], this.queue[f]) < 0) {
        this.swap(c, f);
        c = f;
      } else {
        break;
      }
    }
  }
  // 入队
  offer(val) {
    this.queue.push(val);
    this.swim();
  }
  // 下沉
  sink() {
    let f = 0;
    while (true) {
      let c1 = 2 * f + 1;
      let c2 = c1 + 1;
      let c;
      let val1 = this.queue[c1];
      let val2 = this.queue[c2];
      if (val1 && val2) {
        c = this.cpr(val1, val2) < 0 ? c1 : c2;
      } else if (val1 && !val2) {
        c = c1;
      } else if (!val1 && val2) {
        c = c2;
      } else {
        break;
      }
      if (this.cpr(this.queue[c], this.queue[f]) < 0) {
        this.swap(c, f);
        f = c;
      } else {
        break;
      }
    }
  }
  // 出队
  poll() {
    this.swap(0, this.queue.length - 1);
    const res = this.queue.pop();
    this.sink();
    return res;
  }
  peek() {
    return this.queue[0];
  }
  size() {
    return this.queue.length;
  }
}
