let size = 256
/**
 * 生成模式串字符ascii码和下标映射
 * @param {*} b 模式串
 * @param {*} bc 字符ascii码和下标映射
 */
function generateBC(b, bc) {
  for (let i = 0; i < size; i++) {
    bc[i] = -1
  }
  let m = b.length
  for (let i = 0; i < m; i++) {
    const index = b[i].charCodeAt(0);
    bc[index] = i
  }
}
/* 生成好后缀的最近匹配下标和, 是否有后缀子串匹配的前缀子串 */
/* 
  https://static001.geekbang.org/resource/image/27/83/279be7d64e6254dac1a32d2f6d1a2383.jpg
*/
function generateGS(sub, suffix, prefix) {
  let m = sub.length
  for (let i = 0; i < m; i++) {
    suffix[i] = -1
    prefix[i] = false
  }
  for (let i = 0; i < m - 1; i++) { // sub[0, i]
    let j = i
    let k = 0 // 公共后缀子串长度
    while (j >=0 && sub[j] === sub[m - 1 - k]) { //一步步调试才看懂, 两天后就看不懂了
      --j
      ++k
      suffix[k] = j + 1 //j+1 表示公共后缀子串在 sub[0, i] 中的起始下标i
    }
    if (j === -1) { // k长度的后缀子串,在模式串开头位置
      prefix[k] = true
    }
  }
}

// j 表示坏字符对应的模式串中的字符下标 ; m 表示模式串长度
function moveByGS(j, m, suffix, prefix) {
  let k = m - 1 - j; // 好后缀长度
  if (suffix[k] != -1) return j - suffix[k] +1; // 最长匹配前缀不在串首
  for (let r = j+2; r <= m-1; ++r) { // j是序号5->4,
    if (prefix[m-r] == true) {
      return r;
    }
  }
  return m;
}
function bm(srcString, sub) {
  let srcLength = srcString.length
  let subLength = sub.length
  let subMap = []
  generateBC(sub, subMap)

  let suffix = [], prefix = [];
  generateGS(sub, suffix, prefix);

  let i = 0 // 遍历主串
  while (i <= srcLength - subLength) {
    let j // 逆序遍历模式串,找出坏字符
    for (j = subLength - 1; j >=0; j--) {
      if(srcString[i + j] !== sub[j]) break      
    }
    if (j < 0) {return i} //匹配返回
    // 这里等同于将模式串往后滑动 j-subMap[[i+j]] 位
    let x = j - subMap[srcString[i + j].charCodeAt(0)] // 坏字符在模式串里的位置
    let y = 0
    if (j < subLength - 1) {  // 如果有好后缀的话, 前面j = subLength - 1
      y = moveByGS(j, subLength, suffix, prefix)
    }
    i = i + Math.max(x, y)
  }
  return -1
}


console.log(bm('abcacabcabcbacabc', 'cabcab'));