/* new操作符 */
/* eslint-disable */
function newFk(func) {
  let obj = Object.create(func.prototype)
  let result = func.apply(obj, [].slice.call(arguments, 1))
  return typeof result === "object" && result !== null ? result : obj
}

function pet(name, age) {
  this.name = name
  this.age = age
}
pet.prototype.say = function() {
  console.log(`${this.name} is aging ${this.age}`);
}

let Tomcat = newFk(pet, 'Tom', 2)
console.log(Tomcat);
Tomcat.say()

var jsonStr = `{"age":20, "name":"jack"}`
var json = (new Function('return ' +jsonStr))()
console.log(json);