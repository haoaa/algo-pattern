/* eslint-disable */
const babel = require("babel-core")

const result = babel.transform('const result = 1 + 2+3+4+5;', {
  plugins: [
    require('./my-babel-plugins')
  ]
})

console.log(result.code);