
let items = [2, 2, 4, 6, 3]
let value = [3, 4, 8, 9, 6]
/**
 * 
weight: 物品重量，n: 物品个数，w: 背包可承载重量
 */
function knapsack(weight, n, w) {
  let states = Array.from({length: weight.length}).fill([])
  states[0][0] = true
  states[0][weight[0]] = true
  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= w; j++) { // 不把第 i 个物品放入背包
      if (states[i - 1][j] === true) {
        states[i][j] = true
      }      
    }
    for (let j = 0; j <= w - weight[i]; j++) { // 把第 i 个物品放入背包
      if (states[i - 1][j] === true) {
        states[i][j + weight[i]] = true
      }      
    }    
  }
  for (let i = w; i >= 0; i--) {
    if (states[n - 1][i] === true) {
      return i
    }    
  }
}
console.time('knapsack')
let wt = knapsack(items, items.length, 9)
// console.log(wt);
console.timeEnd('knapsack')

/* 
一个 n 乘以 w+1 的二维数组，对空间的消耗比较多。
实际上只要w+1 的一维数组就可以解决这个问题, 对应第几层开始为true
*/
function knapsack2(weight, n, w) {
  let states = Array.from({length: w + 1})
  states[0] = true  // 0层不放
  states[weight[0]] = true  // 0层放
  for (let i = 1; i < n; i++) {
    // 第 i 个物品不放入背包,自然从上层开始算为true
    for (let j = 0; j <= w - weight[i]; j++) { // 把第 i 个物品放入背包
      if (states[j] === true) {
        states[j + weight[i]] = true
      }      
    }    
  }
  for (let i = w; i >= 0; i--) {
    if (states[n - 1][i] === true) {
      return i
    }    
  }
}

console.time('knapsack2')
let wt2 = knapsack2(items, items.length, 9)
// console.log(wt2);
console.timeEnd('knapsack2')


let maxV = -1
/**
 * 背包问题加入物品价值, 回溯算法实现 
 * @param {*} i 考察第i个物品
 * @param {*} cw 当前重量
 * @param {*} cv 当前价值
 */
function knapsack3(i, cw, cv, n, w) {
  if (cw === w || i === n) {// cw==w 表示装满了，i==n 表示物品都考察完了
    if (cv > maxV) {
      maxV = cv
    }
    return
  }
  knapsack3(i + 1, cw, cv, n, w) // 选择不装第i个物品后递归调用
  if (cw + items[i] <= w) {
    knapsack3(i + 1, cw + items[i], cv + value[i], n, w)
  }
}

console.time('knapsack3')
knapsack3(0, 0, 0, items.length, 9)
// console.log(maxV);
console.timeEnd('knapsack3')

/**
 * 背包问题加入物品价值, DP算法实现 
 * 我们还是把整个求解过程分为 n 个阶段，每个阶段会决策一个物品是否放到背包中。每个阶段决策完之后，
 * 背包中的物品的总重量以及总价值，会有多种情况，也就是会达到多种不同的状态。
 * 我们用一个二维数组 states[n][w+1]，来记录每层可以达到的不同状态。不过这里数组存储的值不再是 boolean 类型的了，而是当前状态对应的最大总价值。我们把每一层中 (i, cw) 重复的状态（节点）合并，只记录 cv 值最大的那个状态，然后基于这些状态来推导下一层的状态。
*/
function knapsack4(weight, value, n, w) {
  let states = Array.from({length: n}).map(i => 
    Array.from({length: w + 1}).fill(-1)
  )
  states[0][0] = 0
  states[0][weight[0]] = value[0]
  for (let i = 1; i < n; i++) {
    // 第 i 个物品不放入背包, 可与放入整合成一维数组states[n]
    for (let j = 0; j < w; j++) {
      if (states[i - 1][j] >= 0) {
        states[i][j] = states[i -1][j]
      }      
    }
    for (let j = 0; j <= w - weight[i]; j++) { // 把第 i 个物品放入背包
      if (states[i - 1][j] >= 0) {
        let v = states[i - 1][j] + value[i]
        if (v > states[i][j + weight[i]]) { // 放后比没放价值大才修改总价值
          states[i][j + weight[i]] = v
        }
      }
    }         
  }
  let maxV = -1
  for (let i = w; i >= 0; i--) {
    if (states[n - 1][i] === true) {
      return i
    }    
  }
}
console.time('knapsack4')
knapsack4(items, value, items.length, 9)
// console.log(maxV);
console.timeEnd('knapsack4')