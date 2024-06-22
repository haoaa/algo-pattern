/**
 新词挖掘: 给出一个待挖掘问题内容字符串 Content 和一个词的字符串 word，找到
content 中所有 word 的新词
.新词: 使用词 word 的字符排列形成的字符串
请帮小华实现新词挖掘，返回发现的新词的数量。
输入描述
第一行输入为待挖掘的文本内容 content;
第二行输入为词 word;
输出描述
在 content 中找到的所有 word 的新词的数量
备注
。0≤content 的长度≤10000000
。1 ≤word 的长度≤2000
 */
console.log(wordWindow("abab", "ab"));
function wordWindow2(content, word) {
  if (content.length < word.length) {
    return 0;
  }
  const sorted_word = [...word].sort().join("");
  let ans = 0;
  let maxI = content.length - word.length;
  for (let i = 0; i <= maxI; i++) {
    const sorted_substr = [...content.slice(i, i + word.length)]
      .sort()
      .join("");
    if (sorted_substr === sorted_word) ans++;
  }
  return ans;
}

function wordWindow(content, word) {
  if (content.length < word.length) {
    return 0;
  }
  let ans = 0;
  let total = word.length;
  const count = {};
  for (let c of word) {
    count[c] ? count[c]++ : (count[c] = 1);
  }
  // 初始滑动窗口内部字母遍历
  for (let i = 0; i < word.length; i++) {
    const c = content[i];
    if (count[c] !== undefined && count[c]-- > 0) {
      total--;
    }
  }
  if (total === 0) ans++;
  // 滑动窗口左指针的移动范围为 0~maxI
  let maxI = content.length - word.length;
  for (let i = 1; i <= maxI; i++) {
    const remove_c = content[i - 1];
    const add_c = content[i + word.length - 1];
    if (count[remove_c] !== undefined && count[remove_c]++ >= 0) {
      total++;
    }
    if (count[add_c] !== undefined && count[add_c]-- > 0) {
      total--;
    }
    if (total === 0) ans++;
  }
  return ans;
}

/**
 某个充电站，可提供 n 个充电设备，每个充电设备均有对应的输出功率。任意个充电设
备组合的输出功率总和，均构成功率集合 P 的 1 个元素。功率集合 P 的最优元素，表示最接
近充电站最大输出功率 p_max 的元素
输入描述
输入为 3 行:
。第 1 行为充电设备个数 n
。第 2 行为每个充电设备的输出功率
。第 3 行为充电站最大输出功率 p_max
输出描述
功率集合 P 的最优元素
备注
。充电设备个数 n>0
。最优元素必须小于或等于充电站最大输出功率 p _max
 */
console.log(elecPower(4, [50, 20, 20, 60], 90));
function elecPower(n, p, p_max) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(p_max + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= p_max; j++) {
      if (p[i - 1] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], p[i - 1] + dp[i - 1][j - p[i - 1]]);
      }
    }
  }
  return dp[n][p_max];
}

/**
 区块链只底层存储是一个链式文件系统，由顺序的 N 个文件组成，每个文件的大小不
一，依次为 F1.F2..Fn。随着时间的推移，所占有储会越来越大。
云平台考虑将区块链按文件转储到廉价的 SATA 盘，只有连续的区块链文件才能转储到
SATA 盘上，且转的文件之和不能超过 SATA 盘的容量。
假设每块 SATA 盘容量为 M，求能转储的最大连续文件之和。
输入描述
第一行为 SATA 盘容量 M，1000 <=M <= 1000000
第二行为区块链文件大小序列 F1,F2.....Fn。其中 1<=n<=100000，1<=Fi<= 500
输出描述
求能转储的最大连续文件大小之和
题目解析
由于本题需要求解最大连续文件大小之和，因此可以考虑使用双指针+滑动窗口来解题
本题的滑动窗口的左边界 1,右边界 r 的运动逻辑如下:
如果滑动窗口内部和< m，则 r++
如果滑动窗口内部和>m，则 l++
如果滑动窗口内部和 = m，则已得到最大值，直接返回 m 即可
在计算滑动窗口内部和的过程中，如果 r++，则说明内部和可能会增大产生最大值，因
此我们需要在 r++时，判断并保留最大值.
 */
