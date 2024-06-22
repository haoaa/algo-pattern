function bf(src, target) {
  if(!(src && src.length)) return
  // 比较次数为n-m+1, 串内比较次数<=m
  for (let i = 0; i < src.length - target.length + 1; i++) {
    for (let j = 0, k = i; j < target.length; j++, k++){
      if(src[k] != target[j]) break
      if(j === target.length -1) return i
    }
  }
  return -1
}


console.log(bf('afbcdfee', 'bcd'));


function rk(src, target) {
  if(!(src && src.length)) return 
  let m = target.length
  let hashs =[]
  let m26 = Array.from({length: m}).map((v, i) => 26**i)

  function hash(subString, i) { // 26个小写字母 a~z 1~26
    if (i === 0) {
      return subString.split('').reduce((pre, curV, curI) => {
        let cur = m26[m - 1 - curI] * (curV.charCodeAt(0) - 'a'.charCodeAt(0))
        return pre + cur
      }, 0)
    } else {
      let preTwo = (hashs[i - 1] - (src[i - 1].charCodeAt(0) - 'a'.charCodeAt(0)) * m26[m - 1]) * 26 
      return preTwo + (src[i + m - 1].charCodeAt(0) - 'a'.charCodeAt(0))
    }
  }
  for (let i = 0; i < src.length - target.length + 1; i++) {
    let h = hash(src.slice(i, m), i)
    hashs[i] = h
  }
  let th = hash(target, 0)
  return hashs.indexOf(th)
}

console.log(rk('wfbcdfee', 'bcd'));