/* eslint-disable */
var t = require('@babel/types');

module.exports =  function() {
  return {
    visitor: visitor
  }
}

const visitor = {
  Identifier(path, state) {

  },
  BinaryExpression(path) {       
    let result
    if (t.isNumericLiteral(path.node.left) && t.isNumericLiteral(path.node.right)) {
      switch (path.node.operator) {
        case '+':
          result = path.node.left.value + path.node.right.value 
          break;
        case '-':
          result = path.node.left.value - path.node.right.value 
          break;
        case '/':
          result = path.node.left.value / path.node.right.value 
          break;
        case '*':
          result = path.node.left.value * path.node.right.value 
          break;
        case '**':
          let p = path.node.right.value
          while (--p) {
            result = result || path.node.left.value
            result *= path.node.left.value
          }
          break;          
        default:
          break;
      }
    }
    if (result !== undefined) {
      path.replaceWith(t.numericLiteral(result))
      let parentPath = path.parentPath
      parentPath && visitor.BinaryExpression.call(this, parentPath)
    }
    // xxxxxxxx
    if (path.findParent(path => path.isObjectExpression())) {
      
    }
  }
}
