class Sort{
  bucketSort(arr = [], bucketSize = 10) {
    let length = arr.length
    let maxValue = Number.NEGATIVE_INFINITY, minValue = Number.NEGATIVE_INFINITY
    if (length <= 1) {
      return arr
    }
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element > maxValue) {
        maxValue = element
      } else if (element < minValue) {
        minValue = element
      }
    }
    let bucketCount = (maxValue - minValue) / (bucketSize + 1)
    let bucketArr = [[]]
  }
  countingSort(arr = []) {
    let length = arr.length
    let bucketArr = []
    let sortedArr = []
    if (length <= 1) {
      return arr
    }
    // 桶计数
    for (let i = 0; i < length; i++) {
      let value = arr[i]
      bucketArr[value] = bucketArr[value] ? bucketArr[value] + 1 : 1
    }
    // 桶顺序求和, 桶里的值应该初始化0才好方便相加
    for (let j = 1; j < bucketArr.length; j++) {
      bucketArr[j] = (bucketArr[j] || 0) + (bucketArr[j - 1] || 0)
    }
    for (let i = length - 1; i >= 0; i--) {
      let value = arr[i]
      let index = bucketArr[value] // 第几个对应序号要减一
      sortedArr[index - 1] = value
      bucketArr[value] = index - 1
    }
    // 数组拷贝
    for (let j = 0; j < sortedArr.length; j++) {
      arr[j] = sortedArr[j]
    }
  }
  radixSort(arr = []){
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
  
}

let st = new Sort()
let arr = [2, 5, 3, 0, 2, 3, 0, 3]
// st.bubleSort(arr)
// st.mergeSort(arr)
st.countingSort(arr)
console.log(arr);