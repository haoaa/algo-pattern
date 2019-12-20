/* N皇后问题
我们把这个问题划分成 N 个阶段，依次将 N 个棋子放到第1行、第2行、第3行……第N行。
在放置的过程中，我们不停地检查当前的方法，是否满足要求。
如果满足，则跳到下一行继续放置棋子；如果不满足，那就再换一种方法，继续尝试。
*/

class NQueenProblem{
  constructor() {
    this.result = Array.from({length: NQueenProblem.N}) // 序号是row, 值是column
    this.allResult = []
    this.calNqueens(0)
  }
  calNqueens(row) {
    if (row === NQueenProblem.N) {// N 个棋子都放置好了，打印结果
      this.allResult.push(this.result);      
      return true
    }
    for (let column = 0; column < NQueenProblem.N; column++) {
      if (this.isOk(row, column)) { // 有些放法不满足要求
        this.result[row] = column // 第 row 行的棋子放到了 column 列
        if (this.calNqueens(row + 1) && row !== 0) { // 递归回溯,下一层不满足上一层就继续遍历
          return true
        }
      }    
    }
    return false
  }
  isOk(row, column) {
    let leftup = column - 1, rightup = column + 1
    for (let i = row - 1; i >=0; i--) { // 逐行往上考察每一行,因为是一行行往下放的
      if (this.result[i] === column) {
        return false
      }
      if (leftup >= 0) {
        if (this.result[i] === leftup) {
          return false
        }
      }
      if (rightup < NQueenProblem.N) {
        if (this.result[i] === rightup) {
          return false
        }
      }
      leftup--
      rightup++
    }
    return true
  }
  printQueens() {
    function sep() {
      console.log('==='.repeat(NQueenProblem.N))
    }
    for (let i = 0; i < this.allResult.length; i++) {
      const result = this.allResult[i];
      sep()
      for (let row = 0; row < result.length; row++) {
        let out = ''
        for (let column = 0; column < result.length; column++) {
          if (result[row] === column) {
            out += ' + '
          } else {
            out += ' - '
          }      
        }
        console.log(out);
      }
    }
    this.allResult.length && sep()
  }
}

NQueenProblem.N = 4


const qp = new NQueenProblem()
qp.printQueens()