// console.log(maxConseq(1000, [100, 300, 500, 400, 400, 150, 100]));
function maxConseq(m, F) {
  let l = 0,
    r = 0;
  let n = F.length;
  let sum = 0;
  let max = 0;
  while (r < n) {
    // 尝试右指针右移一下的新和（注意初始时右指针右移后指向 0）
    const newSum = sum + F[r];
    if (newSum > m) {
      sum -= F[l++];
    } else if (newSum < m) {
      sum += F[r++];
      max = Math.max(sum, max);
    } else {
      return m;
    }
  }
  return max;
}

/**
 Jungle 生活在美丽的蓝鲸城，大马路都是方方正正，但是每天马路的封闭情况都不一
样地图由以下元素组成:
1)”.”一 空地，可以达到
2)”*”一 路障，不可达到:
3)”S”- Jungle 的家
4)”T”一公司.
其中我们会限制 Jungle 拐弯的次数，同时 Jungle 可以清除给定个数的路障，现在你的
任务是计算 Jungle 是否可以从家里出发到达公司。
输入描述
输入的第一行为两个整数 t,c (0 <=t,c <= 100)代表可以拐的次数，c 代表可以清除的路障
个数。
输入的第二行为两个整数 n,m (1 <=n,m <= 100) ,代表地图的大小。
接下来是 n 行包含 m 个字符的地图。n 和 m 可能不一样大。
我们保证地图里有 S 和 T。
输出描述
输出是否可以从家里出发到达公司，是则输出 YES，不能则输出 NO。
 */
console.log(
  WorkRoute(2, 0, 5, 5, [
    [".", ".", "S", ".", "."],
    ["*", "*", "*", "*", "."],
    ["T", ".", ".", ".", "."],
    ["*", "*", "*", "*", "."],
    [".", ".", ".", ".", "."],
  ])
);
function WorkRoute(t, c, n, m, matrix) {
  const offsets = [
    [-1, 0, "up"],
    [1, 0, "down"],
    [0, -1, "left"],
    [0, 1, "right"],
  ];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] == "S") {
        return dfs(i, j, 0, 0, undefined, new Set([`${i}-${j}`]))
          ? "YES"
          : "NO";
      }
    }
  }
  /**
   * @param {*} si 当前位置横坐标
   * @param {*} sj 当前位置纵坐标
   * @param {*} ut 已拐弯次数
   * @param {*} uc 已破壁次数
   * @param {*} lastDirect 上一次运动方向，初始为 undefined，表示第一次运动不会造成拐弯
   * @param {*} path 行动路径，用于记录走过的位置，避免走老路
   * @returns
   */
  function dfs(si, sj, ut, uc, lastDirect, path) {
    // 如果当前位置就是目的地，则返回 true
    if (matrix[si][sj] == "T") {
      return true;
    }
    // 有四个方向选择走下一步
    for (let offset of offsets) {
      const [offsetX, offsetY, direct] = offset;
      const newI = si + offsetX;
      const newJ = sj + offsetY;
      // flag1 记录是否拐弯
      let flag1 = false;
      // flag2 记录是否破壁
      let flag2 = false;
      if (newI >= 0 && newI < n && newJ >= 0 && newJ < m) {
        const pos = `${newI}-${newJ}`;
        if (path.has(pos)) continue;
        // 如果下一步位置需要拐弯
        if (lastDirect && lastDirect != direct) {
          // 如果拐弯次数用完了，则不走
          if (ut + 1 > t) continue;
          // 否则就走
          flag1 = true;
        }
        // 如果下一步位置需要破壁
        if (matrix[newI][newJ] == "*") {
          // 如果破壁次数用完了，则不走
          if (uc + 1 > c) continue;
          // 否则就走
          flag2 = true;
        }
        // 记录已走过的位置
        path.add(pos);
        // 继续下一步递归
        const res = dfs(
          newI,
          newJ,
          ut + (flag1 ? 1 : 0), // 如果拐弯了，则已使用的拐弯次数++
          uc + (flag2 ? 1 : 0), // 如果破壁了，则已使用的破壁次数++
          direct,
          path
        );
        // 如果某路径可以在给定的 t,c 下，到达目的地 T，则返回 true
        if (res) return true;
        // 否则，回溯
        path.delete(pos);
      }
    }
    return false;
  }
}

