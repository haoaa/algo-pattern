/**
 * VLAN 是一种对局域网设备进行逻辑划分的技术，为了标识不同的 VLAN，引入 VLAN
ID(1-4094 之间的整数)的概念。
定义一个 VLAN ID 的资源池(下称 VLAN 资源池)，资源池中连续的 VLAN 用开始 VLAN-结
束 VLAN 表示，不连续的用单个整数表示，所有的 VLAN 用英文逗号连接起来。
现在有一个 VLAN 资源池，业务需要从资源池中申请一个 VLAN，需要你输出从 VLAN 资
源池中移除申请的 VLAN 后的资源池。
输入描述
第一行为字符串格式的 VLAN 资源池，第二行为业务要申请的 VLAN，VLAN 的取值范围
为[1,4094]之间的 0 整数。
输出描述
从输入 VLAN 资源池中移除申请的 VLAN 后字符串格式的 VLAN 资源池，输出要求满足
题目描述中的格式并且按照 VLAN 从小到大升序输出
如果申请的 VLAN 不在原 VLAN 资源池内，输出原 VLAN 资源池升序排序后的字符串即
可
用例
1-5
2
1,3-5
 */
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
const lines = [];
// rl.on("line", (line) => {
//   lines.push(line);
//   if (lines.length === 2) {
//     let arr = lines[0].split(",");
//     let remove = parseInt(lines[1]);
//     console.log(removeVALN(arr, remove));
//     lines.length = 0;
//   }
// });
console.log(removeVALN(["5", "6", "2-4"], 3));
function removeVALN(arr, remove) {
  arr = arr
    .map((str) => str.split("-").map(Number))
    .sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < arr.length; i++) {
    let [from, to] = arr[i];
    if (to) {
      if (remove >= from && remove <= to) {
        arr.splice(i, 1, [from, remove - 1], [remove + 1, to]);
        break;
      }
    } else {
      if (from === remove) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  return arr
    .filter((scope) => {
      let [from, to] = scope;
      return !to || from <= to;
    })
    .map((scope) => {
      let [from, to] = scope;
      if (from === to) {
        scope = [from];
      }
      return scope.join("-");
    })
    .join(",");
}
