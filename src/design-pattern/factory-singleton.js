class Man {
  constructor(name){
    this.name = name
  }
  alert() {
    console.log(this.name);
  }
}

class Factory {
  static create(name){
    return new Man(name)
  }
}

Factory.create('jim').alert()

function createComponent(params) {
  return new VNode(
    `xv`,
    data, undefined, undefined, undefined, context
  )
}

class Singleton{
  constructor() {}
  static getInstance = function() {
    let ins
    return function () {
      if (!ins) {
        ins = new Singleton()
      }
      return ins
    }
  }()
}

let get = Singleton.getInstance()

class Plug {
  getName() {
    return '港版插头'
  }
}

class Target {
  constructor(plug) {
    this.plug = plug
  }
  getName() {
    return this.plug.getName() + ' 适配器转二脚插头'
  }
}


let target = new Target(new Plug())
target.getName() // 港版插头 适配器转二脚插头