/**
 有 M*N 的节点短阵，每个节点可以向 8 个方向(上、下、左、右及四个斜线方向)转发
数据包，每个节点转发时会消耗固定时延，连续两个相同时延可以减少一个时延值(即当有
K 个相同时延的节点连续转发时可以减少 K-1 个时延值)，
求左上角 (0，0)开始转发数据包到右下角 (M-1，N- 1)并转发出的最短时延
输入描述
第一行两个数字，M、N，接下来有 M 行，每行有 N 个数据，表示 M* N 的矩阵。
输出描述
最短时延值。
 */
minDelay(3, 3, [
  [0, 2, 2],
  [1, 2, 1],
  [2, 2, 1],
]);
function minDelay(m, n, matrix) {
  // 八个方向的偏移量
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  const res = [];
  const path = new Set();
  path.add(0); // 初始时，[0,0]位置已被扫描，因此要将它的一维坐标形式，即 0 * m +0，加入已扫描过的节点列表 path 中，避免重复扫描
  dfs(0, 0, 0, Infinity, path, res);
  return Math.min.apply(null, res);
  /**
   * @param {*} matrix 矩阵
   * @param {*} i 当前正在被 dfs 的节点的横坐标
   * @param {*} j 当前正在被 dfs 的节点的纵坐标
   * @param {*} delay 已累计的时延值
   * @param {*} last 上一个节点的时延值，用于和当前节点时延值对比，若相同，则新增时延-1
   * @param {*} path 记录扫描过的节点的位置，避免重复扫描
   * @param {*} res 记录各种从起点到终点的路径的时延值
   */
  function dfs(i, j, delay, last, path, res) {
    // 当前节点的时延值
    const cur = matrix[i][j];
    // flag 用于标记，当前节点和上一个节点的时延值是否相同，若相同，则新增的时延值要-1
    let flag = cur === last;
    // 如果搜索到了最后一个点，那么就将该路径的时延计算出来，加入到 res 中，结束分支递归
    if (i === m - 1 && j === n - 1) {
      delay += cur - (flag ? 1 : 0);
      return res.push(delay);
    }
    // 深度优先搜索当前点的八个方向
    for (let offset of offsets) {
      const [offsetX, offsetY] = offset;
      const newI = i + offsetX;
      const newJ = j + offsetY;
      // 将二维坐标，转成一维坐标 pos
      const pos = newI * m + newJ;
      // 如果新位置越界，或者新位置已经扫描过，则停止递归
      if (newI >= 0 && newI < m && newJ >= 0 && newJ < n && !path.has(pos)) {
        path.add(pos);
        dfs(
          newI,
          newJ,
          delay + cur - (flag ? 1 : 0), // 当前节点和上一个节点的时延值是否相同，若相同，则新增的时延值要-1
          cur,
          path,
          res
        );
        path.delete(pos);
      }
    }
  }
}


/**
 两端通过 TLV 格式的报文来通信，现在收到对端的一个 TLV 格式的消息包，要求生成
匹配后的(tag,length,valueOffset)列表.
具体要求如下
(1)消息包中多组 tag、length、value 紧密排列，其中 tag,length 各占 1 字节(uint8 _t),value
所占字节数等于 length 的值
(2)结果数组中 tag 值已知，需要填充每个 tag 对应数据的 length 和 valueOffset 值
(valueOffset 为 value 在原消息包中的起始偏移量(从 0 开始以字节为单位))，
即将消息包中的 tag 与结果数组中的 tag 进行匹配(可能存在匹配失败的情况，若结果数
组中的 tag 在消息包中找不到，则 length 和 valueOffset 都为 0)
(3)消息包和结果数组中的 tag 值都按升序排列，且不重复
(4)此消息包未被算改，但尾部可能不完整，不完整的一组 TLV 请丢弃掉
输入描述
第一行: 一个字符串，代表收到的消息包。字符串长度在 10000 以内。
说明 1:字符串使用十六进制文本格式(字母为大写)来展示消息包的数据，如
0F04ABABABAB 代表一组 TLV 前两个字符(0F)代表 tag 值为 15，接下来两个字符 (04) 代表
lenth 值为 4 字节，接下来 8 个字符即为 4 字节的 value.
说明 2: 输入字符串中，每一组 TLV 紧密排列，中间无空格等分隔符
第二行: 需要匹配的 tag 数量 n (0 < n<1000)。
后面 n 行: 需要匹配的 n 个 tag 值 (+进制表示)，递增排列。
 */
