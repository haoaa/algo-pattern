/* 
  19. Dynamic Programming I: Fibonacci, Shortest Paths
  DP ~ memorization + recursion
  memorized dp algorithm 
  memo = {}
  f(n):
    if n : memo: return memo[n]
    if n <= 2: f=1
    else f:f(n-1) + f(n-2)
    memo[n] = f
    return f
   f(1) ...f(n) 只会调用一次所以时间复杂度是O(n)
*/

let memo = {}
function fib(n) {
  if (memo[n]) {
    return memo[n]
  }
  let result
  if (n<= 2) {
    result = 1
  } else { 
    result = fib(n - 1) + fib(n - 2)
  }
  memo[n] =result
  return result
}
console.time('fib-memorized')
fib(30)
console.timeEnd('fib-memorized')

/* bottom-up DP save more space*/
/* topological sort of */
let fibb = {}
function fibBU(n) {
  let f
  for (let i = 1; i <= n; i++) {
    if (i <= 2) {
      f = 1
    } else {
      f = fibb[i - 1] + fibb[i - 2]
    }
    fibb[i] = f
  }
  return fibb[n]
}

console.time('fib-dp-bottom-up')
fibBU(30)
console.timeEnd('fib-dp-bottom-up')


function fibExponential(n) {
  let result
  if (n<= 2) {
    result = 1
  } else { 
    result = fibExponential(n - 1) + fibExponential(n - 2)
  }
  return result
}

console.time('fib-exponential')
fibExponential(30)
console.timeEnd('fib-exponential')
