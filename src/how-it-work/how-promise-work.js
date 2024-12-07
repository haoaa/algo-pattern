/* eslint-disable */
const REJECTED = "rejected";
const PENDING = "pending";
const FULLFILLED = "fullfilled";

class MyPromise {
  state = PENDING;
  value = null;
  reason = null;
  onFullfilledArray = [];
  onRejectedArray = [];
  constructor(executor) {
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULLFILLED;
        this.value = value;
        setTimeout(() => {
          this.onFullfilledArray.forEach((fun) => fun());
        });
      }
    };
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        setTimeout(() => {
          this.onRejectedArray.forEach((fun) => fun());
        });
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFullfilled, onRejected) {
    onFullfilled =
      typeof onFullfilled === "function" ? onFullfilled : (data) => data;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2;
    promise2 = new MyPromise((resolve2, reject2) => {
      if (this.state === FULLFILLED) {
        setTimeout(() => {
          try {
            let result = onFullfilled(this.value);
            this.resolvePromise(promise2, result, resolve2, reject2);
          } catch (error) {
            reject2(error);
          }
        });
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.reason);
            this.resolvePromise(promise2, result, resolve2, reject2);
          } catch (error) {
            reject2(error);
          }
        });
      } else if (this.state === PENDING) {
        this.onFullfilledArray.push(() => {
          try {
            let result = onFullfilled(this.value);
            this.resolvePromise(promise2, result, resolve2, reject2);
          } catch (error) {
            reject2(error);
          }
        });
        this.onRejectedArray.push(() => {
          try {
            let result = onRejected(this.reason);
            this.resolvePromise(promise2, result, resolve2, reject2);
          } catch (error) {
            reject2(error);
          }
        });
      }
    });
    return promise2;
  }
  resolvePromise(promise2, result, resolve2, reject2) {
    if (result === promise2) {
      reject2(new TypeError("circular reference"));
      return;
    }
    let called = false; // 异构thenable
    let thenable;

    const isThenable = (res) =>
      ["function", "object"].includes(typeof res) && res !== null;

    if (isThenable(result)) {
      try {
        thenable = result.then; // 单次获取
        if (typeof thenable === "function") {
          thenable.call( // thenable是MyPromise
            result,
            (data) => {
              if (called) {
                return;
              }
              called = true;
              return this.resolvePromise(promise2, data, resolve2, reject2);
            },
            (error) => {
              if (called) {
                return;
              }
              called = true;
              reject2(error);
            }
          );
        } else {
          resolve2(result);
        }
      } catch (error) {
        if (called) {
          return;
        }
        called = true;
        return reject2(error);
      }
    } else {
      resolve2(result);
    }
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
}
function test() {
  let resolve, reject;
  const adapter = {
    resolved: MyPromise.resolve,
    rejected: MyPromise.reject,
    deferred() {
      let promise = new MyPromise((re, rj) => {
        reject = rj;
        resolve = re;
      });
      return {
        resolve,
        reject,
        promise,
      };
    },
  };
//   const promisesAplusTests = require("./lib/programmaticRunner");
  const promisesAplusTests =  require("promises-aplus-tests");

  promisesAplusTests(adapter, { reporter: "spec", bail: true }, function (err) {
    console.log(err);
  });
}
// test();
 