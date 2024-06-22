/* 邻接矩阵图
https://juejin.im/post/5de7c053518825125d1497e2
*/
class Adjoin {
  constructor(vertexs) { 
    this.vertexs = vertexs
    this.capacity = vertexs.length
    // 一维数组,每capacity长度表示顶点与其他顶点的关联关系
    this.adjoinArray = Array.from({length: vertexs.length * vertexs.length})
  }
  getVertexRow(id) {
    let index = this.vertexs.indexOf(id)
    const col = []
    // 无向图, 横着取和竖着取是一样的
    this.vertexs.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.capacity * pIndex])
    })
    return col
  }
  getAdjoinVertexs(id) {
    // filter(Boolean) 相当返回Boolean(xx) 
    return this.getVertexRow(id).map((item, index) => (item ? this.vertexs[index] : '')).filter(Boolean);
  }
  setAdjoinVertexs(id, sides) {
    const pIndex = this.vertexs.indexOf(id)
    sides.forEach(item => {
      const index = this.vertexs.indexOf(item)
      this.adjoinArray[pIndex * this.capacity +index ] = 1
    })
  }
  getRowTotal(params) { // params.获取多个id的可达路径
    params = params.map(id => this.getVertexRow(id))
    const adjoinNames = []
    this.vertexs.forEach((item, index /*0 ~ 4*/) => { // ['v0', 'v1', 'v2', 'v3', 'v4']
      // 把选中的每个顶点,连接的相同顶点值累加
      const rowtotal = params.map(param => param[index]).reduce((total, item) => {
        total += item || 0
        return total
      }, 0)
      adjoinNames.push(rowtotal)
    })
    return adjoinNames
  }
  getUnions(params){ // 取交集?
    const row = this.getRowTotal(params)
    return row.map((item, index) => item >= params.length && this.vertexs[index]).filter(Boolean)
  }
    
  getCollection(params) { // 并集?
    params = this.getRowTotal(params);
    return params.map((item, index) => item && this.vertexs[index]).filter(Boolean);
  }
  dfs(startId, endId) {
    /* 
    从图中某个顶点v出发，开始访问。
    找到其顶点的第一个未被访问的邻接点，访问该顶点。
    以该顶点为新顶点，重复此步骤，直至当前顶点没有未被访问的邻接点为止。
    返回前一个访问过得且扔有未被访问的邻接点的顶点，找到该顶点的下一个未被访问的邻接点，访问该顶点。
    重复步骤2，3，4，直至图中所有顶点都被访问过。
    */
    const nodes = []
    if (startId !== null) {
      const stack = [] 
      stack.push([startId])
      while (stack.length !== 0) {
        const sides = stack.pop()
        const side = sides[0]
        if (nodes.every(item => item[0] !== side)) {
          nodes.push(sides)
          if (side === endId) {
            break
          }
          const children = this.getAdjoinVertexs(side)
          children.slice().reverse().forEach( item => {
            stack.push([item, side])
          })
        }
      }
    }
    return nodes
  }

  bfs(startId, endID) {
    // 广度遍历, 在深入子节点前把子节点都添加到队列里, 根据队列的先进先出特性, 可以先访问完本层顶点后再深入下一层
    const nodes = []; // 顺序遍历的节点
    if (startId != null) {
      const queue = []; // [t目标点, s起点]对
      queue.unshift([startId]);
      while (queue.length !== 0) {
        const sides = queue.shift();
        const side = sides[0];

        if (nodes.every(item => item[0] !== side)) { // 已访问不处理
          nodes.push(sides);
          // 结束点退出
          if (side === endID) break;
          const children = this.getAdjoinVertexs(side);
          children.forEach((item) => {
            queue.push([item, side]);
          });
        }
      }
    }
    return nodes;
  }
  dijkstra(startId, endID) {
    const stack = this.getVertexRow(startId).map((item, index) => [
      item,
      this.vertexs[index],
      startId,
    ]).sort((a, b) => b[0] - a[0]);
    const nodes = [];

    while (stack.length) {
      // 删除最后节点
      const node = stack.pop();
      const [weights, side] = node;

      nodes.push(node);
      if (side === endID) break;

      if (weights) {
        const children = this.getVertexRow(side).map((item, index) => [item, this.vertex[index]]);
        children.forEach((item) => {
          let single = [];
          stack.some((value) => {
            if (value[1] === item[1]) {
              single = value;
              return true;
            }
            return false;
          });

          const [nodeWeights, id] = single;
          // const index
          if (id && weights + item[0] < nodeWeights) {
            single[0] = weights + item[0];
            single[2] = side;
          }
        });
      }
      stack.sort((a, b) => b[0] - a[0]);
    }

    return nodes;
  }
  lookupLink(params) {
    return params.reduceRight((total, current) => {
      if (total[total.length - 1] === current[0] && current[1]) {
        total.push(current[1]);
      }
      return total;
    }, params[params.length - 1]).reverse();
  }
}

