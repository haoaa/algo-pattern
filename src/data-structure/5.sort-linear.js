class Sort{
  // bucketSize不是桶容量,而是桶里数值的区间范围 [x, x + 10)
  bucketSort(arr = [], bucketSize = 10) {
    // 最大值最小值之前划分桶, 遍历数组的数据到桶里
    // 桶内排序后, 再拷贝到原数组
    let maxValue = Number.NEGATIVE_INFINITY, minValue = Number.POSITIVE_INFINITY
    if (arr.length <= 1) {
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
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
    let bucketsArr = []
    // 桶初始化
    for (let i = 0; i < bucketCount; i++) {
      bucketsArr[i] = [] 
    }
    // 数据入桶
    for (let i = 0; i < arr.length; i++) { 
      const val = arr[i];
      let index = Math.floor((val - minValue) / bucketSize)
      bucketsArr[index].push(val)
    }
    // 桶内排序    
    function insertionSort(arr) {
      if (arr.length <= 1) return
      for (let j = 1; j < arr.length; j++) {
        const element = arr[j];
        let k = j - 1
        for (; k >= 0; k--) {
          if (arr[k] > element) {
            arr[k + 1] = arr[k]
          } else {
            break
          }         
        }
        arr[k + 1] = element
      }
    }
    for (let i = 0; i < bucketsArr.length; i++) {
      const bucket = bucketsArr[i];
      insertionSort(bucket)
    }
    // 拷贝到原数组
    let k = 0
    for (let i = 0; i < bucketsArr.length; i++) {
      const bucket = bucketsArr[i];
      for (let j = 0; j < bucket.length; j++) {
        arr[k++] = bucket[j]        
      }
    }
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
    // 1. 根据最长的那个值判断分桶循环次数. 
    // 2. 从低位到高位排序, 按每位的取值范围生成桶数
    // 3. 当前位分到对应的桶里
    // 4. 把桶里按位排好的数据拷贝回原数组, 循环到最长的那个值为止
    let length = arr.length
    if (length <= 1) {
      return
    }
    function getMax(arr) {
      let max = 0;
      for (let num of arr) {
          if (max < num.toString().length) {
              max = num.toString().length
          }
      }
      return max
    }
    function getNumberAtPos(num, pos) {
      return Math.floor(num / Math.pow(10, pos)) % 10
    }
    let loop = getMax(arr)
    for (let i = 0; i < loop; i++) {
      let buckets = Array.from({length: 10}, () => [])
      for (let j = 0; j < arr.length; j++) {
        const element = arr[j];
        buckets[getNumberAtPos(element, i)].push(element)
      }
      arr= [].concat(...buckets)
    }
    return arr
  }
  
}

let st = new Sort()
let arr = [2, 5, 3, 0, 2, 3, 0, 3]
// st.bubleSort(arr)
// st.mergeSort(arr)
st.countingSort(arr)
console.log(arr);

let bucketArr = [2, 5, 3, 6, 2, 7, 0, 3, 5, 9, 8, 2, 6, 6, 4, 7]

st.bucketSort(bucketArr, 3)
console.log(bucketArr);

console.log(st.radixSort([4, 57, 7, 3, 933])) // [3,4,7,57,933]