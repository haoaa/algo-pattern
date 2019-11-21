class Sort{
  swap(arr, i, j){
    // [arr[i], arr[j]] = [arr[j], arr[i]]
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  bubleSort(arr = []) {
    let arrLength = arr.length
    if (arrLength <= 1) {
      return
    }
    for (let i = 0; i < arrLength; i++) {
      let flag = false
      for (let j = 0; j < arrLength - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j, j+1)
          flag = true
        }        
      }
      if(!flag) break
    }
  }
  insertionSort(arr = []){
    let length = arr.length
    if (length <= 1) {
      return
    }
    for (let i = 1; i < length; i++){
      let value = arr[i] // 有数据移动的话,空出i的位置
      let j = i - 1
      for (; j >= 0; j--) { // 倒着比才能实现稳定
        if (arr[j] > value) {
          arr[j + 1] = arr[j]
        } else {
          break
        }
      }
      arr[j + 1] = value
    }
  }
  selectionSort(arr = []) {
    let length = arr.length
    if (length <= 1) {
      return
    }
    for (let i = 0; i < length - 1; i++){ // 最后两个只要比一次
      let minIndex = i      
      for (let j = i + 1; j < length; j++) {
        if (arr[j] < arr[minIndex] ) {
          minIndex = j
        }
      }
      if (i !== minIndex) {    // 最小位和起始位不一样才换     
        this.swap(arr, i, minIndex)
      }
    }
  }
  mergeSort(arr = []) {
    function mergeCall(arr, start, end) {
      if (start >= end) {
        return
      }
      let mid = (start + end) / 2 | 0
      mergeCall(arr, start, mid)
      mergeCall(arr, mid + 1, end)
      merge(arr, start, mid, end)
    }
    function merge(arr, left, mid ,right) {
      let i = left, j = mid + 1, k = 0
      let tempArr = new Array(right - left + 1) // 合并成有序数组
      while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
          tempArr[k] = arr[i]
          i++
        } else {
          tempArr[k] = arr[j]
          j++
        }
        k++
      }
      // copy rest
      while (i <= mid) {
        tempArr[k] = arr[i]
        k++
        i++
      }
      while (j <= right) {
        tempArr[k] = arr[j]
        k++
        j++
      }
      for (let i = 0; i < tempArr.length; i++) {
        arr[left + i] = tempArr[i]        
      }
    }
    mergeCall(arr, 0, arr.length - 1)
  }
  /* The purpose of a sentinel is to reduce the total number of comparisons while merging two arrays */
  mergeSortWithSentinel(arr = []) {
    function mergeCall(arr, start, end) {
      if (start >= end) {
        return
      }
      let mid = (start + end) / 2 | 0
      mergeCall(arr, start, mid)
      mergeCall(arr, mid + 1, end)
      merge(arr, start, mid, end)
    }
    function merge(arr, left, mid ,right) {
      let i = 0, j = 0
      // 把数组拷贝到两份临时数组, 比对回填到原数组. 两份数组最后放一个无穷大数做哨兵
      let tempLeft = arr.slice(left, mid + 1)
      tempLeft[tempLeft.length] = Number.POSITIVE_INFINITY
      let tempRight = arr.slice(mid + 1, right + 1)
      tempRight[tempRight.length] = Number.POSITIVE_INFINITY

      for (let k = left; k <= right; k++) {
        if (tempLeft[i] <= tempRight[j]) {
          arr[k] = tempLeft[i++]
        } else {
          arr[k] = tempRight[j++]
        }
      }
    }
    mergeCall(arr, 0, arr.length - 1)
  }
}

let st = new Sort()
let arr = [4, 5, 6, 3, 2, 1]
// st.bubleSort(arr)
// st.mergeSort(arr)
st.mergeSortWithSentinel(arr)
console.log(arr);