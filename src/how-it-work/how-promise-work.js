/* eslint-disable */ 
const REJECTED = 'rejected'
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'

function MyPromise(executor) {
  this.state = PENDING
  this.value = null
  this.reason = null
  this.onFullfilledArray = []
  this.onRejectedArray = []

  const resolve = value => {
    if (value instanceof MyPromise) {
      MyPromise.then(resolve, reject)
    }
    if (this.state === PENDING){
      this.state = FULLFILLED
      this.value = value
      setTimeout(() => {
        this.onFullfilledArray.forEach(fun => fun(value))
      }, 0)
    }
  }
  const reject = reason => {
    if (this.state === PENDING){
      this.state = REJECTED
      this.reason = reason
      setTimeout(() => {
        this.onRejectedArray.forEach(fun => fun(reason))
      }, 0)
    }
  }
  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFullfilled, onRejected) {
  onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : err => {throw new Error(err)}
  
  let promise2
  if (this.state === FULLFILLED) {
    return promise2 = new MyPromise((resolve2, reject2) => {
      setTimeout(() => {
        try {
          let result = onFullfilled(this.value)
          resolvePromise(promise2, result, resolve2, reject2)
        } catch (error) {
          reject2(error)
        }
      })
    })    
  } else if (this.state === REJECTED) {
    return promise2 = new MyPromise((resolve2, reject2) => {
      setTimeout(() => {
        try {
          let result = onRejected(this.reason)
          resolvePromise(promise2, result, resolve2, reject2)
        } catch (error) {
          reject2(error)
        }
      })
    })
  } else if (this.state === PENDING) {
    promise2 = new MyPromise((resolve2, reject2) => {
      this.onFullfilledArray.push(() => {
        try {
          let result = onFullfilled(this.value)
          resolvePromise(promise2, result, resolve2, reject2)
        } catch (error) {
          reject2(error)
        }
      })
      this.onRejectedArray.push(_ => {
        try {
          let result = onRejected(this.reason)
          resolvePromise(promise2, result, resolve2, reject2)
        } catch (error) {
          reject2(error)
        }
      })
    })    
  }
  return promise2
}

const resolvePromise = (promise2, result, resolve2, reject2) => {
  if (result === promise2) {
    reject2(new TypeError('circular reference 吱吱吱?'))
  }
  let consumed = false
  let thenable
  if (result instanceof MyPromise) {
    if (result.state !== PENDING) {
      result.then(resolve2, reject2)
    } else {
      result.then((data) => {
        resolvePromise(promise2, data, resolve2, reject2)
      }, reject2)
    }
    return
  }

  const isThenable = target => (typeof target === 'function' || typeof target === 'object') &&
    target !== null

  if (isThenable(result)) {
    try {
      thenable = result.then
      if (typeof thenable === 'function') {
        thenable.call(result, function(data) {
          if (consumed) {
            return
          }
          consumed = true
          return resolvePromise(promise2, data, resolve2, reject2)
        }, function(error) {
          if (consumed) {
            return
          }
          consumed = true
          reject2(error)
        })
      } else {
        resolve2(result)
      }
    } catch (error) {
      if (consumed) {
        return
      }
      consumed = true
      return reject2(error)
    }
  } else {
    resolve2(result)
  }
}

MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}
MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}
// let pro = new MyPromise((res, rej) => {
//   return new MyPromise((r,j) => r(332))
// }).then(data => {
//   console.log(data);
// })

// setTimeout(() => {
//   pro.then(a => {
//     console.log(a);
//   })
// })


// const promise = new MyPromise((resolve, reject) => {
//   resolve('lucas')
//   // setTimeout(() => {
//   //     resolve('lucas')
//   // }, 2000)
// })

// promise.then(onfulfilled = data => {
//   console.log(data)
//   return onfulfilled(data)
// })
// .then(data => {
//   console.log(data)
// })
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
      resolve('lucas')
  }, 2000)
})

promise.then(data => {
  console.log(data)
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(`${data} next then`)
    }, 4000)
  })
})
.then(data => {
  console.log(data)
})