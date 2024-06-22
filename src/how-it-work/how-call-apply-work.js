Function.prototype.apply = function(context){
  if(typeof this !=='function'){
      throw new TypeError('Error');
  }
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

function name(a,b) {
  console.log(this.a);
  console.log(arguments);
}

name.apply({a:333},[1,2])