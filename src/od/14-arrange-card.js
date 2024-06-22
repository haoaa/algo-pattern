const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (line) => {
  const arr = line.split(" ").map(Number);
  console.log(getResult(arr));
});
function getResult(arr) {
  const card = {};
  // 统计各种牌面的数量
  for (let num of arr) {
    card[num] ? card[num]++ : (card[num] = 1);
  }
  // 统计组合，4 代表炸弹，3+2 代表葫芦，3 代表三张，2 代表对子，1 代表单张
  const combine = {
    4: [],
    "3+2": [],
    3: [],
    2: [],
    1: [],
  };
  // 首先将初始组合统计出来
  for (let num in card) {
    switch (card[num]) {
      case 3:
        combine[3].push(num);
        break;
      case 2:
        combine[2].push(num);
        break;
      case 1:
        combine[1].push(num);
        break;
      default:
        combine[4].push([num, card[num]]); // 由于炸弹可能有 4 张以上相同牌面组成，因此既需要统计牌面 num，也需要统计牌数 card[num]
    }
  }
  // 炸弹排序，按照牌面值总和大小排序，总和越大，越高前，牌面总和 = 牌面值 * 牌
  数;
  combine[4].sort((a, b) => b[0] * b[1] - a[0] * a[1]);
  // 三张排序，牌面值越大，三张越大
  combine[3].sort((a, b) => b - a);
  // 对子降序，牌面值越大，对子越大
  combine[2].sort((a, b) => b - a);
  // 尝试组合出葫芦
  while (combine[3].length) {
    // 如果对子用完，三张还有一个，那么可以直接结束循环
    if (combine[2].length === 0 && combine[3].length === 1) break;
    // 选取一个最大的三张
    const san_top = combine[3].shift();
    let tmp;
    // 如果第二大的三张的牌面，比最大的对子牌面大，或者没有对子了，则可以拆分三张，组合出葫芦
    if (
      combine[2].length === 0 ||
      (combine[3].length >= 1 && combine[3][0] > combine[2][0])
    ) {
      tmp = combine[3].shift();
      // 拆分三张为对子的话，会多出一个单张
      combine[1].push(tmp);
    } else {
      // 如果对子牌面比三张大，则不需要拆分三张，直接使用对子组合出葫芦
      tmp = combine[2].shift();
    }
    combine["3+2"].push([san_top, tmp]); // 葫芦元素含义：[三张牌面，对子牌面]
  }
  // 处理完葫芦后，就可以对单张进行降序了（因为组合葫芦的过程中，可能产生新的单
  // 张，因此单张排序要在葫芦组合得到后进行）
  combine[1].sort((a, b) => b - a);
  // ans 存放题解
  const ans = [];
  // 首先将炸弹放到 ans 中
  for (let card of combine[4]) {
    const [score, count] = card;
    ans.push(...new Array(count).fill(score));
  }
  // 然后将葫芦放大 ans 中
  for (let card of combine["3+2"]) {
    const [san, er] = card;
    ans.push(...new Array(3).fill(san), ...new Array(2).fill(er));
  }
  // 之后将三张放到 ans 中
  for (let san of combine[3]) {
    ans.push(...new Array(3).fill(san));
  }
  // 接着是对子放到 ans 中
  for (let er of combine[2]) {
    ans.push(...new Array(2).fill(er));
  }
  // 最后是单张放到 ans 中
  ans.push(...combine[1]);
  return ans.join(" ");
}