class ShopAdjoin extends Adjoin {
  constructor(commoditySpecs, data) {
    super(commoditySpecs.reduce((total, current) => [
      ...total,
      ...current.list,
    ], []));
    this.commoditySpecs = commoditySpecs;
    this.data = data;
    // 单规格矩阵创建
    this.initCommodity();
    // 同类顶点创建
    this.initSimilar();
  }

  initCommodity() {
    this.data.forEach((item) => {
      this.applyCommodity(item.specs);
    });
  }

  initSimilar() {
    // 获得所有可选项
    const specsOption = this.getCollection(this.vertexs);
    this.commoditySpecs.forEach((item) => {
      const params = [];
      item.list.forEach((value) => {
        if (specsOption.indexOf(value) > -1) params.push(value);
      });
      // 同级点位创建
      this.applyCommodity(params);
    });
  }

  querySpecsOptions(params) {
    // 判断是否存在选项填一个
    if (params.some(Boolean)) {
      // 过滤一下选项
      params = this.getUnions(params.filter(Boolean));
    } else {
      // 兜底选一个
      params = this.getCollection(this.vertexs);
    }
    return params;
  }

  applyCommodity(params) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params);
    });
  }
}
const data = [
  { id: '1', specs: [ '紫色', '套餐一', '64G' ] },
  { id: '2', specs: [ '紫色', '套餐一', '128G' ] },
  { id: '3', specs: [ '紫色', '套餐二', '128G' ] },
  { id: '4', specs: [ '黑色', '套餐三', '256G' ] },
];
const commoditySpecs = [
  { title: '颜色', list: [ '红色', '紫色', '白色', '黑色' ] },
  { title: '套餐', list: [ '套餐一', '套餐二', '套餐三', '套餐四' ]},
  { title: '内存', list: [ '64G', '128G', '256G' ] }
];

let optList = new ShopAdjoin(commoditySpecs, data)
console.log(optList.querySpecsOptions([]))  // 套餐可选项目
const g1 = new Adjoin(['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6'])
g1.setAdjoinVertexs('v0', ['v2', 'v1'])
g1.setAdjoinVertexs('v1', ['v0', 'v4'])
g1.setAdjoinVertexs('v2', ['v0', 'v3', 'v4'])
g1.setAdjoinVertexs('v3', ['v2', 'v5'])
g1.setAdjoinVertexs('v4', ['v2', 'v1', 'v5'])
g1.setAdjoinVertexs('v5', ['v6', 'v3', 'v4'])
g1.setAdjoinVertexs('v6', ['v5'])
console.log(JSON.stringify(g1.bfs('v0')));
console.log(JSON.stringify(g1.dfs('v0')));

// const router = g1.dijkstra('v4', 'v3');
// console.log(`距离：${router[router.length - 1][0]}, 路线：${g1.lookupLink(router.map(item => [item[1], item[2]]))}`);
