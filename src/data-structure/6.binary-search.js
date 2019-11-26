function binaryFind(arr, num) {
  let start = 0, end = arr.length - 1
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2)
    if (arr[mid] < num) {
      start = mid + 1
    } else if(arr[mid] > num) {
      end = mid - 1
    } else if (arr[mid] === num) {
      return mid
    }
  }
  return -1
}
const arr = [1, 4, 5, 6, 7, 8, 10, 11, 23, 42, 44, 54, 56, 77, 102]
console.log(binaryFind(arr, 44))
console.log(binaryFind(arr, 1))
console.log(binaryFind(arr, 102))
console.log(binaryFind(arr, 1111))

/* 求一个数的平方根？要求精确到小数点后 6 位。 */
function getSquar(num, precision) {
  if(num < 0) throw 'error'
  if(num === 0) return 0
  let start = 0, end = num
  let mid, result
  let loopCount = 0
  while (true) { // 精度外使劲循环
    loopCount++ // 一位数的20次左右的循环
    mid = start + (end - start) / 2 // 注意start +
    result = mid * mid
    if (Math.abs(num - result) < Math.pow(10, -precision)) {
      break
    }
    if (result > num) {
      end = mid - Math.pow(10, -precision)
    } else if (result < num) {
      start = mid + Math.pow(10, -precision)
    }
  }  
  console.log(loopCount);
  return mid.toFixed(precision)
}

console.log(getSquar(16.9222, 12));