/* 通过分治求一个数组的逆序度 */
let num = 0 // 累加到全局变量

function count(arr) {
  num = 0
  mergeSortCounting(arr, 0, arr.length - 1)
  return num
}


function mergeSortCounting(arr, p, r) {
  if (p >= r) {
    return
  }
  let q = ((p + r) / 2) >> 0
  mergeSortCounting(arr, p, q)
  mergeSortCounting(arr, q + 1, r)
  merge(arr, p, q, r)
}

function merge(arr, p, q, r) {
  let i = p, j = q + 1, k = 0
  let tmp = new Array(r - p + 1)
  while (i <= q && j <= r) {
    if (arr[i] <= arr[j]) {
      tmp[k++] = arr[i++]
    } else {
      tmp[k++] = arr[j++]
      num += (q - i + 1)
    }
  }
  // while (i <= q) {
  //   tmp[k++] = arr[i++]
  // }
  // while (j <= r) {
  //   tmp[k++] = arr[j++]
  // }
  // for (let i = 0; i <= r - p; i++) {
  //   arr[p + i] = tmp[i]    
  // }
}

console.log(count([4, 5, 6, 2, 3, 1]));


/* 二维平面上有 n 个点，如何快速计算出两个距离最近的点对？ 
(1, 2), (3, 4), (7, 1), (1, 3)
      2.8      |     6.32
*/


/* 有两个 n*n 的矩阵 A，B，如何快速求解两个矩阵的乘积 C=A*B？ */