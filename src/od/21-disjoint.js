/**
 给定一个数组，我们称其中连续的元素为连续 子序列，称这些元素的和为连续子序列的和，
数组中可能存在几组连续子序列，组内的连续子序列互不相交且有相同的和。
求一组连续子序列，组内子序列的数目最多
输出这个数目。
 */
function getDisjointed(arr, n) {
  const range = {};
  for (let i = 0; i < arr.length; i++) {
    let presum = arr[i];
    range[presum] ? range[presum].push([i, i]) : (range[presum] = [[i, i]]);
    for (let j = i + 1; j < n; j++) {
      presum += arr[j];
      range[presum] ? range[presum].push([i, j]) : (range[presum] = [[i, j]]);
    }
  }
  let max = 0;
  for (let ran in range) {
    max = Math.max(disjoint(range[ran]), max);
  }
  console.log(max);
  return max;
  function disjoint(ranges) {
    let count = 1;
    ranges.sort((a, b) => a[1] - b[1]);
    let e1 = ranges[0][1];
    for (let i = 1; i < ranges.length; i++) {
      if (ranges[i][0] > e1) {
        count++;
        e1 = ranges[i][1];
      }
    }
    return count;
  }
}
// getDisjointed([8, 8, 9, 1, 9, 6, 3, 9, 1, 0], 10);

/**
 * 演出都是同时进行，
一个人只能同时观看一场演出，且不能迟到早退，由于演出分布在不同的演出场地，所以连
续观看的演出最少有 15 分钟的时间间隔,现给出演出时间表，请帮小明计算他最多能观看几场演出。
输入描述
第一行为一个数 N，表示演出场数，1<=N<=1000，接下来 N 行，每行有被空格分割的两个整数.
第一个整数 T 表示演出的开始时间，第二个整数 L 表示演出的持续时间，T 和 L 的单位为分
钟，0<=T<=1440，0<L<=100
输出描述
输出最多能观看的演出场数
 */
// getMaxShow([
//   [720, 120],
//   [840, 120],
// ]);
function getMaxShow(matrix) {
  matrix = matrix
    .map(([start, spend]) => [start, start + spend])
    .sort((a, b) => (b[1] === a[1] ? b[0] - a[0] : b[1] - a[1]));
  let [s1] = matrix[0];
  let ans = 1;
  for (let i = 1; i < matrix.length; i++) {
    const [s2, e2] = matrix[i];
    if (s1 - e2 > 15) {
      ans++;
      s1 = s2;
    }
  }
  return ans;
}

/**
 * 存在一个 mxn 的二维数组，其成员取值范围为 0 或 1
其中值为 1 的成员具备扩散性，每经过 1S，将上下左右值为 0 的成员同化为 1。
二维数组的成员初始值都为 0，将第[i,j]和[k,l]两个个位置上元素修改成 1 后，求矩阵的所有
元素变为 1 需要多长时间
 */
// console.log(getSpreadTime(4, 4, 0, 0, 3, 3));
function getSpreadTime(m, n, i, j, k, l) {
  const mx = new Array(m).fill(0).map((_) => new Array(n).fill(0));
  mx[i][j] = 1;
  mx[k][l] = 1;
  let queue = [
    [i, j],
    [k, l],
  ];
  let day = 0;
  let count = m * n - 2;
  const offsets = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  while (queue.length && count > 0) {
    let [i, j] = queue.shift();
    day = mx[i][j] + 1;
    for (const [oi, oj] of offsets) {
      const newi = i + oi;
      const newJ = j + oj;
      if (
        newi >= 0 &&
        newi < m &&
        newJ >= 0 &&
        newJ < n &&
        mx[newi][newJ] === 0
      ) {
        mx[newi][newJ] = day;
        count--;
        queue.push([newi, newJ]);
      }
    }
  }
  return day - 1;
}
/**
 * 根据给定的二又树结构描述字符串，输出该二叉树按照 中序遍历结果字符串。中序遍历顺
序为:左子树，根结点，右子树。
输入描述
由大小写字母、左右大括号、逗号组成的字符串:字母代表一个节点值，左右括号内包含该
节点的子节点
左右子节点使用逗号分隔，逗号前为空则表示左子节点为空，没有逗号则表示右子节点为空。
又树节点数最大不超过 100。
注:输入字符串格式是正确的，无需考虑格式错误的情况。
输出描述
输出一个字符串为 二又树中序遍历各节点值的拼接结果
 */
