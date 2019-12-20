
let maxW = Number.MIN_VALUE; // 存储背包中物品总重量的最大值
// 假设背包可承受重量 100，物品个数 10，物品重量存储在数组 a 中，那可以这样调用函数：
// bp(0, 0, a, 10, 100)
let items = [10, 15, 26, 8, 21, 7, 1, 8, 19, 14]
/**
 * 
 * @param {*} i 表示考察到哪个物品了
 * @param {*} cw 表示当前已经装进去的物品的重量和；i
 * @param {*} items 表示每个物品的重量；
 * @param {*} n 表示物品个数
 * @param {*} w 背包重量
 */
function bp(i, cw, items, n, w) {
  if (cw == w || i == n) { // cw==w 表示装满了 ;i==n 表示已经考察完所有的物品
    if (cw > maxW) maxW = cw;
    return;
  }
  bp(i+1, cw, items, n, w);
  if (cw + items[i] <= w) {// 已经超过可以背包承受的重量的时候，就不要再装了
    bp(i+1,cw + items[i], items, n, w);
  }
}

bp(0, 0, items, items.length, 100)