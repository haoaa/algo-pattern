const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

/**
 * 
 关联服务列表和离线节点求在线节点
a1-a2,a5-a6,a2-a3,a7-a1,a8-a7
a5,a2
 */
void (async function () {
  let lines = [];
  while ((line = await readline())) {
    lines.push(line);
    if (lines.length === 2) {
      let relations = lines[0].split(",").map((i) => i.split("-"));
      let errArr = lines[1].split(",");

      console.log(fun(relations, errArr));
    }
  }

  function fun(relations, errArr) {
    let relMap = new Map();
    let allNodes = new Set();
    let order={},orderIdex = 0
    for (const relation of relations) {
      let [a, b] = relation;
      allNodes.add(a);
      allNodes.add(b);
      if (!order[a]) {
        order[a] =orderIdex++
      }
      if (!order[b]) {
        order[b] =orderIdex++
      }
      if (relMap.has(b)) {
        let dep = relMap.get(b);
        dep.add(a);
        let reDep = relMap.get(a);
        if (reDep) {
          for (const _reDep of reDep) {
            dep.add(_reDep);
          }
        }
      } else {
        let newDep = new Set();
        newDep.add(a);
        let reDep = relMap.get(a);
        if (reDep) {
          for (const _reDep of reDep) {
            newDep.add(_reDep);
          }
        }
        relMap.set(b, newDep);
      }
      relMap.forEach((dep, key)=>{
        if (key!== b && dep.has(b)) {
          dep.add(a)
        }
      })
    }
    let errNodeSet = new Set();
    for (const errNode of errArr) {
      errNodeSet.add(errNode);
      let dep = relMap.get(errNode);
      if (dep) {
        for (const _dep of dep) {
          errNodeSet.add(_dep);
        }
      }
    }
    errNodeSet.forEach((val) => {
      allNodes.delete(val);
    });
    return allNodes.size ? [...allNodes].sort((a,b)=>order[a]-order[b]).join(",") : ",";
  }
})();