console.log(getMidOrder(`a{b{d,e{g,h{,i}}},c{f}}`));
function getMidOrder(str) {
  const idxs = [];
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c == "}") {
      const idx = idxs.pop(); // 左括号索引
      const root = stack[idx - 1]; // 根
      const [left, right] = stack.splice(idx).slice(1).join("").split(",");
      stack.pop();
      stack.push((left ?? "") + root + (right ?? ""));
      continue;
    }
    if (c == "{") {
      idxs.push(stack.length); //!
    }
    stack.push(c);
  }
  return stack[0];
}

/**
 如果出现以下两种情况，则认为打卡异常:
1.实际设备号与注册设备号不一样
2.或者，同一个员工的两个打卡记录的时间小于 60 分钟并且打卡距离超过 5km.
给定打卡记录的字符串数组 clockReords(每个打卡记录组成为:工号:时间(分钟);打卡距离
(km);实际设备号;注册设备号)，返回其中异常的打卡记录(按输入顺序输出)。
输入描述
第一行输入为 N，表示打卡记录数;
之后的 N 行为打卡记录，每一行为一条打卡记录
输出描述
输出异常的打卡记录
 */

// console.log(
//   clockInException([
//     [100000, 10, 1, "ABCD", "ABCD"],
//     [100000, 50, 10, "ABCD", "ABCD"],
//   ])
// );
// console.log(
//   clockInException([
//     [100000, 10, 1, "ABCD", "ABCD"],
//     [100000, 80, 10, "ABCE", "ABCD"],
//   ])
// );
function clockInException(clockRecords) {
  const employees = {};
  const ans = new Set();
  for (let i = 0; i < clockRecords.length; i++) {
    const clockRecord = [...clockRecords[i], i]; // 由于异常打卡记录需要按输入顺序输出，因此这里追加一个输入索引到打卡记录中;
    const [id, time, dis, act_device, reg_device] = clockRecord;
    // 实际设备号与注册设备号不一样,则认为打卡异常
    if (act_device != reg_device) {
      ans.add(i);
    } else {
      // 如果实际设备号和注册设备号一样，则统计到该员工名下
      employees[id]
        ? employees[id].push(clockRecord)
        : (employees[id] = [clockRecord]);
    }
  }
  for (let id in employees) {
    // 某 id 员工的所有打卡记录
    const records = employees[id];
    const n = records.length;
    // 将该员工打卡记录按照打卡时间升序
    records.sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < n; i++) {
      const time1 = records[i][1];
      const dis1 = records[i][2];
      for (let j = i + 1; j < n; j++) {
        const time2 = records[j][1];
        const dis2 = records[j][2];
        // 如果两次打卡时间超过 60 分治，则不计入异常，由于已按打卡时间升序，因此后面的都不用检查了;
        if (time2 - time1 >= 60) break;
        else {
          // 如果两次打开时间小于 60MIN，且打卡距离超过 5KM，则这两次打卡记录算作异常;
          if (Math.abs(dis2 - dis1) > 5) {
            // 如果打卡记录已经加入异常列表 ans，则无需再次加入，否则需要加入
            if (!ans.has(records[i][5])) {
              ans.add(records[i][5]);
            }
            if (!ans.has(records[j][5])) {
              ans.add(records[j][5]);
            }
          }
        }
      }
    }
  }
  // 如果没有异常打卡记录，则返回 null
  if (!ans.size) return "null";
  return [...ans]
    .sort((a, b) => a - b)
    .map((i) => clockRecords[i])
    .join(";");
}

/**
 题目描述
有一棵二叉树，每个节点由一个大写字母标识(最多 26 个节点)
现有两组字母，分别表示后序遍历(左孩子->右孩子->父节点)和中遍历（左孩子->父节点->
右孩子)的结果，请你输出前序遍历的结果。
输入描述
每个输入文件一行，第一个字符串表示后序遍历结果，第二个字符串表示中序遍历结果。(每串只包含大写字母)中间用单空格分隔。
输出描述
输出仅一行，表示层序遍历的结果，结尾换行。
 */
