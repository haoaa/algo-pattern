class BinarySearch{
  binaryFind(arr, num) {
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
  /* 求一个数的平方根？要求精确到小数点后 6 位。 */
  getSquar(num, precision) {
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
    // console.log(loopCount);
    return mid.toFixed(precision)
  }
  /* 变体一：查找第一个值等于给定值的元素 */
  searchFirstEqual(arr, num) {
    let start = 0, end = arr.length - 1
    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2)
      if (arr[mid] < num) {
        start = mid + 1
      } else if(arr[mid] > num) {
        end = mid - 1
      } else {
        if (mid === 0 || arr[mid - 1] !== num) {
          return mid
        } else {
          end = mid - 1
        }
      } 
    }
    return -1
  }
  /* 变体二：查找最后一个值等于给定值的元素 */
  searchLastEqual(arr, num) {
    let start = 0, end = arr.length - 1
    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2)
      if (arr[mid] < num) {
        start = mid + 1
      } else if(arr[mid] > num) {
        end = mid - 1
      } else {
        if (mid === arr.length - 1 || arr[mid + 1] !== num) {
          return mid
        } else {
          end = mid - 1
        }
      } 
    }
    return -1
  }
  /* 变体三：查找第一个大于等于给定值的元素 */
  searchFirstGreaterEqual(arr, num) {
    let start = 0, end = arr.length - 1
    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2)
      if (arr[mid] < num) {
        start = mid + 1
      } else if(arr[mid] >= num) {
        if (mid === 0 || arr[mid - 1] < num) {
          return mid
        } else {
          end = mid - 1
        }
      }
    }
    return -1
  }
  /* 变体四：查找最后一个小于等于给定值的元素 */
  searchLastLesserEqual(arr, num) {
    let start = 0, end = arr.length - 1
    while (start <= end) {
      let mid = start + Math.floor((end - start) / 2)
      if (arr[mid] > num) {
        start = mid - 1
      } else if(arr[mid] <= num) {
        if (mid === arr.length - 1 || arr[mid + 1] > num) {
          return mid
        } else {
          end = mid + 1
        }
      }
    }
    return -1
  }
  /* 一个循环有序数组，二分查找值*/
  circularArrayBisearch(arr, num) {
    let mid
    let start = 0, end = arr.length - 1
    while (start < end) {
      mid = start + Math.floor((end - start) / 2)
      if ((arr[0] > num) ^ (arr[0] > arr[mid]) ^ (num > arr[mid])) {
        start = mid + 1  
      } else {
        end = mid
      }
    }
    return start === end && arr[start] === num ? start : -1
  }
  /* 一个循环有序数组，二分查找值, 先找旋转下标, 再二分*/
  circularArrayBisearchRotateIndex(arr, num) {
    if (!arr.length) {
      return -1
    }
    if (arr.length === 1) {
      if (arr[0] === num) {
        return 0
      } else {
        return -1        
      }
    }
    function findRotateIndex(arr) {
      let mid
      let start = 0, end = arr.length - 1
      while (start <= end) {
        mid = start + Math.floor((end - start) / 2)
        if(arr[mid] > arr[mid + 1] || mid === end){ //mid === end 正序两个节点的情况
          return mid
        } else {
          if (arr[mid] >= arr[start]) {
            // 有序区
            start = mid + 1
          } else {
            end = mid - 1
          }
        }
      }
    }
    let rotateIndex = findRotateIndex(arr);
    if(num >= arr[0] && num <= arr[rotateIndex]) {
      // 左区
      return this.binaryFind(arr.slice(0, rotateIndex + 1), num)
    } else {
      let right = this.binaryFind(arr.slice(rotateIndex + 1, arr.length), num)
      return right !== -1 ? right + rotateIndex + 1 : -1
    }
  }
}

const bs = new BinarySearch()
const arr = [1, 4, 5, 6, 7, 8, 10, 11, 23, 42, 44, 54, 56, 77, 102]
// console.log(bs.binaryFind(arr, 44))
// console.log(bs.binaryFind(arr, 1))
// console.log(bs.binaryFind(arr, 102))
// console.log(bs.binaryFind(arr, 1111))

// console.log(bs.getSquar(16.9222, 12));
                                    7      
const binaryFindTest = [1, 3, 4, 4, 5, 6, 8, 8, 8, 11, 18]
// console.log(bs.searchFirstEqual(binaryFindTest, 8))
// console.log(bs.searchLastEqual(binaryFindTest, 8))
// console.log(bs.searchFirstGreaterEqual(binaryFindTest, 7));
// console.log(bs.searchLastLesserEqual(binaryFindTest, 7));

let circularArr = [4,5,6,7,0,1,2]

// console.log(bs.circularArrayBisearch(circularArr, 7));
console.log(bs.circularArrayBisearchRotateIndex(circularArr, 0));

