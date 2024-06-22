/* eslint-disable */
const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

function readCode(filePath) {
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf-8')
  // 生成 AST
  const ast = babylon.parse(content, {
    sourceType: 'module'
  })
  // 寻找当前文件的依赖关系
  const dependencies = []
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value)
    }
  })
  // 通过 AST 将代码转为 ES5
  const { code } = transformFromAst(ast, null, {
    presets: ['env']
  })
  return {
    filePath,
    dependencies,
    code
  }
}

//facade
function addEvent(el, ev, fn) {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if(el.attachEvent){
    el.attachEvent('on'+ev, fn)
  } else {
    el['on'+ ev] = fn
  }
}


// 图片懒加载: 虚拟代理
const createImgProxy = (img, loadingImg, realImg) => {
  let hasLoaded = false;
  const virtualImg = new Image();
  virtualImg.src = realImg;
  virtualImg.onload = () => {
    Reflect.set(img, 'src', realImg);
    hasLoaded = true;
  }
  return new Proxy(img, {
    get(obj, prop) {
      if (prop === 'src' && !hasLoaded) {
        return loadingImg;
      }
      return obj[prop];
    }
  })
}

const getFib = number => {
  if (number<=2) {
    return 1
  } else {
    return getFib(number - 1) + getFib(number - 2)
  }
}

const getCacheProxy = (fn, cache = new Map()) => {
  return new Proxy(fn, {
    apply(target, context, args){
      debugger
      let paraKey = args.join(' ')
      if (cache.has(paraKey)) {
        return cache.get(paraKey)
      }
      const result = fn(...args)
      cache.set(paraKey, result)
      return result
    }
  })
}
const getFibProxy = getCacheProxy(getFib)

getFibProxy(40)