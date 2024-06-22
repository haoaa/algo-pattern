function swap(arr, a, b) {
  const t = arr[a] ^ arr[b];
  arr[a] = t ^ arr[a];
  arr[b] = t ^ arr[b];
}

function permute(num) {
  const res = [];
  num.sort((a, b) => a - b);
  recurse(res, num, 0);
  return res;
}
function recurse(res, nums, idx) {
  if (idx === nums.length - 1) {
    res.push(nums);
  } else {
    for (let j = idx; j < nums.length; j++) {
      swap(nums, j, idx);
      recurse(res, nums, idx + 1);
      swap(nums, j, idx);
    }
  }
}

const array1 = [1, 2];
// const a1= permute(array1)
// console.log(a1);

function permute2(num) {
  const res = [];
  const list = [];
  backTrack(num, list, res);
  return res;
}

function backTrack(num, list, res) {
  if (list.length === num.length) {
    res.push(list.slice());
  } else {
    for (let i = 0; i < num.length; i++) {
      if (list.includes(num[i])) {
        continue;
      }
      list.push(num[i]);
      backTrack(num, list, res);
      list.pop();
    }
  }
}

function permute3(num) {
  let res = [[]];
  for (let i = 0; i < num.length; i++) {
    // 遍历插入元素
    const resTmp = [];
    for (let j = 0; j < res.length; j++) {
      const listItem = res[j];
      for (let k = 0; k < listItem.length + 1; k++) {
        listItem.splice(k, 0, num[i]);
        resTmp.push(listItem.slice());
        listItem.splice(k, 1);
      }
    }
    res = resTmp;
  }
  return res;
}

function solve(grid) {
  const n = grid.length;
  if (n === 0) {
    return 0;
  }
  const m = grid[0].length;
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "1") {
        count++;
        bfs(grid, i, j);
      }
    }
  }
  return count;
  function dfs(grid, i, j) {
    grid[i][j] = "0";
    if (i > 0 && grid[i - 1][j] === "1") {
      dfs(grid, i - 1, j);
    }
    if (i < n - 1 && grid[i + 1][j] === "1") {
      dfs(grid, i + 1, j);
    }
    if (j > 0 && grid[i][j - 1] === "1") {
      dfs(grid, i, j - 1);
    }
    if (j < m - 1 && grid[i][j + 1] === "1") {
      dfs(grid, i, j + 1);
    }
  }
  function bfs(grid, i, j) {
    grid[i][j] = "0";
    const q = [[i, j]];
    while (q.length) {
      const [row, col] = q.shift();
      //四个方向依次检查：不越界且为1
      if (row - 1 >= 0 && grid[row - 1][col] == "1") {
        q.push([row - 1, col]);
        grid[row - 1][col] = "0";
      }
      if (row + 1 < n && grid[row + 1][col] == "1") {
        q.push([row + 1, col]);
        grid[row + 1][col] = "0";
      }
      if (col - 1 >= 0 && grid[row][col - 1] == "1") {
        q.push([row, col - 1]);
        grid[row][col - 1] = "0";
      }
      if (col + 1 < m && grid[row][col + 1] == "1") {
        q.push([row, col + 1]);
        grid[row][col + 1] = "0";
      }
    }
  }
}


const mark = []
function permuteUnique(num) {
  const res = [];
  const list = [];
  num.sort((a, b) => a - b);
  backTrack(num, list, res);
  return res;
}

function backTrack(num, list, res) {
  if (list.length === num.length) {
    res.push(list.slice());
  } else {
    for (let i = 0; i < num.length; i++) {
      if(mark[i] || i>0 && num[i] == num[i-1] && !mark[i-1]){
        continue;
    }
      list.push(num[i]);
      mark[i]=true
      backTrack(num, list, res);
      list.pop();
      mark[i]=false
    }
  }
}