tlv2('0F04ABABABAB',[15])
function tlv2(msg, tags) {
  const tagObj = {};
  // 这里 i+3 的目的是确保 tag，len 的截取不会越界，如果 I+3 越界了，那么说明当前TLV 报文段不完整，可以直接抛弃
  for (let i = 0; i + 3 < msg.length; i++) {
    const tag = parseInt(msg.slice(i, i + 2), 16);
    const len = parseInt(msg.slice(i + 2, i + 4), 16);
    const valueOffset = Math.floor((i + 5) / 2);
    // 本 TLV 格式报文段结束位置 i
    i = i + 3 + len * 2;
    if (i >= msg.length) break;
    tagObj[tag] = [len, valueOffset];
  }
  tags.forEach((tag) => {
    if (tagObj[tag]) {
      const [len, valueOffset] = tagObj[tag];
      console.log(`${len} ${valueOffset}`);
    } else {
      console.log("0 0");
    }
  });
}

/**
 * 有一个简易内存池，内存按照大小粒度分类，每个粒度有若干个可用内存资源，用户会
进行一系列内存申请，需要按需分配内存池中的资源返回申请结果成功失败列表。
分配规则如下:
1.分配的内存要大于等于内存的申请量，存在满足需求的内存就必须分配，优先分配粒
度小的，但内存不能拆分使用:
2.需要按申请顺序分配，先申请的先分配，有可用内存分配则申请结果为 true;
3.没有可用则返回 false。
注意:不考虑内存释放
输入描述
输入为两行字符串
第一行为内存池资源列表，包含内存粒度数据信息，粒度数据间用逗号分割
。一个粒度信息内用冒号分割，冒号前为内存粒度大小，冒号后为数量
。资源列表不大于 1024
。每个粒度的数量不大于 4096.
第二行为申请列表，申请的内存大小间用逗号分割
。申请列表不大于 100000.
如
64:2，128:1，32:4，1:128
50，36，64，128，127
输出描述
输出为内存池分配结果
 */
ramAllot(
  [
    [64, 2],
    [128, 1],
    [32, 4],
    [1, 128],
  ],
  [50, 36, 64, 128, 127]
);
function ramAllot2(pools, applies) {
  pools.sort((a, b) => a[0] - b[0]);
  const ans = [];
  outer: for (let apply of applies) {
    for (let pool of pools) {
      const [size, count] = pool;
      if (size < apply || count <= 0) continue;
      pool[1]--;
      ans.push(true);
      continue outer;
    }
    ans.push(false);
  }
  return ans.join(",");
}

