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
    /* 从第二个元素开始算无序区, 遍历无序区的元素, 
      与有序区从后向前比较(稳定),小就往后挪 大就不懂
    */
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
  quickSort(arr = []) {
    let that = this
    if (arr.length <= 1) return arr
    function callQuick(arr, start, end) {
      if (start >= end) {
        return
      }
      let q = partition(arr, start, end)
      callQuick(arr, start, q - 1) // 这里不再包含分区点
      callQuick(arr, q + 1, end)
    }
    function partition(arr, start, end) {
      let pivot = arr[end]
      let sortedIndex = start
      for (let i = start; i < end; i++) {
        if (arr[i] < pivot) { // 不需要等号, 等于pivot就放在大于分区
          that.swap(arr, sortedIndex, i)
          sortedIndex++
        }        
      }
      that.swap(arr, sortedIndex, end) //把分区点放入中间位置
      return sortedIndex
    }
    callQuick(arr, 0, arr.length - 1)
  }
  /* 
    找到第k大是数据如果是有序数组 序号i - 1就是第i大数据, 借由分区方法不需要完全排好序就可以找到k大数.
    利用分区点已经是在完全排序后的序号上. 每次分区后就看分区点q + 1是不是大于k, 如果小于就说明要在大分区里继续找.
  */
  findKthNumber(arr = [], kth) {
    let that = this
    let result
    function callFind(arr, start, end) {
      if (start >= end) {
        if(start + 1 === kth) {
          result = arr[start] 
        }
        return
      }
      let q = partition(arr, start, end)
      if(q + 1 === kth) {
        result = arr[q]
        return
      }
      if (q + 1 > kth) {
        callFind(arr, start, q - 1)  
      } else {
        callFind(arr, q + 1, end)
      }      
    }
    function partition(arr, start, end) {
      let pivot = arr[end]
      let sortedIndex = start
      for (let i = start; i < end; i++) {
        if (arr[i] < pivot) { // 不需要等号, 等于pivot就放在大于分区
          that.swap(arr, sortedIndex, i)
          sortedIndex++
        }        
      }
      that.swap(arr, sortedIndex, end) //把分区点放入中间位置
      return sortedIndex
    }
    function middlePivot(arr, start, end) {
      // 三数取中
      let mid =(start + end) / 2 | 0
      let temp = [{index: start, value: arr[start]}, {index: end, value: arr[end]}, {index: mid, value: arr[mid]}]
      temp.sort((a, b) => a.value - b.value)
      return temp[1].index
    }
    function randomPivot(arr, start, end) {
      let randomIndex = Math.floor(Math.random() * (end - start + 1)) + start
      if (randomIndex !== end) {        
        this.swap(arr, randomIndex, end)
      }
    }
    callFind(arr, 0, arr.length - 1)
    return result
  }
}

let st = new Sort()
let arr = [1, 1, 2]
// st.bubleSort(arr)
// st.mergeSort(arr)
// st.mergeSortWithSentinel(arr)
// st.quickSort(arr)
console.log(st.findKthNumber(arr, 0));

// console.log(arr);