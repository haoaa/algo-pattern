/* eslint-disable */
const babylon = require("babylon");
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default

const code = `
import Throttle from '@/components/click-throttle'
function square(n) {
  debugger
  return n * n;
}`;
const ast = babylon.parse(code, {sourceType: "module"});

// traverse(ast, {
//   enter(path) {
//     if (t.isIdentifier(path.node, { name: "n" })) {
//       path.node.name = "x";
//       path.replaceWith(t.binaryExpression("*", t.identifier("a"), t.identifier("b")))
//       path.insertBefore(t.expressionStatement(t.stringLiteral("Because I'm easy come, easy go.")));
//     }
//   }
// });

traverse(ast, {
  enter(path) {
    if (t.isImportDeclaration(path.node)) {
      path.remove()
    }
    if(t.isDebuggerStatement(path.node)) {
      path.remove()
    }
  }
});
let gencode = generator(ast, {}, code)
console.log(gencode.code);
// traverse(ast, {
//   enter(path) {
//     if (
//       path.node.type === "Identifier" &&
//       path.node.name === "n"
//     ) {
//       console.log('222222');
//       path.node.name = "x";
//     }
//   }
// });