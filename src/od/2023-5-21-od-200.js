const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

/**
 * 服务失效判断 
题目描述 
某系统中有众多服务，每个服务用字符串(只包含字母和数字，长度<=10)  唯一标识，
服务间可能有依赖关系，如 A依赖B，则当B 故障时导致 A也故障。 
依赖具有传递性，如 A依赖B，B依赖C，当 C故障时导致B故障，也导致A故障。 
给出所有依赖关系，以及当前已知故障服务，要求输出所有正常服务。 
依赖关系:  服务1-服务2  表示“服务1”依赖“服务 2” 
不必考虑输入异常，用例保证:  依赖关系列表、故障列表非空，且依赖关系数，故障服
务数都不会超过3000服务标识格式正常 
输入描述 
半角逗号分隔的依赖关系列表  (换行) 
半角逗号分隔的故障服务列表 
输出描述 
依赖关系列表中提及的所有服务中可以正常工作的服务列表，用半角逗号分隔，按依赖
关系列表中出现的次序排序。 
特别的，没有正常节点输出单独一个半角逗号.
 关联服务列表和离线节点求在线节点
a1-a2,a5-a6,a3-a2,a7-a1,a8-a7
a5,a2 
a4-a5,a5-a7,a7-a5,a3-a4,a1-a2,a2-a3
a5
 */
void (async function () {
  let lines = [];
  while ((line = await readline())) {
    lines.push(line);
    if (lines.length === 2) {
      let relations = lines[0].split(",").map((i) => i.split("-"));
      let errArr = lines[1].split(",");

      console.log(fun2(relations, errArr));
    }
  }

  function fun2(relations, errArr) {
    let relMap = {};
    let allNodes = [...new Set(relations.reduce((a, b) => a.concat(b)))];
    for (const relation of relations) {
      let [a, b] = relation;
      let sons = relMap[b] || (relMap[b] = []);
      if (!sons.includes(a)) {
        sons.push(a);
      }
    }
    while (errArr.length) { // bfs
      let p = errArr.shift();
      let i = allNodes.indexOf(p);
      if (~i) {
        allNodes[i] = false;
        psons = relMap[p] || [];
        errArr.push(...psons);
      }
    }
    allNodes = allNodes.filter(Boolean);
    return allNodes.length ? allNodes.join(",") : ",";
  }
  function fun(relations, errArr) {
    let relMap = new Map();
    let allNodes = new Set();
    let order = {},
      orderIdex = 0;
    for (const relation of relations) {
      let [a, b] = relation;
      allNodes.add(a);
      allNodes.add(b);
      if (!order[a]) {
        order[a] = orderIdex++;
      }
      if (!order[b]) {
        order[b] = orderIdex++;
      }
      if (relMap.has(b)) {
        let dep = relMap.get(b);
        dep.add(a);
        let reDep = relMap.get(a);
        // 只处理了双层依赖
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
      relMap.forEach((dep, key) => {
        if (key !== b && dep.has(b)) {
          dep.add(a);
        }
      });
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
    return allNodes.size
      ? [...allNodes].sort((a, b) => order[a] - order[b]).join(",")
      : ",";
  }
})();
