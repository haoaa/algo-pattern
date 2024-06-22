
let maxW = Number.MIN_VALUE; // 存储背包中物品总重量的最大值
// 所有的物品有放和不放两种情况 2(物品1) * 2(物品2) * 2(物品3), 通过穷举找到最大的
// bp(0, 0, a, 10, 100)
let items = [7, 5, 8]
/**
 * 
 * @param {*} i 表示考察到哪个物品了
 * @param {*} cw 表示当前已经装进去的物品的重量和；i
 * @param {*} items 表示每个物品的重量；
 * @param {*} n 表示物品个数
 * @param {*} w 背包重量
 */
let memo = Array.from({length: items.length}).fill([])
function bp(i, cw, items, n, w) {
  if (cw == w || i == n) { // cw==w 表示装满了 ;i==n 表示已经考察完所有的物品
    if (cw > maxW) maxW = cw;
    return;
  }
  if (memo[i][cw]) {
    return
  }
  memo[i][cw] = true
  bp(i+1, cw, items, n, w);
  if (cw + items[i] <= w) {// 已经超过可以背包承受的重量的时候，就不要再装了
    bp(i+1,cw + items[i], items, n, w);
  }
}
console.time('s')
bp(0, 0, items, items.length, 12)
console.log(maxW);
console.timeEnd('s')