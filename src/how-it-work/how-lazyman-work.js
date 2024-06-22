/* 
要求设计 LazyMan 类，实现以下功能。
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

*/

class LazyManClass {
  constructor(name) {
    console.log(`Hi I am ${name}`);
    this.taskList = [] // async tasks queue
    Promise.resolve().then(() => this.runTask())
    return this
  }
  async runTask() {
    while (this.taskList.length) {
      let task = this.taskList.shift()
      await task()
    }
  }
  eat(dinner) {
    this.taskList.push(() => {
      console.log(`I am eating ${dinner}`);
    })
    return this
  }
  sleep(second, reverse) {
    this.taskList[reverse? 'unshift' : 'push'](() => new Promise((res, rej) => {
      setTimeout(() => {
        res()
        console.log(`等待了${second}秒...`);
      }, second * 1000);
    }))
    return this
  }
  sleepFirst(second) {
    return this.sleep(second, true)
  }
}
function LazyMan(name) {
  return new LazyManClass(name)
}
// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner


LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food