console.log(getResult("CBEFDA", "CBAEDF"));
function getResult(post, mid) {
  // 广度优先搜索的执行队列，先加入左子树，再加入右子树
  const queue = [];
  // 层序遍历出来的元素存放在 ans 中
  const ans = [];
}

function getResult(post, mid) {
  // 广度优先搜索的执行队列，先加入左子树，再加入右子树
  const queue = [];
  // 层序遍历出来的元素存放在 ans 中
  const ans = [];
  devideLR(post, mid, queue, ans);
  while (queue.length) {
    const [post, mid] = queue.shift();
    devideLR(post, mid, queue, ans);
  }
  return ans.join("");
}
/**
* 本方法用于从后序遍历、中序遍历序列中分离出：根，以及其左、右子树的后序、中序
遍历序列
* @param {*} post 后序遍历结果
* @param {*} mid 中序遍历结果
* @param {*} queue BFS 的执行队列
* @param {*} ans 题解
*/
function devideLR(post, mid, queue, ans) {
  // 后序遍历的最后一个元素就是根
  let rootEle = post[post.length - 1];
  // 将根加入题解
  ans.push(rootEle);
  // 在中序遍历中找到根的位置 rootIdx，那么该位置左边就是左子树，右边就是右子树
  let rootIdx = mid.indexOf(rootEle);
  // 左子树长度，左子树是中序遍历的 0~rootIdx-1 范围，长度为 rootIdx
  let leftLen = rootIdx;
  // 如果存在左子树，即左子树长度大于 0
  if (leftLen > 0) {
    // 则从后序遍历中，截取出左子树的后序遍历
    let leftPost = post.slice(0, leftLen);
    // 从中序遍历中，截取出左子树的中序遍历
    let leftMid = mid.slice(0, rootIdx);
    // 将左子树的后、中遍历序列加入执行队列
    queue.push([leftPost, leftMid]);
  }
  // 如果存在右子树，即右子树长度大于 0
  if (post.length - 1 - leftLen > 0) {
    // 则从后序遍历中，截取出右子树的后序遍历
    let rightPost = post.slice(leftLen, post.length - 1);
    // 从中序遍历中，截取出右子树的中序遍历
    let rightMid = mid.slice(rootIdx + 1);
    // 将右子树的后、中遍历序列加入执行队列
    queue.push([rightPost, rightMid]);
  }
}


/**
 小王设计了一个简单的猜字谜游戏，游戏的谜面是一个错误的单词，比如 nesw，玩家需要
猜出谜底库中正确的单词。猜中的要求如下:对于某个谜面和谜底单词，满足下面任一条件
都表示猜中:
1.变换顺序以后一样的，比如通过变换 w 和 e 的顺序，“nwes”跟“news”是可以完全对应
的:
2.字母去重以后是一样的，比如“woood”和“wood”是一样的，它们去重后都是“wod”
请你写一个程序帮忙在谜底库中找到正确的谜底。谜面是多个单词，都需要找到对应的谜底，
如果找不到的话，返回"not found"
输入描述
1.谜面单词列表，以“，”分隔
2.谜底库单词列表，以”,”分隔
输出描述
。匹配到的正确单词列表，以”,"分隔
如果找不到，返回"not found!
备注
1.单词的数量 N 的范围: 0 < N < 1000
2.词汇表的数量 M 的范围: 0< M< 1000
3.单词的长度 P 的范围: 0< P < 20
4.输入的字符只有小写英文字母，没有其他字符
 */
puzzle(['woood'],['wood'])
function puzzle(issues, answers) {
  const ans = [];
  for (let issue of issues) {
    const sorted_issue = [...issue].sort().join(""); // 排序后字符串
    const distinct_issue = [...new Set(issue)].join(""); // 去重后字符串
    let find = false;
    for (let answer of answers) {
      const sorted_answer = [...answer].sort().join(""); // 排序后字符串
      const distinct_answer = [...new Set(answer)].join(""); // 去重后字符串
      if (
        sorted_issue === sorted_answer ||
        distinct_issue === distinct_answer
      ) {
        ans.push(answer);
        find = true;
        break; 
      }
    }
    if (!find) {
      ans.push("not found");
    }
  }
  return ans.join(",");
}