function ramAllot(pools, applies) {
  pools.sort((a, b) => a[0] - b[0]);
  const ans = [];
  for (let apply of applies) {
    let idx = binarySearch(pools, apply);
    if (pools[idx] === undefined) {
      ans.push(false);
      continue;
    }
    pools[idx][1]--;
    ans.push(true);
    if (pools[idx][1] === 0) {
      pools.splice(idx, 1);
    }
  }
  return ans.join();
}
function binarySearch(arr, key) {
  let low = 0,
    ans = 0;
  let high = arr.length - 1;
  while (low <= high) {
    let mid = (low + high) >> 1;
    let midVal = arr[mid][0];
    if (midVal < key) {
      low = mid + 1;
    } else if (midVal > key) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return low;
}

/**
 * 定义了如下 内存管理规则:
1.按块进行内存管理，有若干个 pool，每个 pool 管理一种大小内存块;每块内存的地址
是连续的，但是内存块间地址不连续
2.只要不超过内存块大小，该内存块可以被多次申请;
3.一次内存申请只能从一个内存块中申请，不能跨内存块申请;
4.剩余内存大小仅统计完全未被使用的内存块的总大小;
要求给定申请内存块的需求，求解剩下的完全未使用的内存块大小总和最大是多少?
注意:只要有一次申请不到内存，返回-1;
输入描述
1.第一行输入 N，代表不同规格内存的个数
2.之后 N 行分别输入该规格内存的个数、内存的规格，使用空格分隔.
3.第 N+2 行输入 M，代表需要申请的内存数目，单位为 KByte 。
4.之后一行输入 M 个内存的大小，使用空格分隔。
5.其中 N 小于 50，总的内存块个数小于 50，M 小于 15。
如: 三种内存块，分别是: 2 块大小 4KByte 的内存，3 块大小 8KByte 的内存，4 块大小
16KByte 的内存，输入格式
3
2 4
3 8
4 16
一次申请 7KByte，9KByte，11KByte，4KByte 这 4 块内存，输入格式:
4
7 9 11 4
输出描述
输出的剩余内存块大小: 64KByte，输出格式:
64
备注:
。如果没有优化方法，可能申请情况如下:
。7KByte 占用 1 个 8KByte 内存块，9KByte 占用 1 个 16KByte 内存块，11KByte 占用 1
个 16KBe 内存块，4KBe 占用 1 个 4KBVte 内存块。这样，完全未使用的内存块总大小是 4KBvte
+ 2*8KBvte + 2*16KBvte = 52KBvte
如果优化方法，申请如下:
。7KByte 占用 1 个 16KByte 内存块，9KBte 复用之前 16KByte 内存块剩下的内存，11KByte
占用 1 个 16KByte 内存块，4KByte 占用之前 16KByte 剩下的内存
这样，完全未使用的内存块总大小是 2*4KByte + 3*8KByte + 2*16KByte = 64KByte
用例
 */
console.log(
  ramAlloc(
    [
      [2, 4],
      [3, 8],
      [4, 16],
    ],
    [7, 9, 11, 4]
  )
);
/**
 *
 * @param {*} pools 数组，元素是：[数量, 内存块大小]
 * @param {*} applies 申请内存大小列表
 * @returns 剩余未使用过的内存块大小
 */
function ramAlloc(pools, applies) {
  // 申请内存按大小升序
  applies.sort((a, b) => a - b);
  // 内存块按大小升序
  pools.sort((a, b) => a[1] - b[1]);
  // remains 用于保存：内存块未被全部用完的剩余内存大小
  const remains = [];
  // 申请内存时优先从 remains 中获取，如果 remains 中没有符合要求的再从 pools 中  获取;
  const caches = [remains, pools];
  // 当所有申请都完成，则结束循环
  outer: while (applies.length) {
    // 由于 applies 已经升序，因此这里 pop 出来的申请的内存是最大的
    const apply = applies.pop();
    // 申请内存时优先从 remains 中获取，如果 remains 中没有符合要求的再从 pools    中获取;
    for (let cache of caches) {
      for (let arr of cache) {
        const [count, size] = arr;
        // 如果当前可用内存没了，则继续找下一个可用内存
        if (count <= 0) continue;
        // 如果申请内存 大于 当前可用内存，则继续查看下一个可用内存
        if (apply > size) continue;
        // 如果申请内存 等于 当前可用内存，则直接使用当前可用内存，然后继续下一次申请内存
        if (apply === size) {
          arr[0]--;
          continue outer;
        }
        // 如果申请内存 小于 当前可用内存（可用内存 remains 和 pools 已经按内存大小升序，因此当前可用内存是最接近申请内存大小的），则会产生新的可用内存碎片，我们需要将新的可用内存碎片加入到 remains 中
        if (apply < size) {
          arr[0]--;
          const newSize = size - apply;
          remains.push([1, newSize]);
          remains.sort((a, b) => a[1] - b[1]);
          continue outer;
        }
      }
    }
    return -1;
  }
  let sum = 0;
  pools.forEach(([count, size]) => (sum += size * count));
  return sum;
}
