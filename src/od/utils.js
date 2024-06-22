// 基于堆实现优先队列
module.exports.PriorityQueue = class PriorityQueue {
  constructor(cpr) {
    this.queue = [];
    this.cpr = cpr;
  }
  swap(a, b) {
    const tmp = this.queue[a];
    this.queue[a] = this.queue[b];
    this.queue[b] = tmp;
  }
  // 上浮
  float() {
    let c = this.queue.length - 1;
    while (c >= 1) {
      const f = (c - 1) >> 1;
      if (this.cpr(this.queue[c], this.queue[f]) < 0) {
        this.swap(c, f);
        c = f;
      } else {
        break;
      }
    }
  }
  // 入队
  offer(val) {
    this.queue.push(val);
    this.float();
  }
  // 下沉
  sink() {
    let parent = 0;
    while (true) {
      const left = 2 * parent + 1;
      const right = left + 1;
      let c;
      const val1 = this.queue[left];
      const val2 = this.queue[right];
      if (val1 && val2) {
        c = this.cpr(val1, val2) < 0 ? left : right;
      } else if (val1 || val2) {
        c = val1 ? left : right;
      } else {
        break;
      }
      if (this.cpr(this.queue[c], this.queue[parent]) < 0) {
        this.swap(c, parent);
        parent = c;
      } else {
        break;
      }
    }
  }
  // 出队
  poll() {
    this.swap(0, this.queue.length - 1);
    const res = this.queue.pop();
    this.sink();
    return res;
  }
  peek() {
    return this.queue[0];
  }
  size() {
    return this.queue.length;
  }
};

// 并查集实现
module.exports.UnionFindSet = class UnionFindSet {
  constructor(n) {
    this.fa = new Array(n).fill(0).map((_, i) => i);
    this.count = n;
  }
  find(x) {
    if (x !== this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]));
    }
    return x;
  }
  union(x, y) {
    const x_fa = this.find(x);
    const y_fa = this.find(y);
    if (x_fa !== y_fa) {
      this.fa[y_fa] = x_fa;
      this.count--;
    }
  }
};
