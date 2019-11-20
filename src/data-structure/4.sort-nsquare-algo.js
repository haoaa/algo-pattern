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
      let mid = (start + end) / 2
      let left = mergeCall(arr, start, mid)
      let right = mergeCall(arr, mid + 1, end)
      merge(arr, left, right)
    }
    function merge(arr, left, right) {
      let i = 0, j =0
      for (let i = 0; i < left.length; i++) {
        const element = left[i];
        
      }
    }
  }
}

let st = new Sort()
let arr = [4, 5, 6, 3, 2, 1]
// st.bubleSort(arr)
st.selectionSort(arr)
console.log(arr);